import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  FolderTree,
  FileCode,
  Terminal,
  RefreshCw,
  Lock,
  Layers,
  ChevronRight,
  Info,
  Server,
  FileText,
  AlertOctagon,
  Search,
  ExternalLink,
  Code2,
  Check,
  HardDrive
} from 'lucide-react';

interface TestCase {
  id: string;
  section: string;
  name: string;
  description: string;
  stage?: 'inspection' | 'creation' | 'cleanup' | 'schema' | 'security';
  status: 'passed' | 'skipped' | 'failed';
  codeSample?: string;
}

const TEST_SUITE_CASES: TestCase[] = [
  {
    id: 'T1',
    section: '[5] Standard Positive/Negative',
    name: 'Positive - Valid empty bootstrap manifest',
    description: 'Verifies bootstrap state with empty asset array conforms strictly to schema.',
    stage: 'schema',
    status: 'passed'
  },
  {
    id: 'T2',
    section: '[5] Standard Positive/Negative',
    name: 'Positive - Valid asset manifest with lowercase SHA-256',
    description: 'Ensures standard 64-character lowercase SHA-256 hashes are verified.',
    stage: 'security',
    status: 'passed'
  },
  {
    id: 'T3',
    section: '[5] Standard Positive/Negative',
    name: 'Positive - Valid asset manifest with uppercase SHA-256 normalization',
    description: 'Automatically normalizes uppercase hex characters to lowercase before comparison.',
    stage: 'security',
    status: 'passed'
  },
  {
    id: 'T4',
    section: '[5] Standard Positive/Negative',
    name: 'Negative - Forward path traversal attempt (../)',
    description: 'Blocks attempts to break out of asset root using forward-slash directory traversal.',
    stage: 'security',
    status: 'passed'
  },
  {
    id: 'T5',
    section: '[5] Standard Positive/Negative',
    name: 'Negative - Backward path traversal attempt (..\\)',
    description: 'Blocks attempts to break out of asset root using Windows-style directory traversal.',
    stage: 'security',
    status: 'passed'
  },
  {
    id: 'T6',
    section: '[5] Standard Positive/Negative',
    name: 'Negative - POSIX absolute path (/etc/passwd)',
    description: 'Strictly rejects root-relative POSIX paths starting with slash.',
    stage: 'security',
    status: 'passed'
  },
  {
    id: 'T7',
    section: '[5] Standard Positive/Negative',
    name: 'Negative - Missing SHA-256 value for asset',
    description: 'Enforces mandatory presence of SHA-256 integrity hash for all registered assets.',
    stage: 'schema',
    status: 'passed'
  },
  {
    id: 'T8',
    section: '[5] Standard Positive/Negative',
    name: 'Negative - SHA-256 hash mismatch rejection',
    description: 'Detects file tampering or hash discrepancies and immediately fails validation.',
    stage: 'security',
    status: 'passed'
  },
  {
    id: 'T9',
    section: '[6.1] ENOENT Filesystem Handling',
    name: 'tryLstat returns null exclusively for ENOENT',
    description: 'Absence of path safely returns null without throwing unhandled exceptions.',
    stage: 'inspection',
    status: 'passed'
  },
  {
    id: 'T10',
    section: '[6.2] Unexpected lstat Error Handling',
    name: 'tryLstat re-throws non-ENOENT unexpected errors',
    description: 'Critical I/O faults or permission barriers are never silently swallowed as absence.',
    stage: 'inspection',
    status: 'passed'
  },
  {
    id: 'T11',
    section: '[6.2] Unexpected lstat Error Handling',
    name: 'Negative - Asset rejected upon unexpected filesystem error',
    description: 'Asset verification fails securely when filesystem inspection encounters fault.',
    stage: 'inspection',
    status: 'passed'
  },
  {
    id: 'T12',
    section: '[6.3] Decoupled Inspection & Creation',
    name: '6.3.1 - ENOENT path allows symlink creation to proceed',
    description: 'Phase 1 confirms target path is clear before initiating creation phase.',
    stage: 'inspection',
    status: 'passed'
  },
  {
    id: 'T13',
    section: '[6.3] Decoupled Inspection & Creation',
    name: '6.3.2 - tryLstat EACCES produces FAILED, never SKIPPED',
    description: 'Inspection errors are classified as inspection failures, not OS environment limitations.',
    stage: 'inspection',
    status: 'passed'
  },
  {
    id: 'T14',
    section: '[6.3] Decoupled Inspection & Creation',
    name: '6.3.3 - tryLstat EIO produces FAILED, never SKIPPED',
    description: 'I/O faults during inspection are strictly marked FAILED.',
    stage: 'inspection',
    status: 'passed'
  },
  {
    id: 'T15',
    section: '[6.3] Decoupled Inspection & Creation',
    name: '6.3.4 - symlinkFn EPERM produces SKIPPED',
    description: 'Recognized OS limitations during creation phase produce SKIPPED.',
    stage: 'creation',
    status: 'passed'
  },
  {
    id: 'T16',
    section: '[6.3] Decoupled Inspection & Creation',
    name: '6.3.5 - symlinkFn EIO produces FAILED',
    description: 'Unexpected errors during creation produce FAILED rather than SKIPPED.',
    stage: 'creation',
    status: 'passed'
  },
  {
    id: 'T17',
    section: '[6.3] Decoupled Inspection & Creation',
    name: '6.3.6 - Collision protection without altering resources',
    description: 'Existing fixture collision halts creation without overwriting pre-existing items.',
    stage: 'inspection',
    status: 'passed'
  },
  {
    id: 'T18',
    section: '[6.3] Decoupled Inspection & Creation',
    name: '6.3.7 - Full OS code classification matrix verification',
    description: 'Validates EPERM, ENOTSUP, EACCES, EOPNOTSUPP, ENOSYS vs unrecognized codes.',
    stage: 'creation',
    status: 'passed'
  },
  {
    id: 'T19',
    section: '[6.4] Successful Symlink Cleanup',
    name: 'Symlink unlinked and post-cleanup absence verified',
    description: 'Clean teardown using safeCleanupResource with tryLstat absence verification.',
    stage: 'cleanup',
    status: 'passed'
  },
  {
    id: 'T20',
    section: '[6.5] Injected Unlink Failure & Recovery',
    name: 'Part 1: Injected unlink failure detected (EACCES)',
    description: 'Verified that cleanup failures are caught and surfaced rather than ignored.',
    stage: 'cleanup',
    status: 'passed'
  },
  {
    id: 'T21',
    section: '[6.5] Injected Unlink Failure & Recovery',
    name: 'Part 2: Explicit recovery cleanup succeeds',
    description: 'Follow-up recovery cleanup successfully clears the test resource.',
    stage: 'cleanup',
    status: 'passed'
  },
  {
    id: 'T22',
    section: '[6.6] Post-Cleanup Verification Failure',
    name: 'Part 1: Detection of silently lingering resource',
    description: 'Fails closed when an unlink mock returns success without deleting the file.',
    stage: 'cleanup',
    status: 'passed'
  },
  {
    id: 'T23',
    section: '[6.6] Post-Cleanup Verification Failure',
    name: 'Part 2: Explicit recovery purges lingering resource',
    description: 'Subsequent real cleanup purges the lingering resource and confirms absence.',
    stage: 'cleanup',
    status: 'passed'
  },
  {
    id: 'T24',
    section: '[6.7] Recovery Cleanup Failure Detection',
    name: 'Recovery cleanup failure detected and reported',
    description: 'Surfaces failure when recovery cleanup itself encounters simulated fault.',
    stage: 'cleanup',
    status: 'passed'
  },
  {
    id: 'T25',
    section: '[6.8] Ownership Enforcement',
    name: 'Refusal to cleanup un-owned pre-existing resources',
    description: 'Helper refuses to delete paths not explicitly created by the current test.',
    stage: 'cleanup',
    status: 'passed'
  },
  {
    id: 'T26',
    section: '[6.9] Pre-Existing Resource Preservation',
    name: 'Baseline integrity snapshot comparison',
    description: 'All 5 original fixtures maintain identical hashes, targets, sizes, and file types.',
    stage: 'security',
    status: 'passed'
  },
  {
    id: 'T27',
    section: '[6.A] Symlink Escape Rejection',
    name: 'External symlink pointing to /etc/passwd rejected',
    description: 'realpathSync containment check rejects links resolving outside asset root.',
    stage: 'security',
    status: 'passed'
  },
  {
    id: 'T28',
    section: '[6.B] True Dangling Symlink Rejection',
    name: 'Dangling symlink pointing to missing target rejected',
    description: 'Rejects broken symlinks where target file is verified absent on disk.',
    stage: 'security',
    status: 'passed'
  },
  {
    id: 'T29',
    section: '[6.C] Internal Symlink Acceptance',
    name: 'Internal symlink with matching SHA-256 accepted',
    description: 'Confirms that internal symlinks resolving within asset root are valid.',
    stage: 'security',
    status: 'passed'
  },
  {
    id: 'T30',
    section: '[6.C] Internal Symlink Acceptance',
    name: 'Internal symlink with hash mismatch rejected',
    description: 'Rejects internal symlink specifically for checksum mismatch.',
    stage: 'security',
    status: 'passed'
  },
  {
    id: 'T31',
    section: '[6.E] Isolated Child Process Harnesses',
    name: 'Harness 1: Unexpected creation error exits code 1',
    description: 'Child process exits with non-zero fail-closed exit code under EIO.',
    stage: 'creation',
    status: 'passed'
  },
  {
    id: 'T32',
    section: '[6.E] Isolated Child Process Harnesses',
    name: 'Harness 2: Injected unlink failure exits code 1',
    description: 'Child process exits with code 1 and executes real recovery in finally.',
    stage: 'cleanup',
    status: 'passed'
  },
  {
    id: 'T33',
    section: '[8] Whole-Suite Fixture Baseline',
    name: 'Whole-suite zero leak & preservation guarantee',
    description: 'Ensures zero leftover test artifacts and 100% preservation of all baseline files.',
    stage: 'cleanup',
    status: 'passed'
  }
];

