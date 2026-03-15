// INITIALISATION
lucide.createIcons();
let userName = "Utilisateur";
let currentLang = 'fr';
let calcStr = "";
let dialStr = "";

// DICTIONNAIRE MULTILINGUE
const i18n = {
    fr: {
        setup_desc: "Configurez votre compte Xiaomi pour continuer.",
        account_name: "Nom du compte",
        start_btn: "Démarrer le système",
        app_settings: "Paramètres", app_calc: "Calcul", app_gallery: "Galerie",
        cc_title: "Centre de Contrôle", wifi: "Wi-Fi", bluetooth: "Bluetooth", dark_mode: "Mode Sombre", torch: "Torche", close: "Fermer",
        set_account: "Compte Xiaomi", set_launcher: "Launcher HyperOS", set_lang: "Langue du système",
        about: "À propos : Xiaomi 17 Ultra"
    },
    en: {
        setup_desc: "Set up your Xiaomi account to continue.",
        account_name: "Account Name",
        start_btn: "Start System",
        app_settings: "Settings", app_calc: "Calc", app_gallery: "Gallery",
        cc_title: "Control Center", wifi: "Wi-Fi", bluetooth: "Bluetooth", dark_mode: "Dark Mode", torch: "Torch", close: "Close",
        set_account: "Xiaomi Account", set_launcher: "HyperOS Launcher", set_lang: "System Language",
        about: "About: Xiaomi 17 Ultra"
    },
    ru: {
        setup_desc: "Настройте аккаунт Xiaomi для продолжения.",
        account_name: "Имя аккаунта",
        start_btn: "Запуск системы",
        app_settings: "Настройки", app_calc: "Калькулятор", app_gallery: "Галерея",
        cc_title: "Пункт управления", wifi: "Wi-Fi", bluetooth: "Bluetooth", dark_mode: "Темная тема", torch: "Фонарик", close: "Закрыть",
        set_account: "Аккаунт Xiaomi", set_launcher: "Лаунчер HyperOS", set_lang: "Язык системы",
        about: "Об устройстве: Xiaomi 17 Ultra"
    }
};

function updateLangTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) el.innerText = i18n[currentLang][key];
    });
}

function finishSetup() {
    const input = document.getElementById('account-name').value;
    if(input) userName = input;
    document.getElementById('setup-wizard').style.display = 'none';
    document.getElementById('main-ui').style.display = 'block';
    updateLangTexts();
}

// HORLOGE
setInterval(() => {
    const d = new Date();
    document.getElementById('clock').innerText = d.getHours() + ":" + d.getMinutes().toString().padStart(2, '0');
}, 1000);

// CENTRE DE CONTROLE & DARK MODE
function toggleCC() { document.getElementById('control-center').classList.toggle('open'); }
function toggleDarkMode() {
    const body = document.body;
    if(body.classList.contains('dark-mode')) { body.classList.remove('dark-mode'); body.classList.add('light-mode'); }
    else { body.classList.remove('light-mode'); body.classList.add('dark-mode'); }
}

// MOTEUR D'ANIMATION INTERRUPTIBLE (FLAGSHIP)
function openApp(appId, element) {
    const rect = element.getBoundingClientRect();
    const phoneRect = document.getElementById('phone').getBoundingClientRect();
    const layer = document.getElementById('app-layer');
    
    // Injecte les coordonnées exactes de l'icône cliquée dans les variables CSS
    layer.style.setProperty('--start-x', (rect.left - phoneRect.left) + 'px');
    layer.style.setProperty('--start-y', (rect.top - phoneRect.top) + 'px');
    layer.style.setProperty('--start-w', rect.width + 'px');
    layer.style.setProperty('--start-h', rect.height + 'px');

    renderApp(appId);
    
    // Force le navigateur à appliquer les variables avant d'ajouter la classe
    void layer.offsetWidth; 
    
    layer.classList.add('open');
    document.getElementById('home-grid').classList.add('blur-home');
}

function closeApp() {
    document.getElementById('app-layer').classList.remove('open');
    document.getElementById('home-grid').classList.remove('blur-home');
}

