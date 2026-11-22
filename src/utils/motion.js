/**
 * Shared motion presets: short travel, quick durations, one easing curve.
 * Reduced-motion users get no transforms via <MotionConfig reducedMotion="user"> in App.
 */
export const ease = [0.22, 1, 0.36, 1];

export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 0.6,
};

/** Small step between staggered items; keep total stagger under ~0.3s. */
export const stagger = 0.06;

/** Fade + short rise on mount (page heroes, above-the-fold content). */
export const fadeUp = (delay = 0, y = 14) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.slow, delay, ease },
});

/** Viewport options for scroll reveals. */
export const revealViewport = { once: true, margin: '0px 0px -60px 0px' };
