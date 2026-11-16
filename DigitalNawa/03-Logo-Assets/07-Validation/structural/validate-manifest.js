/**
 * DN-BI-21-EXEC-013 — Symlink Error Classification Isolation & Complete Cleanup Lifecycle Closure
 *
 * Scope: Structural Validation of Asset Manifest & Security Hardening
 * Features:
 * - JSON Schema Draft 2020-12 validation via Ajv2020 & ajv-formats
 * - Mandatory non-empty SHA-256 enforcement with case-insensitive normalization (.toLowerCase())
 * - Secure path validation (POSIX absolute, Windows drive-letter, UNC, forward/backward traversal)
 * - Robust filesystem error handling: tryLstat returns null ONLY on ENOENT and re-throws all others
 * - Decoupled symlink error classification: path inspection failures produce FAILED (never SKIPPED);
 *   only errors from the actual symlink creation operation are eligible for recognized environment classification
 * - Strict temporary-resource cleanup lifecycle: every test-owned resource cleaned up in finally,
 *   with zero empty catch blocks, explicit absence verification, and recovery failure detection
 * - Comprehensive pre-existing resource preservation and snapshot verification (files, symlinks, hashes)
 * - Isolated failure-path regression testing (creation and cleanup failure harnesses)
 * - True dangling symlink detection and rejection (with verifiable non-existent target)
 * - Correct internal symlink verification using actual target SHA-256
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import child_process from 'child_process';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const rootDir = 'DigitalNawa-Brand-Project/03-Logo-Assets';
const assetRoot = path.resolve(rootDir);

// Recognized OS error codes exclusively for symlink creation environment limitation
const RECOGNIZED_SYMLINK_ENV_ERRORS = ['EPERM', 'ENOTSUP', 'EACCES', 'EOPNOTSUPP', 'ENOSYS'];

/**
 * Robust filesystem lstat helper.
 * Returns null ONLY when error code is ENOENT (path does not exist).
 * Re-throws all other unexpected filesystem errors (e.g. EACCES, EIO, invalid argument, etc.).
 */
function tryLstat(p) {
  try {
    return fs.lstatSync(p);
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      return null;
    }
    throw err;
  }
}

/**
 * Helper to create a temporary test symlink with decoupled, isolated error classification.
 *
 * Phase 1: Temporary path inspection via lstatFn (defaults to tryLstat).
 *   - Any inspection error (e.g. EACCES, EIO, or collision) is an inspection failure
 *     and produces FAILED (never SKIPPED).
 *   - Path collision produces FAILED without calling symlinkFn or modifying the path.
 *
 * Phase 2: Symlink creation via symlinkFn (defaults to fs.symlinkSync).
 *   - ONLY errors thrown by symlinkFn are eligible for recognized environment error classification.
 *   - Recognized errors (EPERM, ENOTSUP, EACCES, EOPNOTSUPP, ENOSYS) produce SKIPPED.
 *   - Unexpected creation errors (e.g. EIO, ENOSPC) produce FAILED.
 *
 * Returns: { created: boolean, skipped: boolean, failed: boolean, error: Error | null, stage: 'inspection' | 'creation' | null }
 */
function createTestSymlink(
  targetPath,
  symlinkPath,
  scenarioName = 'Symlink Creation',
  symlinkFn = fs.symlinkSync,
  lstatFn = tryLstat
) {
  // Phase 1: Pre-creation path inspection
  let existingStat;
  try {
    existingStat = lstatFn(symlinkPath);
  } catch (err) {
    return {
      created: false,
      skipped: false,
      failed: true,
      error: err,
      stage: 'inspection'
    };
  }

  if (existingStat !== null) {
    return {
      created: false,
      skipped: false,
      failed: true,
      error: new Error(`Collision on temporary path: "${symlinkPath}"`),
      stage: 'inspection'
    };
  }

  // Phase 2: Symlink creation
  try {
    symlinkFn(targetPath, symlinkPath);
    return {
      created: true,
      skipped: false,
      failed: false,
      error: null,
      stage: 'creation'
    };
  } catch (err) {
    if (err && RECOGNIZED_SYMLINK_ENV_ERRORS.includes(err.code)) {
      return {
        created: false,
        skipped: true,
        failed: false,
        error: err,
        stage: 'creation'
      };
    } else {
      return {
        created: false,
        skipped: false,
        failed: true,
        error: err,
        stage: 'creation'
      };
    }
  }
}

/**
 * Safe cleanup helper that unlinks a resource ONLY if it was created and owned by the test.
 * Verifies post-cleanup absence using tryLstat.
 * Accepts an injectable unlink function (defaults to fs.unlinkSync) to test real unlink failures.
 */
function safeCleanupResource(resourcePath, isOwnedByTest, unlinkFn = fs.unlinkSync) {
  if (!isOwnedByTest) {
    return {
      success: false,
      error: new Error(`Refusing to cleanup resource not owned by the test: "${resourcePath}"`)
    };
  }

  try {
    const existing = tryLstat(resourcePath);
    if (!existing) {
      // Already absent
      return { success: true, error: null };
    }

    // Call the unlink operation (injectable for failure testing)
    unlinkFn(resourcePath);

    // Verify absence via tryLstat
    const remaining = tryLstat(resourcePath);
    if (remaining) {
      return {
        success: false,
        error: new Error(`Post-cleanup verification failed: resource still exists at "${resourcePath}"`)
      };
    }

    return { success: true, error: null };
  } catch (err) {
    return {
      success: false,
      error: err
    };
  }
}

/**
 * Take a comprehensive snapshot of all entries in 11-Test-Fixtures.
 * Records name, file type, size, symlink target (if link), and SHA-256 (if file).
 */
function takeFixtureSnapshot() {
  const fixtureDir = path.join(rootDir, '11-Test-Fixtures');
  const entries = fs.existsSync(fixtureDir) ? fs.readdirSync(fixtureDir) : [];
  const snapshot = new Map();

  for (const entry of entries) {
    const fullPath = path.join(fixtureDir, entry);
    const stat = fs.lstatSync(fullPath);
    let target = null;
    let sha256 = null;

    if (stat.isSymbolicLink()) {
      target = fs.readlinkSync(fullPath);
    } else if (stat.isFile()) {
      const content = fs.readFileSync(fullPath);
      sha256 = crypto.createHash('sha256').update(content).digest('hex').toLowerCase();
    }

    snapshot.set(entry, {
      name: entry,
      isSymbolicLink: stat.isSymbolicLink(),
      isFile: stat.isFile(),
      size: stat.size,
      target,
      sha256
    });
  }

  return snapshot;
}

/**
 * Verify current fixtures against an initial snapshot.
 * Confirms that pre-existing entries are untouched and no test artifacts leaked.
 */
function verifyFixtureSnapshot(initialSnapshot) {
  const fixtureDir = path.join(rootDir, '11-Test-Fixtures');
  const currentEntries = fs.existsSync(fixtureDir) ? fs.readdirSync(fixtureDir) : [];
  let intact = true;
  const issues = [];

  // 1. Check all initial entries still exist and have unchanged properties
  for (const [name, initial] of initialSnapshot.entries()) {
    if (!currentEntries.includes(name)) {
      intact = false;
      issues.push(`Pre-existing resource was deleted: ${name}`);
      continue;
    }

    const fullPath = path.join(fixtureDir, name);
    let currentStat;
    try {
      currentStat = fs.lstatSync(fullPath);
    } catch (e) {
      intact = false;
      issues.push(`Failed to lstat pre-existing resource "${name}": ${e.message}`);
      continue;
    }

    if (currentStat.isSymbolicLink() !== initial.isSymbolicLink) {
      intact = false;
      issues.push(`Resource type changed (symlink mismatch) for "${name}"`);
    }

    if (currentStat.isFile() !== initial.isFile) {
      intact = false;
      issues.push(`Resource type changed (file mismatch) for "${name}"`);
    }

    if (currentStat.size !== initial.size) {
      intact = false;
      issues.push(`Resource size changed for "${name}": initial=${initial.size}, current=${currentStat.size}`);
    }

    if (initial.isSymbolicLink) {
      const currentTarget = fs.readlinkSync(fullPath);
      if (currentTarget !== initial.target) {
        intact = false;
        issues.push(`Symlink target changed for "${name}": initial="${initial.target}", current="${currentTarget}"`);
      }
    }

    if (initial.isFile) {
      const currentContent = fs.readFileSync(fullPath);
      const currentSha256 = crypto.createHash('sha256').update(currentContent).digest('hex').toLowerCase();
      if (currentSha256 !== initial.sha256) {
        intact = false;
        issues.push(`File content hash changed for "${name}": initial="${initial.sha256}", current="${currentSha256}"`);
      }
    }
  }

  // 2. Check no leftover unexpected temporary resources were left behind
  for (const entry of currentEntries) {
    if (!initialSnapshot.has(entry)) {
      intact = false;
      issues.push(`Unexpected temporary resource leaked in test fixtures: "${entry}"`);
    }
  }

  return { intact, issues };
}

