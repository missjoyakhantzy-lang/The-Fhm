// --- FIREBASE SETUP ---
const firebaseConfig = {
    apiKey: "AIzaSyC9T2Y5txsjo1qHvjEx6j3iN_4NMzyK9Qw",
    authDomain: "fahimn-co-in.firebaseapp.com",
    databaseURL: "https://fahimn-co-in-default-rtdb.firebaseio.com",
    projectId: "fahimn-co-in",
    storageBucket: "fahimn-co-in.firebasestorage.app",
    messagingSenderId: "698585907618",
    appId: "1:698585907618:web:c8e4a6646b6b8f5c7932fb"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

let isAdmin = false; let editingAppKey = null; let myUserId = null; let currentOpenAppId = null; 
let allStoreAppsData = []; let currentCatFilter = 'all';

// Generate a random guest ID for session usage
const guestSessionId = 'guest_' + Math.floor(Math.random() * 1000000);

// --- SLIDER LOGIC ---
const slides = document.querySelectorAll('.slide'); let currentSlide = 0;
if(slides.length > 0) { setInterval(() => { slides[currentSlide].classList.remove('active'); currentSlide = (currentSlide + 1) % slides.length; slides[currentSlide].classList.add('active'); }, 3000); }

// --- UPGRADED TOAST FUNCTION ---
function showToast(msg, type = 'info') {
    const box = document.getElementById('toastBox'); const toast = document.createElement('div');
    
    let icon = '<i class="fa-solid fa-bell" style="color: var(--info);"></i>';
    if(type === 'error') {
        toast.className = 'toast error';
        icon = '<i class="fa-solid fa-circle-exclamation" style="color: #ff453a;"></i>';
    } else {
        toast.className = 'toast';
    }
    
    toast.innerHTML = `${icon} <span>${msg}</span>`;
    box.appendChild(toast); 
    
    setTimeout(() => { 
        toast.style.transform='translateY(-50px)'; 
        toast.style.opacity='0'; 
        setTimeout(()=>toast.remove(),400); 
    }, 2500);
}

function escapeHTML(str) { return str ? str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag])) : ''; }
function escapeForJS(str) { return str ? escapeHTML(str).replace(/'/g, "\\'").replace(/"/g, "&quot;") : ''; }

initStoreAppLoader();

// --- SEARCH TOGGLE ---
window.toggleSearchBox = function() {
    const searchWrap = document.getElementById('expandableSearch');
    if(searchWrap.style.display === 'none' || searchWrap.style.display === '') {
        searchWrap.style.display = 'block';
        document.getElementById('appSearchInput').focus();
    } else {
        searchWrap.style.display = 'none';
        document.getElementById('appSearchInput').value = '';
        filterStoreApps();
    }
}

// --- AUTH CHECK ---
auth.onAuthStateChanged((user) => {
    if (user) {
        myUserId = user.uid; document.getElementById('pdLoginBtn').style.display = 'none'; document.getElementById('pdLogoutBtn').style.display = 'flex';
        db.ref('users/' + user.uid).once('value').then(snap => {
            const uData = snap.val();
            if(uData) {
                if(uData.profile_image) {
                    document.getElementById('myDp').src = uData.profile_image; document.getElementById('myDp').style.display = 'flex';
                    document.getElementById('guestDpIcon').style.display = 'none'; document.getElementById('pdDp').src = uData.profile_image;
                    document.getElementById('pdDp').style.display = 'block'; document.getElementById('pdGuestIcon').style.display = 'none';
                }
                document.getElementById('pdName').innerText = uData.name || "VIP User"; document.getElementById('pdId').innerText = "ID: " + (uData.khatarnak_id || '-----');
                if(uData.khatarnak_id === "ADMIN" || user.email === "YOUR_ADMIN_EMAIL@domain.com") {
                    isAdmin = true; document.getElementById('adminStoreControls').style.display = 'block'; document.getElementById('pdAdminBtn').style.display = 'flex'; renderStoreApps(); 
                }
            }
        });
    } else {
        myUserId = null; isAdmin = false; document.getElementById('myDp').style.display = 'none'; document.getElementById('guestDpIcon').style.display = 'flex';
        document.getElementById('pdLoginBtn').style.display = 'flex'; document.getElementById('pdLogoutBtn').style.display = 'none';
        document.getElementById('pdName').innerText = "Guest User"; document.getElementById('pdId').innerText = "Guest Access";
    }
});

