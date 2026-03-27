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
        subtitle: "Comandantul Sistemului",
        icon: "fa-brain",
        gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
        location: "La baza creierului.",
        description_student: "Hipotalamusul este centrul de comandă. Trimite semnale către hipofiză pentru a controla restul glandelor.",
        description_advanced: "Integrează semnale neurogenice și termice. Secretă hormoni de eliberare (TRH, CRH) pentru a regla hipofiza anterioară și produce ADH + oxitocină.",
        hormones: ["TRH", "CRH", "GnRH", "Oxitocina", "ADH"],
        hormone_color: "#ec4899",
        effects: "Reglează temperatura, setea, somnul și controlează hipofiza.",
        fun_fact: "🧠 Dimensiunea unui bob de mazăre, dar controlează tot corpul!"
    },
    hipofiza: {
        name: "Hipofiza",
        subtitle: "Glanda Șefă",
        icon: "fa-crown",
        gradient: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
        location: "Sub hipotalamus (baza creierului).",
        description_student: "Glanda care preia comenzile de la creier și le trimite glandelor din corp (tiroidă, suprarenale, gonade).",
        description_advanced: "Adenohipofiza secretă hormoni stimulatori (TSH, ACTH, FSH). Neurohipofiza eliberează hormonii stocați de la hipotalamus (ADH).",
        hormones: ["GH", "TSH", "ACTH", "FSH", "LH", "Prolactina"],
        hormone_color: "#8b5cf6",
        effects: "Controlează creșterea și metabolismul celorlalte glande.",
        fun_fact: "👑 Deși are doar ~0.5 grame, este șefa sistemului endocrin!"
    },
    tiroida: {
        name: "Tiroida",
        subtitle: "Regulatorul Energiei",
        icon: "fa-bolt",
        gradient: "linear-gradient(135deg, #06b6d4, #10b981)",
        location: "La baza gâtului, formă de fluture.",
        description_student: "Tiroida controlează cât de repede arzi caloriile și câtă energie ai. Are nevoie de iod pentru a funcționa.",
        description_advanced: "Sintetizează T3/T4 sub acțiunea TSH. Celulele C parafoliculare eliberează calcitonina pentru a scădea calciul.",
        hormones: ["T3", "T4", "Calcitonina"],
        hormone_color: "#06b6d4",
        effects: "Reglează metabolismul bazal, temperatura ritmul cardiac.",
        fun_fact: "🦋 Poate stoca hormoni suficienți pentru 3-4 luni!"
    },
    paratiroide: {
        name: "Paratiroide",
        subtitle: "Gardienii Calciului",
        icon: "fa-bone",
        gradient: "linear-gradient(135deg, #eab308, #f97316)",
        location: "Patru puncte mici pe spatele tiroidei.",
        description_student: "Controlează nivelul de calciu din sânge, esențial pentru oase puternice și funcția mușchilor.",
        description_advanced: "Secretă PTH la scăderea calcemiei, stimulând resorbția osoasă și activarea vitaminei D în rinichi.",
        hormones: ["PTH (Parathormon)"],
        hormone_color: "#eab308",
        effects: "Crește și menține calciul din sânge la nivel optim.",
        fun_fact: "🦴 Fiecare are dimensiunea unui bob de orez!"
    },
    suprarenale: {
        name: "Suprarenale",
        subtitle: "Glandele de Stres",
        icon: "fa-fire",
        gradient: "linear-gradient(135deg, #ef4444, #f97316)",
        location: "Deasupra fiecărui rinichi.",
        description_student: "Produc adrenalina pentru momentele de urgență (luptă sau fugi) și cortizolul pentru stresul zilnic.",
        description_advanced: "Cortexul secretă aldosteron, cortizol și androgeni. Medula secretă catecolamine (adrenalină, noradrenalină).",
        hormones: ["Adrenalina", "Cortizol", "Aldosteron"],
        hormone_color: "#ef4444",
        effects: "Crește pulsul, eliberează glucoza și reglează tensiunea arterială.",
        fun_fact: "⚡ Adrenalina acționează în doar 0.2 secunde!"
    },
    pancreas: {
        name: "Pancreas",
        subtitle: "Controlul Glicemiei",
        icon: "fa-droplet",
        gradient: "linear-gradient(135deg, #f97316, #eab308)",
        location: "În spatele stomacului.",
        description_student: "Produce insulina pentru a scădea zahărul din sânge și glucagonul pentru a-l crește atunci când îți e foame.",
        description_advanced: "Insulele Langerhans (celule β) secretă insulina, activând GLUT-4. Celulele α secretă glucagon, stimulând glicogenoliza.",
        hormones: ["Insulina", "Glucagon"],
        hormone_color: "#f97316",
        effects: "Menține glicemia la nivel optim (70-100 mg/dL).",
        fun_fact: "💉 Insulina a fost descoperită în 1921 — o intervenție care salvează vieți zilnic!"
    },
    gonade: {
        name: "Gonade",
        subtitle: "Glandele Sexuale",
        icon: "fa-venus-mars",
        gradient: "linear-gradient(135deg, #ec4899, #f97316)",
        location: "Ovare (femei) / Testicule (bărbați).",
        description_student: "Produc hormonii sexuali care aduc schimbările de la pubertate și ajută la reproducere.",
        description_advanced: "Ovarele produc estrogen și progesteron. Testiculele produc testosteron. Ambele sunt controlate de FSH/LH hipofizar.",
        hormones: ["Estrogen", "Progesteron", "Testosteron"],
        hormone_color: "#ec4899",
        effects: "Dezvoltarea caracterelor sexuale, controlul ciclului menstrual și pubertatea.",
        fun_fact: "♀♂ Ambele sexe produc și mici cantități din hormonii celuilalt sex!"
    },
    epifiza: {
        name: "Epifiza (Pineală)",
        subtitle: "Ceasul Biologic",
        icon: "fa-moon",
        gradient: "linear-gradient(135deg, #a78bfa, #8b5cf6)",
        location: "În centrul creierului.",
        description_student: "Produce hormonul somnului (melatonina) când se întunecă afară. Lumina de la telefoane o dă peste cap!",
        description_advanced: "Transformă serotonina în melatonina exclusiv noaptea, comunicând ritmul circadian întregului corp.",
        hormones: ["Melatonina"],
        hormone_color: "#a78bfa",
        effects: "Reglează ciclul somn-veghe de 24 de ore.",
        fun_fact: "🌙 Descartes credea că aici este 'sediul sufletului'!"
    },
    timus: {
        name: "Timusul",
        subtitle: "Tabăra de Antrenament",
        icon: "fa-shield-halved",
        gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
        location: "În piept, deasupra inimii.",
        description_student: "Aici sunt educate celulele sistemului imunitar ca să recunoască și să distrugă doar virusurile, nu și corpul tău.",
        description_advanced: "Stimulează maturarea limfocitelor T. Glanda involuează și e înlocuită de țesut adipos după pubertate.",
        hormones: ["Timozina"],
        hormone_color: "#10b981",
        effects: "Creează armata de globule albe esențială apărării (imunitatea adaptativă).",
        fun_fact: "🛡️ Este mult mai mare și mai activ în copilărie decât la senectute!"
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

// =========================================
// GLYCEMIA SIMULATOR
// =========================================
const SIM = {
    chartHistory: [],
    chartMax: 40,
    loopInterval: null,
    loopStep: 0,

    // State definitions for each glucose range
    states: {
        danger: {   // < 55 mg/dL
            level: 'level-danger', status: '⚠ PERICOL',
            hormone: 'Glucagon', hormoneIcon: '🔴', cells: 'Celule α (urgență!)',
            gland: '🫀 Pancreas',
            target: '🚨 Ficat: mobilizare maximă glucoză',
            arrowDir: 'fa-arrow-up', arrowColor: '#ef4444',
            contextIcon: '🚨', contextTitle: 'Hipoglicemie Severă!',
            contextDesc: 'Nivel critic (<55 mg/dL)! Simptome: confuzie, convulsii, pierderea conștiinței. Glucagonul este secretat la maximum de urgență!',
            loop: ['⚠️ Glucoză critic scăzută!', '🟥 Celule α activate maxim', '🔴 Glucagon masiv eliberat', '⚡ Ficatul + mușchii mobilizează glucoză', '🔄 Restabilire urgentă'],
            organs: {
                'ficat': { active: true, action: '🔺 Eliberează glucoză maxim (glicogenoliză + gluconeogeneză)' },
                'muschi': { active: true, action: '🔺 Eliberează aminoacizi pentru gluconeogeneză' },
                'creier': { active: true, action: '⚠️ Deficit energie — funcții cognitive afectate' },
                'pancreas_alfa': { active: true, action: '🟥 Secreție maximă glucagon' },
                'pancreas_beta': { active: false, action: '⏸ Inactiv' },
                'suprarenale': { active: true, action: '⚡ Secreție adrenalină (urgență)' },
                'rinichi': { active: false, action: 'Normal' },
            }
        },
        low: {      // 55-70 mg/dL
            level: 'level-low', status: 'Hipoglicemie',
            hormone: 'Glucagon', hormoneIcon: '🟠', cells: 'Celule α activate',
            gland: '🫀 Pancreas',
            target: '↑ Ficat: eliberează glucoză salvată',
            arrowDir: 'fa-arrow-up', arrowColor: '#f97316',
            contextIcon: '⚠️', contextTitle: 'Hipoglicemie!',
            contextDesc: 'Glucoza sub 70 mg/dL. Simptome: tremur, transpirație, foame intensă, slăbiciune. Pancreasul secretă glucagon → ficatul eliberează glucoza stocată (glicogen).',
            loop: ['Glucoză scăzută detectată', 'Celule α pancreatice activate', 'Glucagon eliberat în sânge', 'Ficatul eliberează glucoză', 'Glicemia revine la normal ✓'],
            organs: {
                'ficat': { active: true, action: '🔺 Glicogenoliza activată → eliberează glucoză' },
                'muschi': { active: false, action: 'Utilizează acizi grași' },
                'creier': { active: true, action: '🔸 Prioritate pentru glucoză disponibilă' },
                'pancreas_alfa': { active: true, action: '✅ Secreție glucagon activă' },
                'pancreas_beta': { active: false, action: '⏸ Insulina inhibată' },
                'suprarenale': { active: false, action: 'Normal' },
                'rinichi': { active: false, action: 'Normal' },
            }
        },
        normal: {   // 70-180 mg/dL
            level: 'level-normal', status: 'Normal',
            hormone: 'Insulina', hormoneIcon: '🟢', cells: 'Celule β (echilibru)',
            gland: '🫀 Pancreas',
            target: '→ Celule: absorb glucoza din sânge',
            arrowDir: 'fa-arrows-left-right', arrowColor: '#10b981',
            contextIcon: '✅', contextTitle: 'Glicemie Normală (70-180 mg/dL)',
            contextDesc: 'Sistemul endocrin este în echilibru. Insulina menține glicemia stabilă — celulele absorb glucoza eficient. Aceasta este homeostazia optimă!',
            loop: ['Glicemie în interval normal', 'Secreție bazală insulina', 'Glucoza distribuită la celule', 'Ficatul stochează excesul (glicogen)', 'Echilibru homeostatic ✓'],
            organs: {
                'ficat': { active: true, action: '✅ Stochează glucoza ca glicogen (glicogeneza)' },
                'muschi': { active: true, action: '✅ Absorb glucoza pentru energie' },
                'creier': { active: true, action: '✅ Functioning normal cu glucoză' },
                'pancreas_alfa': { active: false, action: '⏸ Glucagonul inhibat' },
                'pancreas_beta': { active: true, action: '✅ Secreție bazală insulina' },
                'suprarenale': { active: false, action: 'Normal' },
                'rinichi': { active: false, action: '✅ Prag renal neatingmt' },
            }
        },
        high: {     // 180-300 mg/dL
            level: 'level-high', status: 'Hiperglicemie',
            hormone: 'Insulina', hormoneIcon: '🔷', cells: 'Celule β supraactivate',
            gland: '🫀 Pancreas',
            target: '↓ Celule: absorb masiv glucoza',
            arrowDir: 'fa-arrow-down', arrowColor: '#8b5cf6',
            contextIcon: '🔺', contextTitle: 'Hiperglicemie! (>180 mg/dL)',
            contextDesc: 'Glucoza crescută dupa masă sau în diabet. Pancreasul secretă insulina masiv. Dacă persistă → complicații renale, vasculare, neurologice pe termen lung.',
            loop: ['Glucoză crescută detectată', 'Celule β pancreatice activate', 'Insulina eliberată în sânge', 'Celulele absorb glucoza (GLUT-4)', 'Ficatul stochează excesul ✓'],
            organs: {
                'ficat': { active: true, action: '🔷 Glicogeneza accelerată → stochează glucoza' },
                'muschi': { active: true, action: '🔷 Absorbție glucoza crescută (via insulina)' },
                'creier': { active: false, action: 'Normal — glucoza independentă de insulina' },
                'pancreas_alfa': { active: false, action: '⏸ Glucagonul supresat' },
                'pancreas_beta': { active: true, action: '🔷 Secreție masivă insulina' },
                'suprarenale': { active: false, action: 'Normal' },
                'rinichi': { active: true, action: '⚠️ Glicozurie posibilă (>180 mg/dL)' },
            }
        }
    },

    getState(val) {
        const v = +val;
        if (v < 55)  return 'danger';
        if (v < 70)  return 'low';
        if (v <= 180) return 'normal';
        return 'high';
    }
};

const ORGANS_DEF = [
    { key: 'ficat',         icon: '🫁', name: 'Ficat' },
    { key: 'muschi',        icon: '💪', name: 'Mușchi' },
    { key: 'creier',        icon: '🧠', name: 'Creier' },
    { key: 'pancreas_alfa', icon: '🟠', name: 'Pancreas α' },
    { key: 'pancreas_beta', icon: '🟢', name: 'Pancreas β' },
    { key: 'suprarenale',   icon: '⚡', name: 'Suprarenale' },
    { key: 'rinichi',       icon: '🫘', name: 'Rinichi' },
];

function initOrgansGrid() {
    const grid = document.getElementById('or-grid');
    if (!grid) return;
    grid.innerHTML = ORGANS_DEF.map(o => `
        <div class="or-card" id="orc-${o.key}">
            <div class="or-organ">${o.icon}</div>
            <div class="or-name">${o.name}</div>
            <div class="or-action" id="ora-${o.key}">—</div>
            <div class="or-status-dot" id="ord-${o.key}"></div>
        </div>
    `).join('');
}

function updateOrgans(stateData) {
    ORGANS_DEF.forEach(o => {
        const card  = document.getElementById(`orc-${o.key}`);
        const action = document.getElementById(`ora-${o.key}`);
        const info  = stateData.organs[o.key];
        if (!card || !info) return;
        card.classList.toggle('active-organ', info.active);
        card.classList.toggle('inactive', !info.active);
        if (action) action.textContent = info.action;
    });
}

// Feedback loop animation
function animateLoop(loopTexts) {
    clearInterval(SIM.loopInterval);
    SIM.loopStep = 0;
    const steps = [1,2,3,4,5];

    // Update text
    steps.forEach((n, i) => {
        const el = document.getElementById(`ls${n}`);
        if (el) {
            el.querySelector('.ls-text').textContent = loopTexts[i] || '';
            el.classList.remove('active', 'done');
            el.style.opacity = '0.35';
        }
    });

    SIM.loopInterval = setInterval(() => {
        const prev = document.getElementById(`ls${SIM.loopStep}`);
        if (prev && SIM.loopStep > 0) {
            prev.classList.remove('active'); prev.classList.add('done'); prev.style.opacity = '0.7';
        }
        SIM.loopStep++;
        if (SIM.loopStep > 5) {
            clearInterval(SIM.loopInterval);
            return;
        }
        const cur = document.getElementById(`ls${SIM.loopStep}`);
        if (cur) { cur.classList.add('active'); cur.style.opacity = '1'; }
    }, 500);
}

// Chart drawing
function initSimChart() {
    const canvas = document.getElementById('sim-chart');
    if (!canvas) return;
    canvas.width  = canvas.offsetWidth  || 240;
    canvas.height = canvas.offsetHeight || 200;
}

function drawSimChart(currentVal) {
    const canvas = document.getElementById('sim-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth || 240;
    const W = canvas.width, H = canvas.height || 200;

    ctx.clearRect(0, 0, W, H);

    // Background grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let y = 0; y < H; y += H/5) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Normal zone band (70-180)
    const toY = v => H - ((v - 0) / 320) * H;
    const normalTop = toY(180), normalBot = toY(70);
    ctx.fillStyle = 'rgba(16,185,129,0.07)';
    ctx.fillRect(0, normalTop, W, normalBot - normalTop);
    ctx.strokeStyle = 'rgba(16,185,129,0.2)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, normalTop); ctx.lineTo(W, normalTop); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, normalBot); ctx.lineTo(W, normalBot); ctx.stroke();

    // Y axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'right';
    [[300,'300'],[180,'180'],[100,'100'],[70,'70'],[40,'40']].forEach(([v,l]) => {
        ctx.fillText(l, 28, toY(v) + 3);
    });

    if (SIM.chartHistory.length < 2) return;

    // Draw line
    const xStep = (W - 32) / (SIM.chartMax - 1);
    const startX = 32;
    const pts = SIM.chartHistory.map((v, i) => ({ x: startX + i * xStep, y: toY(v) }));

    // Gradient fill under line
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'rgba(139,92,246,0.3)');
    grad.addColorStop(1, 'rgba(139,92,246,0)');
    ctx.beginPath();
    ctx.moveTo(pts[0].x, H);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length-1].x, H);
    ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

    // Line stroke
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.forEach((p, i) => {
        if (i > 0) {
            const cp = pts[i-1];
            ctx.bezierCurveTo(
                cp.x + xStep/2, cp.y,
                p.x  - xStep/2, p.y,
                p.x, p.y
            );
        }
    });
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(239,68,68,0.5)'; ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Last point dot
    const last = pts[pts.length-1];
    ctx.beginPath(); ctx.arc(last.x, last.y, 5, 0, Math.PI*2);
    ctx.fillStyle = '#ef4444'; ctx.fill();
    ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke();
}