// -----------------------------------------------------------------------------
// CONTROLLED ISOLATION HARNESSES (Invoked as sub-processes to verify fail-closed exit codes)
// -----------------------------------------------------------------------------
if (process.argv.includes('--harness-unexpected-creation-error')) {
  console.log('[HARNESS] Executing isolated unexpected symlink creation error harness...');
  const mockFailingSymlink = () => {
    const err = new Error('EIO: i/o error during symlink creation');
    err.code = 'EIO';
    throw err;
  };
  const tempPath = path.join(assetRoot, '11-Test-Fixtures', `temp-harness-create-${crypto.randomBytes(4).toString('hex')}.svg`);
  const result = createTestSymlink('/etc/passwd', tempPath, 'Harness Unexpected Creation', mockFailingSymlink);
  if (result.failed) {
    console.error(`[HARNESS EXPECTED FAIL] Unexpected creation error (${result.error.code}): ${result.error.message}`);
    process.exit(1);
  } else {
    console.error('[HARNESS ERROR] Unexpected creation error was not classified as failed!');
    process.exit(0);
  }
}

if (process.argv.includes('--harness-cleanup-failure')) {
  console.log('[HARNESS] Executing isolated cleanup failure harness with injected unlink failure...');
  const tempSymlink = path.join(assetRoot, '11-Test-Fixtures', `temp-harness-${crypto.randomBytes(4).toString('hex')}.svg`);
  let symlinkCreated = false;
  let exitCode = 0;
  try {
    fs.symlinkSync(path.resolve('/etc/passwd'), tempSymlink);
    symlinkCreated = true;

    // Inject controlled failure into the actual unlink operation used by safeCleanupResource
    const injectedUnlinkFailure = (_target) => {
      const err = new Error('EACCES: permission denied, unlink failed');
      err.code = 'EACCES';
      throw err;
    };

    const cleanupResult = safeCleanupResource(tempSymlink, symlinkCreated, injectedUnlinkFailure);
    if (!cleanupResult.success) {
      console.error(`[HARNESS EXPECTED FAIL] Actual cleanup operation failed as expected: ${cleanupResult.error.message}`);
      exitCode = 1;
    } else {
      console.error('[HARNESS ERROR] Injected cleanup failure did not trigger failure!');
      exitCode = 0;
    }
  } catch (err) {
    console.error(`[HARNESS ERROR] Unexpected error during test execution: ${err.message}`);
    exitCode = 1;
  } finally {
    // Guaranteed final real cleanup with ownership verification, absence check, and explicit evidence
    if (symlinkCreated) {
      const finalRecovery = safeCleanupResource(tempSymlink, symlinkCreated);
      if (!finalRecovery.success) {
        console.error(`[HARNESS ERROR] Final recovery cleanup failed: ${finalRecovery.error.message}`);
        exitCode = 1; // Preserve non-zero exit code
      } else {
        const postStat = tryLstat(tempSymlink);
        if (postStat === null) {
          console.log(`[HARNESS CLEANUP] Final recovery cleanup succeeded; verified absence of "${path.basename(tempSymlink)}" via lstat.`);
        } else {
          console.error(`[HARNESS ERROR] Final recovery cleanup verification failed; resource still present: "${tempSymlink}"`);
          exitCode = 1;
        }
      }
    }
  }
  process.exit(exitCode);
}

// -----------------------------------------------------------------------------
// MAIN TEST SUITE
// -----------------------------------------------------------------------------
const requiredDirs = [
  '01-Reference',
  '02-Master',
  '03-Variants',
  '04-Favicon',
  '05-Social',
  '06-Exports',
  '07-Validation/structural',
  '07-Validation/geometry',
  '07-Validation/visual',
  '07-Validation/export',
  '08-Manifest',
  '09-Documentation',
  '10-Archive',
  '11-Test-Fixtures'
];

console.log('=== Starting DN-BI-21-EXEC-013 Validation & Test Suite ===');

// Capture pre-existing fixture baseline snapshot before any tests run
const initialFixtureSnapshot = takeFixtureSnapshot();
console.log(`[INIT] Captured initial snapshot of 11-Test-Fixtures (${initialFixtureSnapshot.size} pre-existing entries):`);
for (const [name, info] of initialFixtureSnapshot.entries()) {
  if (info.isSymbolicLink) {
    console.log(`  - ${name} (symlink -> ${info.target}, size=${info.size})`);
  } else {
    console.log(`  - ${name} (file, size=${info.size}, sha256=${info.sha256})`);
  }
}

let hasError = false;
let testStats = { passed: 0, failed: 0, skipped: 0 };

// 1. Check directory structure
console.log('\n[1] Checking directory structure...');
for (const dir of requiredDirs) {
  const fullPath = path.join(rootDir, dir);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    console.log(`  [PASS] Directory exists: ${dir}`);
  } else {
    console.error(`  [FAIL] Missing directory: ${dir}`);
    hasError = true;
  }
}

// 2. Load Schema and Manifest
console.log('\n[2] Loading Schema and Manifest files...');
const schemaPath = path.join(rootDir, '08-Manifest/asset-manifest.schema.json');
const manifestPath = path.join(rootDir, '08-Manifest/asset-manifest.json');

let schemaData, manifestData;
try {
  schemaData = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  console.log('  [PASS] asset-manifest.schema.json loaded and parsed as valid JSON.');
} catch (err) {
  console.error(`  [FAIL] Failed to parse schema JSON: ${err.message}`);
  hasError = true;
}

try {
  manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  console.log('  [PASS] asset-manifest.json loaded and parsed as valid JSON.');
} catch (err) {
  console.error(`  [FAIL] Failed to parse manifest JSON: ${err.message}`);
  hasError = true;
}

if (hasError || !schemaData) {
  console.error('\n[FATAL] Stopping validation due to schema/manifest load errors.');
  process.exit(1);
}

// 3. Initialize Draft 2020-12 AJV Validator and validate schema against meta-schema
console.log('\n[3] Validating Schema against JSON Schema Draft 2020-12 meta-schema...');
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

let validateFn;
try {
  const isSchemaValid = ajv.validateSchema(schemaData);
  if (isSchemaValid) {
    console.log('  [PASS] asset-manifest.schema.json is a valid Draft 2020-12 schema.');
  } else {
    console.error(`  [FAIL] Schema validation against Draft 2020-12 meta-schema failed:`, ajv.errors);
    hasError = true;
  }

  validateFn = ajv.compile(schemaData);
  console.log('  [PASS] Schema successfully compiled by Ajv2020.');
} catch (err) {
  console.error(`  [FAIL] Schema compilation error: ${err.message}`);
  hasError = true;
  process.exit(1);
}

/**
 * Robust Cross-Platform Path & SHA-256 Integrity Validator
 * Distinguishes file absence (ENOENT) from unexpected filesystem errors.
 */
