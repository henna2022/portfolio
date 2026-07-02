// ===== intro splash (타이핑 → 페이드아웃) =====
  (function introSplash(){
    const intro=document.getElementById('intro');
    if(!intro) return;
    const LINES=[['introL1','Hello!'],['introL2','I am Juwon :D']];
    const TYPE_MS=90;        // 한 글자 타이핑 속도
    const LINE_PAUSE=420;    // 줄 사이 멈춤
    const HOLD=900;          // 다 친 뒤 머무는 시간
    const caret=document.createElement('span');
    caret.className='caret';caret.textContent='_';
    let done=false;

    function finish(){
      if(done) return;
      done=true;
      intro.classList.add('fade');
      document.body.classList.remove('intro-lock');
      setTimeout(()=>intro.remove(),950);
    }
    // 클릭하면 건너뛰기 (전체 문구를 보여준 뒤 페이드)
    intro.addEventListener('click',()=>{
      LINES.forEach(([id,txt])=>{document.getElementById(id).textContent=txt;});
      caret.remove();
      finish();
    });

    // 모션 최소화 설정 사용자는 타이핑 없이 짧게 보여주고 페이드
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){
      LINES.forEach(([id,txt])=>{document.getElementById(id).textContent=txt;});
      setTimeout(finish,1000);
      return;
    }

    function typeLine(i){
      if(done) return;
      if(i>=LINES.length){setTimeout(finish,HOLD);return;}
      const el=document.getElementById(LINES[i][0]);
      const txt=LINES[i][1];
      el.appendChild(caret);
      let n=0;
      (function step(){
        if(done) return;
        if(n<txt.length){
          caret.before(document.createTextNode(txt[n++]));
          setTimeout(step,TYPE_MS);
        }else{
          setTimeout(()=>typeLine(i+1),LINE_PAUSE);
        }
      })();
    }
    setTimeout(()=>typeLine(0),350);
  })();

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

  // ===== reveal on scroll =====
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

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
  // data-imgs="경로1,경로2,..." 가 있는 점선 박스를 실제 사진(여러 장이면 슬라이드)으로 바꿉니다.
  // 사진이 하나도 안 열리면 점선 박스가 그대로 남습니다.
  (function loadImageSlides(){
    document.querySelectorAll('.imgph[data-imgs]').forEach(box=>{
      const srcs=box.getAttribute('data-imgs').split(',').map(s=>s.trim()).filter(Boolean);
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
    return wrap;
  }