function resetSimChart() {
    SIM.chartHistory = [];
    const canvas = document.getElementById('sim-chart');
    if (canvas) { const c = canvas.getContext('2d'); c.clearRect(0, 0, canvas.width, canvas.height); }
    soundClick();
}

// ---- MAIN UPDATE FUNCTION ----
function updateGlycemiaSimulator(val) {
    val = +val;
    const stateKey = SIM.getState(val);
    const state = SIM.states[stateKey];

    // Update slider fill and thumb label
    const slider = document.getElementById('glucose-slider');
    const fill   = document.getElementById('slider-fill');
    const thumb  = document.getElementById('slider-thumb-label');
    if (slider && fill) {
        const pct = ((val - 40) / (300 - 40)) * 100;
        fill.style.width = pct + '%';
        const thumbColors = { danger:'#ef4444', low:'#f97316', normal:'#10b981', high:'#8b5cf6' };
        fill.style.background = thumbColors[stateKey];
        if (thumb) {
            thumb.textContent = val + ' mg/dL';
            thumb.style.left = `calc(${pct}% - 30px)`;
            thumb.style.background = thumbColors[stateKey];
        }
    }

    // Glucometer
    const meter   = document.getElementById('sim-meter');
    const meterV  = document.getElementById('meter-value');
    const meterS  = document.getElementById('meter-status');
    if (meter) {
        meter.className = 'sim-meter ' + state.level;
        meterV.textContent = val;
        meterS.textContent = state.status;
    }

    // Hormone panel
    setText('sh-gland', state.gland);
    setText('sh-cells', state.cells);
    setText('sh-hormone-icon', state.hormoneIcon);
    setText('sh-hormone-name', state.hormone);
    setText('sh-target-text', state.target);
    const arrow = document.getElementById('sh-arrow-icon');
    if (arrow) { arrow.className = 'fa-solid ' + state.arrowDir; arrow.style.color = state.arrowColor; }

    // Dot pulse color
    document.querySelectorAll('.dot-pulse').forEach(d => d.style.background = state.arrowColor);

    // Context card
    setText('sc-icon', state.contextIcon);
    setText('sc-title', state.contextTitle);
    setText('sc-desc', state.contextDesc);

    // Loop feedback
    animateLoop(state.loop);

    // Organs grid
    updateOrgans(state);

    // Chart history
    SIM.chartHistory.push(val);
    if (SIM.chartHistory.length > SIM.chartMax) SIM.chartHistory.shift();
    drawSimChart(val);
    setText('chart-last-val', val + ' mg/dL');

    // Sound (subtle)
    if (stateKey === 'danger') soundWrong();
}

