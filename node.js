  (function () {
      const $  = (q, c = document) => c.querySelector(q);
      const $$ = (q, c = document) => Array.from(c.querySelectorAll(q));
    

      const html       = document.documentElement;
      const navToggle  = $('.nav-toggle');
      const navLinks   = $('.nav-links');
      const modeToggle = $('#modeToggle');
      const toTop      = $('#toTop');
      const year       = $('#year');
    
      if (year) year.textContent = new Date().getFullYear();
    
      if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
          navLinks.classList.toggle('open');
        });
      }
    
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') html.classList.add('light');
      if (modeToggle) {
        modeToggle.addEventListener('click', () => {
          html.classList.toggle('light');
          localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
        });
      }
    
      const onScroll = () => {
        if (!toTop) return;
        if (window.scrollY > 420) toTop.classList.add('show');
        else toTop.classList.remove('show');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      if (toTop) {
        toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      }
    
      const io = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      $$('.reveal').forEach(el => io.observe(el));
    

  const lightbox    = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const lbTitle     = $('#lbTitle');
  const lbDesc      = $('#lbDesc');
  const closeBtn    = $('.lightbox-close', lightbox);

  function openLightbox(src, title='', desc=''){
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lbTitle) lbTitle.textContent = title || 'Foto';
    if (lbDesc)  lbDesc.textContent  = desc  || '';
    lightbox.setAttribute('aria-hidden','false');
    lightbox.classList.add('open');
  }

  function closeLightboxSafe(){
    if (!lightbox) return;
    lightbox.classList.remove('open');
    setTimeout(()=>{
      lightbox.setAttribute('aria-hidden','true');
      lightboxImg && (lightboxImg.src = '');
      lbTitle && (lbTitle.textContent = '');
      lbDesc  && (lbDesc.textContent  = '');
    },200);
  }


  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[data-lb]');
    if (!a) return;
    e.preventDefault();
    const src   = a.getAttribute('href');
    const title = a.getAttribute('data-title') || a.getAttribute('title') || a.querySelector('img')?.alt || 'Foto';
    const desc  = a.getAttribute('data-desc')  || '';
    openLightbox(src, title, desc);
  });

  closeBtn && closeBtn.addEventListener('click', closeLightboxSafe);
  lightbox && lightbox.addEventListener('click', (e)=>{ if (e.target === lightbox) closeLightboxSafe(); });



  (() => {
      const $ = (q,c=document)=>c.querySelector(q);
      const $$= (q,c=document)=>Array.from(c.querySelectorAll(q));
    
      const grid   = $('#destGrid');
      const more   = $('#destMore');
      const search = $('#destSearch');
      const tabs   = $$('.seg-btn', $('#destinasi'));
    
      if (!grid) return;
    
      
        const DEST = {
          wisata: [
            { title:'Taman Safari Bogor',              img:'./img/safari.jpg', lokasi:'Cisarua',             href:'https://tamansafari.com/' },
            { title:'Kebun Raya Bogor',                img:'https://storage.googleapis.com/seo-cms/assets/kebun_raya_bogor_1_9332196c17/kebun_raya_bogor_1_9332196c17.jpg', lokasi:'Kota Bogor', href:'https://kebunraya.id/r/bogor' },
            { title:'Museum Zoologi',                  img:'https://media.suara.com/pictures/970x544/2021/08/29/23484-museum-zoologi-bogor.jpg', lokasi:'Kota Bogor', href:'https://kebunraya.id/r/bogor/museum-zoologi' },
            { title:'Taman Matahari',                  img:'https://tse3.mm.bing.net/th/id/OIP.hPynZFsA54cDEFrzkelK_wHaGy?pid=Api&P=0&h=180', lokasi:'Cisarua',     href:'https://www.tamanwisatamatahari.id/' },
            { title:'Gunung Mas (Kebun Teh)',          img:'https://tse4.mm.bing.net/th/id/OIP.TU05wPLCyBnx68yoC-QluAHaFj?pid=Api&P=0&h=180', lokasi:'Puncak', href:'https://gunungmaswisatapuncak.com/' },
            { title:'JungleLand Adventure Theme Park', img:'https://tse3.mm.bing.net/th/id/OIP.83Y3qrzNFJlw_kB7M-BkwwHaEK?pid=Api&P=0&h=180', lokasi:'Sentul', href:'https://jungleland.id/' },
            { title:'The Jungle Water Adventure',      img:'http://3.bp.blogspot.com/-D56iRSla9Og/Vbwx9kIteZI/AAAAAAAABbs/UDCPIvU6oSk/s640/Wisata-The-Jungle-Bogor.jpg', lokasi:'Kota Bogor', href:'https://thejungleadventure.com/' },
            { title:'Devoyage Bogor',                  img:'https://tse4.mm.bing.net/th/id/OIP.8UK24Z80j4FM-3HM0M4USQHaD4?pid=Api&P=0&h=180', lokasi:'Bogor ', href:'https://salsawisata.com/devoyage-bogor/' },
            { title:'Kuntum Farmfield',                img:'https://tse2.mm.bing.net/th/id/OIP.IHbRiiQOukTROoz8o9lVHwHaFj?pid=Api&P=0&h=180', lokasi:'Bogor ', href:'https://wisatago.com/kuntum-farmfield/' },
            { title:'Cimory Dairyland Puncak',         img:'https://i1.wp.com/travelspromo.com/wp-content/uploads/2022/11/Bangunan-unik-berkincir-angin-di-Cimory-Dairyland-Puncak.webp', lokasi:'Puncak', href:'https://www.cimorydairyland.com/' },
            { title:'Sawah Segar',         img:'https://tse4.mm.bing.net/th/id/OIP.via41Pocp9zC8lmD5I-t0AHaEK?pid=Api&P=0&h=180', lokasi:'bogor', href:'https://www.beben.id/sawah-segar-sentul/' },
            { title:'Setu Taman Sari',         img:'https://tse2.mm.bing.net/th/id/OIP.arc8lsJXWpShFQOqLguh-wHaEK?pid=Api&P=0&h=180', lokasi:'ciapus', href:'https://maps.app.goo.gl/arRDqGTBnXYvM7vj7' },
            { title:'Kampung Budaya Sindangbarang',    img:'https://travelspromo.com/wp-content/uploads/2018/12/Rumah-tradisional-kampung-budaya-sindang-barang.jpg', lokasi:'Tamansari Ciapus', href:'https://www.kampungbudayasunda.com/' },
            { title:'Situ Gede',                       img:'https://cianjurekspres.disway.id/upload/681d51f22752ef48dc40d4e09ec815b9.jpg', lokasi:'Bogor', href:'https://id.wikipedia.org/wiki/Situ_Gede,_Bogor' },
            { title:'Ecopark Sentul',                  img:'https://idntrip.com/wp-content/uploads/Tentang-Ecoart-Park-Sentul-City.png', lokasi:'Sentul', href:'https://pesonakota.com/ecoart-park-sentul-city/' },
            { title:'Sirkuit Sentul',                  img:'./img/circuit.jpg', lokasi:'Sentul', href:'https://maps.google.com/?q=Sentul+International+Circuit' },
            { title:'Highland Park Resort (Glamping)', img:'https://anekatempatwisata.com/wp-content/uploads/2021/06/Highland-Park-Resort-galaxyadventure.jpg', lokasi:'Cijeruk', href:'https://thehighlandparkresortbogor.com/Indonesia/' },
            { title:'Alun-Alun Kota Bogor',            img:'https://img.okezone.com/content/2021/12/17/338/2518587/diresmikan-ridwan-kamil-begini-sederet-fasilitas-di-alun-alun-kota-bogor-diSlYvF4oV.jpg', lokasi:'Kota Bogor', href:'https://maps.app.goo.gl/5TTJamDv2Vt3A1Zw6' },
            { title:'Taman Kencana',                   img:'https://salsawisata.com/wp-content/uploads/2023/01/Taman-Kencana-Bogor.jpg', lokasi:'Kota Bogor', href:'https://salsawisata.com/taman-kencana-bogor/' },
            { title:'Taman Sempur',                    img:'https://cdn0-production-images-kly.akamaized.net/jDriI-BPhU_hXKrtUjwJIzJZP9A=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2741569/original/076610200_1551531047-IMG20190302104751.jpg', lokasi:'Kota Bogor', href:'https://salsawisata.com/taman-sempur/' },
            { title:'Gunung Pancar Hot Spring',        img:'https://rubrikwisata.com/wp-content/uploads/2019/02/wisata-gunung-pancar-sentul.jpg', lokasi:'Ciapus', href:'https://www.gunungpancar.com/' },
            { title:'Kampung Salaka Bogor',             img:'https://1.bp.blogspot.com/-7svP1mQFcl0/Xg2HhGbBnJI/AAAAAAAAEu0/F7HQZNtin1QhiZikS0-YISGuhmq7Uq6rACLcBGAsYHQ/s1600/harga-tiket-masuk-dan-lokasi-kampung-salaka-bogor.jpg', lokasi:'Sentul', href:'https://travelandword.com/kampoeng-salaka-bogor/' },
            { title:'Agrowisata Gunung Mas Tea Bridge', img:'https://www.nativeindonesia.com/foto/2020/09/rainbow-slide-gunung-mas.jpg', lokasi:'Puncak', href:'https://maps.app.goo.gl/Sa3N2VFd1ZFNKj6P6' },
            { title:'Kampung Air Katulampa',           img:'https://assets.pikiran-rakyat.com/crop/0x0:0x0/1200x675/photo/2024/06/10/2976512471.jpg', lokasi:'Katulampa', href:'https://wisatago.com/kampung-air-katulampa/' },
          ],
          curug: [
            { title:'Curug Cilember',        img:'https://www.senangrekreasi.com/wp-content/uploads/2023/01/Curug-cilember-1.jpeg',           href:'https://maps.google.com/?q=Curug+Cilember' },
            { title:'Curug Leuwi Hejo',      img:'https://mundomaya.travel/wp-content/uploads/2021/08/Curug-Leuwi-Hejo.jpg', href:'https://maps.app.goo.gl/BFnmbQnyzrtpnk6s7' },
            { title:'Curug Bidadari',        img:'https://campatour.com/wp-content/uploads/2021/06/Curug-Bidadari.jpg', href:'https://maps.app.goo.gl/UGkC5MUBSRZzEPK86' },
            { title:'Curug Nangka',          img:'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9HrARFWB6704wfiZo6_orgqpGdtjq-IvL0ECA-xELOiAhTQobF2ipPwpqDL5Zv1ntMuvLyyffgXZoxFpExsgqs2uTerfOB1InFWRFiMZmIQpNj1DhEq5BXzcQO5UY3NLjc383V4HBtr_UtR78T_4Sd1qLYTlAKGWrvMd35csR8Ppmw2EK0Q0yduQB/s964/curug-nangka.jpg', href:'https://maps.app.goo.gl/NGG81yFRrXNes3d59' },
            { title:'Curug Cipamingkis',     img:'https://tse4.mm.bing.net/th/id/OIP.H9iGBFKIjFOU3zwqvXm3MgHaEQ?pid=Api&P=0&h=180', href:'https://maps.app.goo.gl/tVndpkunJnthvciR7' },
            { title:'Curug Cikaracak',       img:'https://i0.wp.com/www.pesisir.net/wp-content/uploads/2023/06/Alamat-Curug-Cikaracak-Bogor.webp?resize=640%2C427&ssl=1',  href:'https://maps.app.goo.gl/oSdPuYEfXq6tFqjeA' },
            { title:'Curug Luhur',           img:'https://tse3.mm.bing.net/th/id/OIP.SH0MCGaQf_iSgOAA8Q6WxgHaFg?pid=Api&P=0&h=180', href:'https://maps.app.goo.gl/ZAJitKNjzrgvpBDP8' },
            { title:'Curug Seribu',          img:'https://campatour.com/wp-content/uploads/2021/06/1a912ec24b80-1.jpg', href:'https://maps.app.goo.gl/h88u1gsWm7UFbywo9' },
            { title:'Curug Cigamea',         img:'https://liburanyuk.co.id/wp-content/uploads/2021/04/@fachrul_rizky87-1024x768.jpg', href:'https://maps.app.goo.gl/mFg7HXph2kvbo2PG9' },
            { title:'Curug Cibaliung',       img:'https://tse2.mm.bing.net/th/id/OIP.4-ESBidEIup8xp6dP8rJoQHaFS?pid=Api&P=0&h=180', href:'https://maps.app.goo.gl/T9jy32UqgrkRigxL7' },
            { title:'Curug Putri Kencana',   img:'https://campatour.com/wp-content/uploads/2022/12/curug-putri-kencanan.jpg', href:'https://maps.app.goo.gl/xwRyw3sG2VzWjgyt9' },
            { title:'Curug Ciherang',        img:'https://tse2.mm.bing.net/th/id/OIP.y4ZAyWULvMHowASC0UaksQHaEc?pid=Api&P=0&h=180', href:'https://maps.app.goo.gl/WiBBqkhSypv1AK6i9' },
            { title:'Curug Pangeran',        img:'https://cdn.idntimes.com/content-images/post/20211009/anjarbangor-30-1633788591739194-bf9ff542c11fdb60c5d576fe2baf494d_600x400.jpg', href:'https://maps.app.goo.gl/invhBEUGX1qwdTVFA' },
            { title:'Curug Balong Endah',    img:'https://tse2.mm.bing.net/th/id/OIP.wmbZF_1Sw_ElHMsoxIdPngHaJQ?pid=Api&P=0&h=180', href:'https://maps.app.goo.gl/uYV2evSCTHXN3kPi8' },
            { title:'Curug Ngumpet',         img:'https://www.itrip.id/wp-content/uploads/2022/02/Alamat-Curug-Ngumpet.jpg', href:'https://maps.app.goo.gl/DAWFFXjisJxc9DPv6' },
            { title:'Curug Hordeng',         img:'https://tse1.mm.bing.net/th/id/OIP.37TG_P7wS-UY2gC1Uw9J4AHaEc?pid=Api&P=0&h=180', href:'https://maps.app.goo.gl/1zSqQiUZUKidK4Vs6' },
            { title:'Curug Kembar (Leuwi Hejo)', img:'https://mundomaya.travel/wp-content/uploads/2021/08/Curug-Leuwi-Hejo.jpg',  href:'https://maps.app.goo.gl/B8cfCeBDuMgvu6RT9' },
            { title:'Curug Barong',          img:'https://wisatapemalang.com/wp-content/uploads/2021/11/Wisata-Pemalang-Curug-Barong-Desa-Simpur-Pemalang16-780x585.jpg',   href:'https://maps.app.goo.gl/5zW28bqEpo6Chg718' },
            { title:'Leuwi Lieuk',           img:'https://tse3.mm.bing.net/th/id/OIP.8Hrc-M6v0CHOCAmjAb8k8gHaFv?pid=Api&P=0&h=180',   href:'https://maps.app.goo.gl/FY8bBaKjVKLUX9cz5' },

          ]
        };
    

      let currentType = 'wisata';
      const PAGE = 8;    
      let page = 1;      
      let query = '';
    
      const fallback = (e)=>{ e.target.onerror=null; e.target.src='https://dummyimage.com/800x500/1f2937/e9eef5&text=Foto+tidak+tersedia'; };
    
      function getFiltered(){
        const list = DEST[currentType] || [];
        if (!query.trim()) return list;
        const q = query.toLowerCase();
        return list.filter(it => (it.title+it.lokasi).toLowerCase().includes(q));
      }
    
      function render(){
        const all = getFiltered();
        const slice = all.slice(0, page*PAGE);
    
        grid.innerHTML = slice.map(it => `
          <a class="dest-card" data-lb href="${it.img}" title="${it.title}">
            <img src="${it.img}" alt="${it.title}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='https://dummyimage.com/800x500/1f2937/e9eef5&text=Foto+tidak+tersedia'">
            <div class="card-body">
              <h3>${it.title}</h3>
              <p class="muted">${it.lokasi||''}</p>
            </div>
          </a>
        `).join('');
    
      
        if (slice.length < all.length){ 
          more.style.display = '';
        } else {
          more.style.display = 'none';
        }
      }
    
      
      tabs.forEach(b=>{
        b.addEventListener('click', ()=>{
          tabs.forEach(x=>{ x.classList.remove('active'); x.setAttribute('aria-selected','false'); });
          b.classList.add('active'); b.setAttribute('aria-selected','true');
          currentType = b.dataset.type;
          page = 1;
          render();
        });
      });
    
      search && search.addEventListener('input', ()=>{
        query = search.value || '';
        page = 1;
        render();
      });
    
      more && more.addEventListener('click', ()=>{
        page += 1;
        render();
      });
    
      
      render();
    })();

    
    
      const kTrack = $('#kulinerTrack');
      const kPrev  = $('#kulinerPrev');
      const kNext  = $('#kulinerNext');
      const kScrollBy = amt => kTrack && kTrack.scrollBy({ left: amt, behavior: 'smooth' });
    
      if (kTrack) {
        if (kNext) kNext.addEventListener('click', () => kScrollBy(kTrack.clientWidth * 0.8));
        if (kPrev) kPrev.addEventListener('click', () => kScrollBy(-kTrack.clientWidth * 0.8));
    
        
        let isDown = false, startX = 0, startLeft = 0;
        kTrack.addEventListener('pointerdown', e => {
          isDown = true;
          startX = e.clientX;
          startLeft = kTrack.scrollLeft;
          kTrack.setPointerCapture(e.pointerId);
        });
        kTrack.addEventListener('pointermove', e => {
          if (!isDown) return;
          kTrack.scrollLeft = startLeft - (e.clientX - startX);
        });
        ['pointerup', 'pointercancel', 'pointerleave'].forEach(evt => {
          kTrack.addEventListener(evt, () => { isDown = false; });
        });
    
      
        kTrack.setAttribute('tabindex', '0');
        kTrack.addEventListener('keydown', e => {
          if (e.key === 'ArrowRight') kScrollBy(kTrack.clientWidth * 0.6);
          if (e.key === 'ArrowLeft')  kScrollBy(-kTrack.clientWidth * 0.6);
        });
      }


  (() => {
      const $  = (q, c=document) => c.querySelector(q);
      const $$ = (q, c=document) => Array.from(c.querySelectorAll(q));
    
    
      const modeBtns = $$('#stats .seg-btn');
      const vEls = { d:$('#vDay'), w:$('#vWeek'), m:$('#vMonth'), y:$('#vYear'), t:$('#vTotal') };
      const setStat = (el, n) => el && (el.textContent = Number(n||0).toLocaleString('id-ID'));
    

      const activeBtnEl = $('#stats .seg-btn.active') || modeBtns[0];
      let CURRENT_MODE = (activeBtnEl && activeBtnEl.dataset.mode) || 'h';
    
      modeBtns.forEach(b=>{
        const on = b === activeBtnEl;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    

      const pad = n => String(n).padStart(2,'0');
      function getPeriodKeys(d=new Date()){
        const dayKey   = `day-${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`;
        const base = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const dow  = (base.getDay()+6)%7;               // 0=Senin
        const mon  = new Date(base); mon.setDate(base.getDate()-dow);
        const weekKey  = `week-${mon.getFullYear()}${pad(mon.getMonth()+1)}-W${pad(mon.getDate())}`;
        const monthKey = `month-${d.getFullYear()}${pad(d.getMonth()+1)}`;
        const yearKey  = `year-${d.getFullYear()}`;
        return { dayKey, weekKey, monthKey, yearKey, totalKey:'total' };
      }
      let PERIOD = getPeriodKeys();
    

      const readBox  = (k)=>{ try{ return JSON.parse(localStorage.getItem(k)||'{}'); }catch{ return {}; } };
      const writeBox = (k,o)=> localStorage.setItem(k, JSON.stringify(o));
    
    
      const DISPLAY_SEED = {
        h: { day: 12, week: 80, month: 350, year: 1200, total: 5600 },
        s: { day:  7, week: 45, month: 210, year:  900, total: 3200 },
      };
      const withSeed = (mode, obj)=>({
        [PERIOD.dayKey]:   (obj[PERIOD.dayKey]   || 0) + (DISPLAY_SEED[mode]?.day   || 0),
        [PERIOD.weekKey]:  (obj[PERIOD.weekKey]  || 0) + (DISPLAY_SEED[mode]?.week  || 0),
        [PERIOD.monthKey]: (obj[PERIOD.monthKey] || 0) + (DISPLAY_SEED[mode]?.month || 0),
        [PERIOD.yearKey]:  (obj[PERIOD.yearKey]  || 0) + (DISPLAY_SEED[mode]?.year  || 0),
        [PERIOD.totalKey]: (obj[PERIOD.totalKey] || 0) + (DISPLAY_SEED[mode]?.total || 0),
      });
    
      function renderFromBox(box, mode=CURRENT_MODE){
        const b = withSeed(mode, box || {});
        setStat(vEls.d, b[PERIOD.dayKey]   || 0);
        setStat(vEls.w, b[PERIOD.weekKey]  || 0);
        setStat(vEls.m, b[PERIOD.monthKey] || 0);
        setStat(vEls.y, b[PERIOD.yearKey]  || 0);
        setStat(vEls.t, b[PERIOD.totalKey] || 0);
      }
    
    
      const SKEY = 'vbox_session';      
      const HKEY = 'vbox_hits';         
      const S_LAST = 'vc_last_seen';
      const SESSION_MS = 30 * 60 * 1000;
      const nowTs = Date.now();
      const lastSeen = +(localStorage.getItem(S_LAST) || 0);
      const NEW_SESSION = !lastSeen || (nowTs - lastSeen) > SESSION_MS;
      localStorage.setItem(S_LAST, String(nowTs));
    
      function bumpHitsLocal(){
        const box = readBox(HKEY);
        box[PERIOD.totalKey] = (box[PERIOD.totalKey]||0) + 1;
        box[PERIOD.dayKey]   = (box[PERIOD.dayKey]  ||0) + 1;
        box[PERIOD.weekKey]  = (box[PERIOD.weekKey] ||0) + 1;
        box[PERIOD.monthKey] = (box[PERIOD.monthKey]||0) + 1;
        box[PERIOD.yearKey]  = (box[PERIOD.yearKey] ||0) + 1;
        writeBox(HKEY, box);
        return box;
      }
      function bumpSessionLocal(){
        const box = readBox(SKEY);
        if (NEW_SESSION){
          box[PERIOD.totalKey] = (box[PERIOD.totalKey]||0) + 1;
          box[PERIOD.dayKey]   = (box[PERIOD.dayKey]  ||0) + 1;
          box[PERIOD.weekKey]  = (box[PERIOD.weekKey] ||0) + 1;
          box[PERIOD.monthKey] = (box[PERIOD.monthKey]||0) + 1;
          box[PERIOD.yearKey]  = (box[PERIOD.yearKey] ||0) + 1;
          writeBox(SKEY, box);
        }
        return box;
      }
  
      const boxHLocal = bumpHitsLocal();
      const boxSLocal = bumpSessionLocal();

      const CKEY_S = 'vbox_cache_global_s';
      const CKEY_H = 'vbox_cache_global_h';
      const TTL = 10 * 60 * 1000;
      const readCache = (k)=>{ try{
        const { ts, data } = JSON.parse(localStorage.getItem(k) || '{}');
        if (ts && (Date.now()-ts) < TTL) return data;
      }catch{} return null; };
      const writeCache = (k,data)=> localStorage.setItem(k, JSON.stringify({ts:Date.now(), data}));

      const cacheS = readCache(CKEY_S);
      const cacheH = readCache(CKEY_H);
      if (cacheS || cacheH) renderFromBox(CURRENT_MODE==='s' ? cacheS : cacheH);
      else                  renderFromBox(CURRENT_MODE==='s' ? boxSLocal : boxHLocal);
    
    
      const USE_GLOBAL = true;
      const NAMESPACE  = 'kab-bogor-demo'; // GANTI ke nama unik situsmu!
      const capi = {
        hit:(k)=> fetch(`https://api.countapi.xyz/hit/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(k)}`),
        get:(k)=> fetch(`https://api.countapi.xyz/get/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(k)}`)
      };
      const GKEY = (p)=>({
        day:`${p}-${PERIOD.dayKey}`, week:`${p}-${PERIOD.weekKey}`,
        month:`${p}-${PERIOD.monthKey}`, year:`${p}-${PERIOD.yearKey}`,
        total:`${p}-total`
      });
    
      async function syncGlobal(){
        if (!USE_GLOBAL) return;
        const sK = GKEY('s'), hK = GKEY('h');
        try{

          const [sRes, hRes] = await Promise.all([
            Promise.all([sK.day,sK.week,sK.month,sK.year,sK.total].map(capi.get)),
            Promise.all([hK.day,hK.week,hK.month,hK.year,hK.total].map(capi.get)),
          ]);
          const sVals = await Promise.all(sRes.map(r => r.ok ? r.json() : {value:0}));
          const hVals = await Promise.all(hRes.map(r => r.ok ? r.json() : {value:0}));
    
          const boxS = {
            [PERIOD.dayKey]:sVals[0].value|0, [PERIOD.weekKey]:sVals[1].value|0,
            [PERIOD.monthKey]:sVals[2].value|0, [PERIOD.yearKey]:sVals[3].value|0,
            [PERIOD.totalKey]:sVals[4].value|0
          };
          const boxH = {
            [PERIOD.dayKey]:hVals[0].value|0, [PERIOD.weekKey]:hVals[1].value|0,
            [PERIOD.monthKey]:hVals[2].value|0, [PERIOD.yearKey]:hVals[3].value|0,
            [PERIOD.totalKey]:hVals[4].value|0
          };
    
          writeCache(CKEY_S, boxS);
          writeCache(CKEY_H, boxH);
          renderFromBox(CURRENT_MODE==='s' ? boxS : boxH);
    
        
          const sHitReqs = NEW_SESSION ? [sK.day,sK.week,sK.month,sK.year,sK.total].map(capi.hit) : [];
          const hHitReqs = [hK.day,hK.week,hK.month,hK.year,hK.total].map(capi.hit);
          await Promise.all([...sHitReqs, ...hHitReqs]);
    
        }catch{/* offline/limit: biarkan pakai cache/lokal */}
      }
      syncGlobal();
    

      modeBtns.forEach(btn=>{
        btn.addEventListener('click', ()=>{
          modeBtns.forEach(b=>{ b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
          btn.classList.add('active'); btn.setAttribute('aria-selected','true');
          CURRENT_MODE = btn.dataset.mode; 
          const cache = CURRENT_MODE==='s' ? readCache(CKEY_S) : readCache(CKEY_H);
          renderFromBox(cache || readBox(CURRENT_MODE==='s'? SKEY : HKEY));
        });
      });

      let lastKeys = PERIOD;
      setInterval(()=>{
        const nowKeys = getPeriodKeys(new Date());
        if (nowKeys.dayKey!==lastKeys.dayKey ||
            nowKeys.weekKey!==lastKeys.weekKey ||
            nowKeys.monthKey!==lastKeys.monthKey ||
            nowKeys.yearKey!==lastKeys.yearKey){
          PERIOD = nowKeys; lastKeys = nowKeys;
          const cache = CURRENT_MODE==='s' ? readCache(CKEY_S) : readCache(CKEY_H);
          renderFromBox(cache || readBox(CURRENT_MODE==='s'? SKEY : HKEY));
          syncGlobal();
        }
      }, 30*1000);
    })();
    
    
    
    
      const STORAGE_KEY = 'user_testimonies';
      const SEED = []; 
    
      const tsTrack   = $('#tsTrack');
      const tsForm    = $('#tsForm');
      const tsName    = $('#tsName');
      const tsJob     = $('#tsJob');
      const tsText    = $('#tsText');
      const tsMsg     = $('#tsMsg');
      const tsLimit   = $('#tsLimit');
      const tsDelCurr = $('#tsClear'); 
      const tsPrevBtn = $('#tsPrev');
      const tsNextBtn = $('#tsNext');
    
      if (tsLimit) tsLimit.textContent = '0/300';
    
      const esc = (s = '') =>
        String(s)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
    
      const getSaved = () => {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
        catch { return []; }
      };
      const save = arr => localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    
      let userItems = getSaved();
      let items     = [...SEED, ...userItems];
    
      let tsIndex = 0;
      let tsTimer;
    
      const setTs = i => { if (tsTrack) tsTrack.style.transform = `translateX(-${i * 100}%)`; };
    
      const updateControlsState = () => {
        const canSlide = items.length > 1;
        if (tsPrevBtn) tsPrevBtn.disabled = !canSlide;
        if (tsNextBtn) tsNextBtn.disabled = !canSlide;
        if (!canSlide) clearInterval(tsTimer);
      };
    
      const renderTs = () => {
        if (!tsTrack) return;
    
        if (items.length === 0) {
          tsTrack.innerHTML = `<div class="testi"><p class="muted">Belum ada testimoni. Jadilah yang pertama!</p></div>`;
          tsIndex = 0;
          setTs(0);
          updateControlsState();
          return;
        }
    
        const seedLen = SEED.length;
        tsTrack.innerHTML = items
          .map((t, i) => {
            const deletable = i >= seedLen; 
            const delBtn = deletable
              ? `<div class="row-actions" style="margin-top:10px">
                  <button class="btn danger sm ts-del" data-i="${i - seedLen}">Hapus testimoni ini</button>
                </div>`
              : '';
            return `
              <div class="testi">
                <p>“${esc(t.text)}”</p>
                <p class="meta">— ${esc(t.name)}${t.job ? ', ' + esc(t.job) : ''}</p>
                ${delBtn}
              </div>`;
          })
          .join('');
    

        $$('.ts-del', tsTrack).forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = +btn.dataset.i; 
            if (Number.isNaN(idx)) return;
            if (!confirm('Hapus testimoni ini?')) return;
            userItems.splice(idx, 1);
            save(userItems);
            items = [...SEED, ...userItems];
            if (tsIndex >= items.length) tsIndex = Math.max(0, items.length - 1);
            renderTs();
            startAuto();
            if (tsMsg) {
              tsMsg.textContent = 'Testimoni dihapus.';
              setTimeout(() => (tsMsg.textContent = ''), 2000);
            }
          });
        });
    
        if (tsIndex >= items.length) tsIndex = items.length - 1;
        if (tsIndex < 0) tsIndex = 0;
        setTs(tsIndex);
        updateControlsState();
      };
    
      const nextTs = () => {
        if (items.length <= 1) return;
        tsIndex = (tsIndex + 1) % items.length;
        setTs(tsIndex);
      };
    
      const prevTs = () => {
        if (items.length <= 1) return;
        tsIndex = (tsIndex - 1 + items.length) % items.length;
        setTs(tsIndex);
      };
    
      const startAuto = () => {
        clearInterval(tsTimer);
        if (items.length > 1) tsTimer = setInterval(nextTs, 4000);
      };
    
      renderTs();
      startAuto();
    
      if (tsNextBtn) tsNextBtn.addEventListener('click', () => { nextTs(); startAuto(); });
      if (tsPrevBtn) tsPrevBtn.addEventListener('click', () => { prevTs(); startAuto(); });
    
      if (tsText) {
        tsText.addEventListener('input', () => {
          if (tsLimit) tsLimit.textContent = `${tsText.value.length}/300`;
        });
      }
    
      if (tsForm) {
        tsForm.addEventListener('submit', e => {
          e.preventDefault();
          const name = tsName.value.trim();
          const job  = tsJob.value.trim();
          const text = tsText.value.trim();
    
          if (text.length < 10) {
            if (tsMsg) tsMsg.textContent = 'Testimoni terlalu pendek. Minimal 10 karakter.';
            return;
          }
          if (text.length > 300) {
            if (tsMsg) tsMsg.textContent = 'Testimoni terlalu panjang. Maksimum 300 karakter.';
            return;
          }
    
          const newItem = { name: name || 'Anonim', job, text };
          userItems.push(newItem);
          save(userItems);
          items = [...SEED, ...userItems];
    
          if (tsMsg) tsMsg.textContent = 'Terima kasih! Testimonimu sudah ditambahkan.';
          tsForm.reset();
          if (tsLimit) tsLimit.textContent = '0/300';
    
          tsIndex = items.length - 1;
          renderTs();
          startAuto();
        });
      }
    
      
      if (tsDelCurr) {
        tsDelCurr.addEventListener('click', () => {
          const seedLen = SEED.length;
          if (tsIndex < seedLen) {
            if (tsMsg) {
              tsMsg.textContent = 'Ini testimoni bawaan, tidak bisa dihapus.';
              setTimeout(() => (tsMsg.textContent = ''), 2000);
            }
            return;
          }
          const idx = tsIndex - seedLen; 
          if (!confirm('Hapus testimoni ini?')) return;
          userItems.splice(idx, 1);
          save(userItems);
          items = [...SEED, ...userItems];
          if (tsIndex >= items.length) tsIndex = Math.max(0, items.length - 1);
          renderTs();
          startAuto();
          if (tsMsg) {
            tsMsg.textContent = 'Testimoni dihapus.';
            setTimeout(() => (tsMsg.textContent = ''), 2000);
          }
        });
      }
    

      const faqs = [
        { q: 'Kapan waktu terbaik ke Bogor?', a: 'Pagi hari atau hari kerja untuk menghindari macet, terutama ke Puncak.' },
        { q: 'Oleh-oleh khas apa yang direkomendasikan?', a: 'Roti unyil, asinan, dan olahan talas (bolu/keripik).' },
        { q: 'Apakah ramah keluarga?', a: 'Ya, banyak destinasi ramah anak: Kebun Raya, Taman Safari, dan curug ringan.' },
      ];
      const faqBox = $('#faqBox');
      if (faqBox) {
        faqBox.innerHTML = faqs
          .map((f, i) => `
            <div class="acc-item${i === 0 ? ' open' : ''}">
              <button class="acc-head" aria-expanded="${i === 0 ? 'true' : 'false'}">
                <span>${f.q}</span><span>${i === 0 ? '−' : '+'}</span>
              </button>
              <div class="acc-body">${f.a}</div>
            </div>`)
          .join('');
    
        $$('.acc-head', faqBox).forEach(head => {
          head.addEventListener('click', () => {
            const item = head.closest('.acc-item');
            const open = item.classList.toggle('open');
            head.setAttribute('aria-expanded', open ? 'true' : 'false');
            head.querySelector('span:last-child').textContent = open ? '−' : '+';
          });
        });
      }
    

      const form = $('#feedbackForm');
      const msg  = $('#formMsg');
      if (form) {
        form.addEventListener('submit', e => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(form).entries());
          const box  = JSON.parse(localStorage.getItem('feedbacks') || '[]');
          box.push({ ...data, time: new Date().toISOString() });
          localStorage.setItem('feedbacks', JSON.stringify(box));
          if (msg) msg.textContent = 'Terima kasih! Pesanmu sudah tersimpan';
          form.reset();
          setTimeout(() => { if (msg) msg.textContent = ''; }, 3500);
        });
      }
    })();
    


  (function(){
      const $ = (q, c=document)=> c.querySelector(q);
      const tempEl = $('#wTemp'), descEl = $('#wDesc'), rainEl = $('#wRain'),
            windEl = $('#wWind'), updEl = $('#wUpdated'), canvas = document.getElementById('wChart');
      if (!tempEl || !canvas) return; 
    
      const LAT = -6.6, LON = 106.8;   
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&timezone=Asia%2FJakarta&current=temperature_2m,weather_code,precipitation,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code`;
    
      const WMO = {
        0:'Cerah', 1:'Cerah sebagian', 2:'Berawan', 3:'Berawan tebal',
        45:'Berkabut', 48:'Kabut', 51:'Gerimis ringan', 53:'Gerimis', 55:'Gerimis lebat',
        61:'Hujan ringan', 63:'Hujan', 65:'Hujan lebat', 66:'Hujan es ringan', 67:'Hujan es',
        71:'Salju', 80:'Hujan lokal', 81:'Hujan sedang', 82:'Hujan deras',
        95:'Badai petir', 96:'Badai petir + es', 99:'Badai petir ekstrim'
      };
    
      fetch(url).then(r=>r.json()).then(d=>{
      
        const cur = d.current;
        tempEl.textContent = Math.round(cur.temperature_2m);
        descEl.textContent = WMO[cur.weather_code] || '—';
        rainEl.textContent = (Math.round((d.hourly.precipitation_probability[0] ?? 0)) + '%');
        windEl.textContent = Math.round(cur.wind_speed_10m) + ' km/j';
        updEl.textContent  = new Date().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
    
    
        const nowIso = new Date().toISOString().slice(0,13);
        const idxNow = Math.max(0, d.hourly.time.findIndex(t => t.startsWith(nowIso)));
        const n = 12;
        const hours = d.hourly.time.slice(idxNow, idxNow+n).map(t => t.slice(11,13)); // "HH"
        const temps = d.hourly.temperature_2m.slice(idxNow, idxNow+n).map(v => Math.round(v));
        const pops  = d.hourly.precipitation_probability.slice(idxNow, idxNow+n).map(v => Number(v||0));
    
        const css  = getComputedStyle(document.documentElement);
        const colText  = css.getPropertyValue('--text').trim()   || '#e9eef5';
        const colMuted = css.getPropertyValue('--muted').trim()  || '#9fb0c6';
        const colA     = css.getPropertyValue('--brand').trim()  || '#6ec207'; 
        const colB     = css.getPropertyValue('--brand-2').trim()|| '#8de02c'; 
    
        
        const ctx = (()=>{
          const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
          const rect = canvas.getBoundingClientRect();
          canvas.width  = Math.floor(rect.width * dpr);
          canvas.height = Math.floor(rect.height * dpr);
          const ctx = canvas.getContext('2d');
          ctx.setTransform(dpr,0,0,dpr,0,0);
          return ctx;
        })();
    
        const W = canvas.clientWidth, H = canvas.clientHeight;
        const m = { t: 18, r: 10, b: 30, l: 34 };
        ctx.clearRect(0,0,W,H);
    

        const tMin = Math.min(...temps) - 1;
        const tMax = Math.max(...temps) + 1;
        const innerW = W - m.l - m.r, innerH = H - m.t - m.b;
        const x = i => m.l + (hours.length<=1 ? innerW/2 : (i*innerW/(hours.length-1)));
        const yT= v => H - m.b - ((v - tMin)/(tMax - tMin)) * innerH;
    
      
        ctx.strokeStyle = colMuted; ctx.globalAlpha=.35; ctx.lineWidth=1; ctx.beginPath();
        for (let g=0; g<=4; g++){ const y = m.t + (innerH*g/4); ctx.moveTo(m.l,y); ctx.lineTo(W-m.r,y); }
        ctx.stroke(); ctx.globalAlpha=1;
    

        ctx.fillStyle = colMuted; ctx.font='12px system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
        ctx.textAlign='right'; ctx.textBaseline='middle';
        ctx.fillText(tMax.toString()+'°', m.l-6, yT(tMax));
        ctx.fillText(tMin.toString()+'°', m.l-6, yT(tMin));

        ctx.textAlign='center'; ctx.textBaseline='top';
        hours.forEach((h,i)=>{ if (i===0 || i===hours.length-1 || i%2===0) ctx.fillText(h, x(i), H-m.b+6); });
    
    
        const barMax = Math.min(60, innerH*0.45);
        ctx.fillStyle = colB; ctx.globalAlpha=.65;
        pops.forEach((p,i)=>{
          const bw = Math.max(6, innerW/(hours.length*1.8));
          const bh = (p/100) * barMax;
          const bx = x(i) - bw/2, by = H - m.b - bh;
          ctx.fillRect(bx, by, bw, bh);
        });
        ctx.globalAlpha=1;
    

        ctx.strokeStyle = colA; ctx.lineWidth=2; ctx.beginPath();
        temps.forEach((v,i)=>{ if(!i) ctx.moveTo(x(i),yT(v)); else ctx.lineTo(x(i),yT(v)); });
        ctx.stroke();
        ctx.fillStyle = colA;
        temps.forEach((v,i)=>{ ctx.beginPath(); ctx.arc(x(i), yT(v), 2.75, 0, Math.PI*2); ctx.fill(); });
  
        ctx.fillStyle = colText; ctx.font='600 13px system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
        ctx.textAlign='left'; ctx.fillText('Suhu (°C)', m.l, m.t-4);
        ctx.fillStyle = colMuted; ctx.textAlign='right';
        ctx.fillText('Bar: % hujan', W-m.r, m.t-4);
    
      
        let raf; const onResize=()=>{ cancelAnimationFrame(raf); raf = requestAnimationFrame(()=>{ // redraw cepat
          
          try { (window.redrawWeather && window.redrawWeather()); } catch {}
        });};
        window.addEventListener('resize', onResize, {passive:true});
        window.redrawWeather = ()=>{ 
        
          const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
          const rect = canvas.getBoundingClientRect();
          canvas.width  = Math.floor(rect.width * dpr);
          canvas.height = Math.floor(rect.height * dpr);
          const ctx2 = canvas.getContext('2d'); ctx2.setTransform(dpr,0,0,dpr,0,0);
      
        };
      }).catch(()=>{
        descEl.textContent = 'Gagal memuat cuaca (offline?)';
      });
    })();


  (() => {
      const LAT = -6.595;    
      const LON = 106.816;
      const CACHE_KEY = 'wx_bogor_cache_v1';
      const TTL = 10 * 60 * 1000; 
    
      const elTemp = document.getElementById('wxTemp');
      const elDesc = document.getElementById('wxDesc');
      const elWind = document.getElementById('wxWind');
      const elRain = document.getElementById('wxRain');
      const elUpd  = document.getElementById('wxUpdated');
    
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
                  `&current=temperature_2m,weather_code,precipitation_probability,wind_speed_10m` +
                  `&hourly=temperature_2m,precipitation_probability&timezone=Asia%2FJakarta`;
    
      const wxText = (code)=>({
        0:'Cerah', 1:'Cerah berawan', 2:'Berawan', 3:'Berawan tebal',
        45:'Berkabut', 48:'Embun beku', 51:'Gerimis ringan', 53:'Gerimis',
        55:'Gerimis lebat', 61:'Hujan ringan', 63:'Hujan', 65:'Hujan lebat',
        80:'Hujan lokal', 81:'Hujan sedang', 82:'Hujan lebat'
      }[code] || '—');
    
      function render(d){
        if(!d?.current) return;
        const c = d.current;
        if (elTemp) elTemp.textContent = Math.round(c.temperature_2m) + '°';
        if (elDesc) elDesc.textContent = wxText(c.weather_code);
        if (elWind) elWind.textContent = (Math.round(c.wind_speed_10m) || 0) + ' km/j';
        if (elRain) elRain.textContent = (c.precipitation_probability ?? 0) + '%';
        if (elUpd)  elUpd.textContent  = new Date().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
    
        if (window.drawWxChart) window.drawWxChart(d.hourly);
      }
    
      async function load(force=false){

        if (!force){
          try{
            const { ts, data } = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
            if (ts && (Date.now()-ts) < TTL){
              render(data);
            }
          }catch{}
        }
    
        try{
          const res = await fetch(url);
          const data = await res.json();
          localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
          render(data);
        }catch(e){

        }
      }
    
      load(true);                
      setInterval(()=>load(true), TTL);  
      window.addEventListener('online', ()=> load(true));
    })();


  (() => {
      const $  = (q,c=document)=>c.querySelector(q);
      const $$ = (q,c=document)=>Array.from(c.querySelectorAll(q));
    
      const grid   = $('#destGrid');
      const more   = $('#destMore');
      const search = $('#destSearch');
      const tabs   = $$('.seg-btn', $('#destinasi'));
      if (!grid) return;
    
      
      const DEST = {
          wisata: [
            { title:'Taman Safari Bogor',              img:'./img/safari.jpg', lokasi:'Cisarua',             href:'https://tamansafari.com/' },
            { title:'Kebun Raya Bogor',                img:'https://storage.googleapis.com/seo-cms/assets/kebun_raya_bogor_1_9332196c17/kebun_raya_bogor_1_9332196c17.jpg', lokasi:'Kota Bogor', href:'https://kebunraya.id/r/bogor' },
            { title:'Museum Zoologi',                  img:'https://media.suara.com/pictures/970x544/2021/08/29/23484-museum-zoologi-bogor.jpg', lokasi:'Kota Bogor', href:'https://kebunraya.id/r/bogor/museum-zoologi' },
            { title:'Taman Matahari',                  img:'https://tse3.mm.bing.net/th/id/OIP.hPynZFsA54cDEFrzkelK_wHaGy?pid=Api&P=0&h=180', lokasi:'Cisarua',     href:'https://www.tamanwisatamatahari.id/' },
            { title:'Gunung Mas (Kebun Teh)',          img:'https://tse4.mm.bing.net/th/id/OIP.TU05wPLCyBnx68yoC-QluAHaFj?pid=Api&P=0&h=180', lokasi:'Puncak', href:'https://gunungmaswisatapuncak.com' },
            { title:'JungleLand Adventure Theme Park', img:'https://tse3.mm.bing.net/th/id/OIP.83Y3qrzNFJlw_kB7M-BkwwHaEK?pid=Api&P=0&h=180', lokasi:'Sentul', href:'https://tse3.mm.bing.net/th/id/OIP.83Y3qrzNFJlw_kB7M-BkwwHaEK?pid=Api&P=0&h=180' },
            { title:'The Jungle Water Adventure',      img:'http://3.bp.blogspot.com/-D56iRSla9Og/Vbwx9kIteZI/AAAAAAAABbs/UDCPIvU6oSk/s640/Wisata-The-Jungle-Bogor.jpg', lokasi:'Kota Bogor', href:'https://thejungleadventure.com/' },
            { title:'Devoyage Bogor',                  img:'https://tse4.mm.bing.net/th/id/OIP.8UK24Z80j4FM-3HM0M4USQHaD4?pid=Api&P=0&h=180', lokasi:'Bogor', href:'https://salsawisata.com/devoyage-bogor/' },
            { title:'Kuntum Farmfield',                img:'https://tse2.mm.bing.net/th/id/OIP.IHbRiiQOukTROoz8o9lVHwHaFj?pid=Api&P=0&h=180', lokasi:'Bogor', href:'https://wisatago.com/kuntum-farmfield/' },
            { title:'Cimory Dairyland Puncak',         img:'https://i1.wp.com/travelspromo.com/wp-content/uploads/2022/11/Bangunan-unik-berkincir-angin-di-Cimory-Dairyland-Puncak.webp', lokasi:'Puncak', href:'https://www.cimorydairyland.com/' },
            { title:'Sawah Segar',         img:'https://tse4.mm.bing.net/th/id/OIP.via41Pocp9zC8lmD5I-t0AHaEK?pid=Api&P=0&h=180', lokasi:'bogor', href:'https://www.beben.id/sawah-segar-sentul/' },
            { title:'Setu Taman Sari',         img:'https://tse2.mm.bing.net/th/id/OIP.arc8lsJXWpShFQOqLguh-wHaEK?pid=Api&P=0&h=180', lokasi:'ciapus', href:'https://maps.app.goo.gl/arRDqGTBnXYvM7vj7' },
            { title:'Kampung Budaya Sindangbarang',    img:'https://travelspromo.com/wp-content/uploads/2018/12/Rumah-tradisional-kampung-budaya-sindang-barang.jpg', lokasi:'Tamansari Ciapus', href:'https://www.kampungbudayasunda.com/' },
            { title:'Situ Gede',                       img:'https://cianjurekspres.disway.id/upload/681d51f22752ef48dc40d4e09ec815b9.jpg', lokasi:'Bogor', href:'https://id.wikipedia.org/wiki/Situ_Gede,_Bogor' },
            { title:'Ecopark Sentul',                  img:'https://idntrip.com/wp-content/uploads/Tentang-Ecoart-Park-Sentul-City.png', lokasi:'Sentul', href:'https://pesonakota.com/ecoart-park-sentul-city/' },
            { title:'Sirkuit Sentul',                  img:'./img/circuit.jpg', lokasi:'Sentul', href:'https://maps.google.com/?q=Sentul+International+Circuit' },
            { title:'Highland Park Resort (Glamping)', img:'https://anekatempatwisata.com/wp-content/uploads/2021/06/Highland-Park-Resort-galaxyadventure.jpg', lokasi:'Cijeruk', href:'https://thehighlandparkresortbogor.com/Indonesia/' },
            { title:'Alun-Alun Kota Bogor',            img:'https://img.okezone.com/content/2021/12/17/338/2518587/diresmikan-ridwan-kamil-begini-sederet-fasilitas-di-alun-alun-kota-bogor-diSlYvF4oV.jpg', lokasi:'Kota Bogor', href:'https://maps.app.goo.gl/5TTJamDv2Vt3A1Zw6' },
            { title:'Taman Kencana',                   img:'https://salsawisata.com/wp-content/uploads/2023/01/Taman-Kencana-Bogor.jpg', lokasi:'Kota Bogor', href:'https://salsawisata.com/taman-kencana-bogor/' },
            { title:'Taman Sempur',                    img:'https://cdn0-production-images-kly.akamaized.net/jDriI-BPhU_hXKrtUjwJIzJZP9A=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2741569/original/076610200_1551531047-IMG20190302104751.jpg', lokasi:'Kota Bogor', href:'https://salsawisata.com/taman-sempur/' },
            { title:'Gunung Pancar Hot Spring',        img:'https://rubrikwisata.com/wp-content/uploads/2019/02/wisata-gunung-pancar-sentul.jpg', lokasi:'Babakan Madang', href:'https://www.gunungpancar.com/' },
            { title:'Kampung Salaka Bogor',             img:'https://1.bp.blogspot.com/-7svP1mQFcl0/Xg2HhGbBnJI/AAAAAAAAEu0/F7HQZNtin1QhiZikS0-YISGuhmq7Uq6rACLcBGAsYHQ/s1600/harga-tiket-masuk-dan-lokasi-kampung-salaka-bogor.jpg', lokasi:'Ciapus', href:'https://travelandword.com/kampoeng-salaka-bogor/' },
            { title:'Agrowisata Gunung Mas Tea Bridge', img:'https://www.nativeindonesia.com/foto/2020/09/rainbow-slide-gunung-mas.jpg', lokasi:'Puncak', href:'https://maps.app.goo.gl/Sa3N2VFd1ZFNKj6P6' },
            { title:'Kampung Air Katulampa',           img:'https://assets.pikiran-rakyat.com/crop/0x0:0x0/1200x675/photo/2024/06/10/2976512471.jpg', lokasi:'Katulampa', href:'https://wisatago.com/kampung-air-katulampa/' },
          ],
          curug: [
            { title:'Curug Cilember',        img:'https://www.senangrekreasi.com/wp-content/uploads/2023/01/Curug-cilember-1.jpeg',      href:'https://maps.app.goo.gl/MEC7WRS5LU4xXVb26' },
            { title:'Curug Bidadari',        img:'https://campatour.com/wp-content/uploads/2021/06/Curug-Bidadari.jpg', href:'https://maps.app.goo.gl/UGkC5MUBSRZzEPK86' },
            { title:'Curug Leuwi Hejo',      img:'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200', href:'https://maps.app.goo.gl/BFnmbQnyzrtpnk6s7' },
            { title:'Curug Nangka',          img:'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9HrARFWB6704wfiZo6_orgqpGdtjq-IvL0ECA-xELOiAhTQobF2ipPwpqDL5Zv1ntMuvLyyffgXZoxFpExsgqs2uTerfOB1InFWRFiMZmIQpNj1DhEq5BXzcQO5UY3NLjc383V4HBtr_UtR78T_4Sd1qLYTlAKGWrvMd35csR8Ppmw2EK0Q0yduQB/s964/curug-nangka.jpg', href:'https://maps.app.goo.gl/NGG81yFRrXNes3d59' },
            { title:'Curug Cipamingkis',     img:'https://tse4.mm.bing.net/th/id/OIP.H9iGBFKIjFOU3zwqvXm3MgHaEQ?pid=Api&P=0&h=180', href:'https://maps.app.goo.gl/tVndpkunJnthvciR7' },
            { title:'Curug Cikaracak',       img:'https://i0.wp.com/www.pesisir.net/wp-content/uploads/2023/06/Alamat-Curug-Cikaracak-Bogor.webp?resize=640%2C427&ssl=1',  href:'https://maps.app.goo.gl/oSdPuYEfXq6tFqjeA' },
            { title:'Curug Luhur',           img:'https://tse3.mm.bing.net/th/id/OIP.SH0MCGaQf_iSgOAA8Q6WxgHaFg?pid=Api&P=0&h=180', href:'https://maps.app.goo.gl/ZAJitKNjzrgvpBDP8' },
            { title:'Curug Seribu',          img:'https://campatour.com/wp-content/uploads/2021/06/1a912ec24b80-1.jpg', href:'https://maps.app.goo.gl/h88u1gsWm7UFbywo9' },
            { title:'Curug Cigamea',         img:'https://liburanyuk.co.id/wp-content/uploads/2021/04/@fachrul_rizky87-1024x768.jpg', href:'https://maps.app.goo.gl/mFg7HXph2kvbo2PG9' },
            { title:'Curug Cibaliung',       img:'https://tse2.mm.bing.net/th/id/OIP.4-ESBidEIup8xp6dP8rJoQHaFS?pid=Api&P=0&h=180', href:'https://maps.app.goo.gl/T9jy32UqgrkRigxL7' },
            { title:'Curug Putri Kencana',   img:'https://campatour.com/wp-content/uploads/2022/12/curug-putri-kencanan.jpg', href:'https://maps.app.goo.gl/xwRyw3sG2VzWjgyt9' },
            { title:'Curug Ciherang',        img:'https://tse2.mm.bing.net/th/id/OIP.y4ZAyWULvMHowASC0UaksQHaEc?pid=Api&P=0&h=180', href:'https://maps.app.goo.gl/WiBBqkhSypv1AK6i9' },
            { title:'Curug Pangeran',        img:'https://cdn.idntimes.com/content-images/post/20211009/anjarbangor-30-1633788591739194-bf9ff542c11fdb60c5d576fe2baf494d_600x400.jpg', href:'https://maps.app.goo.gl/invhBEUGX1qwdTVFA' },
            { title:'Curug Balong Endah',    img:'https://tse2.mm.bing.net/th/id/OIP.wmbZF_1Sw_ElHMsoxIdPngHaJQ?pid=Api&P=0&h=180', href:'https://maps.app.goo.gl/uYV2evSCTHXN3kPi8' },
            { title:'Curug Ngumpet',         img:'https://www.itrip.id/wp-content/uploads/2022/02/Alamat-Curug-Ngumpet.jpg', href:'https://maps.app.goo.gl/DAWFFXjisJxc9DPv6' },
            { title:'Curug Hordeng',         img:'https://tse1.mm.bing.net/th/id/OIP.37TG_P7wS-UY2gC1Uw9J4AHaEc?pid=Api&P=0&h=180', href:'https://maps.app.goo.gl/1zSqQiUZUKidK4Vs6' },
            { title:'Curug Kembar (Leuwi Hejo)', img:'https://mundomaya.travel/wp-content/uploads/2021/08/Curug-Leuwi-Hejo.jpg',  href:'https://maps.app.goo.gl/B8cfCeBDuMgvu6RT9' },
            { title:'Curug Barong',          img:'https://wisatapemalang.com/wp-content/uploads/2021/11/Wisata-Pemalang-Curug-Barong-Desa-Simpur-Pemalang16-780x585.jpg',   href:'https://maps.app.goo.gl/5zW28bqEpo6Chg718' },
            { title:'Leuwi Lieuk',           img:'https://tse3.mm.bing.net/th/id/OIP.8Hrc-M6v0CHOCAmjAb8k8gHaFv?pid=Api&P=0&h=180',   href:'https://maps.app.goo.gl/FY8bBaKjVKLUX9cz5' },
          
          ]
        };
    
      // === Koordinat (perkiraan) untuk peta ===
      const COORD = {
          'Taman Safari Bogor': [-6.7110, 106.9510],
          'Kebun Raya Bogor':   [-6.5976, 106.7994],
          'Museum Zoologi':     [-6.5979, 106.7999],
          'Taman Matahari':     [-6.6365, 106.9325],
          'Gunung Mas (Kebun Teh)': [-6.7052, 106.9499],
          'JungleLand Adventure Theme Park': [-6.5610, 106.8623],
          'The Jungle Water Adventure': [-6.6487, 106.8042],
          'Devoyage Bogor':     [-6.6484, 106.8037],
          'Kuntum Farmfield':   [-6.6173, 106.8281],
          'Cimory Dairyland Puncak': [-6.6686, 106.9483],
          'Sawah Segar': [-6.624405620882094, 106.90657699547396],
          'Kampung Budaya Sindangbarang': [-6.6306, 106.7672],
          'Situ Gede':          [-6.5843, 106.7547],
          'Ecopark Sentul':     [-6.5618, 106.8629],
          'Sirkuit Sentul':     [-6.9110, 106.8640],
          'Highland Park Resort (Glamping)': [-6.7012, 106.8207],
          'Alun-Alun Kota Bogor': [-6.5947, 106.7929],
          'Setu Taman Sari': [-6.643982514622362, 106.79246654672015],
          'Taman Kencana':      [-6.5979, 106.7998],
          'Taman Sempur':       [-6.5908, 106.8060],
          'Gunung Pancar Hot Spring': [-6.5717, 106.9217],
          'Kampung Salaka': [-6.672533660805152, 106.73387238771545],
          'Agrowisata Gunung Mas Tea Bridge': [-6.7117, 106.9563],
          'Kampung Air Katulampa': [-6.6191, 106.8385],
        
          // Curug
          'Curug Cilember':     [-6.6603, 106.9525],
          'Curug Leuwi Hejo':   [-6.5605, 106.9153],
          'Curug Bidadari':     [-6.5775, 106.9266],
          'Curug Nangka':       [-6.6506, 106.7777],
          'Curug Cipamingkis':  [-6.6443, 107.0153],
          'Curug Cikaracak':    [-6.7690, 106.8422],
          'Curug Luhur':        [-6.7092, 106.6368],
          'Curug Seribu':       [-6.6874, 106.6234],
          'Curug Cigamea':      [-6.6741, 106.6215],
          'Curug Cibaliung':    [-6.5617, 106.5710],
          'Curug Putri Kencana':[-6.5696, 106.9188],
          'Curug Ciherang':     [-6.6279, 106.9940],
          'Curug Pangeran':     [-6.7067, 106.6377],
          'Curug Balong Endah': [-6.6988, 106.6389],
          'Curug Ngumpet':      [-6.7036, 106.6387],
          'Curug Hordeng':      [-6.5690, 106.9126],
          'Curug Kembar (Leuwi Hejo)': [-6.5614, 106.9136],
          'Curug Barong':       [-6.5629, 106.9109],
          'Leuwi Lieuk':        [-6.5640, 106.9140],
          'Leuwi Cepet':        [-6.5622, 106.9159]
        };
    

      window.DEST  = DEST;
      window.COORD = COORD;
    

      let currentType = 'wisata';
      const PAGE = 8;
      let page = 1;
      let query = '';
    
      function getFiltered() {
        const list = DEST[currentType] || [];
        if (!query.trim()) return list;
        const q = query.toLowerCase();
        return list.filter(it => (it.title + (it.lokasi||'')).toLowerCase().includes(q));
      }
    
      function render() {
        const all   = getFiltered();
        const slice = all.slice(0, page * PAGE);
    
        grid.innerHTML = slice.map(it => `
          <a class="dest-card" data-lb
            href="${it.img}" title="${it.title}"
            data-title="${it.title}"
            data-desc="${(it.lokasi || '').replace(/"/g,'&quot;')}">
            <img src="${it.img}" alt="${it.title}" loading="lazy" decoding="async"
                onerror="this.onerror=null;this.src='https://dummyimage.com/800x500/1f2937/e9eef5&text=Foto+tidak+tersedia'">
            <div class="card-body">
              <h3>${it.title}</h3>
              <p class="muted">${it.lokasi || ''}</p>
            </div>
          </a>
        `).join('');
    
        more.style.display = (slice.length < all.length) ? '' : 'none';
      }

      tabs.forEach(btn => {
        btn.addEventListener('click', () => {
          tabs.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected','false'); });
          btn.classList.add('active'); btn.setAttribute('aria-selected','true');
          currentType = btn.dataset.type; page = 1; render();
          
          if (window.__toggleMapLayer) window.__toggleMapLayer(currentType);
        });
      });
      search && search.addEventListener('input', () => { query = search.value || ''; page = 1; render(); });
      more   && more.addEventListener('click', () => { page += 1; render(); });
    
      render();
    })();
    
    

  (() => {
      const el = document.getElementById('map');
      if (!el || !window.L || !window.DEST || !window.COORD) return;
    
      const map = L.map('map', { scrollWheelZoom: false }).setView([-6.6, 106.8], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '&copy; OpenStreetMap'
      }).addTo(map);
    
      const wisataLayer = L.layerGroup(),
            curugLayer  = L.layerGroup(),
            meLayer     = L.layerGroup();
    
      const color = { wisata:'#22c55e', curug:'#10b981' };
    
      function addMarkers(type, layer) {
        (window.DEST[type] || []).forEach(it => {
          const ll = window.COORD[it.title];
          if (!ll) return;
          const [lat, lon] = ll;
          const site = it.href ? `<a href="${it.href}" target="_blank" rel="noopener">Situs resmi ↗</a> • ` : '';
          L.circleMarker(ll, {
            radius: 7, weight: 2, color:'#0f172a', fillColor: color[type], fillOpacity:.9
          }).addTo(layer).bindPopup(`
            <strong>${it.title}</strong><br>
            <small>${it.lokasi || ''}${it.lokasi ? ' • ' : ''}${type.toUpperCase()}</small><br>
            ${site}<a href="https://www.google.com/maps?q=${lat},${lon}(${encodeURIComponent(it.title)})" target="_blank" rel="noopener">Buka di Maps ↗</a>
          `);
        });
      }
      addMarkers('wisata', wisataLayer);
      addMarkers('curug',  curugLayer);
    
      curugLayer.addTo(map);
      meLayer.addTo(map);

      const Ctl = L.Control.extend({
        options:{ position:'topright' },
        onAdd() {
          const box = L.DomUtil.create('div', 'leaflet-bar');
          box.style.background='#fff'; box.style.padding='8px 10px'; box.style.borderRadius='8px';
          box.innerHTML = `
            <label style="display:block"><input id="cbWisata" type="checkbox"> Wisata</label>
            <label style="display:block"><input id="cbCurug"  type="checkbox" checked> Curug</label>
            <label style="display:block"><input id="cbMe"     type="checkbox" checked> Lokasi saya</label>
          `;
          L.DomEvent.disableClickPropagation(box);
          return box;
        }
      });
      map.addControl(new Ctl());
      const cbWisata = document.getElementById('cbWisata');
      const cbCurug  = document.getElementById('cbCurug');
      const cbMe     = document.getElementById('cbMe');
    
      function refreshLayers() {
    
        if (cbWisata.checked) { if (!map.hasLayer(wisataLayer)) map.addLayer(wisataLayer); }
        else { if (map.hasLayer(wisataLayer)) map.removeLayer(wisataLayer); }
      
        if (cbCurug.checked) { if (!map.hasLayer(curugLayer)) map.addLayer(curugLayer); }
        else { if (map.hasLayer(curugLayer)) map.removeLayer(curugLayer); }
        // Lokasi saya
        if (cbMe.checked) { if (!map.hasLayer(meLayer) && meLayer.getLayers().length) map.addLayer(meLayer); }
        else { if (map.hasLayer(meLayer)) map.removeLayer(meLayer); }
    
    
        const act = [wisataLayer, curugLayer, meLayer].filter(g => map.hasLayer(g) && g.getLayers().length);
        if (act.length) {
          const b = act[0].getBounds(); for (let i=1;i<act.length;i++) b.extend(act[i].getBounds());
          map.fitBounds(b.pad(0.1));
        }
      }
      cbWisata.onchange = cbCurug.onchange = cbMe.onchange = refreshLayers;
    

      const btn = document.getElementById('locBtn');
      function locateMe() {
        if (!navigator.geolocation) { if (btn) btn.textContent = 'Lokasi tidak didukung'; return; }
        if (btn) btn.disabled = true;
        navigator.geolocation.getCurrentPosition(pos => {
          const { latitude: lat, longitude: lon, accuracy } = pos.coords;
          meLayer.clearLayers();
          L.circleMarker([lat, lon], { radius:7, weight:2, color:'#2563eb', fillColor:'#60a5fa', fillOpacity:.9 })
            .addTo(meLayer).bindPopup('Lokasi saya').openPopup();
          if (accuracy) L.circle([lat, lon], { radius:accuracy, color:'#2563eb', fillColor:'#60a5fa', fillOpacity:.12 }).addTo(meLayer);
          if (cbMe.checked) map.addLayer(meLayer);
          refreshLayers();
          if (btn) btn.disabled = false;
        }, () => {
          if (btn) { btn.textContent = 'Izin lokasi ditolak'; btn.disabled = false; }
        }, { enableHighAccuracy:true, timeout:8000 });
      }
      btn && btn.addEventListener('click', () => { cbMe.checked = true; locateMe(); });
    

      window.__toggleMapLayer = (type) => {
        if (type === 'wisata') cbWisata.checked = true;
        if (type === 'curug')  cbCurug.checked  = true;
        refreshLayers();
      };
    

      locateMe();      
      refreshLayers();  
    })();
    
    