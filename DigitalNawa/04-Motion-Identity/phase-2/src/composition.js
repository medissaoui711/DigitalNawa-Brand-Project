(() => {
  const tokens = window.DN_MOTION_TOKENS;
  if (!tokens) throw new Error("DN_MOTION_TOKENS missing; run npm run prepare:assets.");
  if (!window.gsap || !window.CustomEase) throw new Error("GSAP/CustomEase missing; run npm install.");
  const groups = tokens.tokens;
  const value = (group, key) => groups[group][key].value;
  const root = document.querySelector("[data-composition-id]");
  if (!root) throw new Error("HyperFrames composition root missing.");
  const id = root.dataset.compositionId;
  const width = Number(root.dataset.width);
  const height = Number(root.dataset.height);
  const fps = value("motion", "frameRate");
  const duration = value("motion", "durationSeconds");
  const logo = document.getElementById("dn-symbol");
  const arabic = document.getElementById("arabic-name");
  const english = document.getElementById("english-name");
  const tagline = document.getElementById("tagline");
  const stage = document.getElementById("stage");
  const pixelLayer = document.getElementById("pixel-layer");

  arabic.textContent = value("identity", "arabicName");
  english.textContent = value("identity", "englishName");
  tagline.setAttribute("aria-label", value("identity", "tagline"));
  const words = value("identity", "tagline").trim().split(/\s+/);
  const wordEls = words.map((word, index) => {
    const el = document.createElement("span");
    el.className = "tagline-word";
    el.id = `tagline-word-${index}`;
    el.textContent = word;
    tagline.appendChild(el);
    return el;
  });

  const color = (key) => value("color", key);
  const layout = (key) => value("layout", key);
  const motion = (key) => value("motion", key);
  const css = (key, v) => document.documentElement.style.setProperty(`--dn-${key}`, v);
  css("motion-bg", color("motionBackground"));
  css("ivory", color("warmIvory"));
  css("teal", color("mutedTeal"));
  css("orange", color("warmOrange"));
  css("latin-font", JSON.stringify(value("typography", "latinUi")));
  css("arabic-font", JSON.stringify(value("typography", "arabicUi")));
  css("wordmark-width", `${layout("wordmarkWidthRatio") * 100}%`);
  css("arabic-top", `${layout("arabicNameTopPercent")}%`);
  css("english-top", `${layout("englishNameTopPercent")}%`);
  css("tagline-top", `${layout("taglineTopPercent")}%`);
  css("arabic-size", `min(${layout("arabicFontSizeVwPercent")}vw, ${layout("arabicFontSizeMaxPx")}px)`);
  css("english-size", `min(${layout("englishFontSizeVwPercent")}vw, ${layout("englishFontSizeMaxPx")}px)`);
  css("tagline-size", `min(${layout("taglineFontSizeVwPercent")}vw, ${layout("taglineFontSizeMaxPx")}px)`);
  css("arabic-weight", String(layout("arabicFontWeight")));
  css("english-weight", String(layout("englishFontWeight")));
  css("tagline-weight", String(layout("taglineFontWeight")));
  css("arabic-line-height", String(layout("arabicLineHeight")));
  css("latin-letter-spacing", `${layout("latinLetterSpacingEm")}em`);
  css("tagline-gap", `${layout("taglineGapEm")}em`);
  css("particle-radius", `${layout("particleCornerRadiusPx")}px`);

  const symbolDesignWidth = value("identity", "logoDesignWidth");
  const symbolDesignHeight = value("identity", "logoDesignHeight");
  const symbolAspect = symbolDesignWidth / symbolDesignHeight;
  const symbolWidth = Math.min(width * layout("symbolWidthViewportRatio"), height * layout("symbolHeightViewportRatio"));
  const symbolHeight = symbolWidth / symbolAspect;
  const centerX = width / 2;
  const centerY = height * layout(height > width ? "symbolCenterYPortraitRatio" : "symbolCenterYLandscapeRatio");
  const designScale = symbolWidth / symbolDesignWidth;
  const count = motion("pixelCount");
  const particleSize = motion("pixelUnitSizeDesignUnits") * designScale;
  const riseOffset = motion("pixelRiseOffsetDesignUnits") * designScale;
  const easingToken = motion("easing");
  const bezier = easingToken.match(/^cubic-bezier\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^\)]+)\)$/);
  if (!bezier) throw new Error(`Unsupported easing token: ${easingToken}`);
  gsap.registerPlugin(CustomEase);
  const ease = CustomEase.create("dn-motion-ease", `M0,0 C${bezier[1]},${bezier[2]} ${bezier[3]},${bezier[4]} 1,1`);

  stage.style.width = `${width}px`;
  stage.style.height = `${height}px`;
  const cols = motion("particleGridColumns");
  const rows = Math.ceil(count / cols);
  const fieldWidth = symbolWidth * motion("particleGridWidthRatio");
  const fieldHeight = symbolHeight * motion("particleGridHeightRatio");
  const startX = centerX - fieldWidth / 2;
  const startY = centerY - fieldHeight / 2;
  const particles = [];
  for (let i = 0; i < count; i += 1) {
    const el = document.createElement("span");
    el.className = "particle";
    el.id = `particle-${String(i).padStart(2, "0")}`;
    el.style.width = `${particleSize}px`;
    el.style.height = `${particleSize}px`;
    el.style.backgroundColor = i % 2 === 0 ? color("mutedTeal") : color("warmOrange");
    pixelLayer.appendChild(el);
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + (col + 0.5) * fieldWidth / cols;
    const y = startY + (row + 0.5) * fieldHeight / rows;
    gsap.set(el, { x: x - centerX, y: y - centerY - riseOffset, opacity: 0, scale: motion("particleInitialScale") });
    particles.push({ el, x: x - centerX, y: y - centerY, index: i });
  }
  gsap.set(logo, { width: symbolWidth, height: symbolHeight, x: centerX - symbolWidth / 2, y: centerY - symbolHeight / 2, opacity: 0 });
  gsap.set([arabic, english, tagline], { opacity: 0 });

  const tl = gsap.timeline({ paused: true });
  const riseStart = motion("riseStartSeconds");
  const riseEnd = motion("riseEndSeconds");
  const assemblyStart = motion("assemblyStartSeconds");
  const assemblyEnd = motion("assemblyEndSeconds");
  if (motion("arabicEnglishTransition") !== "crossfade") throw new Error("Only the token-approved shaping-safe crossfade is supported.");
  const dualStart = motion("dualRevealStartSeconds");
  const dualEnd = motion("dualRevealEndSeconds");
  const sloganStart = motion("sloganStartSeconds");
  const sloganEnd = motion("sloganEndSeconds");
  const fadeStart = motion("finalFadeStartSeconds");

  // Center-out sequencing makes the 24 transition particles read as one deliberate formation.
  // Stable tie-breakers keep the order deterministic across repeated renders.
  const riseSequence = [...particles].sort((a, b) => {
    const centerCol = (cols - 1) / 2;
    const centerRow = (rows - 1) / 2;
    const aCol = a.index % cols;
    const aRow = Math.floor(a.index / cols);
    const bCol = b.index % cols;
    const bRow = Math.floor(b.index / cols);
    const aDistance = Math.hypot(aCol - centerCol, aRow - centerRow);
    const bDistance = Math.hypot(bCol - centerCol, bRow - centerRow);
    return aDistance - bDistance || aRow - bRow || aCol - bCol;
  });
  riseSequence.forEach(({ el, x, y }, sequenceIndex) => {
    tl.to(el, {
      x, y, opacity: 1,
      scale: motion("particleFinalScale"),
      duration: motion("pixelRiseDurationSeconds"),
      ease
    }, riseStart + sequenceIndex * motion("pixelStaggerSeconds"));
  });
  const riseFinish = Math.min(riseEnd, riseStart + (count - 1) * motion("pixelStaggerSeconds") + motion("pixelRiseDurationSeconds"));
  const assembleAt = Math.max(assemblyStart, riseFinish);
  const convergeX = motion("particleAssemblyTargetXDesignUnits") * designScale;
  const convergeY = motion("particleAssemblyTargetYDesignUnits") * designScale;
  tl.to(particles.map((p) => p.el), {
    x: convergeX,
    y: convergeY,
    opacity: motion("particleFinalOpacity"),
    scale: motion("particleAssemblyScale"),
    duration: Math.max(motion("minimumAssemblyDurationSeconds"), assemblyEnd - assembleAt - motion("assemblyLogoLeadSeconds")),
    ease,
    stagger: { each: motion("particleAssemblyStaggerSeconds"), from: "center" }
  }, assembleAt);
  tl.to(logo, { opacity: 1, duration: motion("logoRevealDurationSeconds"), ease }, assemblyEnd - motion("assemblyLogoLeadSeconds"));

  const arabicDuration = (dualEnd - dualStart) * motion("arabicRevealDurationRatio");
  tl.fromTo(arabic, { opacity: 0, y: motion("arabicRevealYOffsetDesignUnits") }, { opacity: 1, y: 0, duration: arabicDuration, ease }, dualStart);
  tl.to(arabic, { opacity: 0, duration: motion("arabicFadeDurationSeconds"), ease }, dualStart + arabicDuration + motion("arabicFadeDelaySeconds"));
  tl.fromTo(english, { opacity: 0, y: motion("englishRevealYOffsetDesignUnits") }, {
    opacity: 1, y: 0, duration: motion("englishRevealDurationSeconds"), ease
  }, dualStart + arabicDuration + motion("arabicFadeDelaySeconds") + motion("arabicFadeDurationSeconds") * motion("englishRevealOverlapRatio"));

  const wordSlot = (sloganEnd - sloganStart) / wordEls.length;
  wordEls.forEach((el, index) => {
    tl.fromTo(el, { opacity: 0, scale: motion("sloganInitialScale") }, {
      opacity: 1,
      scale: motion("sloganFinalScale"),
      duration: Math.min(motion("sloganRevealMaxDurationSeconds"), wordSlot * motion("sloganRevealDurationRatio")),
      ease
    }, sloganStart + index * wordSlot);
  });
  tl.set(stage, { opacity: 1 }, motion("finalHoldStartSeconds"));
  tl.to(stage, { opacity: 0, duration: duration - fadeStart, ease }, fadeStart);
  tl.set({}, {}, duration);
  window.__timelines = window.__timelines || {};
  window.__timelines[id] = tl;
  window.DN_MOTION_RUNTIME = { id, fps, duration, canvas: `${width}x${height}`, particleCount: count, tokenSchema: tokens.schemaVersion };
})();
