// ===== theme toggle (light / dark) =====
  // 초기 테마는 <head>의 인라인 스크립트가 localStorage/시스템 설정으로 지정
  function toggleTheme(){
    const next=document.documentElement.dataset.theme==='light'?'dark':'light';
    document.documentElement.dataset.theme=next;
    localStorage.setItem('theme',next);
    updateThemeBtn();
  }
  function updateThemeBtn(){
    const b=document.getElementById('themeBtn');
    if(!b) return;
    const light=document.documentElement.dataset.theme==='light';
    b.textContent=light?'☾':'☀';   // 누르면 바뀔 모드의 아이콘
    b.setAttribute('aria-label',light?'다크 모드로 전환':'라이트 모드로 전환');
  }
  updateThemeBtn();

// ===== cursor FX (푸른 글로우 + 포인터 따라다니기 · 터치도 지원) =====
  (function cursorFX(){
    // 모션 최소화 설정에서만 비활성화 — 터치 기기에서도 손가락 위치에 빛 표시
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const glow=document.createElement('div');glow.className='cursor-glow';
    const dot=document.createElement('div');dot.className='cursor-dot';
    document.body.append(glow,dot);
    let mx=innerWidth/2,my=innerHeight/2,gx=mx,gy=my,shown=false;
    function moveTo(x,y){
      mx=x;my=y;
      if(!shown){shown=true;gx=mx;gy=my;glow.style.opacity=1;dot.style.opacity=1;}
      dot.style.transform='translate3d('+mx+'px,'+my+'px,0) translate(-50%,-50%)';
    }
    function hide(){shown=false;glow.style.opacity=0;dot.style.opacity=0;}
    // 마우스
    addEventListener('mousemove',e=>moveTo(e.clientX,e.clientY));
    document.documentElement.addEventListener('mouseleave',hide);
    // 링크·버튼·카드 위에서는 점 → 링으로 변형
    addEventListener('mouseover',e=>{
      dot.classList.toggle('on-link',!!e.target.closest('a,button,.card,.acc-head,.slider-dot'));
    });
    // 터치 — 손가락이 닿는 지점에도 동일한 글로우, 떼면 사라짐 (스크롤 방해 없이 passive)
    addEventListener('touchstart',e=>{const t=e.touches[0];if(t)moveTo(t.clientX,t.clientY);},{passive:true});
    addEventListener('touchmove',e=>{const t=e.touches[0];if(t)moveTo(t.clientX,t.clientY);},{passive:true});
    addEventListener('touchend',hide);
    addEventListener('touchcancel',hide);
    // 글로우는 살짝 늦게 따라오도록 보간
    (function loop(){
      gx+=(mx-gx)*.08;gy+=(my-gy)*.08;
      glow.style.transform='translate3d('+gx+'px,'+gy+'px,0) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
  })();

// ===== language toggle =====
  function setLang(l){
    document.body.classList.remove('lang-ko','lang-en');
    document.body.classList.add('lang-'+l);
    document.documentElement.lang=l;
    b_ko.classList.toggle('active',l==='ko');
    b_en.classList.toggle('active',l==='en');
    recalcAccordions(); // 언어가 바뀌면 글자 길이가 달라지니 펼쳐진 높이 다시 계산
  }
  const b_ko=document.getElementById('b-ko'),b_en=document.getElementById('b-en');

  // ===== mobile nav =====
  function toggleNav(){document.getElementById('nav').classList.toggle('open');}
  document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));

  // ===== header bg on scroll =====
  const hdr=document.getElementById('hdr');
  addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>40));

  // ===== accordion (경력 · 대외활동 · 수상) =====
  // 같은 묶음(.acc) 안에서만 다른 항목을 닫습니다.
  function toggleAcc(head){
    const item=head.closest('.acc-item');
    const container=item.closest('.acc');
    const body=item.querySelector('.acc-body');
    const isOpen=item.classList.contains('open');
    container.querySelectorAll('.acc-item').forEach(i=>{
      i.classList.remove('open');
      const b=i.querySelector('.acc-body');
      if(b) b.style.maxHeight=null;
    });
    if(!isOpen){item.classList.add('open');body.style.maxHeight=body.scrollHeight+'px';}
  }
  // 펼쳐진 항목 높이 다시 계산 (언어 전환 · 창 크기 변경 시)
  function recalcAccordions(){
    document.querySelectorAll('.acc-item.open .acc-body').forEach(b=>{
      b.style.maxHeight=b.scrollHeight+'px';
    });
  }
  addEventListener('resize',recalcAccordions);
  // 각 묶음의 첫 항목을 기본으로 펼쳐 둡니다.
  window.addEventListener('load',()=>{
    document.querySelectorAll('.acc').forEach(acc=>{
      const first=acc.querySelector('.acc-item');
      if(first){first.classList.add('open');
        const b=first.querySelector('.acc-body');
        if(b) b.style.maxHeight=b.scrollHeight+'px';}
    });
  });

  // ===== work filter =====
  document.querySelectorAll('.filter button').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.filter button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      const f=b.dataset.f;
      document.querySelectorAll('.card').forEach(c=>{
        c.style.display=(f==='all'||c.dataset.cat===f)?'':'none';
      });
    });
  });

  // ===== project full page =====
  const projPage=document.getElementById('projectPage');
  const ppBody=document.getElementById('ppBody');
  let _activeCard=null;

  function openProject(card){
    const full=card.querySelector('.proj-full');
    if(!full) return;
    // DOM 요소 자체를 이동 (이벤트 리스너 및 슬라이드 상태 유지)
    full.removeAttribute('hidden');
    ppBody.appendChild(full);
    _activeCard=card;
    projPage.classList.add('open');
    projPage.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-lock');
    projPage.scrollTop=0;
  }
  function closeProject(){
    if(_activeCard){
      const full=ppBody.querySelector('.proj-full');
      if(full){full.setAttribute('hidden','');_activeCard.appendChild(full);}
      _activeCard=null;
    }
    projPage.classList.remove('open');
    projPage.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-lock');
  }
  // 카드 안의 링크(GitHub 등)를 누르면 전체화면이 안 뜨도록
  document.querySelectorAll('.card .links a, .card .md-links a').forEach(a=>{
    a.addEventListener('click',e=>e.stopPropagation());
  });
  // ESC 키로 닫기
  addEventListener('keydown',e=>{if(e.key==='Escape') closeProject();});

  // ===== reveal on scroll (뷰포트에 들어올 때마다 매번 재생) =====
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls=document.querySelectorAll('.reveal');

  // 같은 섹션 안의 반복 요소는 동시에 올라오지 않게 순차(stagger) 지연을 부여
  const STAGGER=90; // ms
  [['.work-grid','.card'],['.expertise-grid','.exp-col'],['.acc','.acc-item']].forEach(([groupSel,itemSel])=>{
    document.querySelectorAll(groupSel).forEach(group=>{
      group.querySelectorAll(':scope > '+itemSel).forEach((el,i)=>{
        el.style.transitionDelay=(i*STAGGER)+'ms';
      });
    });
  });

  if(reduceMotion){
    // 모션 최소화 사용자: 애니메이션 없이 바로 보이게
    revealEls.forEach(el=>el.classList.add('in'));
  }else{
    // threshold:0 → 첫 픽셀이 들어오면 in 추가(아래→위 재생), 완전히 벗어나면 in 제거.
    // 상단 rootMargin 여유(80px): 위로 이탈할 때 요소가 화면 위로 충분히 나간 뒤에만
    // in을 지워, 되돌아가는 트랜지션(아래로 40px)이 화면에 살짝 비치지 않게 한다.
    // 하단은 0으로 두어 아래에서 위로 올라오는 진입 연출은 또렷하게 유지.
    const io=new IntersectionObserver(es=>{
      es.forEach(e=>e.target.classList.toggle('in',e.isIntersecting));
    },{threshold:0,rootMargin:'80px 0px 0px 0px'});
    revealEls.forEach(el=>io.observe(el));
  }

  // ===== active nav highlight =====
  const links=[...document.querySelectorAll('#nav a')];
  const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
  const so=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){
      const id='#'+e.target.id;
      links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===id));
    }});
  },{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(s=>s&&so.observe(s));

  // ===== 📷 사진 로더 + 슬라이드 =====
  // data-imgs="경로1,경로2,..." 또는 data-img="경로" 가 있는 점선 박스를
  // 실제 사진(여러 장이면 슬라이드)으로 바꿉니다.
  // 사진이 하나도 안 열리면 점선 박스가 그대로 남습니다(hidden이면 계속 숨김).
  (function loadImageSlides(){
    document.querySelectorAll('.imgph[data-imgs],.imgph[data-img]').forEach(box=>{
      const raw=box.getAttribute('data-imgs')||box.getAttribute('data-img')||'';
      const srcs=raw.split(',').map(s=>s.trim()).filter(Boolean);
      if(!srcs.length) return;

      // 각 사진을 미리 로드해서 실제 존재하는 것만 추립니다.
      Promise.all(srcs.map(src=>new Promise(res=>{
        const im=new Image();
        im.onload=()=>res(src);
        im.onerror=()=>res(null);
        im.src=src;
      }))).then(results=>{
        const ok=results.filter(Boolean);
        if(!ok.length) return;            // 다 실패 → 점선 박스 유지

        if(ok.length===1){
          const el=document.createElement('img');
          el.className='photo'+(/logo/i.test(ok[0])?' contain':'');
          el.src=ok[0]; el.alt='';
          box.replaceWith(el);
        }else{
          box.replaceWith(buildSlider(ok));
        }
        recalcAccordions&&recalcAccordions();
      });
    });
  })();

  // 여러 장을 좌우로 넘기는 슬라이드 컴포넌트 생성
  function buildSlider(srcs){
    const wrap=document.createElement('div');
    wrap.className='slider';
    const track=document.createElement('div');
    track.className='slider-track';
    srcs.forEach(s=>{
      const im=document.createElement('img');
      im.className='photo'; im.src=s; im.alt='';
      track.appendChild(im);
    });
    wrap.appendChild(track);

    let idx=0;
    const go=n=>{
      idx=(n+srcs.length)%srcs.length;
      track.style.transform=`translateX(-${idx*100}%)`;
      dots.forEach((d,i)=>d.classList.toggle('on',i===idx));
    };
    const prev=document.createElement('button');
    prev.className='slider-btn prev'; prev.innerHTML='‹';
    prev.onclick=e=>{e.stopPropagation();go(idx-1);};
    const next=document.createElement('button');
    next.className='slider-btn next'; next.innerHTML='›';
    next.onclick=e=>{e.stopPropagation();go(idx+1);};
    wrap.appendChild(prev); wrap.appendChild(next);

    const dotwrap=document.createElement('div');
    dotwrap.className='slider-dots';
    const dots=srcs.map((_,i)=>{
      const d=document.createElement('span');
      d.className='slider-dot'+(i===0?' on':'');
      d.onclick=e=>{e.stopPropagation();go(i);};
      dotwrap.appendChild(d);
      return d;
    });
    wrap.appendChild(dotwrap);

    // 터치 스와이프로 넘기기 (왼쪽 → 다음, 오른쪽 → 이전)
    let sx=0,sy=0,swiping=false;
    wrap.addEventListener('touchstart',e=>{const t=e.touches[0];sx=t.clientX;sy=t.clientY;swiping=true;},{passive:true});
    wrap.addEventListener('touchend',e=>{
      if(!swiping) return; swiping=false;
      const t=e.changedTouches[0]; const dx=t.clientX-sx, dy=t.clientY-sy;
      if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)){ e.stopPropagation(); go(dx<0?idx+1:idx-1); }
    },{passive:true});

    return wrap;
  }

// ===== contact: 메시지 글자수 카운터 + 이메일 복사 =====
  (function(){
    const ta=document.querySelector('.cc-form textarea[name="body"]');
    const cnt=document.getElementById('ccCount');
    if(ta&&cnt){ const upd=()=>cnt.textContent=ta.value.length; ta.addEventListener('input',upd); upd(); }
    document.querySelectorAll('.cc-copy').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const txt=btn.getAttribute('data-copy')||'';
        const ko=btn.querySelector('.ko'), en=btn.querySelector('.en');
        const done=()=>{
          btn.classList.add('copied');
          if(ko)ko.textContent='복사됨'; if(en)en.textContent='Copied';
          setTimeout(()=>{ btn.classList.remove('copied'); if(ko)ko.textContent='복사'; if(en)en.textContent='Copy'; },1500);
        };
        if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(done).catch(done); }
        else { done(); }
      });
    });
  })();