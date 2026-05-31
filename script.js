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

  // ===== project modal (프로젝트 상세 팝업) =====
  const modal=document.getElementById('projModal');
  const modalBody=document.getElementById('modalBody');
  function openProject(card){
    const full=card.querySelector('.proj-full');
    if(!full) return;
    modalBody.innerHTML=full.innerHTML;     // 카드 안의 숨겨진 상세내용을 팝업에 복사
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-lock');
    modalBody.parentElement.scrollTop=0;
  }
  function closeProject(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-lock');
  }
  // 카드 안의 링크(GitHub 등)를 누르면 팝업이 안 뜨도록
  document.querySelectorAll('.card .links a, .card .md-links a').forEach(a=>{
    a.addEventListener('click',e=>e.stopPropagation());
  });
  // ESC 키로 팝업 닫기
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