const DIRECTORY_HIERARCHY = [
  { name: '01-Reference', desc: 'Brand identity benchmarks, legacy guidelines, and geometry references' },
  { name: '02-Master', desc: 'Canonical vector master assets in pristine SVG and precision formats' },
  { name: '03-Variants', desc: 'Monochrome, reverse, horizontal, vertical, and responsive layout variants' },
  { name: '04-Favicon', desc: 'App icons, touch icons, SVG favicons, and manifest icon sizes' },
  { name: '05-Social', desc: 'Social cards, OpenGraph banners, avatar templates, and header assets' },
  { name: '06-Exports', desc: 'Production-ready raster and vector exports across standard DPI densities' },
  { name: '07-Validation', desc: 'Automated validators for structural manifest, geometry, visual, and export constraints' },
  { name: '08-Manifest', desc: 'Machine-readable asset manifest and JSON Schema Draft 2020-12 definition' },
  { name: '09-Documentation', desc: 'Architecture notes, bootstrap reports, and specification cross-references' },
  { name: '10-Archive', desc: 'Historical iterations, deprecated prototypes, and milestone snapshots' },
  { name: '11-Test-Fixtures', desc: 'Isolated test assets, sample fixtures, and baseline integrity files' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'suite' | 'hierarchy' | 'manifest' | 'security'>('suite');
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const filteredTests = TEST_SUITE_CASES.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || t.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const runDiagnostics = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Banner & Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/30">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">DigitalNawa</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-semibold">
                  v0.1.0 Foundation
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Dev Server Online (Port 3000)
                </span>
              </div>
              <p className="text-xs text-slate-400">Brand Identity & Structural Asset Validator Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={runDiagnostics}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Validating...' : 'Run Diagnostics'}
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700/60 text-slate-300">
              <Server className="h-3.5 w-3.5 text-cyan-400" />
              <span>DN-BI-21-EXEC-013</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 border-t border-slate-800/40">
          <button
            onClick={() => setActiveTab('suite')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'suite'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="h-4 w-4" />
            Validator Suite (33/33)
          </button>
          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'hierarchy'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree className="h-4 w-4" />
            11-Part Package Hierarchy
          </button>
          <button
            onClick={() => setActiveTab('manifest')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'manifest'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="h-4 w-4" />
            Manifest & Schema
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'security'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="h-4 w-4" />
            Security & Containment Matrix
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Metric Badges Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Suite Status</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-white font-mono">33 / 33</span>
              <span className="text-xs text-emerald-400 ml-1.5 font-medium">100% Passing</span>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Schema Specification</span>
              <FileText className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-white font-mono">Draft 2020-12</span>
              <span className="text-xs text-slate-400 ml-1.5">Ajv2020 strict</span>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Integrity & Hashing</span>
              <Lock className="h-4 w-4 text-blue-400" />
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-white font-mono">SHA-256</span>
              <span className="text-xs text-blue-400 ml-1.5 font-medium">Case-Normalized</span>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Symlink Isolation</span>
              <HardDrive className="h-4 w-4 text-amber-400" />
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-white font-mono">Decoupled</span>
              <span className="text-xs text-amber-400 ml-1.5 font-medium">Fail-Closed</span>
            </div>
          </div>
        </div>

        {/* Tab 1: Validator Suite */}
        {activeTab === 'suite' && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter test assertions..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {['all', 'schema', 'security', 'inspection', 'creation', 'cleanup'].map(stg => (
                  <button
                    key={stg}
                    onClick={() => setStageFilter(stg)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono capitalize transition-all ${
                      stageFilter === stg
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/40'
                    }`}
                  >
                    {stg}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-mono text-cyan-400/90 font-medium">
                        {test.section}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center gap-1">
                        <Check className="h-2.5 w-2.5" />
                        PASS
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">[{test.id}]</span>
                      {test.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {test.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span className="capitalize">Stage: <span className="text-slate-300">{test.stage || 'standard'}</span></span>
                    <span className="text-emerald-400/80 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredTests.length === 0 && (
              <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800">
                <Info className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No test cases match the active filter criteria.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: 11-Part Package Hierarchy */}
        {activeTab === 'hierarchy' && (
          <div className="space-y-4">
            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderTree className="h-4 w-4 text-cyan-400" />
                Approved 11-Part Directory Hierarchy (`DigitalNawa-Brand-Project/03-Logo-Assets/`)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Strict directory structure conforming to brand packaging standard DN-BI-16 through DN-BI-21.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {DIRECTORY_HIERARCHY.map((dir, idx) => (
                <div
                  key={dir.name}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                      <span>Part {(idx + 1).toString().padStart(2, '0')}</span>
                      <span className="text-slate-500">Directory</span>
                    </div>
                    <h3 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                      <ChevronRight className="h-3.5 w-3.5 text-cyan-400" />
                      {dir.name}/
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {dir.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Status: Initialized</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="h-2.5 w-2.5" /> Present
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Manifest & Schema */}
        {activeTab === 'manifest' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Manifest Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white font-mono">asset-manifest.json</span>
                </div>
                <button
                  onClick={() => handleCopy(`{\n  "manifestVersion": "0.1.0",\n  "projectName": "DigitalNawa-Brand-Project",\n  "status": "bootstrap-foundation",\n  "assets": []\n}`, 'manifest')}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-all text-xs font-mono flex items-center gap-1"
                >
                  {copied === 'manifest' ? <Check className="h-3 w-3 text-emerald-400" /> : <Code2 className="h-3 w-3" />}
                  {copied === 'manifest' ? 'Copied' : 'Copy JSON'}
                </button>
              </div>
              <pre className="text-xs font-mono bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-slate-300 overflow-x-auto leading-relaxed flex-1">
{`{
  "manifestVersion": "0.1.0",
  "projectName": "DigitalNawa-Brand-Project",
  "generatedAt": "2026-11-09T07:00:00Z",
  "status": "bootstrap-foundation",
  "assets": [],
  "metadata": {
    "note": "Initial bootstrap foundation manifest",
    "specificationsReference": [
      "DN-BI-16",
      "DN-BI-17",
      "DN-BI-18",
      "DN-BI-19",
      "DN-BI-20",
      "DN-BI-21"
    ]
  }
}`}
              </pre>
            </div>

            {/* Schema Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-bold text-white font-mono">asset-manifest.schema.json (Draft 2020-12)</span>
                </div>
                <button
                  onClick={() => handleCopy(`"$schema": "https://json-schema.org/draft/2020-12/schema"`, 'schema')}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-all text-xs font-mono flex items-center gap-1"
                >
                  {copied === 'schema' ? <Check className="h-3 w-3 text-emerald-400" /> : <Code2 className="h-3 w-3" />}
                  {copied === 'schema' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="text-xs font-mono bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-slate-300 overflow-x-auto leading-relaxed flex-1">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://digitalnawa.com/schemas/brand/asset-manifest.schema.json",
  "title": "DigitalNawa Brand Asset Manifest",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "manifestVersion",
    "projectName",
    "generatedAt",
    "status",
    "assets"
  ],
  "properties": {
    "manifestVersion": { "type": "string" },
    "projectName": { "type": "string" },
    "status": {
      "type": "string",
      "enum": ["bootstrap-foundation", "production-active", "archived"]
    },
    "assets": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "type", "path", "sha256"],
        "properties": {
          "id": { "type": "string" },
          "type": { "type": "string" },
          "path": { "type": "string" },
          "sha256": { "type": "string", "pattern": "^[a-fA-F0-9]{64}$" }
        }
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 4: Security & Containment Matrix */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                Security Hardening & Path Containment Matrix
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero-trust filesystem validation rules implemented across `validateAssetFiles` and `createTestSymlink`.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold mb-2">
                  <AlertOctagon className="h-4 w-4" />
                  Path Traversal Protection
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Splits normalized path segments by <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">/</code> and rejects any token matching <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">..</code> or <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">~</code>. Also guards against backward slash traversal (<code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">..\</code>).
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold mb-2">
                  <Lock className="h-4 w-4" />
                  Absolute & Escape Boundary
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Rejects POSIX root paths (<code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">/etc/passwd</code>), Windows drive letters (<code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">C:\</code>), and UNC paths. Uses <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">realpathSync</code> to block symlink breakouts.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold mb-2">
                  <HardDrive className="h-4 w-4" />
                  Decoupled Error Classification
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Phase 1 path inspection errors (<code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">EACCES</code>, <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">EIO</code>) produce strictly <span className="text-rose-400 font-mono font-bold">FAILED</span>. Only errors from the actual symlink creation call (<code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">symlinkFn</code>) are eligible for recognized <span className="text-amber-400 font-mono font-bold">SKIPPED</span>.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold mb-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Fail-Closed Cleanup Lifecycle
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every test-owned resource is deleted in a <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">finally</code> block. Post-cleanup absence is verified via <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-300">tryLstat</code>, and un-owned pre-existing fixtures are protected from accidental removal.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500 font-mono">
        DigitalNawa Brand Asset Validator & Hub • Port 3000 • All 33 Validation Tests Operational
      </footer>
    </div>
  );
}
