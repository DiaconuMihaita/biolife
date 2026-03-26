/**
 * SISTEMUL ENDOCRIN - script.js
 * Logica principala: Loading, Cursor, Mode Toggle,
 * Hero Particles, Mechanism Steps, Blood Animation,
 * Gland Modals, Quiz, Scroll Reveal
 */

// =========================================
// DATE GLANDE (Student + Avansat)
// =========================================
const GLANDS_DATA = {
    hipotalamus: {
        name: "Hipotalamusul",
        subtitle: "Comandantul Sistemului Endocrin",
        icon: "fa-brain",
        gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
        location: "La baza creierului, deasupra hipofizei. Face parte din diencefal.",
        description_student: "Hipotalamusul este ca un general care coordonează toată armata endocrină. El primește semnale de la creier și corp, și le traduce în comenzi hormonale. Este centrul de control al hipofizei — glanda principală.",
        description_advanced: "Hipotalamusul integrează semnale neurogenice, termice, osmotice și feedback-uri hormonale. Secretă hormoni de eliberare (TRH, CRH, GnRH, GHRH, dopamină) și hormoni inhibitori care reglează hipofiza anterioară prin sistemul port-hipotalamo-hipofizar. Produce, de asemenea, ADH și oxitocina, depozitate în neuro-hipofiza.",
        hormones: ["TRH (Tireotropin-Releasing Hormone)", "CRH (Corticotropin-Releasing Hormone)", "GnRH (Gonadotropin-Releasing Hormone)", "GHRH (Growth Hormone-Releasing Hormone)", "Oxitocina", "ADH (Vasopresina)"],
        hormone_color: "#ec4899",
        effects: "Controlul glandelor hipofizare → reglarea indirectă a tiroidei, cortexului suprarenal, gonadelor; reglarea temperaturii corporale, a apetitului, setei, somnului și comportamentului social.",
        fun_fact: "🧠 Hipotalamusul are dimensiunea unui bob de mazăre mare (~4g) dar controlează aproape toate funcțiile vitale ale corpului — de la foame și sete până la ciclul menstrual!"
    },
    hipofiza: {
        name: "Hipofiza (Glanda Pituitară)",
        subtitle: "Glanda Șefă a Sistemului Endocrin",
        icon: "fa-crown",
        gradient: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
        location: "În șaua turcească a osului sfenoid, conectată la hipotalamus prin tijă hipofizară.",
        description_student: "Hipofiza este 'glanda șefă' — preia comenzile de la hipotalamus și le trimite mai departe celorlalte glande din corp. Are două lobi: anterioară (adenohipofiza) și posterioară (neurohipofiza). De dimensiunea unui bob de mazăre!",
        description_advanced: "Adenohipofiza secretă GH, TSH, ACTH, FSH, LH, prolactina — controlate de hormonii hipotalamici. Neurohipofiza stochează și eliberează ADH (vasopresina) și oxitocina produse de hipotalamus. Reglarea se face prin bucle de feedback negativ scurt (hipofizotrop → hipofiziar) și lung (hormon periferic → hipotalamus/hipofiza).",
        hormones: ["GH (Hormon de Creștere)", "TSH (Stimulent Tiroidian)", "ACTH (Corticotrop)", "FSH (Foliculo-Stimulant)", "LH (Luteinizant)", "Prolactina", "ADH / Vasopresina", "Oxitocina"],
        hormone_color: "#8b5cf6",
        effects: "GH: creștere și metabolism; TSH: stimulează tiroida; ACTH: stimulează cortexul suprarenal; FSH/LH: funcția gonadică; Prolactina: lactație; ADH: retenție apă; Oxitocina: contracții uterine, lactație.",
        fun_fact: "👑 Hipofiza cântărește 0.5-0.6g — mai puțin decât o gumă de mestecat — dar controlează creșterea, reproducerea, metabolismul și răspunsul la stres simultan!"
    },
    tiroida: {
        name: "Glanda Tiroidă",
        subtitle: "Regulatorul Metabolismului",
        icon: "fa-bolt",
        gradient: "linear-gradient(135deg, #06b6d4, #10b981)",
        location: "Parte anterioară a gâtului, în fața cartilajului cricoid. Formă de fluture. Greutate: ~20-25g.",
        description_student: "Tiroida este glanda care controlează cât de rapid sau lent funcționează metabolismul tău. Produce hormoni tiroidieni (T3 și T4) care reglează energia, temperatura, ritmul cardiac și creșterea. Are nevoie de iod din alimentație!",
        description_advanced: "Celulele foliculare sintetizează tiroglobulina → iodinată de peroxidaza tiroidiană (TPO) → formare MIT, DIT → cuplare → T3 (triiodotironina, activ) și T4 (tiroxina). T4 se converteste periferic la T3 de 5'-deiodinaze. Celulele parafoliculare (C) secretă calcitonina. Reglare: axa hipotalamus(TRH) → hipofiza(TSH) → tiroidă(T3/T4) cu feedback negativ.",
        hormones: ["T3 (Triiodotironina) — hormon activ", "T4 (Tiroxina) — forma de stocare/transport", "Calcitonina — scade calcemia"],
        hormone_color: "#06b6d4",
        effects: "T3/T4: cresc metabolismul bazal, temperatura, FC, sinteza proteică și maturarea SNC la fetus; Calcitonina: inhibă osteoelastele, scade calcemia.",
        fun_fact: "🦋 Tiroida seamănă cu un fluture! Cei ~600 milioane de foliculi ai ei stochează suficienți hormoni pentru 3-4 luni de nevoie — ca o baterie biologică!"
    },
    paratiroide: {
        name: "Glandele Paratiroide",
        subtitle: "Gardianul Calcemiei",
        icon: "fa-bone",
        gradient: "linear-gradient(135deg, #eab308, #f97316)",
        location: "Patru glande mici (2x2) situate pe fața posterioară a tiroidei. Dimensiunea unui bob de orez fiecare.",
        description_student: "Glandele paratiroide reglează nivelul de calciu din sânge — esențial pentru contracția musculară, funcția nervilor și sănătatea oaselor. Când calciul scade, ele produc PTH care mobilizează calciul din oase.",
        description_advanced: "PTH (parathormon): crescut de hipocalcemie → activează osteoclastele (resorbtie osoasa), creste reabsorbtia tubulara renala de Ca²⁺, stimuleaza conversia 25-OH vitamina D → 1,25(OH)₂D (calcitriol) care creste absorbtia intestinala de Ca²⁺. Acțiune antagonista calcitoninei tiroidiene. Reglare: receptor sensibil la Ca²⁺ (CaSR) pe celulele principale paratiroidiene.",
        hormones: ["PTH (Parahormon/Parathormon) — crește calcemia"],
        hormone_color: "#eab308",
        effects: "Menținerea calcemiei la 8.5-10.5 mg/dL; activarea vitaminei D; reglarea fosforemiei (efect fosfaturic renal); controlul sănătății osoase.",
        fun_fact: "🦴 Glandele paratiroide au fost descoperite abia în 1880! Chirurgii care scoteau tiroida și lezau accidental paratiroidele nu înțelegeau de ce pacienții aveau convulsii fatale — era hipocalcemia!"
    },
    suprarenale: {
        name: "Glandele Suprarenale",
        subtitle: "Glandele de Urgență — Luptă sau Fugi",
        icon: "fa-fire",
        gradient: "linear-gradient(135deg, #ef4444, #f97316)",
        location: "Situate deasupra fiecărui rinichi, în spațiul retroperitoneal. Formă piramidala.",
        description_student: "Glandele suprarenale sunt glandele de urgentă ale corpului! Când ești în pericol, produc adrenalina → ritmul cardiac crește, mușchii primesc mai mult sânge, ești pregătit să fugi sau să lupți. Produc și cortizol — hormonul stresului cronic.",
        description_advanced: "Corticosuprarenala (cortex, 3 zone): Zona glomerulosa → Aldosteron (mineralocorticoizi, sub RAAS); Zona fasciculata → Cortizol (glucocorticoizi, sub ACTH); Zona reticularis → Androgeni suprarenali (DHEA). Medulosuprarenala (derivat de creastă neurala) → Adrenalina (80%) și Noradrenalina (20%) — catecolamine eliberate la stimulare simpatica.",
        hormones: ["Adrenalina (Epinefrina)", "Noradrenalina (Norepinefrina)", "Cortizol", "Aldosteron", "DHEA (androgen suprarenal)"],
        hormone_color: "#ef4444",
        effects: "Adrenalina: creste FC, PA, bronhodilatatie, glicemie (raspuns acut la stres); Cortizol: mobilizeaza glucoza, antiinflamator, imunosupresor (stres cronic); Aldosteron: retentie Na⁺ si apa → creste TA.",
        fun_fact: "⚡ Adrenalina acționează în 0.2 secunde de la eliberare! Poate creste forța musculara cu 20-30% — explicand poveștile de oameni care ridica mașini în situații de urgenta extrema."
    },
    pancreas: {
        name: "Pancreasul Endocrin",
        subtitle: "Regulatorul Glicemiei",
        icon: "fa-droplet",
        gradient: "linear-gradient(135deg, #f97316, #eab308)",
        location: "Glanda mixtă (exocrină + endocrină) situată în spatele stomacului, în C-ul duodenal.",
        description_student: "Pancreasul are o parte 'secretă' — insulele Langerhans — care controlează zaharul din sânge. Insulina scade glicemia (transporta glucoza în celule), glucagonul o creste (eliberaza glucoza din ficat). Diabetul apare cand insulina lipseste sau nu funcționeaza.",
        description_advanced: "Insulele Langerhans (1-2% din pancreas): Celule β (60-70%) → insulina și amilina; Celule α (20-25%) → glucagon; Celule δ → somatostatina; Celule PP → polipeptid pancreatic. Insulina: activează GLUT-4 în mușchi/tesut adipos, stimulează glicogeneza, lipogeneza; inhibă glicogenoliza. Glucagonul: stimuleaza glicogenoliza și gluconeogeneza hepatica. Reglare: glicemia, aminoacizii, incretinele (GLP-1, GIP).",
        hormones: ["Insulina — scade glicemia", "Glucagon — creste glicemia", "Somatostatina — inhibitor local", "Amilina — frânează absorbție glucoza"],
        hormone_color: "#f97316",
        effects: "Menținerea glicemiei la 70-100 mg/dL (jeun); reglarea metabolismului glucidic, lipidic și proteic; insulina = anabolic hormonal principal.",
        fun_fact: "💉 Insulina a fost descoperita în 1921 de Banting și Best în Canada. Primul pacient tratat, Leonard Thompson (14 ani, muribund de diabet), s-a recuperat spectaculos în câteva zile — una din cele mai mari descoperiri medicale din istorie!"
    },
    gonade: {
        name: "Gonadele (Ovare + Testicule)",
        subtitle: "Glandele Reproductive",
        icon: "fa-venus-mars",
        gradient: "linear-gradient(135deg, #ec4899, #f97316)",
        location: "Ovare: in cavitatea pelviana (femeie). Testicule: exteriorizate in scrot (barbat), temperatura optima 2°C sub temperatura corpului.",
        description_student: "Gonadele produc hormonii sexuali responsabili de pubertate, caracterele sexuale secundare (pilozitate, voce, sâni) și reproducere. La femei: estrogen și progesteron. La bărbați: testosteron. Ambele sexe produc cantitati mici din hormonii celuilalt sex!",
        description_advanced: "Ovare — celule teca → androgeni → aromatizate de celule granuloase → Estrogeni (E2 dominant); corpul galben → Progesteron. Testicule — celule Leydig (sub LH) → Testosteron; celule Sertoli (sub FSH) → sprijin spermatogeneza, inhibina. Reglare: axa HPG — GnRH → FSH/LH → steroizi sexuali; feedback negativ si pozitiv (ovulatie) la femei.",
        hormones: ["Estrogeni (Estradiol, Estrona, Estriol)", "Progesteron", "Testosteron", "Inhibina", "AMH (hormon anti-Mullerian)"],
        hormone_color: "#ec4899",
        effects: "Dezvoltare caractere sexuale secundare; controlul ciclului menstrual (estrogen + progesteron); spermatogeneza și libido (testosteron); mineralizare osoasa; distribuția tesutului adipos.",
        fun_fact: "♀♂ Bărbații produc mici cantitati de estrogen (din conversia testosteronul), iar femeile produc testosteron suprarenal. Diferenta este în proportii — nu în absenta totala a unui hormon!"
    },
    epifiza: {
        name: "Epifiza (Glanda Pineală)",
        subtitle: "Ceasul Biologic al Corpului",
        icon: "fa-moon",
        gradient: "linear-gradient(135deg, #a78bfa, #8b5cf6)",
        location: "Epitalamus, între hemisferele cerebrale. Formă de con de pin — de unde vine numele (lat. pinea = con de pin).",
        description_student: "Epifiza este 'ceasul biologic' al corpului — produce melatonina, hormonul care reglează somnul. Când se întunecă, produce mai multă melatonina → ți-e somn. Lumina albastră de la telefon noaptea blochează melatonina!",
        description_advanced: "Fotoreceptori retinieni → tract retinohipotalamic → nucleul suprachiasmatic (NSC) → ganglion cervical superior → epifiza → pinealocite sintetizeaza melatonina din triptofan → serotonina → N-acetilserotonina → melatonina (N-acetil-5-metoxitriptamina). Ritm circadian: maxim 2-4h, minim la prânz. Reglare sezoniera a reproducerii la animale mamifere.",
        hormones: ["Melatonina — hormonul somnului"],
        hormone_color: "#a78bfa",
        effects: "Reglarea ritmului circadian (ciclul somn-veghe 24h); efecte antioxidante; reglarea sezoniera a reproducerii la mamifere; posibile efecte imunomodulatoare.",
        fun_fact: "🌙 Filozoful René Descartes credea că epifiza este 'sediul sufletului'! Deși nu confirmat, epifiza rămâne misterioasă — calcifierea ei cu vârsta este normală dar nu este pe deplin înțeleasă."
    },
    timus: {
        name: "Timusul",
        subtitle: "Școala Celulelor Imune",
        icon: "fa-shield-halved",
        gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
        location: "Mediastin anterior, retrosternal, deasupra inimii. Cel mai activ în copilarie, involueaza dupa pubertate.",
        description_student: "Timusul este 'scoala' sistemului imun — educă limfocitele T (celule imune) sa recunoasca agentii patogeni fara sa atace propriul organism. Hormonii timici stimulează maturarea acestor celule protectoare. Este mai mare la copii și se atrofiaza la adulti.",
        description_advanced: "Timusul este atat organ limfoid primar cat si glada endocrina. Secretă: timozina (α1, β4), timopoietina, timulina — accelereaza diferentierea si maturarea limfocitelor T imature în timus. Procese intratimusice: selectie pozitiva (recunosc MHC self) si selectie negativa (apoptoza autoreactiva). Involutie adipoasa dupa pubertate sub influenta hormonilor sexuali.",
        hormones: ["Timozina (α1, β4)", "Timopoietina", "Timulina", "Factorul umoral timic (THF)"],
        hormone_color: "#10b981",
        effects: "Maturarea limfocitelor T (helper, citotoxice, reglatoare); educatia imunologica (toleranta self vs non-self); prevenirea bolilor autoimune; imunitate adaptativa.",
        fun_fact: "🛡️ Fara timus functional (sindrom DiGeorge), copiii nu pot produce limfocite T mature — sistemul imun devine incapabil sa lupte impotriva infectiilor. Timusul este, literalmente, scoala armatei imune!"
    }
};

