/* Shared behaviour for every 信息汇总 page. Load it in <head> (no defer) so the reveal
   class is set before the page paints. Page data lives in <script type="application/json" id="details">. */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  /* key → [标题, [[字段, 值], ...]]；值里可以放 <a> 链接 */
  var detailsEl = document.getElementById('details');
  var D = detailsEl ? JSON.parse(detailsEl.textContent) : {};
  function plain(s) { return String(s).replace(/<[^>]+>/g, ''); }
  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  var copyBtn = '<button type="button" class="cp">复制</button>';
  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-k]'));
  /* one shared detail sheet for the page: opens at the bottom of the screen over a dimmed background */
  var bg = document.createElement('div'), sheet = document.createElement('div'), opener = null;
  bg.className = 'sheet-bg';
  sheet.className = 'dt sheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true');
  document.querySelector('main').append(bg, sheet);
  function closeSheet() {
    if (!sheet.classList.contains('open')) return;
    bg.classList.remove('open'); sheet.classList.remove('open');
    document.documentElement.classList.remove('sheet-on'); document.documentElement.style.paddingRight = '';
    document.querySelectorAll('[data-k].sel').forEach(function (x) { x.classList.remove('sel'); });
    if (opener) opener.focus({ preventScroll: true });
  }
  function show(n) {
    var scope = n.closest('.card') || n, r = scope.getBoundingClientRect();
    scope.querySelectorAll('[data-k]').forEach(function (x) { x.classList.toggle('sel', x === n); });
    var d = D[n.dataset.k], h = '<div class="dt-h"><h4>' + esc(d[0]) + '</h4><button type="button" class="x" aria-label="关闭说明">×</button></div><dl>';
    /* a row [字段, 命令, "cmd"] shows the value as a command with a 复制 button */
    d[1].forEach(function (r) { h += '<dt>' + esc(r[0]) + '</dt><dd>' + (r[2] === 'cmd' ? '<code class="cmd">' + esc(r[1]) + '</code>' + copyBtn : (/<a /.test(r[1]) ? r[1] : esc(r[1]))) + '</dd>'; });
    sheet.innerHTML = h + '</dl>'; sheet.scrollTop = 0; sheet.setAttribute('aria-label', d[0]);
    /* same left edge and width as the diagram's card; 8px gutter on phones */
    var left = Math.max(8, r.left), width = Math.min(r.width, window.innerWidth - 16);
    sheet.style.left = left + 'px'; sheet.style.width = width + 'px';
    var bar = window.innerWidth - document.documentElement.clientWidth;
    if (bar > 0) document.documentElement.style.paddingRight = bar + 'px';
    document.documentElement.classList.add('sheet-on');
    bg.classList.add('open'); sheet.classList.add('open');
    opener = n; sheet.querySelector('.x').focus({ preventScroll: true });
  }
  bg.addEventListener('click', closeSheet);
  sheet.addEventListener('click', function (e) { if (e.target.closest('.x')) closeSheet(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheet(); });
  nodes.forEach(function (n) {
    var d = D[n.dataset.k];
    n.dataset.text = (d[0] + ' ' + d[1].map(function (r) { return plain(r.join(' ')); }).join(' ')).toLowerCase();
    n.addEventListener('click', function () { show(n); });
    if (n.tagName !== 'BUTTON') n.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(n); } });
  });
  /* copy: click any code to copy it; commands (code.cmd) also get a 复制 button next to them */
  function copied(c, btn) {
    c.classList.add('copied');
    if (btn) { btn.textContent = '已复制'; btn.classList.add('done'); }
    setTimeout(function () { c.classList.remove('copied'); if (btn) { btn.textContent = '复制'; btn.classList.remove('done'); } }, 900);
  }
  /* fallback for pages where the Clipboard API is blocked (for example some local file:// views) */
  function copyOld(c, btn) {
    var t = document.createElement('textarea');
    t.value = c.textContent; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    var ok = false; try { ok = document.execCommand('copy'); } catch (err) {}
    document.body.removeChild(t);
    if (ok) { copied(c, btn); return; }
    if (btn) { btn.textContent = '请手动复制'; setTimeout(function () { btn.textContent = '复制'; }, 1500); }
  }
  function copy(c, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(c.textContent).then(function () { copied(c, btn); }, function () { copyOld(c, btn); });
    } else { copyOld(c, btn); }
  }
  document.querySelectorAll('main code.cmd').forEach(function (c) { c.insertAdjacentHTML('afterend', copyBtn); });
  document.querySelector('main').addEventListener('click', function (e) {
    var b = e.target.closest('.cp');
    if (b) { var prev = b.previousElementSibling; if (prev && prev.tagName === 'CODE') copy(prev, b); return; }
    var c = e.target.closest('code');
    if (!c || c.closest('summary')) return;
    var next = c.nextElementSibling;
    copy(c, next && next.classList.contains('cp') ? next : null);
  });

  /* step flow (.sflow): small steps are folded; a big step opens or closes its own group,
     and the 全部展开 button opens or closes every group in that flow */
  document.querySelectorAll('.sflow').forEach(function (flow) {
    var rowsF = Array.prototype.slice.call(flow.querySelectorAll('.sf-row'));
    var all = flow.querySelector('.sf-all');
    function setRow(row, open) {
      row.classList.toggle('open', open);
      var big = row.querySelector('.sf-big');
      if (big) big.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    function syncAll() {
      if (!all) return;
      var allOpen = rowsF.every(function (r) { return r.classList.contains('open'); });
      all.textContent = allOpen ? '全部收起' : '全部展开';
      all.setAttribute('aria-expanded', allOpen ? 'true' : 'false');
    }
    rowsF.forEach(function (row) {
      var big = row.querySelector('.sf-big'), closed = row.querySelector('.sf-closed');
      setRow(row, row.classList.contains('open'));
      if (big) big.addEventListener('click', function () { setRow(row, !row.classList.contains('open')); syncAll(); });
      if (closed) closed.addEventListener('click', function () { setRow(row, true); syncAll(); });
    });
    if (all) all.addEventListener('click', function () {
      var open = all.getAttribute('aria-expanded') !== 'true';
      rowsF.forEach(function (r) { setRow(r, open); });
      syncAll();
    });
    flow.sfOpenHits = function () {
      rowsF.forEach(function (r) { if (r.querySelector('.sf-steps .hit')) setRow(r, true); });
      syncAll();
    };
    syncAll();
  });

  /* scroll reveal */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* phone menu: three lines toggle the section links */
  var nav = document.querySelector('.nav'), menu = document.getElementById('menu');
  function setMenu(open) { nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', open ? 'true' : 'false'); menu.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单'); }
  menu.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  document.getElementById('links').addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* page table of contents: first nav item "目录", built from each section's h2 and each 图 N title.
     Pages that already have a hand-written TOC link (#toc or named 目录, e.g. interview pages) keep theirs. */
  var links = document.getElementById('links');
  var hasToc = Array.prototype.some.call(links.querySelectorAll('a'), function (a) { return a.getAttribute('href') === '#toc' || a.textContent.trim() === '目录'; });
  var rows = [];
  if (!hasToc) {
    if (document.querySelector('main .hero')) rows.push(['toc-s', '结论', null]);
    document.querySelectorAll('main section').forEach(function (s) {
      var h = s.querySelector('h2');
      if (h) rows.push(['toc-s', h.textContent.trim(), s]);
      s.querySelectorAll('.eyebrow').forEach(function (e) {
        var t = e.textContent.trim();
        if (/^图\s*\d+/.test(t)) rows.push(['toc-f', t, e.closest('.card') || e]);
      });
    });
  }
  if (rows.length) {
    var toc = document.createElement('div'), tb = document.createElement('button'), list = document.createElement('div');
    toc.className = 'toc';
    tb.type = 'button'; tb.className = 'toc-b'; tb.textContent = '目录';
    tb.setAttribute('aria-expanded', 'false'); tb.setAttribute('aria-controls', 'toc-list');
    list.className = 'toc-list'; list.id = 'toc-list';
    var setToc = function (open) { toc.classList.toggle('open', open); tb.setAttribute('aria-expanded', open ? 'true' : 'false'); };
    rows.forEach(function (r) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = r[0]; b.textContent = r[1];
      b.addEventListener('click', function () {
        setToc(false); setMenu(false);
        if (r[2]) r[2].scrollIntoView({ block: 'start' }); else window.scrollTo(0, 0);
      });
      list.appendChild(b);
    });
    tb.addEventListener('click', function () { setToc(!toc.classList.contains('open')); });
    toc.appendChild(tb); toc.appendChild(list);
    links.insertBefore(toc, links.firstChild);
    document.addEventListener('click', function (e) { if (!toc.contains(e.target)) setToc(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setToc(false); });
  }

  /* search: filters lists and Q&A, opens what matches, rings matching diagram blocks */
  var input = document.getElementById('q'), count = document.getElementById('count'), empty = document.getElementById('empty');
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-s]'));
  var mores = Array.prototype.slice.call(document.querySelectorAll('details.more'));
  items.forEach(function (it) { it.dataset.html = it.innerHTML; it.dataset.text = it.textContent.toLowerCase(); });
  function reEsc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  input.addEventListener('input', function () {
    var terms = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean), shown = 0, nodeHits = 0, faqShown = 0;
    rv.forEach(function (el) { el.classList.add('in'); });
    items.forEach(function (it) {
      var hit = terms.every(function (t) { return it.dataset.text.indexOf(t) !== -1; });
      it.classList.toggle('hidden', terms.length > 0 && !hit);
      var html = it.dataset.html;
      if (terms.length && hit) { shown++; terms.forEach(function (t) { html = html.replace(new RegExp('(>[^<]*?)(' + reEsc(t) + ')', 'gi'), '$1<mark>$2</mark>'); }); }
      it.innerHTML = html;
      if (it.tagName === 'DETAILS') { it.open = terms.length > 0 && hit; if (hit) faqShown++; }
    });
    mores.forEach(function (m) { m.open = terms.length > 0 && !!m.querySelector('li[data-s]:not(.hidden)'); });
    nodes.forEach(function (n) {
      var hit = terms.length > 0 && terms.every(function (t) { return n.dataset.text.indexOf(t) !== -1; });
      n.classList.toggle('hit', hit);
      if (hit) nodeHits++;
    });
    document.querySelectorAll('.sflow').forEach(function (f) { if (f.sfOpenHits) f.sfOpenHits(); });
    count.textContent = terms.length ? shown + ' 条 · 图里 ' + nodeHits + ' 个' : '';
    empty.classList.toggle('hidden', !(terms.length && faqShown === 0));
  });
});
