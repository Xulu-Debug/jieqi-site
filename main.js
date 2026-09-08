/* ============================================================
   二十四节气科普 × 在地调查 · main.js
   ── 素材以「过程性资料」01–05 各板块文件夹为准 ──
   更新方法：
   1) 照片放入 img/，视频放入 video/；
   2) 在 GALLERIES 对应相册登记文件名；
   3) 正文文字直接编辑 index.html。
   ============================================================ */
'use strict';

/* —— 站点基础信息 —— */
const SITE = {
  school: '南京信息工程大学 · 生态与应用气象学院',
  team:   '刘杭（队长）、陆旭、钟孝宇、张尔凡、孟夏杰',
  date:   '2026 年 8 月',
  advisor:'江晓东'
};

/* —— 首屏背景：图片已就位（网站图片/24节气网页背景图.png），默认启用 —— */
const HERO = { file: 'hero-bg.png' };

/* —— 相册照片清单 —— */
const GALLERIES = {
  /* 贰 · 从何而来（紫金山天文台研学） */
  guanxiang: {
    cap: '观象 · 紫金山天文台研学纪实',
    files: [
      'guanxiang-01.jpg','guanxiang-02.jpg','guanxiang-03.jpg','guanxiang-04.jpg',
      'guanxiang-05.jpg','guanxiang-06.jpg','guanxiang-07.jpg','guanxiang-08.jpg'
    ]
  },

  /* 肆 · 四时民俗（街头采访：照片较少，主视觉为视频） */
  wensu: {
    cap: '问俗 · 街头访谈现场纪实',
    files: ['wensu-01.jpg', 'wensu-02.jpg']
  },

  /* 伍 · 与今天（暑托课堂） */
  chuanxin: {
    cap: '传薪 · 暑托班节气课堂纪实',
    files: [
      'chuanxin-01.jpg','chuanxin-02.jpg','chuanxin-03.jpg','chuanxin-04.jpg',
      'chuanxin-05.jpg','chuanxin-06.jpg','chuanxin-07.jpg','chuanxin-08.jpg'
    ]
  },

  /* 伍 · 文创物料 */
  wenchuang: {
    items: [
      { f: 'wc-poster-1.jpg',        cap: '科普物料 · 宣传海报（一）' },
      { f: 'wc-poster-2.jpg',        cap: '科普物料 · 宣传海报（二）' },
      { f: 'wc-magnet.jpg',          cap: '文创 · 二十四节气冰箱贴' },
      { f: 'wc-bookmark.jpg',        cap: '文创 · 二十四节气书签' },
      { f: 'wc-bookmark-detail.jpg', cap: '文创 · 书签细节展示' },
      { f: 'wc-ruler.jpg',           cap: '文创 · 二十四节气直尺' }
    ]
  },

  /* 陆 · 在地实证（队伍在地记录） */
  field: {
    items: [
      { f: 'team-zijinshan.jpg', cap: '在地记录 · 紫金山队伍留影' },
      { f: 'team-shutuoban.jpg', cap: '在地记录 · 暑托班队伍留影' }
    ]
  }
};