// =========================================
// INTREBARI QUIZ
// =========================================
const QUIZ_QUESTIONS = [
    {
        q: "Care este rolul principal al insulinei?",
        opts: ["Creste glicemia", "Scade glicemia și transporta glucoza în celule", "Stimuleaza tiroida", "Regleaza somnul"],
        correct: 1,
        explanation: "✅ Insulina (produsa de celulele β pancreatice) permite glucozei sa intre în celule, scazand astfel glicemia. Lipsa ei → Diabet Zaharat."
    },
    {
        q: "Ce glandă controlează toate celelalte glande endocrine?",
        opts: ["Tiroida", "Pancreasul", "Hipofiza (Glanda Pituitara)", "Glandele Suprarenale"],
        correct: 2,
        explanation: "✅ Hipofiza — numita 'glanda sefa' — coordoneaza tiroida (TSH), cortexul suprarenal (ACTH), gonadele (FSH/LH) și alte glande, sub controlul hipotalamusului."
    },
    {
        q: "Ce hormon reglează ciclul somn-veghe?",
        opts: ["Cortizol", "Adrenalina", "Melatonina", "Oxitocina"],
        correct: 2,
        explanation: "✅ Melatonina — secretata de epifiza (glanda pineala) noaptea — semnalizeaza corpului ca e timp de somn. Lumina o inhiba, intunericul o stimuleaza."
    },
    {
        q: "Hormonii steroizi (ex: cortizol, estrogen) funcționează prin:",
        opts: ["Receptori pe suprafata celulei → cAMP", "Traverseaza membrana → receptor nuclear → modificare ADN", "Canale ionice de Ca²⁺", "Enzime extracelulare"],
        correct: 1,
        explanation: "✅ Hormonii steroizi sunt liposoluibili — traverseaza usor membrana lipidica → se leaga de receptori nucleari → complexul se leaga de ADN și modifica expresia genica (efect durabil)."
    },
    {
        q: "Adrenalina este produsă de:",
        opts: ["Hipofiza anterioara", "Medulosuprarenala (centrul glandei suprarenale)", "Cortexul suprarenal", "Hipotalamus"],
        correct: 1,
        explanation: "✅ Medulosuprarenala este tesut din creasta neurala (derivat nervos) care sintetizeaza catecolamine: Adrenalina (80%) si Noradrenalina (20%), eliberate rapid la stres acut."
    }
];