function setText(id, txt) {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
}

function setGlucose(val) {
    const slider = document.getElementById('glucose-slider');
    if (slider) { slider.value = val; updateGlycemiaSimulator(val); soundClick(); }
}

// Init simulator on page load
window.addEventListener('load', () => {
    initOrgansGrid();
    initSimChart();
    updateGlycemiaSimulator(90);
    // Pre-fill chart with baseline
    for (let i = 0; i < 10; i++) SIM.chartHistory.push(90);
    drawSimChart(90);
    
    // Init dictionary
    renderDict(DICT_TERMS);
});

// =========================================
// DICTIONAR MEDICAL
// =========================================
const DICT_TERMS = [
    { word: "Homeostazie", def: "Proprietatea organismului de a menține un echilibru intern stabil, indiferent de schimbările din mediul extern (ex: reglarea temperaturii sau a glicemiei).", tag: "Concept" },
    { word: "Hormon", def: "Substanță chimică secretată de o glandă endocrină, care călătorește prin sânge și transmite mesaje către anumite celule sau organe țintă.", tag: "Biologie" },
    { word: "Feedback Negativ", def: "Un mecanism de control în care creșterea unui anumit produs (ex: hormon) oprește producerea ulterioară a acestuia, pentru a preveni excesul.", tag: "Mecanism" },
    { word: "Glandă Endocrină", def: "Organ care produce hormoni și îi eliberează direct în sânge, fără a avea ducte (canale de excreție).", tag: "Anatomie" },
    { word: "Glandă Exocrină", def: "Organ care își elimină secrețiile prin ducte, fie la exteriorul corpului (glande sudoripare), fie în cavități (glande salivare).", tag: "Anatomie" },
    { word: "Receptor", def: "O proteină aflată pe suprafața sau în interiorul unei celule, de care se leagă un hormon specific pentru a declanșa o reacție.", tag: "Biologie Celulară" },
    { word: "Metabolism", def: "Totalitatea proceselor chimice din organism necesare pentru a menține viața (ex: transformarea alimentelor în energie).", tag: "Proces" },
    { word: "Gluconeogeneză", def: "Procesul prin care ficatul produce glucoză nouă din alte surse (ex: aminoacizi) atunci când rezervele de zahăr sunt scăzute.", tag: "Fiziologie" },
    { word: "Glicogenoliză", def: "Descompunerea glicogenului (forma de stocare a glucozei) înapoi în glucoză activă în sânge, stimulată de glucagon.", tag: "Fiziologie" },
    { word: "Glicozurie", def: "Prezența glucozei în urină, care apare atunci când nivelul glicemiei depășește capacitatea de filtrare a rinichilor (frecvent în diabet).", tag: "Patologie" },
    { word: "Corticoizi", def: "Clasă de hormoni steroizi produși de glandele suprarenale (cortizol, aldosteron) care reglează stresul, metabolismul și echilibrul sărurilor.", tag: "Clasă Hormonală" },
    { word: "Peptide", def: "Tip de hormoni formați din lanțuri scurte de aminoacizi (proteine mici). Nu pătrund în celulă, acționează prin receptori externi.", tag: "Clasă Hormonală" },
    { word: "Steroizi", def: "Hormoni derivați din colesterol (lipidici). Pot trece ușor prin membrana celulară și acționează direct asupra ADN-ului din nucleu.", tag: "Clasă Hormonală" },
    { word: "Hipoglicemie", def: "Scăderea periculoasă a nivelului de glucoză din sânge (sub 70 mg/dL), provocând slăbiciune, tremur și, în cazuri grave, pierderea stării de conștiență.", tag: "Patologie" },
    { word: "Hiperglicemie", def: "Creșterea anormală a nivelului de glucoză din sânge (peste 140-180 mg/dL), specifică diabetului zaharat.", tag: "Patologie" }
];