document.addEventListener('DOMContentLoaded', function () {

  /* ======= 首屏背景自动加载（无照片时保留水墨底） ======= */
  const heroEl = document.getElementById('top');
  if (heroEl && HERO.file) {
    const probe = new Image();
    probe.onload = function () {
      heroEl.style.backgroundImage =
        'linear-gradient(rgba(18,15,9,.32), rgba(18,15,9,.58)), url(img/' + HERO.file + ')';
      heroEl.classList.add('has-photo');
    };
    probe.src = 'img/' + HERO.file;
  }

  /* ======= 节气环（太阳黄经示意图）自动绘制 ======= */
  const wheel = document.getElementById('solarWheel');
  if (wheel) {
    const NS = 'http://www.w3.org/2000/svg';
    const CX = 170, CY = 170;
    const ORDER = ['春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑',
      '立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至','小寒',
      '大寒','立春','雨水','惊蛰'];
    const LI = { '春分':'#a63a2b','秋分':'#a63a2b','夏至':'#a63a2b','冬至':'#a63a2b',
      '立春':'#33614c','立夏':'#33614c','立秋':'#33614c','立冬':'#33614c' };

    wheel.setAttribute('viewBox', '0 0 340 340');
    const g = document.createElementNS(NS, 'g');

    // 轨道
    const ring1 = document.createElementNS(NS, 'circle');
    ring1.setAttribute('cx', CX); ring1.setAttribute('cy', CY);
    ring1.setAttribute('r', 112); ring1.setAttribute('fill', 'none');
    ring1.setAttribute('stroke', '#b3a98c'); ring1.setAttribute('stroke-width', '1.2');
    const ring2 = document.createElementNS(NS, 'circle');
    ring2.setAttribute('cx', CX); ring2.setAttribute('cy', CY);
    ring2.setAttribute('r', 90); ring2.setAttribute('fill', 'none');
    ring2.setAttribute('stroke', '#c9bfa6'); ring2.setAttribute('stroke-width', '1');
    ring2.setAttribute('stroke-dasharray', '3 5');
    g.appendChild(ring1); g.appendChild(ring2);

    ORDER.forEach(function (name, k) {
      const deg = k * 15;                       // 春分置顶，顺时针推进
      const rad = (deg - 90) * Math.PI / 180;
      const dx = Math.cos(rad), dy = Math.sin(rad);
      const key = LI[name];
      const isKey = !!key;

      // 刻度短线
      const tick = document.createElementNS(NS, 'line');
      tick.setAttribute('x1', CX + dx * 90); tick.setAttribute('y1', CY + dy * 90);
      tick.setAttribute('x2', CX + dx * 99); tick.setAttribute('y2', CY + dy * 99);
      tick.setAttribute('stroke', isKey ? key : '#9c9278');
      tick.setAttribute('stroke-width', isKey ? 2 : 1);
      g.appendChild(tick);

      // 圆点
      const dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('cx', CX + dx * 105); dot.setAttribute('cy', CY + dy * 105);
      dot.setAttribute('r', isKey ? 4.4 : 2.6);
      dot.setAttribute('fill', isKey ? key : '#6b6350');
      g.appendChild(dot);

      // 名称（水平排布，避免倒置）
      const tx = CX + dx * 128, ty = CY + dy * 128 + 4;
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', tx); t.setAttribute('y', ty);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('font-size', isKey ? '12.5' : '10.5');
      t.setAttribute('fill', isKey ? key : '#4a4437');
      t.setAttribute('font-weight', isKey ? '700' : '400');
      t.textContent = name;
      g.appendChild(t);
    });

    // 中心
    const c1 = document.createElementNS(NS, 'text');
    c1.setAttribute('x', CX); c1.setAttribute('y', CY - 4);
    c1.setAttribute('text-anchor', 'middle');
    c1.setAttribute('font-size', '17');
    c1.setAttribute('fill', '#262219');
    c1.setAttribute('font-weight', '700');
    c1.textContent = '廿四节气';
    const c2 = document.createElementNS(NS, 'text');
    c2.setAttribute('x', CX); c2.setAttribute('y', CY + 22);
    c2.setAttribute('text-anchor', 'middle');
    c2.setAttribute('font-size', '10');
    c2.setAttribute('fill', '#837a64');
    c2.textContent = '黄经每 15° 一节气';
    g.appendChild(c1); g.appendChild(c2);

    wheel.appendChild(g);
  }

  /* ======= 相册渲染 + 灯箱 ======= */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  let lbItems = [];
  let lbIndex = 0;

  function openLightbox(items, index) {
    lbItems = items;
    lbIndex = index;
    renderLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }
  function renderLightbox() {
    const it = lbItems[lbIndex];
    lbImg.src = it.src;
    lbImg.alt = it.cap;
    lbCap.textContent = it.cap;
  }
  function stepLightbox(d) {
    lbIndex = (lbIndex + d + lbItems.length) % lbItems.length;
    renderLightbox();
  }

  document.querySelectorAll('.gallery').forEach(function (gal) {
    const cfg = GALLERIES[gal.dataset.gallery];
    if (!cfg) return;
    const items = [];

    function pushFile(f, cap) {
      const src = 'img/' + f;
      items.push({ src: src, cap: cap });
      const fig = document.createElement('figure');
      fig.className = 'fig';
      fig.tabIndex = 0;
      fig.setAttribute('role', 'button');
      fig.setAttribute('aria-label', cap);
      fig.innerHTML = '<img src="' + src + '" alt="' + cap + '" loading="lazy">' +
        '<figcaption class="cap">' + cap + '</figcaption>';
      gal.appendChild(fig);
    }

    if (cfg.items) {
      cfg.items.forEach(function (it) { pushFile(it.f, it.cap); });
    } else {
      (cfg.files || []).forEach(function (f) { pushFile(f, cfg.cap); });
      (cfg.extra || []).forEach(function (e) { pushFile(e.f, e.cap); });
    }

    if (!items.length) {
      const ph = document.createElement('div');
      ph.className = 'ph';
      ph.innerHTML = '<i aria-hidden="true">◫</i><span>照片整理中</span>';
      gal.appendChild(ph);
    }

    gal.addEventListener('click', function (ev) {
      const fig = ev.target.closest('.fig');
      if (!fig) return;
      const i = Array.prototype.indexOf.call(gal.querySelectorAll('.fig'), fig);
      openLightbox(items, i);
    });
    gal.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Enter' && ev.key !== ' ') return;
      const fig = ev.target.closest('.fig');
      if (!fig) return;
      ev.preventDefault();
      const i = Array.prototype.indexOf.call(gal.querySelectorAll('.fig'), fig);
      openLightbox(items, i);
    });
  });

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', function () { stepLightbox(-1); });
  document.getElementById('lbNext').addEventListener('click', function () { stepLightbox(1); });
  lightbox.addEventListener('click', function (ev) { if (ev.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (ev) {
    if (lightbox.hidden) return;
    if (ev.key === 'Escape') closeLightbox();
    if (ev.key === 'ArrowLeft') stepLightbox(-1);
    if (ev.key === 'ArrowRight') stepLightbox(1);
  });

  /* ======= 移动端导航 ======= */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', function () {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ======= 滚动入场 ======= */
  const revealTargets = document.querySelectorAll(
    '.cards > *, .steps > *, .portraits > *, .mini-cards, .proverbs, ' +
    '.pair-list > *, .phases > li, .channel-band, .inset-box, .table-wrap, ' +
    '.timeline-line, .gallery, .video-block, .wensu-media, .footer-meta, blockquote'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }
});