// =========================================
// STARE GLOBALA
// =========================================
let advancedMode = false;
let quizActive = false;
let currentQ = 0;
let score = 0;
let answered = false;
let bloodAnimRunning = false;
let bloodInterval = null;

// =========================================
// LOADING SCREEN
// =========================================
(function initLoading() {
    const bar = document.getElementById('loading-bar');
    const status = document.getElementById('loading-status');
    const screen = document.getElementById('loading-screen');
    if (!bar || !screen) return;

    const steps = [
        { pct: 20, msg: "Se incarca datele..." },
        { pct: 50, msg: "Se pregatesc animatiile..." },
        { pct: 80, msg: "Se initializeaza quiz-ul..." },
        { pct: 100, msg: "Gata!" }
    ];

    let i = 0;
    const tick = () => {
        if (i >= steps.length) {
            setTimeout(() => { screen.classList.add('done'); }, 300);
            return;
        }
        bar.style.width = steps[i].pct + '%';
        status.textContent = steps[i].msg;
        i++;
        setTimeout(tick, i === steps.length ? 400 : 600);
    };
    setTimeout(tick, 300);
})();

// =========================================
// CURSOR CUSTOM
// =========================================
(function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    const moveCursor = () => {
        dot.style.left = mx + 'px'; dot.style.top = my + 'px';
        rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
        requestAnimationFrame(moveCursor);
    };
    moveCursor();

    const interactables = () => document.querySelectorAll('a, button, .gland-card, .mech-step, .quiz-opt, .body-hs, .boala-card');
    const addHover = () => { interactables().forEach(el => { el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover')); el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover')); }); };
    addHover();
    setInterval(addHover, 2000);
})();