function renderDict(terms) {
    const grid = document.getElementById('dict-grid');
    const empty = document.getElementById('dict-empty');
    if (!grid || !empty) return;

    if (terms.length === 0) {
        grid.innerHTML = '';
        grid.style.display = 'none';
        empty.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    empty.style.display = 'none';
    
    grid.innerHTML = terms.map(t => `
        <div class="dict-card">
            <div class="dict-word">${t.word}</div>
            <div class="dict-def">${t.def}</div>
            <div class="dict-tag">${t.tag}</div>
        </div>
    `).join('');
}

function filterDict() {
    const input = document.getElementById('dict-search-input');
    const clearBtn = document.getElementById('dict-clear');
    if (!input) return;

    const val = input.value.trim().toLowerCase();
    
    if (val.length > 0) {
        clearBtn.style.display = 'flex';
    } else {
        clearBtn.style.display = 'none';
    }

    const filtered = DICT_TERMS.filter(t => 
        t.word.toLowerCase().includes(val) || 
        t.def.toLowerCase().includes(val) ||
        t.tag.toLowerCase().includes(val)
    );

    renderDict(filtered);
}

function clearDictSearch() {
    const input = document.getElementById('dict-search-input');
    const clearBtn = document.getElementById('dict-clear');
    if (input) {
        input.value = '';
        clearBtn.style.display = 'none';
        renderDict(DICT_TERMS);
        input.focus();
    }
}