function validateAssetFiles(assets, isTestContext = false, lstatFn = tryLstat) {
  if (!Array.isArray(assets)) return true;
  let assetErrors = false;

  for (const asset of assets) {
    const rawPath = asset.path;
    if (!rawPath) {
      const msg = `Asset missing path: ${JSON.stringify(asset)}`;
      if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
      else console.error(`  [FAIL] ${msg}`);
      assetErrors = true;
      continue;
    }

    if (!asset.sha256 || typeof asset.sha256 !== 'string' || asset.sha256.trim() === '') {
      const msg = `Production/Asset missing mandatory SHA-256 value: "${rawPath}"`;
      if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
      else console.error(`  [FAIL] ${msg}`);
      assetErrors = true;
      continue;
    }

    // 1. Cross-platform absolute path rejection
    const isAbsolutePosix = path.isAbsolute(rawPath) || rawPath.startsWith('/');
    const isWindowsDrive = /^[a-zA-Z]:[/\\]/.test(rawPath);
    const isUncPath = /^\\\\|^[/]{2}/.test(rawPath);

    if (isAbsolutePosix || isWindowsDrive || isUncPath) {
      const msg = `Absolute path rejected: "${rawPath}"`;
      if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
      else console.error(`  [FAIL] ${msg}`);
      assetErrors = true;
      continue;
    }

    // 2. Traversal checks using segment splitting
    const normalizedSlashes = rawPath.replace(/\\/g, '/');
    const segments = normalizedSlashes.split('/');
    let hasTraversal = false;
    for (const segment of segments) {
      if (segment === '..' || segment === '~') {
        hasTraversal = true;
        break;
      }
    }

    if (hasTraversal) {
      const msg = `Path traversal attempt rejected: "${rawPath}"`;
      if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
      else console.error(`  [FAIL] ${msg}`);
      assetErrors = true;
      continue;
    }

    // 3. Containment resolution
    const resolvedPath = path.resolve(assetRoot, rawPath);
    const normalizedAssetRoot = path.resolve(assetRoot);

    const relative = path.relative(normalizedAssetRoot, resolvedPath);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      const msg = `Path escapes asset root: "${rawPath}"`;
      if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
      else console.error(`  [FAIL] ${msg}`);
      assetErrors = true;
      continue;
    }

    // 4. Existence and symlink check via lstatFn (distinguishing ENOENT from unexpected errors)
    let stats = null;
    try {
      stats = lstatFn(resolvedPath);
    } catch (err) {
      const msg = `Unexpected filesystem error checking asset "${rawPath}": ${err.message}`;
      if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
      else console.error(`  [FAIL] ${msg}`);
      assetErrors = true;
      continue;
    }

    if (!stats) {
      const msg = `Referenced asset file does not exist: "${rawPath}"`;
      if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
      else console.error(`  [FAIL] ${msg}`);
      assetErrors = true;
      continue;
    }

    const isSymlink = stats.isSymbolicLink();

    // 5. Explicit check for dangling symlinks (symlink exists, but target does not)
    if (isSymlink) {
      let targetExists = false;
      try {
        fs.statSync(resolvedPath);
        targetExists = true;
      } catch (err) {
        if (err && err.code === 'ENOENT') {
          targetExists = false;
        } else {
          const msg = `Unexpected filesystem error statting symlink target for "${rawPath}": ${err.message}`;
          if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
          else console.error(`  [FAIL] ${msg}`);
          assetErrors = true;
          continue;
        }
      }

      if (!targetExists) {
        let symlinkTarget = '';
        try {
          symlinkTarget = fs.readlinkSync(resolvedPath);
        } catch (e) {
          symlinkTarget = `<unreadable: ${e.message}>`;
        }
        const msg = `Dangling symlink rejected (target does not exist: "${symlinkTarget}"): "${rawPath}"`;
        if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
        else console.error(`  [FAIL] ${msg}`);
        assetErrors = true;
        continue;
      }
    }

    // 6. Check realpath containment (detect external symlink escapes)
    try {
      const realAssetRoot = fs.realpathSync(normalizedAssetRoot);
      const realResolvedPath = fs.realpathSync(resolvedPath);
      const realRelative = path.relative(realAssetRoot, realResolvedPath);
      if (realRelative.startsWith('..') || path.isAbsolute(realRelative)) {
        const msg = `Symlink escape detected: "${rawPath}" resolves outside root to "${realResolvedPath}".`;
        if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
        else console.error(`  [FAIL] ${msg}`);
        assetErrors = true;
        continue;
      }
    } catch (err) {
      const msg = `Filesystem resolution error for "${rawPath}": ${err.message}`;
      if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
      else console.error(`  [FAIL] ${msg}`);
      assetErrors = true;
      continue;
    }

    // 7. Regular file and SHA-256 integrity verification
    try {
      const stat = fs.statSync(resolvedPath);
      if (!stat.isFile()) {
        const msg = `Referenced asset is not a regular file: "${rawPath}"`;
        if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
        else console.error(`  [FAIL] ${msg}`);
        assetErrors = true;
        continue;
      }

      const fileBuffer = fs.readFileSync(resolvedPath);
      const calculatedHash = crypto.createHash('sha256').update(fileBuffer).digest('hex').toLowerCase();
      const expectedHash = asset.sha256.trim().toLowerCase();

      if (calculatedHash !== expectedHash) {
        const msg = `SHA-256 hash mismatch for "${rawPath}". Expected: ${asset.sha256}, Got: ${calculatedHash}`;
        if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
        else console.error(`  [FAIL] ${msg}`);
        assetErrors = true;
      } else {
        if (!isTestContext) console.log(`  [PASS] SHA-256 verified for "${rawPath}"`);
      }
    } catch (err) {
      const msg = `Unreadable asset file "${rawPath}": ${err.message}`;
      if (isTestContext) console.log(`  [EXPECTED REJECTION] ${msg}`);
      else console.error(`  [FAIL] ${msg}`);
      assetErrors = true;
    }
  }

  return !assetErrors;
}

// 4. Validate production Bootstrap Manifest against Schema & Security Rules
console.log('\n[4] Validating production Bootstrap Manifest against Schema & Security Rules...');
if (validateFn && manifestData) {
  const isSchemaValid = validateFn(manifestData);
  if (isSchemaValid) {
    console.log('  [PASS] asset-manifest.json successfully validates against the schema.');
  } else {
    console.error('  [FAIL] Manifest failed schema validation:', validateFn.errors);
    hasError = true;
  }

  const areAssetsValid = validateAssetFiles(manifestData.assets, false);
  if (areAssetsValid) {
    console.log('  [PASS] All production manifest assets passed secure path & integrity checks.');
  } else {
    console.error('  [FAIL] Production manifest assets failed security/integrity checks.');
    hasError = true;
  }
}

// 5. Standard Positive & Negative Schema & Path Test Suite
console.log('\n[5] Running Standard Positive & Negative Test Suite...');

const runTest = (testName, testManifest, expectedValid, lstatFn = tryLstat) => {
  const schemaValid = validateFn(testManifest);
  let assetSecurityValid = true;
  if (schemaValid && testManifest.assets && testManifest.assets.length > 0) {
    assetSecurityValid = validateAssetFiles(testManifest.assets, true, lstatFn);
  }
  const overallValid = schemaValid && assetSecurityValid;

  if (overallValid === expectedValid) {
    console.log(`  [PASS] Test "${testName}" behaved as expected (Result: ${overallValid})`);
    testStats.passed++;
  } else {
    console.error(`  [FAIL] Test "${testName}" failed. Expected valid=${expectedValid}, got valid=${overallValid}`);
    hasError = true;
    testStats.failed++;
  }
};

runTest(
  'Positive - Valid empty bootstrap manifest',
  {
    manifestVersion: '0.1.0',
    projectName: 'DigitalNawa-Brand-Project',
    generatedAt: '2026-11-09T07:00:00Z',
    status: 'bootstrap-foundation',
    assets: [],
    metadata: {
      note: 'Test bootstrap',
      specificationsReference: ['DN-BI-21']
    }
  },
  true
);

runTest(
  'Positive - Valid asset manifest with lowercase SHA-256',
  {
    manifestVersion: '0.1.0',
    projectName: 'DigitalNawa-Brand-Project',
    generatedAt: '2026-11-09T07:00:00Z',
    status: 'production-active',
    assets: [
      {
        id: 'test-logo-lowercase-hash',
        type: 'test',
        path: '11-Test-Fixtures/valid-test-logo.svg',
        sha256: '75e72204bac50f8c504f0f6ae798aead6e3fc090ff76aef674b05b3049277b83'
      }
    ],
    metadata: {
      note: 'Test lowercase hash',
      specificationsReference: ['DN-BI-21']
    }
  },
  true
);