// =========================================
// NAVBAR SCROLL + HAMBURGER
// =========================================
(function initNav() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    navLinks?.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger?.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
})();

// =========================================
// HERO PARTICLES
// =========================================
(function initParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const ICONS = ['🧬', '💊', '⚗️', '🔬', '🩺', '💉', '🫀', '🧪', '⚡', '🌡️'];
    const N = 18;

    for (let i = 0; i < N; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position:absolute; font-size:${Math.random() * 18 + 12}px;
            left:${Math.random() * 100}%; top:${Math.random() * 100}%;
            opacity:${Math.random() * 0.18 + 0.05};
            animation: floatP ${Math.random() * 8 + 6}s ease-in-out ${Math.random() * 5}s infinite alternate;
            pointer-events:none; user-select:none;
        `;
        p.textContent = ICONS[Math.floor(Math.random() * ICONS.length)];
        container.appendChild(p);
    }

    const style = document.createElement('style');
    style.textContent = `@keyframes floatP { 0%{transform:translateY(0) rotate(0deg);} 100%{transform:translateY(-30px) rotate(15deg);} }`;
    document.head.appendChild(style);
})();

// =========================================
// SCROLL REVEAL
// =========================================
(function initReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// =========================================
// MODE TOGGLE (Student / Avansat)
// =========================================
(function initModeToggle() {
    const toggle = document.getElementById('modeToggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        advancedMode = !advancedMode;
        toggle.classList.toggle('advanced-on', advancedMode);
        document.body.classList.toggle('advanced-mode', advancedMode);

        // Update advanced content visibility
        document.querySelectorAll('.advanced-content').forEach(el => {
            el.classList.toggle('hidden', !advancedMode);
        });

        // Visual feedback
        const popup = document.createElement('div');
        popup.textContent = advancedMode ? '🔬 Mod Avansat Activat' : '🎓 Mod Student Activat';
        popup.style.cssText = `position:fixed;top:80px;right:24px;z-index:9000;padding:10px 20px;border-radius:10px;background:${advancedMode ? 'rgba(139,92,246,0.9)' : 'rgba(236,72,153,0.9)'};color:white;font-weight:700;font-size:0.85rem;backdrop-filter:blur(8px);animation:slideIn 0.3s ease;`;
        document.body.appendChild(popup);
        const s = document.createElement('style');
        s.textContent = `@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}`;
        document.head.appendChild(s);
        setTimeout(() => popup.remove(), 2500);
    });
})();

// =========================================
// MECHANISM STEPS
// =========================================
const MECH_DETAILS = [
    { icon: '🏭', title: 'Secreție', student: 'Glanda detectează un semnal (ex: glicemie crescuta) și incepe să producă hormonul în celulele sale specializate → eliberat în capilarele sanguine.', advanced: 'Sinteza hormonala: hormoni peptidici (pre-pro-hormon→pro-hormon→hormon matur pe cale secretorie); hormoni steroizi (colesterol → cascada enzimatica în reticul endoplasmatic si mitocondrii); hormoni din aminoacizi (tirozina → catecolamine/hormoni tiroidieni).', color: '#06b6d4' },
    { icon: '🚀', title: 'Transport Sanguin', student: 'Hormonul intră în sânge și călătorește la viteza circulatiei — poate ajunge în orice parte a corpului în secunde! Unii hormoni se leaga de proteine transportoare (albumina, SHBG).', advanced: 'Hormoni hidrofili (peptide, catecolamine): liberi în plasma → t½ scurt (minute). Hormoni lipofilici (steroizi, tiroidieni): legati de proteine specifice (CBG, TBG, SHBG, albumina) → t½ lung (ore-zile); doar fracția libera este biologica activa (ipoteza hormonului liber).', color: '#ec4899' },
    { icon: '🔑', title: 'Recepție & Legare', student: 'Celula-tinta are receptori specifici — ca niște broscute de la chei. Hormonul (cheia) se poate lega NUMAI de receptorul sau specific → specificitate absoluta! Alte celule nu raspund.', advanced: 'Receptori de suprafata: GPCR (7 domenii transmembranare → Gs/Gi/Gq → cAMP/IP3/DAG); receptori tirozin-kinazici (insulina, GH → autofosforilare → MAPK, PI3K); receptori pentru citokine (JAK-STAT). Receptori nucleari: superfamilia TF nucleari (steroizi, tiroidieni, Vit D, retinoizi).', color: '#10b981' },
    { icon: '⚡', title: 'Răspuns Celular', student: 'Celula executa instructiunile: produce enzime, se divide, modifica transportul ionic, secretă alte substanțe. Efectul poate fi imediat (adrenalina: ms-secunde) sau lent (hormoni steroizi: ore-zile).', advanced: 'Cascada de semnalizare: amplificarea semnalului (1 molecula hormon → mii de molecule efector); mesageri secunzi (cAMP → PKA → fosforilare; Ca²⁺ → calmodulina → CaM-kinaze; DAG → PKC); terminarea semnalului (fosfataze, PDEaze, endocitoza receptorilor, downregulare).', color: '#f59e0b' }
];

function activateMechStep(el, idx) {
    document.querySelectorAll('.mech-step').forEach(s => s.classList.remove('active-step'));
    el.classList.add('active-step');

    const detail = MECH_DETAILS[idx];
    const box = document.getElementById('mech-detail-content');
    const isAdv = advancedMode;
    box.innerHTML = `
        <div style="font-size:2.5rem;margin-bottom:8px">${detail.icon}</div>
        <h4 style="color:${detail.color};margin-bottom:10px">${detail.title}</h4>
        <p style="color:#94a3b8;font-size:0.88rem;line-height:1.7;max-width:600px">${isAdv ? detail.advanced : detail.student}</p>
    `;
}

// =========================================
// BLOOD ANIMATION
// =========================================
function toggleBloodAnim() {
    const btn = document.getElementById('animBtn');
    const interior = document.getElementById('vessel-interior');
    if (!interior || !btn) return;

    if (bloodAnimRunning) {
        bloodAnimRunning = false;
        interior.querySelectorAll('.hormone-particle').forEach(p => p.remove());
        btn.innerHTML = '<i class="fa-solid fa-play"></i> Pornește';
    } else {
        bloodAnimRunning = true;
        btn.innerHTML = '<i class="fa-solid fa-stop"></i> Oprește';
        addHormoneParticles(interior);
        bloodInterval = setInterval(() => addHormoneParticles(interior), 3000);
    }
}

function addHormoneParticles(interior) {
    if (!bloodAnimRunning) return;
    const positions = ['50%', '30%', '65%'];
    const delays = [0, 1.2, 0.6];
    positions.forEach((top, i) => {
        const p = document.createElement('div');
        p.className = 'hormone-particle';
        if (i > 0) p.className += ` hp${i + 1}`;
        p.style.top = top;
        p.style.animationDelay = delays[i] + 's';
        interior.appendChild(p);
        setTimeout(() => p.remove(), 4500);
    });
}

// =========================================
// GLAND MODALS
// =========================================
function openGlandModal(id) {
    const data = GLANDS_DATA[id];
    if (!data) return;

    const overlay = document.getElementById('gland-modal-overlay');
    const inner = document.getElementById('modal-inner');
    if (!overlay || !inner) return;

    const isAdv = advancedMode;
    const desc = isAdv ? data.description_advanced : data.description_student;

    inner.innerHTML = `
        <div class="modal-hero">
            <div class="modal-icon" style="background:${data.gradient}"><i class="fa-solid ${data.icon}"></i></div>
            <div class="modal-title">
                <h2>${data.name}</h2>
                <div class="modal-sub">${data.subtitle}</div>
            </div>
        </div>
        <div class="modal-body">
            <div class="modal-section">
                <h4>📍 Localizare</h4>
                <p>${data.location}</p>
            </div>
            <div class="modal-section">
                <h4>📖 Descriere ${isAdv ? '(Avansat)' : '(Student)'}</h4>
                <p>${desc}</p>
            </div>
            <div class="modal-section">
                <h4>💊 Hormoni Produși</h4>
                <div class="modal-tags">
                    ${data.hormones.map(h => `<span class="modal-tag" style="background:${data.gradient.replace('linear-gradient(135deg,','').split(',')[0]}18;border-color:${data.hormone_color}44;color:${data.hormone_color}">${h}</span>`).join('')}
                </div>
            </div>
            <div class="modal-section">
                <h4>⚡ Efecte Principale</h4>
                <p>${data.effects}</p>
            </div>
            <div class="modal-fun-fact">
                ${data.fun_fact}
            </div>
        </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // highlight body hotspot
    document.querySelectorAll('.body-hs').forEach(el => el.style.opacity = '0.3');
    const hs = document.querySelector(`.body-hs[data-gland="${id}"]`);
    if (hs) hs.style.opacity = '1';
}

