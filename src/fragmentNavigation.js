// Lazy sections may not exist when a native fragment navigation starts.
export function startFragmentNavigation(browser, root) {
  let observer, timer;
  const clear = () => {
    observer?.disconnect(); observer = null;
    if (timer) browser.clearTimeout(timer);
    timer = null;
  };
  const navigate = () => {
    clear();
    let id;
    try { id = decodeURIComponent(browser.location.hash.slice(1)); } catch { return; }
    if (!id) return;
    const scroll = () => {
      const target = browser.document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView();
      return true;
    };
    if (scroll()) return;
    observer = new browser.MutationObserver(() => { if (scroll()) clear(); });
    observer.observe(root, { childList: true, subtree: true });
    timer = browser.setTimeout(clear, 10000);
  };
  browser.addEventListener("hashchange", navigate);
  navigate();
  return () => { clear(); browser.removeEventListener("hashchange", navigate); };
}