// RENDU DES APPLICATIONS
function renderApp(id) {
    const content = document.getElementById('app-content');
    
    if(id === 'settings') {
        content.innerHTML = `
            <div class="settings-header">
                <div class="profile-pic">${userName.charAt(0).toUpperCase()}</div>
                <div><h3>${userName}</h3><p style="opacity:0.6; font-size:12px" data-i18n="set_account">${i18n[currentLang].set_account}</p></div>
            </div>
            <div class="settings-section">
                <div class="settings-item"><span data-i18n="set_launcher">${i18n[currentLang].set_launcher}</span> <i data-lucide="chevron-right"></i></div>
            </div>
            <div class="settings-section">
                <div class="settings-item" onclick="changeLang('fr')">Français ${currentLang === 'fr' ? '✅' : ''}</div>
                <div class="settings-item" onclick="changeLang('en')">English ${currentLang === 'en' ? '✅' : ''}</div>
                <div class="settings-item" onclick="changeLang('ru')">Русский ${currentLang === 'ru' ? '✅' : ''}</div>
            </div>
            <p style="text-align:center; margin-top:30px; opacity:0.5; font-size:12px" data-i18n="about">${i18n[currentLang].about}</p>
            <p style="text-align:center; opacity:0.3; font-size:10px">Credit: poco.note.13</p>
        `;
        lucide.createIcons();
    }
    else if(id === 'calc') {
        content.innerHTML = `
            <div style="display:flex; flex-direction:column; height:100%">
                <div class="calc-display" id="c-disp">0</div>
                <div class="calc-grid">
                    <div class="calc-btn" onclick="calc('C')">C</div><div class="calc-btn" onclick="calc('/')">/</div><div class="calc-btn" onclick="calc('*')">*</div><div class="calc-btn calc-op" onclick="calc('-')">-</div>
                    <div class="calc-btn" onclick="calc(7)">7</div><div class="calc-btn" onclick="calc(8)">8</div><div class="calc-btn" onclick="calc(9)">9</div><div class="calc-btn calc-op" onclick="calc('+')" style="grid-row: span 2; height: auto">+</div>
                    <div class="calc-btn" onclick="calc(4)">4</div><div class="calc-btn" onclick="calc(5)">5</div><div class="calc-btn" onclick="calc(6)">6</div>
                    <div class="calc-btn" onclick="calc(1)">1</div><div class="calc-btn" onclick="calc(2)">2</div><div class="calc-btn" onclick="calc(3)">3</div><div class="calc-btn calc-op" onclick="calc('=')" style="grid-row: span 2; height: auto">=</div>
                    <div class="calc-btn" onclick="calc(0)" style="grid-column: span 2">0</div><div class="calc-btn" onclick="calc('.')">.</div>
                </div>
            </div>`;
    }
    else if(id === 'phone') {
        content.innerHTML = `
            <div class="dial-display" id="p-disp"></div>
            <div class="dial-pad">
                ${[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(n => `<div class="dial-btn" onclick="dial('${n}')">${n}</div>`).join('')}
                <div></div>
                <div class="dial-btn call-btn" onclick="call()"><i data-lucide="phone" fill="currentColor"></i></div>
                <div class="dial-btn" style="background:transparent" onclick="dial('del')"><i data-lucide="delete"></i></div>
            </div>`;
        lucide.createIcons();
    }
    else if(id === 'hyper') {
        content.innerHTML = `<div style="display:flex;height:100%;align-items:center;justify-content:center;flex-direction:column"><img src="https://raw.githubusercontent.com/Nizaax29/iko/refs/heads/main/Xiaomi_HyperOS_%2528December_2023%2529.webp" width="150"><h2 style="margin-top:20px">HyperOS 2.0.1</h2><p style="opacity:0.6">Système à jour</p></div>`;
    }
}

function changeLang(l) { currentLang = l; updateLangTexts(); renderApp('settings'); }

// LOGIQUE APP
function calc(v) {
    if(v === 'C') calcStr = "";
    else if(v === '=') { try { calcStr = eval(calcStr).toString(); } catch(e) { calcStr = "Err"; } }
    else calcStr += v;
    document.getElementById('c-disp').innerText = calcStr || "0";
}

function dial(v) {
    if(v === 'del') dialStr = dialStr.slice(0, -1);
    else dialStr += v;
    document.getElementById('p-disp').innerText = dialStr;
}
function call() { if(dialStr) document.getElementById('p-disp').innerHTML = `<span style="color:#34C759;font-size:20px">Appel en cours...<br>${dialStr}</span>`; }

// SERVICE WORKER (PWA OFFLINE)
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js'); }