function closeGlandModal() {
    const overlay = document.getElementById('gland-modal-overlay');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    document.querySelectorAll('.body-hs').forEach(el => el.style.opacity = '1');
}

// ESC key closes modal
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeGlandModal(); });

// =========================================
// QUIZ
// =========================================
function startQuiz() {
    currentQ = 0; score = 0; answered = false;
    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-question-wrap').classList.remove('hidden');
    renderQuestion();
}

function renderQuestion() {
    const q = QUIZ_QUESTIONS[currentQ];
    document.getElementById('quiz-counter').textContent = `Întrebarea ${currentQ + 1}/${QUIZ_QUESTIONS.length}`;
    document.getElementById('quiz-score-live').textContent = `Scor: ${score}`;
    document.getElementById('quiz-q').textContent = `${currentQ + 1}. ${q.q}`;
    document.getElementById('quiz-progress-bar').style.width = ((currentQ / QUIZ_QUESTIONS.length) * 100) + '%';

    const opts = document.getElementById('quiz-options');
    opts.innerHTML = '';
    q.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt';
        btn.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
        btn.addEventListener('click', () => handleAnswer(i, q.correct, q.explanation));
        opts.appendChild(btn);
    });

    document.getElementById('quiz-feedback').classList.add('hidden');
    document.getElementById('quiz-feedback').className = 'quiz-feedback hidden';
    document.getElementById('quiz-next-btn').classList.add('hidden');
    answered = false;
}

