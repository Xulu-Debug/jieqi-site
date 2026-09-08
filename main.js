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

/* —— 首屏背景：把新照片命名为 hero-bg.jpg 放入 img/ 即自动生效 —— */
const HERO = { file: 'hero-bg.jpg' };

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
        'linear-gradient(rgba(24,20,12,.45), rgba(24,20,12,.62)), url(img/' + HERO.file + ')';
      heroEl.classList.add('has-photo');
    };
    probe.src = 'img/' + HERO.file;
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