// --- NAVIGATION BAR LOGIC ---
window.navAction = function(action, btnElement) {
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    if(action === 'home') { setCategoryFilter('all', document.querySelectorAll('.cat-pill')[0]); document.getElementById('mainContentArea').scrollTo({top:0, behavior:'smooth'}); }
    else if(action === 'games') { setCategoryFilter('games', document.querySelectorAll('.cat-pill')[2]); document.getElementById('mainContentArea').scrollTo({top:0, behavior:'smooth'});}
    else if(action === 'mods') { setCategoryFilter('mods', document.querySelectorAll('.cat-pill')[1]); document.getElementById('mainContentArea').scrollTo({top:0, behavior:'smooth'});}
    else if(action === 'request') { openRequestModal(); }
}

window.toggleProfileMenu = function() { document.getElementById('profileDropdown').classList.toggle('show'); }
document.addEventListener('click', function(e) { if(!e.target.closest('.header-right')) document.getElementById('profileDropdown').classList.remove('show'); });
window.confirmLogout = function() { if(confirm("Log out completely?")) { auth.signOut().then(() => window.location.reload()); } }

window.downloadDynamicApk = function(url, title, appId) {
    if(!url) { showToast("App link is not available.", "error"); return; } showToast("Starting Download...");
    const link = document.createElement('a'); link.href = url; link.setAttribute('download', title.replace(/\s+/g, '_') + '.apk'); link.setAttribute('target', '_blank'); document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

// --- VIP AUTH SECURITY CHECK ---
let pendingDl = null;

window.requestDownload = function(url, title, appId) {
    if(!url) { showToast("App link is not available.", "error"); return; }
    pendingDl = { url: url, title: title, appId: appId };
    document.getElementById('vipPasscode').value = '';
    document.getElementById('authModal').classList.add('show');
}

window.closeAuthModal = function() {
    document.getElementById('authModal').classList.remove('show');
    pendingDl = null;
}

window.verifyAndDownload = function() {
    const code = document.getElementById('vipPasscode').value.trim();
    if(code === "31230") {
        closeAuthModal();
        if(pendingDl) {
            downloadDynamicApk(pendingDl.url, pendingDl.title, pendingDl.appId);
            pendingDl = null;
        }
    } else {
        document.getElementById('vipPasscode').value = '';
        document.getElementById('vipPasscode').classList.add('shake-animation');
        
        // Show Error Toast
        showToast("Arey tu jaa re! (Wrong Code)", "error");
        
        setTimeout(() => { document.getElementById('vipPasscode').classList.remove('shake-animation'); }, 400);
    }
}

// --- RATING SYSTEM (Guest Allowed) ---
const stars = document.querySelectorAll('#modalStars i');
stars.forEach(star => {
    star.addEventListener('click', function() {
        if(!currentOpenAppId) return;
        const uidToUse = myUserId || guestSessionId;
        const val = parseInt(this.getAttribute('data-val'));
        stars.forEach(s => { if(parseInt(s.getAttribute('data-val')) <= val) s.classList.add('active'); else s.classList.remove('active'); });
        db.ref(`admin_settings/store_apps/${currentOpenAppId}/ratings/${uidToUse}`).set(val).then(()=> { showToast("Rated " + val + " Stars!"); });
    });
});

window.openAppDetails = function(id, title, iconUrl, appUrl, desc) {
    currentOpenAppId = id; document.getElementById('detailTitle').innerText = title; document.getElementById('detailIcon').src = iconUrl;
    document.getElementById('detailDesc').innerText = desc ? desc : "No additional details are available. Modded and secured by Admin.";
    
    // Connect modal GET button to security check
    document.getElementById('detailDownloadBtn').onclick = function() { 
        closeAppDetails(); 
        requestDownload(appUrl, title, id); 
    };
    
    stars.forEach(s => s.classList.remove('active'));
    
    const uidToUse = myUserId || guestSessionId;
    db.ref(`admin_settings/store_apps/${id}/ratings/${uidToUse}`).once('value').then(snap => { 
        const myRating = snap.val() || 0; 
        stars.forEach(s => { if(parseInt(s.getAttribute('data-val')) <= myRating) s.classList.add('active'); }); 
    });
    document.getElementById('appDetailsModal').classList.add('show');
}
window.closeAppDetails = function() { document.getElementById('appDetailsModal').classList.remove('show'); currentOpenAppId = null; }

window.setCategoryFilter = function(cat, btnElement) {
    currentCatFilter = cat; document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active'); renderStoreApps();
}
window.filterStoreApps = function() { renderStoreApps(); }

function renderStoreApps() {
    const storeList = document.getElementById('apkStoreList'); const searchQ = document.getElementById('appSearchInput').value.toLowerCase().trim(); storeList.innerHTML = '';
    let filtered = allStoreAppsData.filter(app => { const matchCat = (currentCatFilter === 'all') || (app.category === currentCatFilter); return matchCat && app.title.toLowerCase().includes(searchQ); });
    if (filtered.length > 0) {
        filtered.forEach(app => {
            const safeIcon = app.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.title || 'A')}&background=0a84ff&color=fff&rounded=true`;
            const cleanTitleForJS = escapeForJS(app.title); const cleanUrlForJS = escapeForJS(app.url); const cleanDescForJS = escapeForJS(app.desc);
            let adminControls = '';
            if(isAdmin) { adminControls = `<div class="admin-actions"><button class="btn-action-app edit" onclick="editAppInStore('${app.id}', '${cleanTitleForJS}', '${cleanUrlForJS}', '${app.icon}', '${cleanDescForJS}', '${app.category}')"><i class="fa-solid fa-pen"></i></button><button class="btn-action-app del" onclick="removeAppFromStore('${app.id}')"><i class="fa-solid fa-trash"></i></button></div>`; }
            storeList.innerHTML += `<div class="store-app-item">${adminControls}<img src="${safeIcon}" alt="Icon" class="store-app-icon"><div class="store-app-title" title="${escapeHTML(app.title)}">${escapeHTML(app.title)}</div><div class="app-btn-group"><button class="btn-details" onclick="openAppDetails('${app.id}', '${cleanTitleForJS}', '${safeIcon}', '${cleanUrlForJS}', '${cleanDescForJS}')"><i class="fa-solid fa-ellipsis"></i></button><button class="btn-download" onclick="requestDownload('${cleanUrlForJS}', '${cleanTitleForJS}', '${app.id}')">GET</button></div></div>`;
        });
    } else { storeList.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color:var(--text-muted); font-size:13px; margin-top:20px;">No apps found.</div>`; }
}

function initStoreAppLoader() { db.ref('admin_settings/store_apps').on('value', snap => { allStoreAppsData = []; snap.forEach(child => { allStoreAppsData.push({ id: child.key, ...child.val() }); }); allStoreAppsData.reverse(); renderStoreApps(); }); }

document.getElementById('storeAppIconInput').addEventListener('change', function(e) {
    const file = e.target.files[0]; if(!file) return;
    document.getElementById('globalOverlay').style.display = 'flex'; document.getElementById('overlayText').innerText = "Uploading App Icon...";
    const formData = new FormData(); formData.append('file', file); formData.append('upload_preset', 'qrkdzja7'); 
    fetch('https://api.cloudinary.com/v1_1/dowwvgffp/upload', { method: 'POST', body: formData }).then(res => res.json()).then(data => {
        document.getElementById('hiddenIconUrl').value = data.secure_url; document.getElementById('globalOverlay').style.display = 'none'; document.getElementById('iconUploadBtn').innerHTML = '<i class="fa-solid fa-check"></i> Icon Ready';
    }).catch(err => { document.getElementById('globalOverlay').style.display = 'none'; showToast("Upload Failed!", "error"); });
});

window.publishAppToStore = function() {
    const title = document.getElementById('storeAppTitle').value.trim(); const desc = document.getElementById('storeAppDesc').value.trim(); const url = document.getElementById('storeAppUrl').value.trim(); const cat = document.getElementById('storeAppCat').value; const icon = document.getElementById('hiddenIconUrl').value;
    if(!title || !url || !icon) { showToast("Provide Title, URL, and Icon.", "error"); return; }
    if (editingAppKey) { db.ref('admin_settings/store_apps/' + editingAppKey).update({ title: title, desc: desc, category: cat, url: url, icon: icon }).then(() => { showToast("App Updated!"); resetStoreForm(); }); } 
    else { db.ref('admin_settings/store_apps').push({ title: title, desc: desc, category: cat, url: url, icon: icon, timestamp: firebase.database.ServerValue.TIMESTAMP }).then(() => { showToast("App Published!"); resetStoreForm(); }); }
}

window.editAppInStore = function(key, title, url, icon, desc, cat) {
    editingAppKey = key; document.getElementById('storeFormHeading').innerText = "Edit App Details"; document.getElementById('storeAppTitle').value = title; document.getElementById('storeAppDesc').value = desc; document.getElementById('storeAppUrl').value = url; if(cat) document.getElementById('storeAppCat').value = cat; document.getElementById('hiddenIconUrl').value = icon; document.getElementById('iconUploadBtn').innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Change Icon'; const pubBtn = document.getElementById('publishAppBtn'); pubBtn.innerHTML = '<i class="fa-solid fa-save"></i> Update Live App'; document.getElementById('cancelEditBtn').style.display = 'block'; document.querySelector('.main-content').scrollTo({top: 0, behavior: 'smooth'});
}

window.resetStoreForm = function() {
    editingAppKey = null; document.getElementById('storeFormHeading').innerText = "Upload New App to Store"; document.getElementById('storeAppTitle').value = ''; document.getElementById('storeAppDesc').value = ''; document.getElementById('storeAppUrl').value = ''; document.getElementById('hiddenIconUrl').value = ''; document.getElementById('iconUploadBtn').innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Upload App Icon'; const pubBtn = document.getElementById('publishAppBtn'); pubBtn.innerHTML = '<i class="fa-solid fa-rocket"></i> Publish to VIP Store'; document.getElementById('cancelEditBtn').style.display = 'none';
}

window.removeAppFromStore = function(appKey) { if(confirm("Delete this app?")) { db.ref('admin_settings/store_apps/' + appKey).remove().then(() => showToast("App removed.")); if(editingAppKey === appKey) resetStoreForm(); } }

window.openRequestModal = function() { closeAppDetails(); document.getElementById('profileDropdown').classList.remove('show'); document.getElementById('requestAppModal').classList.add('show'); }
window.closeRequestModal = function() { document.getElementById('requestAppModal').classList.remove('show'); }

// --- REQUEST SYSTEM (Guest Allowed) ---
window.submitAppRequest = function() {
    const uidToUse = myUserId || guestSessionId;
    const appName = document.getElementById('reqAppName').value.trim(); const appDetails = document.getElementById('reqAppDetails').value.trim();
    if(!appName) { showToast("App Name is required!", "error"); return; }
    document.getElementById('globalOverlay').style.display = 'flex'; document.getElementById('overlayText').innerText = "Submitting Request...";
    db.ref('app_requests').push({ uid: uidToUse, appName: appName, appDetails: appDetails, timestamp: firebase.database.ServerValue.TIMESTAMP, status: 'pending' }).then(() => {
        document.getElementById('globalOverlay').style.display = 'none'; showToast("Request Sent!"); closeRequestModal(); document.getElementById('reqAppName').value = ''; document.getElementById('reqAppDetails').value = '';
    }).catch(err => { document.getElementById('globalOverlay').style.display = 'none'; showToast("Failed to send request.", "error"); });
}