function handleAnswer(selected, correct, explanation) {
    if (answered) return;
    answered = true;

    const opts = document.querySelectorAll('.quiz-opt');
    opts.forEach((btn, i) => {
        btn.classList.add('disabled');
        if (i === correct) btn.classList.add('correct');
        if (i === selected && i !== correct) btn.classList.add('wrong');
    });

    const fb = document.getElementById('quiz-feedback');
    const isCorrect = selected === correct;
    if (isCorrect) score++;
    document.getElementById('quiz-score-live').textContent = `Scor: ${score}`;

    fb.className = `quiz-feedback ${isCorrect ? 'fb-correct' : 'fb-wrong'}`;
    fb.innerHTML = `${isCorrect ? '<i class="fa-solid fa-check-circle"></i>' : '<i class="fa-solid fa-times-circle"></i>'} ${explanation}`;
    fb.classList.remove('hidden');

    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.textContent = currentQ < QUIZ_QUESTIONS.length - 1 ? 'Următoarea →' : 'Vezi Rezultatul';
    nextBtn.className = 'btn-primary quiz-next-btn';
}

function nextQuestion() {
    currentQ++;
    if (currentQ >= QUIZ_QUESTIONS.length) {
        showResult();
    } else {
        renderQuestion();
    }
}

function showResult() {
    document.getElementById('quiz-question-wrap').classList.add('hidden');
    const result = document.getElementById('quiz-result');
    result.classList.remove('hidden');
    document.getElementById('quiz-progress-bar').style.width = '100%';

    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    let emoji, title, msg;
    if (pct === 100)      { emoji = '🏆'; title = 'Perfect! Ești un expert în Sistemul Endocrin!'; msg = 'Felicitari — ai răspuns corect la toate întrebările! Cunoașteri profunde despre hormoni și glande.'; }
    else if (pct >= 80)   { emoji = '🌟'; title = 'Excelent! Aproape perfect!'; msg = 'Cunoașteri solide! Mai exersează puțin și vei stăpâni complet materia.'; }
    else if (pct >= 60)   { emoji = '👍'; title = 'Bine! Înțelegi conceptele de bază.'; msg = 'Ai o baza buna! Reciteste sectiunile despre mecanisme si glande pentru a te imbunatati.'; }
    else if (pct >= 40)   { emoji = '📚'; title = 'Mai ai de invatat!'; msg = 'Nu te descuraja — reciteste teoria si reincearca. Sistemul endocrin este complex!'; }
    else                  { emoji = '💪'; title = 'Inceput de drum!'; msg = 'Reincepe de la sectiunea Introducere si parcurge materialul pas cu pas. Succes!'; }

    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-score').textContent = `${score}/${QUIZ_QUESTIONS.length} (${pct}%)`;
    document.getElementById('result-msg').textContent = msg;
}

