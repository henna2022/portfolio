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
  // Next 사이트: KO 모드일 때 html 에 lang-ko 클래스가 붙음 (기본은 EN)
  var lang = document.documentElement.classList.contains('lang-ko') ? 'ko' : 'en';

  // 국가: 세션당 1회만 조회 후 캐시 (원본 IP는 저장하지 않음)
  function withCountry(cb) {
    var c = sessionStorage.getItem('pf_country');
    if (c) return cb(c === '-' ? null : c);
    fetch('https://ipapi.co/country_name/')
      .then(function (r) { return r.text(); })
      .then(function (t) { t = (t || '').trim(); var ok = t && t.length < 60; sessionStorage.setItem('pf_country', ok ? t : '-'); cb(ok ? t : null); })
      .catch(function () { sessionStorage.setItem('pf_country', '-'); cb(null); });
  }

  // 방문 행 식별자는 클라이언트가 만들어 함께 넣는다.
  // (Prefer: return=representation 은 INSERT 후 RETURNING 을 위해 SELECT 권한을 요구하는데,
  //  anon 에게는 SELECT 정책이 없어 INSERT 자체가 42501 로 롤백된다 → return=minimal + view_uid)
  var pvUid = null, viewSeq = 0, start = Date.now(), durationSent = false;

  function insertView(country) {
    var uid = sid + '-' + (viewSeq++) + '-' + Math.random().toString(36).slice(2, 8);
    fetch(REST + 'page_views', {
      method: 'POST',
      headers: Object.assign({ Prefer: 'return=minimal' }, H),
      body: JSON.stringify({
        view_uid: uid,
        session_id: sid,
        path: location.pathname + location.hash,
        referrer: document.referrer || null,
        country: country,
        device: isMobile ? 'mobile' : 'desktop',
        lang: lang,
        screen_w: innerWidth
      })
    }).then(function (r) { if (r.ok) { pvUid = uid; start = Date.now(); durationSent = false; } })
      .catch(function () {});
  }

  withCountry(function (country) {
    insertView(country);
    // SPA(Next) 클라이언트 라우팅도 페이지뷰로 기록
    var push = history.pushState;
    history.pushState = function () {
      sendDuration();
      push.apply(this, arguments);
      setTimeout(function () { pvUid = null; insertView(country); }, 0);
    };
    addEventListener('popstate', function () {
      sendDuration();
      setTimeout(function () { pvUid = null; insertView(country); }, 0);
    });
  });

  // 체류시간: 페이지가 숨겨지거나 떠날 때 1회 전송 (keepalive 로 언로드 중에도 완료)
  function sendDuration() {
    if (durationSent || !pvUid) return; durationSent = true;
    // WHERE 는 view_uid 만 참조한다 (anon 에게 SELECT 가 열린 유일한 컬럼).
    // "duration_ms is null" 조건은 RLS UPDATE 정책이 이미 강제하므로 여기 넣지 않는다.
    fetch(REST + 'page_views?view_uid=eq.' + encodeURIComponent(pvUid), {
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
    var a = e.target.closest && e.target.closest('a[href]');
    // Next 사이트: 프로젝트 카드는 /work/<slug> 링크
    if (a) {
      var m = (a.getAttribute('href') || '').match(/\/work\/([^\/?#]+)/);
      if (m) logEvent('project_open', m[1]);
    }
    if (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('Architecture_Deck') >= 0) logEvent('cta_click', 'deck_download');
      else if (href.indexOf('Resume') >= 0) logEvent('cta_click', 'resume_download');
      else if (href.indexOf('CV') >= 0) logEvent('cta_click', 'cv_download');
      else if (href.indexOf('mailto:') === 0) logEvent('cta_click', 'email');
      else if (/linkedin\.com/.test(href)) logEvent('cta_click', 'linkedin');
      else if (/github\.com/.test(href)) logEvent('cta_click', 'github');
      else if (/vercel\.app|github\.io/.test(href)) logEvent('cta_click', 'project_live');
    }
  }, true);
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
