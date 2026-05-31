
  // language toggle
  function setLang(l){
    document.body.classList.remove('lang-ko','lang-en');
    document.body.classList.add('lang-'+l);
    document.documentElement.lang=l;
    b_ko.classList.toggle('active',l==='ko');
    b_en.classList.toggle('active',l==='en');
  }
  const b_ko=document.getElementById('b-ko'),b_en=document.getElementById('b-en');

  // mobile nav
  function toggleNav(){document.getElementById('nav').classList.toggle('open');}
  document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));

  // header bg on scroll
  const hdr=document.getElementById('hdr');
  addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>40));

  // accordion
  function toggleAcc(head){
    const item=head.parentElement;
    const body=head.nextElementSibling;
    const open=item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(i=>{
      i.classList.remove('open');
      i.querySelector('.acc-body').style.maxHeight=null;
    });
    if(!open){item.classList.add('open');body.style.maxHeight=body.scrollHeight+'px';}
  }
  // open first by default
  window.addEventListener('load',()=>{
    const first=document.querySelector('.acc-item');
    if(first){first.classList.add('open');first.querySelector('.acc-body').style.maxHeight=first.querySelector('.acc-body').scrollHeight+'px';}
  });

  // work filter
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

  // reveal on scroll
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // active nav highlight
  const links=[...document.querySelectorAll('#nav a')];
  const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
  const so=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){
      const id='#'+e.target.id;
      links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===id));
    }});
  },{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(s=>s&&so.observe(s));