function restartQuiz() {
    startQuiz();
}

// =========================================
// SMOOTH SCROLL pentru linkuri de navigare
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// =========================================
// ACTIVE NAV LINK pe scroll
// =========================================
(function initActiveNav() {
    const sections = document.querySelectorAll('.section[id], .hero[id]');
    const links = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let cur = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 100) cur = s.id;
        });
        links.forEach(l => {
            l.style.color = l.getAttribute('href') === '#' + cur ? 'white' : '';
            l.style.background = l.getAttribute('href') === '#' + cur ? 'rgba(139,92,246,0.15)' : '';
        });
    });
})();

// =========================================
// SOUND ENGINE (Web Audio API — no files)
// =========================================
let audioCtx = null;
let soundEnabled = true;

function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

function playTone({ freq = 440, type = 'sine', duration = 0.12, gain = 0.18, attack = 0.01, decay = 0.08, freqEnd = null }) {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        if (freqEnd) osc.frequency.linearRampToValueAtTime(freqEnd, ctx.currentTime + duration);
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + attack);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + attack + decay);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration + 0.05);
    } catch (e) {}
}

function soundClick()   { playTone({ freq: 660, type: 'sine', duration: 0.08, gain: 0.12, decay: 0.06 }); }
function soundCorrect() {
    playTone({ freq: 523.25, type: 'triangle', duration: 0.15, gain: 0.18 });
    setTimeout(() => playTone({ freq: 659.25, type: 'triangle', duration: 0.15, gain: 0.18 }), 130);
    setTimeout(() => playTone({ freq: 783.99, type: 'triangle', duration: 0.22, gain: 0.22, decay: 0.18 }), 260);
}
function soundWrong()   {
    playTone({ freq: 280, type: 'sawtooth', duration: 0.18, gain: 0.14, decay: 0.14 });
    setTimeout(() => playTone({ freq: 240, type: 'sawtooth', duration: 0.2, gain: 0.14, decay: 0.15 }), 130);
}
function soundBadge()   {
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
        setTimeout(() => playTone({ freq: f, type: 'triangle', duration: 0.18, gain: 0.22, decay: 0.15 }), i * 110);
    });
}
function soundOpen()    { playTone({ freq: 520, freqEnd: 680, type: 'sine', duration: 0.15, gain: 0.14 }); }

function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('soundBtn');
    const icon = document.getElementById('soundIcon');
    if (!btn || !icon) return;
    btn.classList.toggle('muted', !soundEnabled);
    icon.className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
}

// Adaug sunet la click pe toate butoanele și link-urile
document.addEventListener('click', e => {
    const el = e.target.closest('button, a, .gland-card, .mech-step, .intro-card, .boala-card, .body-hs');
    if (el && !el.classList.contains('quiz-opt')) soundClick();
}, true);

// =========================================
// LESSON PROGRESS TRACKER
// =========================================
const LESSON_SECTIONS = ['intro', 'hormoni', 'mecanism', 'glande', 'boli', 'quiz'];
const visitedSections = new Set();

(function initLessonProgress() {
    const wrap = document.getElementById('lesson-progress-wrap');
    const fill = document.getElementById('lp-bar-fill');
    const pct  = document.getElementById('lp-pct');
    if (!wrap || !fill) return;

    // Show progress bar only after scrolling past hero
    const heroEl = document.getElementById('hero');
    const progressObserver = new IntersectionObserver(entries => {
        wrap.classList.toggle('visible', !entries[0].isIntersecting);
    }, { threshold: 0.1 });
    if (heroEl) progressObserver.observe(heroEl);

    // Track each section
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const id = e.target.id;
                const wasNew = !visitedSections.has(id);
                visitedSections.add(id);

                // Update dot
                const dot = document.querySelector(`.lp-dot[data-sec="${id}"]`);
                if (dot) dot.classList.add('done');

                // Update bar
                const prog = Math.round((visitedSections.size / LESSON_SECTIONS.length) * 100);
                fill.style.width = prog + '%';
                pct.textContent = prog + '%';

                // Badge: Explorer (intro visited)
                if (id === 'intro' && wasNew) unlockBadge('explorer');
                // Check 100% completion
                if (visitedSections.size === LESSON_SECTIONS.length) unlockBadge('scholar');
            }
        });
    }, { threshold: 0.25 });

    LESSON_SECTIONS.forEach(id => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
    });
})();