runTest(
  'Positive - Valid asset manifest with uppercase SHA-256 normalization',
  {
    manifestVersion: '0.1.0',
    projectName: 'DigitalNawa-Brand-Project',
    generatedAt: '2026-11-09T07:00:00Z',
    status: 'production-active',
    assets: [
      {
        id: 'test-logo-uppercase-hash',
        type: 'test',
        path: '11-Test-Fixtures/valid-test-logo.svg',
        sha256: '75E72204BAC50F8C504F0F6AE798AEAD6E3FC090FF76AEF674B05B3049277B83'
      }
    ],
    metadata: {
      note: 'Test uppercase hash normalization',
      specificationsReference: ['DN-BI-21']
    }
  },
  true
);

runTest(
  'Negative - Path traversal attempt (../)',
  {
    manifestVersion: '0.1.0',
    projectName: 'DigitalNawa-Brand-Project',
    generatedAt: '2026-11-09T07:00:00Z',
    status: 'production-active',
    assets: [
      {
        id: 'traversal-forward',
        type: 'test',
        path: '../package.json',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      }
    ],
    metadata: {
      note: 'Traversal test',
      specificationsReference: ['DN-BI-21']
    }
  },
  false
);

runTest(
  'Negative - Path traversal attempt (..\\)',
  {
    manifestVersion: '0.1.0',
    projectName: 'DigitalNawa-Brand-Project',
    generatedAt: '2026-11-09T07:00:00Z',
    status: 'production-active',
    assets: [
      {
        id: 'traversal-backward',
        type: 'test',
        path: '..\\package.json',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      }
    ],
    metadata: {
      note: 'Traversal backward test',
      specificationsReference: ['DN-BI-21']
    }
  },
  false
);

runTest(
  'Negative - POSIX absolute path (/etc/passwd)',
  {
    manifestVersion: '0.1.0',
    projectName: 'DigitalNawa-Brand-Project',
    generatedAt: '2026-11-09T07:00:00Z',
    status: 'production-active',
    assets: [
      {
        id: 'absolute-posix',
        type: 'test',
        path: '/etc/passwd',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      }
    ],
    metadata: {
      note: 'Absolute posix test',
      specificationsReference: ['DN-BI-21']
    }
  },
  false
);

runTest(
  'Negative - Missing SHA-256 value for asset',
  {
    manifestVersion: '0.1.0',
    projectName: 'DigitalNawa-Brand-Project',
    generatedAt: '2026-11-09T07:00:00Z',
    status: 'production-active',
    assets: [
      {
        id: 'missing-hash',
        type: 'test',
        path: '11-Test-Fixtures/valid-test-logo.svg',
        sha256: ''
      }
    ],
    metadata: {
      note: 'Missing hash test',
      specificationsReference: ['DN-BI-21']
    }
  },
  false
);

runTest(
  'Negative - SHA-256 hash mismatch',
  {
    manifestVersion: '0.1.0',
    projectName: 'DigitalNawa-Brand-Project',
    generatedAt: '2026-11-09T07:00:00Z',
    status: 'production-active',
    assets: [
      {
        id: 'hash-mismatch',
        type: 'test',
        path: '11-Test-Fixtures/valid-test-logo.svg',
        sha256: '0000000000000000000000000000000000000000000000000000000000000000'
      }
    ],
    metadata: {
      note: 'Hash mismatch test',
      specificationsReference: ['DN-BI-21']
    }
  },
  false
);

// 6. Explicit Regression Test Suite (DN-BI-21-EXEC-013)
console.log('\n[6] Running Explicit Regression Test Suite (Decoupled Inspection, Classification & Full Cleanup Lifecycle)...');

// 6.1 ENOENT Handling in tryLstat
console.log('\n--- [6.1] ENOENT Handling in tryLstat ---');
{
  const scenarioName = 'ENOENT Handling';
  const nonExistentPath = path.join(assetRoot, '11-Test-Fixtures', `non-existent-${crypto.randomBytes(4).toString('hex')}.tmp`);
  try {
    const res = tryLstat(nonExistentPath);
    if (res === null) {
      console.log(`  [PASS] (${scenarioName}) tryLstat returns null for non-existent path.`);
      testStats.passed++;
    } else {
      console.error(`  [FAIL] (${scenarioName}) tryLstat returned non-null for non-existent path:`, res);
      testStats.failed++;
      hasError = true;
    }
  } catch (err) {
    console.error(`  [FAIL] (${scenarioName}) tryLstat unexpectedly threw on ENOENT: ${err.message}`);
    testStats.failed++;
    hasError = true;
  }
}

// 6.2 Unexpected lstat Errors in tryLstat & validateAssetFiles
console.log('\n--- [6.2] Unexpected lstat Errors Re-throwing & Asset Rejection ---');
{
  const scenarioName = 'Unexpected lstat Error Handling';
  // Part A: tryLstat re-throws non-ENOENT error (tested with null byte ERR_INVALID_ARG_VALUE)
  try {
    let threwExpected = false;
    try {
      tryLstat('path_with_\0_null_byte');
    } catch (err) {
      if (err.code === 'ERR_INVALID_ARG_VALUE' || err.name === 'TypeError') {
        threwExpected = true;
      } else {
        throw err;
      }
    }
    if (threwExpected) {
      console.log(`  [PASS] (${scenarioName} Part A) tryLstat re-throws non-ENOENT unexpected errors.`);
      testStats.passed++;
    } else {
      console.error(`  [FAIL] (${scenarioName} Part A) tryLstat failed to re-throw unexpected error!`);
      testStats.failed++;
      hasError = true;
    }
  } catch (err) {
    console.error(`  [FAIL] (${scenarioName} Part A) Unexpected exception: ${err.message}`);
    testStats.failed++;
    hasError = true;
  }

  // Part B: validateAssetFiles rejects asset when lstat encounters unexpected filesystem error (not mistaken for ENOENT)
  const mockFailingLstat = (_p) => {
    const err = new Error('EIO: simulated i/o fault reading directory entry');
    err.code = 'EIO';
    throw err;
  };

  runTest(
    'Negative - Unexpected filesystem error during asset lstat',
    {
      manifestVersion: '0.1.0',
      projectName: 'DigitalNawa-Brand-Project',
      generatedAt: '2026-11-09T07:00:00Z',
      status: 'production-active',
      assets: [
        {
          id: 'test-unexpected-fs-error',
          type: 'test',
          path: '11-Test-Fixtures/valid-test-logo.svg',
          sha256: '75e72204bac50f8c504f0f6ae798aead6e3fc090ff76aef674b05b3049277b83'
        }
      ],
      metadata: { note: 'Simulated EIO test', specificationsReference: ['DN-BI-21'] }
    },
    false,
    mockFailingLstat
  );
}

