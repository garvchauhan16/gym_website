import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const visible = (el) => el.getClientRects().length > 0;

/**
 * Keeps Tab / Shift+Tab focus inside `containerRef` while `active` is true.
 * On activation focuses `initialFocusRef` (or the first focusable element).
 * On deactivation restores focus to `returnFocusRef` (the trigger, recorded at
 * click time — needed because Safari doesn't focus buttons on mouse click), or
 * else to whatever was focused before. Skipped if `shouldRestoreFocus()` returns
 * false (e.g. when closing because of navigation).
 */
export function useFocusTrap(containerRef, active, { initialFocusRef, returnFocusRef, shouldRestoreFocus } = {}) {
  const restoreRef = useRef(shouldRestoreFocus);
  restoreRef.current = shouldRestoreFocus;

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;
    const previous = document.activeElement;

    const items = () => [...container.querySelectorAll(FOCUSABLE)].filter(visible);
    (initialFocusRef?.current ?? items()[0])?.focus();

    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      const restore = restoreRef.current ? restoreRef.current() : true;
      const target = returnFocusRef?.current ?? previous;
      if (restore && target instanceof HTMLElement && document.contains(target)) target.focus();
    };
  }, [active, containerRef, initialFocusRef, returnFocusRef]);
}
