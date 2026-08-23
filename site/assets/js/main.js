/**
 * はしもと整骨院 LP – main.js
 *
 * 依存なし（Vanilla JS）。すべて DOM の data-* / aria-* を起点に動作する。
 * 要素が存在しない場合は何もしない（他ページへの流用時にエラーにならない）。
 *
 * 機能:
 *   1. モバイルナビ（ハンバーガー）
 *   2. FAQ アコーディオン
 */
(() => {
  'use strict';

  /* ---------------------------------------------------------------------------
   * 1. Mobile navigation
   * ------------------------------------------------------------------------- */
  const initMobileNav = () => {
    const toggle  = document.querySelector('[data-nav-toggle]');
    const nav     = document.querySelector('[data-nav]');
    const overlay = document.querySelector('[data-nav-overlay]');
    if (!toggle || !nav || !overlay) return;

    const LABEL_OPEN  = toggle.dataset.labelOpen  || 'メニューを開く';
    const LABEL_CLOSE = toggle.dataset.labelClose || 'メニューを閉じる';

    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      overlay.classList.toggle('is-visible', open);
      overlay.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? LABEL_CLOSE : LABEL_OPEN);
      document.body.style.overflow = open ? 'hidden' : '';
    };

    const isOpen = () => nav.classList.contains('is-open');

    toggle.addEventListener('click', () => setOpen(!isOpen()));
    overlay.addEventListener('click', () => setOpen(false));
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) setOpen(false);
    });

    // PC幅に戻ったら開きっぱなしを解除
    const mq = window.matchMedia('(min-width: 821px)');
    mq.addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  };

  /* ---------------------------------------------------------------------------
   * 2. FAQ accordion
   *    高さは CSS (grid-template-rows) 側で処理するため、JS は状態切替のみ。
   * ------------------------------------------------------------------------- */
  const initFaq = () => {
    const items = document.querySelectorAll('[data-faq-item]');
    if (!items.length) return;

    items.forEach((item) => {
      const btn = item.querySelector('[data-faq-toggle]');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  };

  /* ---------------------------------------------------------------------------
   * Boot
   * ------------------------------------------------------------------------- */
  const init = () => {
    initMobileNav();
    initFaq();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