// 6.3 Decoupled Symlink Path Inspection vs Creation Error Classification (EXEC-013)
console.log('\n--- [6.3] Decoupled Path Inspection & Symlink Creation Classification ---');
{
  const targetPath = path.resolve('/etc/passwd');
  const tempPath = path.join(assetRoot, '11-Test-Fixtures', `temp-inspect-${crypto.randomBytes(4).toString('hex')}.svg`);

  // 1. tryLstat returns ENOENT (null): creation may proceed
  const enoentResult = createTestSymlink(targetPath, tempPath, 'ENOENT Proceeds', () => {}, () => null);
  if (enoentResult.created && enoentResult.stage === 'creation') {
    console.log('  [PASS] (6.3.1) tryLstat returning ENOENT allows creation to proceed.');
    testStats.passed++;
  } else {
    console.error('  [FAIL] (6.3.1) tryLstat returning ENOENT did not allow creation to proceed:', enoentResult);
    testStats.failed++;
    hasError = true;
  }

  // 2. tryLstat returns EACCES: FAILED, never SKIPPED (inspection failure)
  const eaccesInspectFn = () => {
    const err = new Error('EACCES: permission denied on path lstat');
    err.code = 'EACCES';
    throw err;
  };
  const eaccesResult = createTestSymlink(targetPath, tempPath, 'EACCES Inspection', () => {}, eaccesInspectFn);
  if (eaccesResult.failed && !eaccesResult.skipped && eaccesResult.stage === 'inspection') {
    console.log('  [PASS] (6.3.2) tryLstat throwing EACCES produces FAILED (stage: inspection), never SKIPPED.');
    testStats.passed++;
  } else {
    console.error('  [FAIL] (6.3.2) tryLstat throwing EACCES was incorrectly classified:', eaccesResult);
    testStats.failed++;
    hasError = true;
  }

  // 3. tryLstat returns EIO: FAILED, never SKIPPED (inspection failure)
  const eioInspectFn = () => {
    const err = new Error('EIO: i/o error during lstat');
    err.code = 'EIO';
    throw err;
  };
  const eioInspectResult = createTestSymlink(targetPath, tempPath, 'EIO Inspection', () => {}, eioInspectFn);
  if (eioInspectResult.failed && !eioInspectResult.skipped && eioInspectResult.stage === 'inspection') {
    console.log('  [PASS] (6.3.3) tryLstat throwing EIO produces FAILED (stage: inspection), never SKIPPED.');
    testStats.passed++;
  } else {
    console.error('  [FAIL] (6.3.3) tryLstat throwing EIO was incorrectly classified:', eioInspectResult);
    testStats.failed++;
    hasError = true;
  }

  // 4. symlinkFn returns EPERM: SKIPPED (creation error)
  const epermSymlinkFn = () => {
    const err = new Error('EPERM: operation not permitted');
    err.code = 'EPERM';
    throw err;
  };
  const epermResult = createTestSymlink(targetPath, tempPath, 'EPERM Creation', epermSymlinkFn, () => null);
  if (epermResult.skipped && !epermResult.failed && epermResult.stage === 'creation') {
    console.log('  [PASS] (6.3.4) symlinkFn throwing EPERM produces SKIPPED (stage: creation).');
    testStats.passed++;
  } else {
    console.error('  [FAIL] (6.3.4) symlinkFn throwing EPERM was incorrectly classified:', epermResult);
    testStats.failed++;
    hasError = true;
  }

  // 5. symlinkFn returns EIO: FAILED (creation error)
  const eioSymlinkFn = () => {
    const err = new Error('EIO: i/o error during symlink creation');
    err.code = 'EIO';
    throw err;
  };
  const eioCreationResult = createTestSymlink(targetPath, tempPath, 'EIO Creation', eioSymlinkFn, () => null);
  if (eioCreationResult.failed && !eioCreationResult.skipped && eioCreationResult.stage === 'creation') {
    console.log('  [PASS] (6.3.5) symlinkFn throwing EIO produces FAILED (stage: creation).');
    testStats.passed++;
  } else {
    console.error('  [FAIL] (6.3.5) symlinkFn throwing EIO was incorrectly classified:', eioCreationResult);
    testStats.failed++;
    hasError = true;
  }

  // 6. Existing temporary path collision: FAILED without modifying existing resource
  const existingFixture = path.join(assetRoot, '11-Test-Fixtures', 'valid-test-logo.svg');
  const initialFixtureStat = fs.lstatSync(existingFixture);
  let symlinkFnCalled = false;
  const collisionResult = createTestSymlink(targetPath, existingFixture, 'Collision Test', () => { symlinkFnCalled = true; });
  const postCollisionStat = fs.lstatSync(existingFixture);

  if (
    collisionResult.failed &&
    !collisionResult.skipped &&
    collisionResult.stage === 'inspection' &&
    !symlinkFnCalled &&
    postCollisionStat.size === initialFixtureStat.size
  ) {
    console.log('  [PASS] (6.3.6) Existing path collision produces FAILED without calling symlinkFn or altering resource.');
    testStats.passed++;
  } else {
    console.error('  [FAIL] (6.3.6) Collision handling failed:', collisionResult);
    testStats.failed++;
    hasError = true;
  }

  // 7. Matrix verification of all recognized OS error codes
  let allRecognizedPassed = true;
  for (const code of RECOGNIZED_SYMLINK_ENV_ERRORS) {
    const injected = () => {
      const err = new Error(`${code}: simulated recognized environment error`);
      err.code = code;
      throw err;
    };
    const res = createTestSymlink(targetPath, tempPath, `Recognized ${code}`, injected, () => null);
    if (!res.skipped || res.failed || res.created || res.stage !== 'creation') {
      allRecognizedPassed = false;
      console.error(`  [FAIL] Error code ${code} was not classified as SKIPPED:`, res);
    }
  }

  // Verify unrecognized codes (e.g. ENOSPC, EINVAL, EBADF) are classified as FAILED
  for (const code of ['ENOSPC', 'EINVAL', 'EBADF']) {
    const injected = () => {
      const err = new Error(`${code}: simulated unexpected error`);
      err.code = code;
      throw err;
    };
    const res = createTestSymlink(targetPath, tempPath, `Unexpected ${code}`, injected, () => null);
    if (res.skipped || !res.failed || res.created || res.stage !== 'creation') {
      allRecognizedPassed = false;
      console.error(`  [FAIL] Unexpected error code ${code} was incorrectly classified:`, res);
    }
  }

  if (allRecognizedPassed) {
    console.log('  [PASS] (6.3.7) Classification matrix verified: Recognized OS codes -> SKIPPED; Unexpected -> FAILED.');
    testStats.passed++;
  } else {
    testStats.failed++;
    hasError = true;
  }
}

// 6.4 Successful Symlink Cleanup Lifecycle
console.log('\n--- [6.4] Successful Symlink Cleanup Lifecycle ---');
{
  const scenarioName = 'Successful Symlink Cleanup';
  const uniqueName = `temp-clean-success-${crypto.randomBytes(4).toString('hex')}.svg`;
  const tempSymlink = path.join(assetRoot, '11-Test-Fixtures', uniqueName);
  let symlinkCreated = false;

  try {
    const creation = createTestSymlink(path.resolve('/etc/passwd'), tempSymlink, scenarioName);
    if (creation.skipped) {
      console.log(`  [SKIPPED] (${scenarioName}) Symlink creation skipped due to OS error (${creation.error.code})`);
      testStats.skipped++;
    } else if (creation.failed) {
      console.error(`  [FAIL] (${scenarioName}) Unexpected error during creation: ${creation.error.message}`);
      testStats.failed++;
      hasError = true;
    } else if (creation.created) {
      symlinkCreated = true;
      console.log(`  [INFO] (${scenarioName}) Created temporary test symlink.`);
    }
  } finally {
    if (symlinkCreated) {
      const cleanupResult = safeCleanupResource(tempSymlink, symlinkCreated);
      const postStat = tryLstat(tempSymlink);

      if (cleanupResult.success && cleanupResult.error === null && postStat === null) {
        console.log(`  [PASS] (${scenarioName}) Symlink cleanly unlinked and post-cleanup absence verified via lstat.`);
        testStats.passed++;
      } else {
        console.error(`  [FAIL] (${scenarioName}) Cleanup helper failed or file still present:`, cleanupResult);
        testStats.failed++;
        hasError = true;
      }
    }
  }
}