// =========================================
// BADGE SYSTEM
// =========================================
const unlockedBadges = new Set();
let badgePanelOpen = false;
let glandsOpened = 0;

const BADGE_DEFS = {
    explorer:   { id: 'badge-explorer',  name: 'Explorer',        icon: '🔭', desc: 'Ai citit secțiunea Introducere!' },
    hunter:     { id: 'badge-hunter',    name: 'Hormone Hunter',  icon: '🧪', desc: 'Prima glandă explorată!' },
    anatomist:  { id: 'badge-anatomist', name: 'Anatomist',       icon: '🫀', desc: 'Ai explorat 5 glande endocrine!' },
    scientist:  { id: 'badge-scientist', name: 'Science Pro',     icon: '🔬', desc: 'Modul Avansat activat!' },
    master:     { id: 'badge-master',    name: 'Hormone Master',  icon: '🏆', desc: 'Perfect! 5/5 la Quiz!' },
    scholar:    { id: 'badge-scholar',   name: 'Scholar',         icon: '🎓', desc: 'Ai completat întreaga lecție!' }
};

function unlockBadge(key) {
    if (unlockedBadges.has(key)) return;
    unlockedBadges.add(key);

    const def = BADGE_DEFS[key];
    if (!def) return;

    // Update panel item
    const item = document.getElementById(def.id);
    if (item) {
        item.classList.remove('locked');
        item.classList.add('unlocked', 'new');
        setTimeout(() => item.classList.remove('new'), 6500);
    }

    // Update count
    const countEl = document.getElementById('badge-count');
    if (countEl) countEl.textContent = unlockedBadges.size;

    // Show toast
    showBadgeToast(def);

    // Play badge sound
    soundBadge();
}

function showBadgeToast(def) {
    const toast = document.getElementById('badge-toast');
    if (!toast) return;

    toast.innerHTML = `
        <div class="badge-toast-inner">
            <div class="badge-toast-icon">${def.icon}</div>
            <div class="badge-toast-text">
                <small>🏅 Badge Deblocat!</small>
                <strong>${def.name}</strong>
                <span>${def.desc}</span>
            </div>
        </div>
        <div class="badge-toast-shine"></div>
    `;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
}

function toggleBadgePanel() {
    badgePanelOpen = !badgePanelOpen;
    const body = document.getElementById('badge-panel-body');
    if (body) body.classList.toggle('open', badgePanelOpen);
    soundClick();
}

// Patch openGlandModal to track badge
const _origOpenModal = window.openGlandModal || openGlandModal;
window.openGlandModal = function(id) {
    _origOpenModal(id);
    glandsOpened++;
    soundOpen();
    if (glandsOpened === 1) unlockBadge('hunter');
    if (glandsOpened >= 5) unlockBadge('anatomist');
};

// Patch mode toggle to track badge
const modeToggleEl = document.getElementById('modeToggle');
if (modeToggleEl) {
    const origClick = modeToggleEl.onclick;
    modeToggleEl.addEventListener('click', () => {
        if (advancedMode) unlockBadge('scientist');
    });
}

// Patch quiz handleAnswer to add sounds and badges
const _origHandleAnswer = handleAnswer;
window.handleAnswer = function(selected, correct, explanation) {
    // Sounds before calling original
    if (selected === correct) soundCorrect(); else soundWrong();
    _origHandleAnswer(selected, correct, explanation);
};

// Patch showResult to unlock badge if perfect score
const _origShowResult = showResult;
window.showResult = function() {
    _origShowResult();
    if (score === QUIZ_QUESTIONS.length) {
        setTimeout(() => unlockBadge('master'), 800);
    }
};

// =========================================
// MOLECULE CANVAS ANIMATION
// =========================================
(function initMoleculeCanvas() {
    const canvas = document.getElementById('molecule-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Molecule nodes
    const N = 28;
    const nodes = Array.from({ length: N }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2.5 + 1.5,
        color: ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f97316'][Math.floor(Math.random() * 5)],
        pulse: Math.random() * Math.PI * 2
    }));

    const CONNECTION_DIST = 160;
    let frame = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;

        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
            if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
            n.pulse += 0.03;
        });

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        nodes.forEach(n => {
            const pr = n.r + Math.sin(n.pulse) * 0.8;
            // Glow
            const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pr * 5);
            grd.addColorStop(0, n.color + '44');
            grd.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(n.x, n.y, pr * 5, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
            // Core
            ctx.beginPath();
            ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
            ctx.fillStyle = n.color + 'cc';
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }
    draw();
})();

// =========================================
// CLICK RIPPLE EFFECT on interactive elements
// =========================================
(function initRipple() {
    document.addEventListener('click', e => {
        const el = e.target.closest('.gland-card, .mech-step, .intro-card, .btn-primary');
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,0.15);left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;transform:scale(0);animation:rippleAnim 0.5s ease-out forwards;pointer-events:none;z-index:10;`;
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
        el.style.overflow = 'hidden';
        el.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
    const s = document.createElement('style');
    s.textContent = `@keyframes rippleAnim{to{transform:scale(2.5);opacity:0}}`;
    document.head.appendChild(s);
})();
