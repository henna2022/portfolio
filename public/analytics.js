/* ============================================================
   포트폴리오 방문 통계 수집 (라이브러리 없이 Supabase REST 직접 호출)
   - supabase-config.js 가 먼저 로드되어 window.SB_URL / SB_ANON_KEY 를 설정해야 동작.
   - 설정 전(플레이스홀더 상태)에는 아무것도 하지 않음 → 라이브 사이트에 영향 없음.
   - 저장 항목: 국가(대략치)·경로·유입경로·기기·언어·화면폭·체류시간. 원본 IP는 저장하지 않음.
   ============================================================ */
(function () {
  var URL = window.SB_URL, KEY = window.SB_ANON_KEY;
  if (!URL || !KEY || /YOUR-/.test(URL) || /YOUR-/.test(KEY)) return; // 미설정 → 비활성

  var REST = URL.replace(/\/$/, '') + '/rest/v1/';
  var H = { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' };

  // 탭 세션 단위 id
  var sid = sessionStorage.getItem('pf_sid');
  if (!sid) { sid = Date.now().toString(36) + Math.random().toString(36).slice(2, 8); sessionStorage.setItem('pf_sid', sid); }

  var isMobile = matchMedia('(hover:none),(pointer:coarse)').matches || innerWidth < 760;
  var lang = document.body.classList.contains('lang-en') ? 'en' : 'ko';

  // 국가: 세션당 1회만 조회 후 캐시 (원본 IP는 저장하지 않음)
  function withCountry(cb) {
    var c = sessionStorage.getItem('pf_country');
    if (c) return cb(c === '-' ? null : c);
    fetch('https://ipapi.co/country_name/')
      .then(function (r) { return r.text(); })
      .then(function (t) { t = (t || '').trim(); var ok = t && t.length < 60; sessionStorage.setItem('pf_country', ok ? t : '-'); cb(ok ? t : null); })
      .catch(function () { sessionStorage.setItem('pf_country', '-'); cb(null); });
  }

  var pvId = null, start = Date.now(), durationSent = false;

  withCountry(function (country) {
    fetch(REST + 'page_views', {
      method: 'POST',
      headers: Object.assign({ Prefer: 'return=representation' }, H),
      body: JSON.stringify({
        session_id: sid,
        path: location.pathname + location.hash,
        referrer: document.referrer || null,
        country: country,
        device: isMobile ? 'mobile' : 'desktop',
        lang: lang,
        screen_w: innerWidth
      })
    }).then(function (r) { return r.json(); })
      .then(function (rows) { pvId = rows && rows[0] && rows[0].id; })
      .catch(function () {});
  });

  // 체류시간: 페이지가 숨겨지거나 떠날 때 1회 전송 (keepalive 로 언로드 중에도 완료)
  function sendDuration() {
    if (durationSent || !pvId) return; durationSent = true;
    fetch(REST + 'page_views?id=eq.' + pvId, {
      method: 'PATCH', keepalive: true, headers: H,
      body: JSON.stringify({ duration_ms: Date.now() - start })
    }).catch(function () {});
  }
  addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') sendDuration(); });
  addEventListener('pagehide', sendDuration);

  // 이벤트 로깅
  function logEvent(type, label) {
    fetch(REST + 'events', {
      method: 'POST', keepalive: true, headers: Object.assign({ Prefer: 'return=minimal' }, H),
      body: JSON.stringify({ session_id: sid, type: type, label: label || null, path: location.pathname })
    }).catch(function () {});
  }

  // 프로젝트 카드 열람 + CTA 링크 클릭 추적
  document.addEventListener('click', function (e) {
    var art = e.target.closest && e.target.closest('article.card');
    if (art && art.id) logEvent('project_open', art.id);

    var a = e.target.closest && e.target.closest('a[href]');
    if (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('mailto:') === 0) logEvent('cta_click', 'email');
      else if (/linkedin\.com/.test(href)) logEvent('cta_click', 'linkedin');
      else if (/github\.com/.test(href)) logEvent('cta_click', 'github');
      else if (/vercel\.app|github\.io/.test(href)) logEvent('cta_click', 'project_live');
    }
  }, true);

  // 언어 토글 사용
  ['b-ko', 'b-en'].forEach(function (id) {
    var b = document.getElementById(id);
    if (b) b.addEventListener('click', function () { logEvent('lang_toggle', id === 'b-en' ? 'en' : 'ko'); });
  });
})();

/* ============================================================
   연락 폼 → messages 테이블 (Supabase 미설정 시 mailto 로 폴백)
   ============================================================ */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  var val = function (n) { var e = form.querySelector('[name="' + n + '"]'); return e ? e.value.trim() : ''; };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var status = document.getElementById('formStatus');
    if (val('company')) return;                 // 허니팟 채워짐 → 봇으로 간주, 무시
    var body = val('body');
    if (!body) { if (status) status.textContent = '메시지를 입력해주세요.'; return; }

    var URL = window.SB_URL, KEY = window.SB_ANON_KEY;
    if (!URL || !KEY || /YOUR-/.test(URL) || /YOUR-/.test(KEY)) {
      // 백엔드 미설정 → 이메일로 폴백
      location.href = 'mailto:juwonlee211@gmail.com?subject=' + encodeURIComponent('Portfolio contact — ' + (val('name') || '')) +
        '&body=' + encodeURIComponent(body + '\n\n— ' + (val('name') || '') + ' (' + (val('email') || '') + ')');
      return;
    }
    if (status) status.textContent = '보내는 중…';
    fetch(URL.replace(/\/$/, '') + '/rest/v1/messages', {
      method: 'POST',
      headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ name: val('name') || null, email: val('email') || null, body: body })
    }).then(function (r) {
      if (r.ok) { if (status) status.textContent = '보냈습니다. 감사합니다! 🙌'; form.reset(); }
      else { if (status) status.textContent = '전송에 실패했어요. 잠시 후 다시 시도해주세요.'; }
    }).catch(function () { if (status) status.textContent = '전송 실패 — 네트워크를 확인해주세요.'; });
  });
})();