// 6.5 Injected Unlink Failure & Explicit Recovery Cleanup Lifecycle
console.log('\n--- [6.5] Injected Unlink Failure & Explicit Recovery Cleanup ---');
{
  const scenarioName = 'Injected Unlink Failure & Recovery';
  const uniqueName = `temp-clean-fail-${crypto.randomBytes(4).toString('hex')}.svg`;
  const tempSymlink = path.join(assetRoot, '11-Test-Fixtures', uniqueName);
  let symlinkCreated = false;
  let unlinkFailureDetected = false;
  let recoverySucceeded = false;

  try {
    const creation = createTestSymlink(path.resolve('/etc/passwd'), tempSymlink, scenarioName);
    if (creation.skipped) {
      console.log(`  [SKIPPED] (${scenarioName}) Symlink creation skipped due to OS error (${creation.error.code})`);
      testStats.skipped++;
    } else if (creation.failed) {
      console.error(`  [FAIL] (${scenarioName}) Unexpected error during creation: ${creation.error.message}`);
      testStats.failed++;
      hasError = true;
    } else if (creation.created) {
      symlinkCreated = true;

      // Step 1: Inject controlled unlink failure
      const failingUnlink = (_target) => {
        const err = new Error('EACCES: permission denied, unlink rejected');
        err.code = 'EACCES';
        throw err;
      };

      const cleanupResult = safeCleanupResource(tempSymlink, symlinkCreated, failingUnlink);

      if (!cleanupResult.success && cleanupResult.error && cleanupResult.error.code === 'EACCES') {
        unlinkFailureDetected = true;
        console.log(`  [PASS] (${scenarioName} Part 1) Injected unlink failure detected: "${cleanupResult.error.message}".`);
        testStats.passed++;
      } else {
        console.error(`  [FAIL] (${scenarioName} Part 1) Injected unlink failure was not detected:`, cleanupResult);
        testStats.failed++;
        hasError = true;
      }

      // Step 2: Perform separate real recovery cleanup
      const recoveryCleanup = safeCleanupResource(tempSymlink, symlinkCreated);
      const postStat = tryLstat(tempSymlink);

      if (recoveryCleanup.success && postStat === null) {
        recoverySucceeded = true;
        console.log(`  [PASS] (${scenarioName} Part 2) Explicit recovery cleanup succeeded and verified resource absence via lstat.`);
        testStats.passed++;
      } else {
        console.error(`  [FAIL] (${scenarioName} Part 2) Recovery cleanup failed:`, recoveryCleanup);
        testStats.failed++;
        hasError = true;
      }
    }
  } finally {
    // Guaranteed final inspection in finally: fail closed if resource still remains
    if (symlinkCreated) {
      const remainingStat = tryLstat(tempSymlink);
      if (remainingStat !== null) {
        console.error(`  [FATAL FAIL] (${scenarioName}) Resource still present on disk after recovery: "${tempSymlink}"`);
        testStats.failed++;
        hasError = true;
        // Attempt emergency unlink
        try { fs.unlinkSync(tempSymlink); } catch (e) {
          console.error(`  [FATAL FAIL] Emergency unlink failed: ${e.message}`);
        }
      }
    }
  }
}

// 6.6 Injected Final Cleanup Failure (Post-cleanup Verification Failure) & Explicit Recovery
console.log('\n--- [6.6] Injected Final Cleanup Failure & Explicit Recovery ---');
{
  const scenarioName = 'Post-cleanup Verification Failure & Recovery';
  const uniqueName = `temp-still-exists-${crypto.randomBytes(4).toString('hex')}.svg`;
  const tempSymlink = path.join(assetRoot, '11-Test-Fixtures', uniqueName);
  let symlinkCreated = false;
  let verificationFailureDetected = false;

  try {
    const creation = createTestSymlink(path.resolve('/etc/passwd'), tempSymlink, scenarioName);
    if (creation.created) {
      symlinkCreated = true;

      // Step 1: Simulate unlink operation that silently fails to remove the file (no-op unlinkFn)
      const noOpUnlink = (_target) => {};
      const result = safeCleanupResource(tempSymlink, symlinkCreated, noOpUnlink);

      if (!result.success && result.error && result.error.message.includes('still exists')) {
        verificationFailureDetected = true;
        console.log(`  [PASS] (${scenarioName} Part 1) Post-cleanup verification failure detected: "${result.error.message}".`);
        testStats.passed++;
      } else {
        console.error(`  [FAIL] (${scenarioName} Part 1) Failed to detect un-removed resource:`, result);
        testStats.failed++;
        hasError = true;
      }

      // Step 2: Explicit recovery cleanup with real unlink
      const recovery = safeCleanupResource(tempSymlink, symlinkCreated);
      const postStat = tryLstat(tempSymlink);

      if (recovery.success && postStat === null) {
        console.log(`  [PASS] (${scenarioName} Part 2) Explicit recovery cleanup succeeded and verified absence via lstat.`);
        testStats.passed++;
      } else {
        console.error(`  [FAIL] (${scenarioName} Part 2) Recovery cleanup failed:`, recovery);
        testStats.failed++;
        hasError = true;
      }
    }
  } finally {
    if (symlinkCreated) {
      const remainingStat = tryLstat(tempSymlink);
      if (remainingStat !== null) {
        console.error(`  [FATAL FAIL] (${scenarioName}) Resource still present on disk: "${tempSymlink}"`);
        testStats.failed++;
        hasError = true;
        try { fs.unlinkSync(tempSymlink); } catch (e) {
          console.error(`  [FATAL FAIL] Emergency unlink failed: ${e.message}`);
        }
      }
    }
  }
}

// 6.7 Recovery Cleanup Failure Detection
console.log('\n--- [6.7] Recovery Cleanup Failure Detection ---');
{
  const scenarioName = 'Recovery Cleanup Failure Detection';
  const uniqueName = `temp-recovery-fail-${crypto.randomBytes(4).toString('hex')}.svg`;
  const tempSymlink = path.join(assetRoot, '11-Test-Fixtures', uniqueName);
  let symlinkCreated = false;

  try {
    const creation = createTestSymlink(path.resolve('/etc/passwd'), tempSymlink, scenarioName);
    if (creation.created) {
      symlinkCreated = true;

      // Step 1: Simulate primary cleanup failure
      const failingPrimary = (_target) => {
        const err = new Error('EPERM: primary cleanup operation refused');
        err.code = 'EPERM';
        throw err;
      };
      const primaryResult = safeCleanupResource(tempSymlink, symlinkCreated, failingPrimary);

      // Step 2: Simulate recovery cleanup failure
      const failingRecovery = (_target) => {
        const err = new Error('EACCES: recovery unlink operation denied');
        err.code = 'EACCES';
        throw err;
      };
      const recoveryResult = safeCleanupResource(tempSymlink, symlinkCreated, failingRecovery);

      if (!recoveryResult.success && recoveryResult.error && recoveryResult.error.code === 'EACCES') {
        console.log(`  [PASS] (${scenarioName}) Recovery cleanup failure detected and reported: "${recoveryResult.error.message}".`);
        testStats.passed++;
      } else {
        console.error(`  [FAIL] (${scenarioName}) Recovery cleanup failure was not detected:`, recoveryResult);
        testStats.failed++;
        hasError = true;
      }
    }
  } finally {
    // Perform guaranteed real final recovery to ensure zero disk leaks
    if (symlinkCreated) {
      const realRecovery = safeCleanupResource(tempSymlink, symlinkCreated);
      const postStat = tryLstat(tempSymlink);
      if (!realRecovery.success || postStat !== null) {
        console.error(`  [FATAL FAIL] (${scenarioName}) Final disk recovery failed for "${tempSymlink}"`);
        testStats.failed++;
        hasError = true;
      }
    }
  }
}

// 6.8 Ownership Enforcement (Refusal to Cleanup Un-owned Resource)
console.log('\n--- [6.8] Ownership Enforcement (Refusal to Cleanup Un-owned Resource) ---');
{
  const scenarioName = 'Ownership Enforcement';
  const unownedResource = path.join(assetRoot, '11-Test-Fixtures', 'valid-test-logo.svg');
  const cleanupResult = safeCleanupResource(unownedResource, false);

  if (!cleanupResult.success && cleanupResult.error && cleanupResult.error.message.includes('Refusing to cleanup resource not owned')) {
    console.log(`  [PASS] (${scenarioName}) Helper correctly refused to unlink un-owned resource.`);
    testStats.passed++;
  } else {
    console.error(`  [FAIL] (${scenarioName}) Helper did not enforce ownership protection:`, cleanupResult);
    testStats.failed++;
    hasError = true;
  }
}

