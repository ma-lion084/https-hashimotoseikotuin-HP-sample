/**
 * はしもと整骨院 LP – main.js
 *
 * 依存なし（Vanilla JS）。すべて DOM の data-* / aria-* を起点に動作する。
 * 状態は is-* クラスと aria-* 属性だけで表現し、style を直接書き換えない。
 * 要素が存在しない場合は何もしない（他ページへの流用時にエラーにならない）。
 *
 * 機能:
 *   1. モバイルナビ（ハンバーガー）
 *   2. FAQ アコーディオン
 *   3. 計測イベント（電話タップ・ルート検索）。GA4 の gtag が無ければ何もしない
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
      document.body.classList.toggle('is-nav-open', open);   // 背面のスクロール停止は CSS 側（body.is-nav-open）
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
    // 821px は style.css の @media (max-width: 820px) と対になる値。ブレークポイントを変えるときは両方直す
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
   * 3. Conversion events
   *    「検索経由の来院」に最も近い行動（電話タップ・ルート検索）を GA4 に送る。
   *    GA4 のタグ（gtag）が未設置なら何もしないので、先に入れておいて害はない。
   * ------------------------------------------------------------------------- */
  const initConversionEvents = () => {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || typeof window.gtag !== 'function') return;
      const href = a.getAttribute('href');
      if (href.startsWith('tel:')) {
        window.gtag('event', 'tel_click', { link_text: a.textContent.trim().slice(0, 40) });
      } else if (href.includes('google.com/maps/dir')) {
        window.gtag('event', 'route_click');
      }
    });
  };

  /* ---------------------------------------------------------------------------
   * Boot
   * ------------------------------------------------------------------------- */
  const init = () => {
    initMobileNav();
    initFaq();
    initConversionEvents();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