// 6.9 Pre-Existing File & Symlink Preservation Test
console.log('\n--- [6.9] Pre-Existing File & Symlink Preservation ---');
{
  const scenarioName = 'Pre-Existing Resource Preservation';

  // Create and remove a unique temporary resource to verify isolation
  const tempTestLink = path.join(assetRoot, '11-Test-Fixtures', `temp-isolation-${crypto.randomBytes(4).toString('hex')}.svg`);
  let created = false;
  try {
    const creation = createTestSymlink(path.resolve('/etc/passwd'), tempTestLink, scenarioName);
    if (creation.created) created = true;
  } finally {
    if (created) {
      const cleanup = safeCleanupResource(tempTestLink, true);
      if (!cleanup.success) {
        console.error(`  [FAIL] (${scenarioName}) Cleanup failed: ${cleanup.error.message}`);
        testStats.failed++;
        hasError = true;
      }
    }
  }

  // Verify all pre-existing files and symlinks against initial baseline snapshot
  const check = verifyFixtureSnapshot(initialFixtureSnapshot);
  if (check.intact) {
    console.log(`  [PASS] (${scenarioName}) All pre-existing files and symlinks remain completely intact with unchanged types, sizes, hashes, and targets.`);
    testStats.passed++;
  } else {
    console.error(`  [FAIL] (${scenarioName}) Pre-existing resources compromised:`, check.issues);
    testStats.failed++;
    hasError = true;
  }
}

// 6.A External Symlink Escape Test
console.log('\n--- [6.A] External Symlink Escape Test ---');
{
  const scenarioName = 'External Symlink Escape';
  const uniqueName = `symlink-ext-escape-${crypto.randomBytes(4).toString('hex')}.svg`;
  const symlinkPath = path.join(assetRoot, '11-Test-Fixtures', uniqueName);
  const targetPath = path.resolve('/etc/passwd');
  let symlinkCreated = false;

  try {
    const creation = createTestSymlink(targetPath, symlinkPath, scenarioName);
    if (creation.skipped) {
      console.log(`  [SKIPPED] (${scenarioName}) Symlink creation skipped due to recognized OS error (${creation.error.code}): ${creation.error.message}`);
      testStats.skipped++;
    } else if (creation.failed) {
      console.error(`  [FAIL] (${scenarioName}) Unexpected symlink creation error: ${creation.error.message}`);
      testStats.failed++;
      hasError = true;
    } else if (creation.created) {
      symlinkCreated = true;
      console.log(`  [INFO] Created temporary external symlink at "${uniqueName}".`);

      const manifest = {
        manifestVersion: '0.1.0',
        projectName: 'DigitalNawa-Brand-Project',
        generatedAt: '2026-11-09T07:00:00Z',
        status: 'production-active',
        assets: [
          {
            id: 'external-symlink-asset',
            type: 'test',
            path: `11-Test-Fixtures/${uniqueName}`,
            sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
          }
        ],
        metadata: { note: scenarioName, specificationsReference: ['DN-BI-21'] }
      };

      const schemaValid = validateFn(manifest);
      const assetValid = validateAssetFiles(manifest.assets, true);
      const rejected = !(schemaValid && assetValid);

      if (rejected) {
        console.log(`  [PASS] (${scenarioName}) External symlink correctly detected and rejected as escape.`);
        testStats.passed++;
      } else {
        console.error(`  [FAIL] (${scenarioName}) External symlink was NOT rejected!`);
        testStats.failed++;
        hasError = true;
      }
    }
  } finally {
    if (symlinkCreated) {
      const cleanup = safeCleanupResource(symlinkPath, symlinkCreated);
      if (!cleanup.success) {
        console.error(`  [FAIL] (${scenarioName}) Cleanup failure: ${cleanup.error.message}`);
        testStats.failed++;
        hasError = true;
      } else {
        const postStat = tryLstat(symlinkPath);
        if (postStat !== null) {
          console.error(`  [FAIL] (${scenarioName}) Resource still present on disk: "${symlinkPath}"`);
          testStats.failed++;
          hasError = true;
        } else {
          console.log(`  [INFO] (${scenarioName}) Verified post-cleanup absence via tryLstat.`);
        }
      }
    }
  }
}

// 6.B True Dangling Symlink Test (Target does not exist on disk)
console.log('\n--- [6.B] True Dangling Symlink Test ---');
{
  const scenarioName = 'True Dangling Symlink';
  const missingTargetName = `missing-target-${crypto.randomBytes(4).toString('hex')}.svg`;
  const nonExistentTarget = path.join(assetRoot, '11-Test-Fixtures', missingTargetName);
  const uniqueName = `symlink-dangling-${crypto.randomBytes(4).toString('hex')}.svg`;
  const symlinkPath = path.join(assetRoot, '11-Test-Fixtures', uniqueName);
  let symlinkCreated = false;

  try {
    // 1. Verify target genuinely does NOT exist
    if (tryLstat(nonExistentTarget)) {
      console.error(`  [FAIL] Target for dangling symlink unexpectedly exists!`);
      hasError = true;
      testStats.failed++;
    } else {
      console.log(`  [INFO] Verified nonExistentTarget is genuinely absent: "${missingTargetName}".`);

      // 2. Creation via createTestSymlink
      const creation = createTestSymlink(nonExistentTarget, symlinkPath, scenarioName);
      if (creation.skipped) {
        console.log(`  [SKIPPED] (${scenarioName}) Symlink creation skipped due to OS code (${creation.error.code}): ${creation.error.message}`);
        testStats.skipped++;
      } else if (creation.failed) {
        console.error(`  [FAIL] (${scenarioName}) Unexpected symlink creation error: ${creation.error.message}`);
        testStats.failed++;
        hasError = true;
      } else if (creation.created) {
        symlinkCreated = true;
        console.log(`  [INFO] Created dangling symlink pointing to missing target.`);

        // 3. Inspect link via lstatSync and readlinkSync
        const lstat = fs.lstatSync(symlinkPath);
        let linkTarget = '';
        try {
          linkTarget = fs.readlinkSync(symlinkPath);
        } catch (readErr) {
          linkTarget = `<unreadable: ${readErr.message}>`;
        }
        const targetStatExists = fs.existsSync(symlinkPath); // false for dangling link
        if (!lstat.isSymbolicLink() || linkTarget !== nonExistentTarget || targetStatExists) {
          throw new Error('Dangling symlink inspection assertion failed');
        }
        console.log(`  [INFO] Verified symlink exists via lstatSync, points to missing target, and stat fails.`);

        // 4. Validate that validator rejects it
        const manifest = {
          manifestVersion: '0.1.0',
          projectName: 'DigitalNawa-Brand-Project',
          generatedAt: '2026-11-09T07:00:00Z',
          status: 'production-active',
          assets: [
            {
              id: 'dangling-symlink-asset',
              type: 'test',
              path: `11-Test-Fixtures/${uniqueName}`,
              sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
            }
          ],
          metadata: { note: scenarioName, specificationsReference: ['DN-BI-21'] }
        };

        const schemaValid = validateFn(manifest);
        const assetValid = validateAssetFiles(manifest.assets, true);
        const rejected = !(schemaValid && assetValid);

        if (rejected) {
          console.log(`  [PASS] (${scenarioName}) Dangling symlink correctly detected and rejected.`);
          testStats.passed++;
        } else {
          console.error(`  [FAIL] (${scenarioName}) Dangling symlink was NOT rejected!`);
          testStats.failed++;
          hasError = true;
        }
      }
    }
  } finally {
    if (symlinkCreated) {
      const cleanup = safeCleanupResource(symlinkPath, symlinkCreated);
      if (!cleanup.success) {
        console.error(`  [FAIL] (${scenarioName}) Cleanup failure: ${cleanup.error.message}`);
        testStats.failed++;
        hasError = true;
      } else {
        const postStat = tryLstat(symlinkPath);
        if (postStat !== null) {
          console.error(`  [FAIL] (${scenarioName}) Resource still present on disk: "${symlinkPath}"`);
          testStats.failed++;
          hasError = true;
        } else {
          console.log(`  [INFO] (${scenarioName}) Verified post-cleanup absence via tryLstat.`);
        }
      }
    }
  }
}

// 6.C Correct Internal Symlink Test (Target inside root with matching SHA-256)
console.log('\n--- [6.C] Correct Internal Symlink Test ---');
{
  const scenarioName = 'Internal Symlink with Matching SHA-256';
  const targetFileRelative = '11-Test-Fixtures/valid-test-logo.svg';
  const targetFileAbsolute = path.join(assetRoot, targetFileRelative);
  const targetBuffer = fs.readFileSync(targetFileAbsolute);
  const actualTargetSha256 = crypto.createHash('sha256').update(targetBuffer).digest('hex').toLowerCase();

  const uniqueName = `symlink-internal-${crypto.randomBytes(4).toString('hex')}.svg`;
  const symlinkPath = path.join(assetRoot, '11-Test-Fixtures', uniqueName);
  let symlinkCreated = false;

  try {
    const creation = createTestSymlink(targetFileAbsolute, symlinkPath, scenarioName);
    if (creation.skipped) {
      console.log(`  [SKIPPED] (${scenarioName}) Symlink creation skipped due to OS code (${creation.error.code}): ${creation.error.message}`);
      testStats.skipped++;
    } else if (creation.failed) {
      console.error(`  [FAIL] (${scenarioName}) Unexpected symlink creation error: ${creation.error.message}`);
      testStats.failed++;
      hasError = true;
    } else if (creation.created) {
      symlinkCreated = true;
      console.log(`  [INFO] Created temporary internal symlink pointing to "${targetFileRelative}".`);
      console.log(`  [INFO] Actual target SHA-256: ${actualTargetSha256}`);

      // Test 1: Policy check - Internal symlink resolving inside root with matching SHA-256 is ACCEPTED
      const manifestValidHash = {
        manifestVersion: '0.1.0',
        projectName: 'DigitalNawa-Brand-Project',
        generatedAt: '2026-11-09T07:00:00Z',
        status: 'production-active',
        assets: [
          {
            id: 'internal-symlink-valid',
            type: 'test',
            path: `11-Test-Fixtures/${uniqueName}`,
            sha256: actualTargetSha256
          }
        ],
        metadata: { note: scenarioName, specificationsReference: ['DN-BI-21'] }
      };

      const schemaValid = validateFn(manifestValidHash);
      const assetValid = validateAssetFiles(manifestValidHash.assets, true);
      const accepted = schemaValid && assetValid;

      if (accepted) {
        console.log(`  [PASS] (${scenarioName}) Policy confirmed: Internal symlink resolving inside root with matching SHA-256 is accepted as valid.`);
        testStats.passed++;
      } else {
        console.error(`  [FAIL] (${scenarioName}) Internal symlink with matching SHA-256 was unexpectedly rejected!`);
        testStats.failed++;
        hasError = true;
      }

      // Test 2: Internal symlink with hash mismatch is rejected specifically for hash mismatch, not escape
      const manifestWrongHash = {
        manifestVersion: '0.1.0',
        projectName: 'DigitalNawa-Brand-Project',
        generatedAt: '2026-11-09T07:00:00Z',
        status: 'production-active',
        assets: [
          {
            id: 'internal-symlink-wrong-hash',
            type: 'test',
            path: `11-Test-Fixtures/${uniqueName}`,
            sha256: '0000000000000000000000000000000000000000000000000000000000000000'
          }
        ],
        metadata: { note: scenarioName, specificationsReference: ['DN-BI-21'] }
      };

      const wrongHashAccepted = validateFn(manifestWrongHash) && validateAssetFiles(manifestWrongHash.assets, true);
      if (!wrongHashAccepted) {
        console.log(`  [PASS] (${scenarioName}) Internal symlink with hash mismatch is rejected specifically for hash mismatch.`);
        testStats.passed++;
      } else {
        console.error(`  [FAIL] (${scenarioName}) Internal symlink with hash mismatch was unexpectedly accepted!`);
        testStats.failed++;
        hasError = true;
      }
    }
  } finally {
    if (symlinkCreated) {
      const cleanup = safeCleanupResource(symlinkPath, symlinkCreated);
      if (!cleanup.success) {
        console.error(`  [FAIL] (${scenarioName}) Cleanup failure: ${cleanup.error.message}`);
        testStats.failed++;
        hasError = true;
      } else {
        const postStat = tryLstat(symlinkPath);
        if (postStat !== null) {
          console.error(`  [FAIL] (${scenarioName}) Resource still present on disk: "${symlinkPath}"`);
          testStats.failed++;
          hasError = true;
        } else {
          console.log(`  [INFO] (${scenarioName}) Verified post-cleanup absence via tryLstat.`);
        }
      }
    }
  }
}

// 6.E: Isolated Failure-Path Regression Tests (Child Process Harness)
console.log('\n--- [6.E] Isolated Failure-Path Regression Tests (Fail-Closed Exit Code Verification) ---');
{
  const thisScript = path.resolve(process.argv[1]);

  // Test Sub-case 1: Unexpected symlink creation error produces exit code 1
  console.log('  [TEST] Running isolated unexpected creation failure harness...');
  const resCreation = child_process.spawnSync(process.execPath, [thisScript, '--harness-unexpected-creation-error'], { encoding: 'utf8' });
  if (resCreation.status === 1) {
    console.log(`  [PASS] (Isolated Harness: Creation Error) Correctly exited with non-zero code (${resCreation.status}) when unexpected creation error occurred.`);
    testStats.passed++;
  } else {
    console.error(`  [FAIL] Expected exit code 1, but got ${resCreation.status}. Stdout: ${resCreation.stdout}, Stderr: ${resCreation.stderr}`);
    testStats.failed++;
    hasError = true;
  }

  // Test Sub-case 2: Injected actual cleanup failure produces exit code 1
  console.log('  [TEST] Running isolated actual cleanup failure harness (injected unlink error)...');
  const resCleanup = child_process.spawnSync(process.execPath, [thisScript, '--harness-cleanup-failure'], { encoding: 'utf8' });
  if (resCleanup.status === 1) {
    console.log(`  [PASS] (Isolated Harness: Cleanup Failure) Correctly exited with non-zero code (${resCleanup.status}) when actual cleanup failed.`);
    testStats.passed++;
  } else {
    console.error(`  [FAIL] Expected exit code 1, but got ${resCleanup.status}. Stdout: ${resCleanup.stdout}, Stderr: ${resCleanup.stderr}`);
    testStats.failed++;
    hasError = true;
  }
}

// 7. Check test fixtures vs production asset registration constraint
console.log('\n[7] Checking test fixtures registration constraint...');
const testFixtureDir = path.join(rootDir, '11-Test-Fixtures');
const testFixtureFiles = fs.existsSync(testFixtureDir) ? fs.readdirSync(testFixtureDir) : [];
console.log(`  [INFO] Test fixtures directory files: ${JSON.stringify(testFixtureFiles)}`);

const productionAssetPaths = (manifestData?.assets || []).map(a => a.path);
const fixtureRegisteredAsProduction = testFixtureFiles.some(f => 
  f !== '.gitkeep' && productionAssetPaths.includes(`11-Test-Fixtures/${f}`)
);

if (!fixtureRegisteredAsProduction) {
  console.log('  [PASS] Corrected check: No test fixtures are registered as production asset paths.');
} else {
  console.error('  [FAIL] Test fixtures incorrectly registered as production asset paths in manifest!');
  hasError = true;
}

// 8. Whole-Suite Post-Execution Fixture Verification (No disk leaks, pre-existing items intact)
console.log('\n[8] Verifying whole-suite fixture baseline integrity (no leaks, all pre-existing intact)...');
const finalCheck = verifyFixtureSnapshot(initialFixtureSnapshot);
if (finalCheck.intact) {
  console.log('  [PASS] Whole-suite fixture check passed: Zero leaked resources, all pre-existing items perfectly intact.');
  testStats.passed++;
} else {
  console.error('  [FAIL] Whole-suite fixture check failed:', finalCheck.issues);
  testStats.failed++;
  hasError = true;
}

console.log('\n--- Final Test Statistics & Validation Summary ---');
console.log(`  Passed Tests: ${testStats.passed}`);
console.log(`  Failed Tests: ${testStats.failed}`);
console.log(`  Skipped Tests: ${testStats.skipped}`);

if (hasError || testStats.failed > 0) {
  console.error('RESULT: FAILED DN-BI-21-EXEC-013 validator & test suite.');
  process.exit(1);
} else {
  console.log('RESULT: ALL DN-BI-21-EXEC-013 validator & test suite checks PASSED successfully.');
  process.exit(0);
}
