<script>
// Prevent rubber-banding completely on touch devices
document.addEventListener('touchmove', function (e) {
    if (!e.target.closest('.users') && !e.target.closest('.messages') && !e.target.closest('.sidebar') && !e.target.closest('.settings-body')) {
        e.preventDefault();
    }
}, { passive: false });

// ================= UTILITIES =================
window.escapeHTML = function(str) {
    if(!str) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag]));
};

function getSafeAvatarUrl(userObj, fallbackName) {
    const url = userObj.profile_image || userObj.profilePic || "";
    if (url && url.trim() !== "") return url;
    const name = encodeURIComponent(fallbackName || "User");
    return `https://ui-avatars.com/api/?name=${name}&background=2563eb&color=fff`;
}

function showToast(msg, type='info') {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = msg;
    if(type === 'error') toast.style.background = '#ef4444';
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 2500);
}

function timeAgo(timestamp) {
    if (!timestamp) return "A while ago";
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return past.toLocaleDateString();
}

function showSkeletonLoader(containerElement, count = 5) {
    containerElement.innerHTML = '';
    for(let i=0; i<count; i++) {
        containerElement.innerHTML += `
            <div class="skeleton-card">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-content">
                    <div class="skeleton-line short"></div>
                    <div class="skeleton-line long"></div>
                </div>
            </div>
        `;
    }
}

// ================= FIREBASE INIT =================
const firebaseConfig = {
    apiKey: "AIzaSyC9T2Y5txsjo1qHvjEx6j3iN_4NMzyK9Qw",
    authDomain: "fahimn.co.in",
    databaseURL: "https://fahimn-co-in-default-rtdb.firebaseio.com",
    projectId: "fahimn-co-in",
    storageBucket: "fahimn-co-in.firebasestorage.app",
    messagingSenderId: "698585907618",
    appId: "1:698585907618:web:c8e4a6646b6b8f5c7932fb"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();
let messaging;
if (firebase.messaging && firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
}

// ================= GLOBALS =================
let currentUid = null;
let activeChatUserId = null;
let activeChatRoomId = null;
let activeChatIsGroup = false; 
let chatListenerRef = null;
let activeStatusListener = null; 
let allUsersData = []; 
let recentChatsDataRaw = []; 
let isDataLoaded = false; 
let isSecretModeActive = false;
let currentSecretPin = "";
let selectedUsersForGroup = [];
let currentCreateType = 'Group';

// AI BOT CONFIGURATION
const aiBotObj = {
    id: "sadik-artificial-100k",
    name: "fahimm.co.in",
    profilePic: "https://ui-avatars.com/api/?name=AI&background=020617&color=38bdf8&bold=true",
    isBot: true
};

const recentChatsList = document.getElementById("recentChatsList");
showSkeletonLoader(recentChatsList, 6);

// ================= FIREBASE SETTINGS SYNC =================
let userSettings = {
    readReceipts: true, typingIndicator: true, fingerprint: false,
    twoStep: false, darkMode: true, autoDelete: false,
    msgAlerts: true, autoDownload: true
};

window.syncSetting = function(key, value) {
    if(!currentUid) return;
    db.ref(`users/${currentUid}/settings/${key}`).set(value).then(() => {
        showToast(`Setting saved!`, 'success');
        if(key === 'darkMode') applyTheme(value);
    });
}

function applyTheme(isDark) {
    if(isDark) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
}

function loadFirebaseSettings() {
    db.ref(`users/${currentUid}/settings`).on('value', snap => {
        if(snap.exists()) userSettings = { ...userSettings, ...snap.val() };
        Object.keys(userSettings).forEach(key => {
            const toggleElement = document.getElementById(`set-${key}`);
            if(toggleElement) toggleElement.checked = userSettings[key];
        });
        applyTheme(userSettings.darkMode);
    });
}

// ================= AUTH & INIT =================
auth.onAuthStateChanged(user => {
    if (user) {
        currentUid = user.uid;
        loadFirebaseSettings();

        const userStatusDatabaseRef = db.ref('/users/' + currentUid + '/status');
        const isOfflineForDatabase = { state: 'offline', last_changed: firebase.database.ServerValue.TIMESTAMP };
        const isOnlineForDatabase = { state: 'online', last_changed: firebase.database.ServerValue.TIMESTAMP };
        db.ref('.info/connected').on('value', function(snapshot) {
            if (snapshot.val() == false) return;
            userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
                userStatusDatabaseRef.set(isOnlineForDatabase);
            });
        });

        db.ref('users/' + currentUid).on('value', snap => {
            if(snap.exists()) {
                const data = snap.val();
                const safeName = data.name || data.fullName || user.displayName || "Display Name";
                const safeEmail = data.email || user.email || "No Email linked";
                const dp = getSafeAvatarUrl(data, safeName);
                
                document.getElementById('welcomeUserAvatar').src = dp;
                document.getElementById('welcomeUserAvatar').style.opacity = '1';
                document.getElementById('welcomeUserName').innerText = `"${safeName}"`;
                
                const welcomeSec = document.getElementById('welcomeSection');
                if(welcomeSec) welcomeSec.classList.remove('welcome-skeleton');
                document.getElementById('welcomeUserName').style.color = '#fff';
                document.getElementById('welcomeUserName').style.background = 'transparent';
                
                document.getElementById('sidebarAvatar').src = dp;
                document.getElementById('sidebarName').innerText = safeName;
                document.getElementById('sidebarEmail').innerText = safeEmail;
            }
        });

        loadAllUsersForSearch();
        loadRecentChats();
    } else {
        window.location.href = "auth.html";
    }
});

function logoutUser() {
    if(confirm("Are you sure you want to logout?")) {
        auth.signOut().then(() => { window.location.href = "auth.html"; });
    }
}

function requestFCM() {
    if(!messaging) return showToast("Push Notifications not supported", "error");
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') showToast("Notification Permission Granted!");
        else showToast("Notifications Denied", "error");
    });
}

// ================= DATA FETCHING =================
function loadAllUsersForSearch() {
    db.ref('users').on('value', snap => {
        allUsersData = [aiBotObj]; 
        snap.forEach(child => {
            if (child.key !== currentUid) allUsersData.push({ id: child.key, ...child.val() });
        });
        isDataLoaded = true;
        renderRecentChatsUI(); 
    });
}

function loadRecentChats() {
    db.ref(`users/${currentUid}/recentChats`).orderByChild('timestamp').on('value', snap => {
        recentChatsDataRaw = [];
        snap.forEach(child => { recentChatsDataRaw.push({ uid: child.key, ...child.val() }); });
        recentChatsDataRaw.sort((a,b) => b.timestamp - a.timestamp); 
        isDataLoaded = true;
        renderRecentChatsUI(); 
    });
}

function renderRecentChatsUI() {
    if(!document.querySelectorAll('.tab')[0].classList.contains('active') || !isDataLoaded) return; 

    recentChatsList.innerHTML = '';
    
    let aiChat = recentChatsDataRaw.find(c => c.uid === aiBotObj.id);
    if(!aiChat) recentChatsDataRaw.unshift({ uid: aiBotObj.id, timestamp: Date.now() });

    recentChatsDataRaw.forEach(chat => {
        let isGroup = chat.isGroup;
        let safeName, dp;

        if(isGroup) {
            safeName = escapeHTML(chat.name || "Group");
            dp = `https://ui-avatars.com/api/?name=${encodeURIComponent(safeName)}&background=10b981&color=fff`;
            const timeStr = chat.timestamp ? new Date(chat.timestamp).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : '';
            
            recentChatsList.innerHTML += `
                <div class="user-card fade-in" onclick="openChat('${chat.uid}', '${safeName}', '${dp}', false, false, true)">
                    <div class="avatar-box"><img class="avatar" src="${dp}"></div>
                    <div class="user-content">
                        <h3>${safeName} <i class="fa-solid fa-users" style="font-size:10px; color:#cbd5e1; margin-left:4px;"></i></h3>
                        <p>Group Message</p>
                    </div>
                    <div class="time">${timeStr}</div>
                </div>
            `;
        } else {
            const u = allUsersData.find(user => user.id === chat.uid) || {};
            safeName = escapeHTML(u.name || "Display Name");
            dp = u.profilePic || getSafeAvatarUrl(u, safeName);
            const timeStr = chat.timestamp ? new Date(chat.timestamp).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : '';
            const botBadge = u.isBot ? `<span class="ai-badge" style="background:#2563eb; padding:2px 6px; border-radius:4px; font-size:9px; margin-left:5px;">AI</span>` : '';
            const encBadge = chat.isSecret ? `<i class="fa-solid fa-lock" style="color:#10b981; font-size:10px; margin-left:5px;"></i>` : '';
            const isOnline = (u.status && u.status.state === 'online') ? 'online' : 'offline';

            recentChatsList.innerHTML += `
                <div class="user-card fade-in" onclick="openChat('${u.id}', '${safeName}', '${dp}', ${u.isBot || false}, ${chat.isSecret || false}, false)">
                    <div class="avatar-box"><img class="avatar" src="${dp}"><span class="status ${u.isBot ? 'online' : isOnline}"></span></div>
                    <div class="user-content"><h3>${safeName} ${botBadge} ${encBadge}</h3><p>Tap to open chat</p></div>
                    <div class="time">${timeStr}</div>
                </div>
            `;
        }
    });
}

window.switchTab = function(btnElement, tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btnElement.classList.add('active');
    if(tabName === 'primary') {
        isSecretModeActive = false; 
        document.getElementById("chatScreen").style.background = ""; 
        if(!isDataLoaded) showSkeletonLoader(recentChatsList, 6);
        else renderRecentChatsUI(); 
    }
}

// ================= CREATE SCREEN LOGIC =================
window.openCreateScreen = function() {
    document.getElementById("createScreen").classList.add("active");
    document.getElementById("globalSearchInput").value = '';
    renderCreateUsersList('');
}
window.closeCreateScreen = function() { document.getElementById("createScreen").classList.remove("active"); }

document.getElementById("globalSearchInput").addEventListener("keyup", (e) => renderCreateUsersList(e.target.value.toLowerCase()));

function renderCreateUsersList(query) {
    const list = document.getElementById("createUsersList");
    list.innerHTML = '';
    
    const menu = document.getElementById("createActionsMenu");
    if(query.length > 0) menu.style.display = "none";
    else menu.style.display = "block";

    allUsersData.forEach(u => {
        const name = (u.name || "User").toLowerCase();
        if (name.includes(query) || !query) {
            const safeName = escapeHTML(u.name);
            const dp = u.profilePic || getSafeAvatarUrl(u, safeName);
            list.innerHTML += `
                <div class="user-card fade-in" onclick="openChat('${u.id}', '${safeName}', '${dp}', ${u.isBot || false})">
                    <div class="avatar-box"><img class="avatar" src="${dp}"></div>
                    <div class="user-content"><h3>${safeName}</h3></div>
                </div>
            `;
        }
    });
}

window.openGroupSetupScreen = function(type) {
    currentCreateType = type;
    document.getElementById('gcTitle').innerText = `New ${type}`;
    document.getElementById('gcNameInput').placeholder = `${type} Subject...`;
    selectedUsersForGroup = [];
    document.getElementById('gcNameInput').value = '';
    renderGroupMembersList();
    updateGroupStrip();
    document.getElementById("groupSetupScreen").classList.add("active");
}
window.closeGroupSetupScreen = function() { document.getElementById("groupSetupScreen").classList.remove("active"); }

function renderGroupMembersList() {
    const list = document.getElementById("gcUsersList");
    list.innerHTML = '';
    allUsersData.forEach(u => {
        if(u.isBot) return; 
        const safeName = escapeHTML(u.name || "Display Name");
        const dp = getSafeAvatarUrl(u, safeName);
        const isSelected = selectedUsersForGroup.includes(u.id);
        const selectedClass = isSelected ? 'selected' : '';
        list.innerHTML += `
            <div class="user-card ${selectedClass}" onclick="toggleGroupUser('${u.id}')">
                <div class="avatar-box"><img class="avatar" src="${dp}"></div>
                <div class="user-content"><h3>${safeName}</h3></div>
                <div class="custom-checkbox"></div>
            </div>
        `;
    });
}

window.toggleGroupUser = function(uid) {
    if(selectedUsersForGroup.includes(uid)) selectedUsersForGroup = selectedUsersForGroup.filter(id => id !== uid);
    else selectedUsersForGroup.push(uid);
    renderGroupMembersList();
    updateGroupStrip();
}

function updateGroupStrip() {
    const strip = document.getElementById('selectedMembersStrip');
    const btn = document.getElementById('gcSubmitBtn');
    if(selectedUsersForGroup.length === 0) { strip.style.display = 'none'; btn.style.display = 'none'; return; }
    strip.style.display = 'flex'; btn.style.display = 'flex'; strip.innerHTML = '';
    selectedUsersForGroup.forEach(uid => {
        const u = allUsersData.find(user => user.id === uid);
        if(u) {
            const safeName = escapeHTML(u.name || "Display Name");
            const dp = getSafeAvatarUrl(u, safeName);
            strip.innerHTML += `<div class="sel-member" onclick="toggleGroupUser('${uid}')"><img src="${dp}"><div class="remove-icon"><i class="fa-solid fa-xmark"></i></div></div>`;
        }
    });
}

window.submitCreateGroup = function() {
    const name = document.getElementById('gcNameInput').value.trim();
    if(!name) return showToast(`Please provide a subject`, 'error');
    if(selectedUsersForGroup.length === 0) return showToast('Select at least 1 contact', 'error');

    const groupId = 'group_' + Date.now();
    const members = {};
    selectedUsersForGroup.forEach(uid => members[uid] = true);
    members[currentUid] = true;

    db.ref(`chats/${groupId}`).set({
        isGroup: true, type: currentCreateType, name: name, admin: currentUid, members: members, timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
        Object.keys(members).forEach(uid => {
            db.ref(`users/${uid}/recentChats/${groupId}`).update({ timestamp: firebase.database.ServerValue.TIMESTAMP, isGroup: true, name: name });
        });
        showToast(`Group "${name}" created!`, 'success');
        closeGroupSetupScreen();
        closeCreateScreen();
    });
}

// ================= SECRET CHAT MODAL =================
window.showSecretModal = function() { 
    const modal = document.getElementById('secretModal');
    if(modal) modal.style.display = 'flex'; 
}
window.closeSecretModal = function() { 
    const modal = document.getElementById('secretModal');
    if(modal) modal.style.display = 'none'; 
}
window.startSecretChat = function() {
    const pin = document.getElementById('secretPin').value;
    if(pin.length < 4) return showToast("PIN must be at least 4 digits", "error");
    isSecretModeActive = true;
    currentSecretPin = pin;
    closeSecretModal();
    showToast("Secret Mode Activated! 🔒");
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab')[1].classList.add('active');
}

// ================= TOOLS & INFO =================
window.toggleToolsMenu = function() { 
    const menu = document.getElementById("chatToolsMenu");
    if(menu) menu.classList.toggle("active"); 
}
window.closeToolsMenu = function() { 
    const menu = document.getElementById("chatToolsMenu");
    if(menu) menu.classList.remove("active"); 
}

window.openChatInfo = function() {
    const screen = document.getElementById("chatInfoScreen");
    if(screen) screen.classList.add("active");
    
    document.getElementById("infoName").innerText = document.getElementById("chatName").innerText;
    document.getElementById("infoAvatar").src = document.getElementById("chatAvatar").src;
    
    const membersSec = document.getElementById("groupMembersSection");
    const membersList = document.getElementById("infoMembersList");
    
    if(activeChatIsGroup) {
        document.getElementById("infoSub").innerText = "Group Chat";
        if(membersSec) membersSec.style.display = "block";
        if(membersList) membersList.innerHTML = '<div style="text-align:center; color:#94a3b8;"><i class="fa-solid fa-spinner fa-spin"></i></div>';
        
        db.ref(`chats/${activeChatRoomId}/members`).once('value').then(snap => {
            if(snap.exists()) {
                const members = snap.val();
                const memberIds = Object.keys(members);
                document.getElementById("memberCount").innerText = memberIds.length;
                if(membersList) membersList.innerHTML = '';
                
                memberIds.forEach(uid => {
                    let safeName = "Display Name"; let dp = "";
                    if(uid === currentUid) {
                        safeName = "You"; dp = document.getElementById('welcomeUserAvatar').src;
                    } else {
                        const u = allUsersData.find(user => user.id === uid) || {};
                        safeName = escapeHTML(u.name || "Display Name");
                        dp = getSafeAvatarUrl(u, safeName);
                    }
                    if(membersList) membersList.innerHTML += `
                        <div class="user-card fade-in" style="margin-bottom:5px;"><div class="avatar-box"><img class="avatar" src="${dp}"></div><div class="user-content"><h3>${safeName}</h3></div></div>
                    `;
                });
            }
        });
    } else {
        document.getElementById("infoSub").innerText = document.getElementById('chatStatus').innerText;
        if(membersSec) membersSec.style.display = "none";
    }
}
window.closeChatInfo = function() { 
    const screen = document.getElementById("chatInfoScreen");
    if(screen) screen.classList.remove("active"); 
}

// ================= CHAT ROOM =================
window.openChat = function(targetUid, targetName, targetImg, isBot = false, isSecret = false, isGroup = false) {
    activeChatUserId = targetUid;
    activeChatIsGroup = isGroup;
    
    if (isSecret && !isSecretModeActive) {
        showToast("Please enter PIN in Secret Chats tab first!", "error");
        return;
    }

    if(isGroup) {
        activeChatRoomId = targetUid;
    } else {
        activeChatRoomId = currentUid < targetUid ? `${currentUid}_${targetUid}` : `${targetUid}_${currentUid}`;
        if(isSecretModeActive) activeChatRoomId += "_SECRET"; 
    }

    if(isSecretModeActive) {
        document.getElementById("chatScreen").style.background = "linear-gradient(-45deg, #022c22, #064e3b, #020617)";
    } else {
        document.getElementById("chatScreen").style.background = ""; 
    }

    document.getElementById('chatName').innerText = targetName;
    document.getElementById('chatAvatar').src = targetImg;
    
    const statusEl = document.getElementById('chatStatus');
    if (activeStatusListener) activeStatusListener.off();

    if (isGroup) {
        statusEl.innerText = "Group Chat";
        statusEl.style.color = "#94a3b8"; 
    } else if (isBot) {
        statusEl.innerText = "AI Assistant Online";
        statusEl.style.color = "#38bdf8"; 
    } else {
        statusEl.innerText = "Connecting...";
        activeStatusListener = db.ref('/users/' + targetUid + '/status');
        activeStatusListener.on('value', (snap) => {
            if (snap.exists()) {
                const status = snap.val();
                if (status.state === 'online') {
                    statusEl.innerText = "Online";
                    statusEl.style.color = "#22c55e"; 
                } else {
                    statusEl.innerText = "Last seen: " + timeAgo(status.last_changed);
                    statusEl.style.color = "#94a3b8"; 
                }
            } else {
                statusEl.innerText = "Offline";
                statusEl.style.color = "#94a3b8";
            }
        });
    }

    document.getElementById("chatScreen").classList.add("active");
    closeCreateScreen(); 
    closeToolsMenu();

    if(chatListenerRef) chatListenerRef.off();
    document.getElementById("messages").innerHTML = '';

    chatListenerRef = db.ref(`chats/${activeChatRoomId}/messages`);
    chatListenerRef.on('child_added', snap => renderMessage(snap.val(), snap.key));
    chatListenerRef.on('child_changed', snap => updateMessageStatus(snap.val(), snap.key));
}

document.getElementById("backBtn").addEventListener("click", () => {
    document.getElementById("chatScreen").classList.remove("active");
    activeChatUserId = null;
    closeToolsMenu();
    if(chatListenerRef) chatListenerRef.off();
    if(activeStatusListener) activeStatusListener.off(); 
});

// ================= SEND MESSAGE & 🔥 KHATARNAK AI LOGIC 🔥 =================
const input = document.getElementById("messageInput");

async function sendMessage() {
    let text = input.value.trim();
    if (text === "" || !activeChatRoomId) return;

    input.value = ""; 
    let msgObj = {
        text: text,
        senderId: currentUid,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        status: 'sent',
        isEncrypted: isSecretModeActive
    };

    if(isSecretModeActive && typeof CryptoJS !== 'undefined') {
        msgObj.text = CryptoJS.AES.encrypt(text, currentSecretPin).toString();
    }

    db.ref(`chats/${activeChatRoomId}/messages`).push().set(msgObj);

    if (activeChatIsGroup) {
        db.ref(`chats/${activeChatRoomId}/members`).once('value').then(snap => {
            if(snap.exists()) {
                Object.keys(snap.val()).forEach(uid => {
                    db.ref(`users/${uid}/recentChats/${activeChatRoomId}`).update({ timestamp: firebase.database.ServerValue.TIMESTAMP });
                });
            }
        });
    } else {
        db.ref(`users/${currentUid}/recentChats/${activeChatUserId}`).update({ timestamp: firebase.database.ServerValue.TIMESTAMP, isSecret: isSecretModeActive });
        if(activeChatUserId !== aiBotObj.id) {
            db.ref(`users/${activeChatUserId}/recentChats/${currentUid}`).update({ timestamp: firebase.database.ServerValue.TIMESTAMP, isSecret: isSecretModeActive });
        }
    }

    if (activeChatUserId === aiBotObj.id) handleBotResponse(text);
    closeToolsMenu();
}

async function handleBotResponse(userText) {
    const box = document.getElementById("messages");
    const typingDiv = document.createElement("div");
    typingDiv.className = "message received";
    typingDiv.id = "local-typing";
    typingDiv.style.background = "transparent";
    typingDiv.style.border = "none";
    typingDiv.style.padding = "0";
    typingDiv.innerHTML = `
        <div class="typing-indicator" style="display:flex; gap:3px; padding: 10px; background:rgba(255,255,255,0.08); border-radius:16px; width:fit-content;">
            <div style="width:6px; height:6px; background:#fff; border-radius:50%; animation:fadeIn 1s infinite alternate;"></div>
            <div style="width:6px; height:6px; background:#fff; border-radius:50%; animation:fadeIn 1s infinite alternate 0.2s;"></div>
            <div style="width:6px; height:6px; background:#fff; border-radius:50%; animation:fadeIn 1s infinite alternate 0.4s;"></div>
        </div>`;
    
    box.appendChild(typingDiv);
    box.scrollTop = box.scrollHeight;

    let botReply = "";
    try {
        let lowerText = userText.toLowerCase().trim();
        
        // 1. 🤖 BOT IDENTITY CHECK
        if (lowerText.match(/tumhara naam|tera naam|who are you|aap kaun ho|what is your name|tum kaun ho/)) {
            botReply = "Main **fahimn.co.in** ka smart assistant hoon 🤖. Aapko kya madad chahiye?";
        } 
        
        // 2. 👑 CREATOR CHECK
        else if (lowerText.match(/kisne banaya|who created you|tumhara baap|creator kaun hai|tumhara malik/)) {
            botReply = "Mujhe **Fahim** ne banaya hai, wahi mere creator aur is platform ke owner hain. 👑";
        } 
        
        // 3. 🕵️‍♂️ USER ACCOUNT SCANNER (Khatarnak Logic)
        else if (lowerText.match(/mera naam|who am i|main kaun hoon|my details|mera account/)) {
            const currentUser = auth.currentUser;
            let uName = document.getElementById('sidebarName').innerText || "User";
            let uEmail = document.getElementById('sidebarEmail').innerText || "N/A";
            let loginDetails = "N/A";
            
            if (currentUser && currentUser.metadata && currentUser.metadata.lastSignInTime) {
                let loginDate = new Date(currentUser.metadata.lastSignInTime);
                let dayDate = loginDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); 
                let exactTime = loginDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); 
                loginDetails = `${dayDate} ko ${exactTime} baje`;
            }
            
            botReply = `Maine aapka system scan kar liya hai! 🕵️‍♂️\n\n👤 **Naam:** ${uName}\n📧 **Email:** ${uEmail}\n🔒 **UID:** ${currentUid.substring(0,8)}...***\n📅 **Aakhri Login:** ${loginDetails}\n📍 **Device Status:** Secured ✅\n\nAap bilkul safe hain!`;
        } 
        
        // 4. ⌚ TIME & DATE CHECK
        else if (lowerText.match(/time kya|aaj kya|date kya|current time/)) {
            let now = new Date();
            let d = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            let t = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
            botReply = `Aaj **${d}** hai, aur abhi **${t}** ho rahe hain. ⌚`;
        }
        
        // 5. 🎨 IMAGE GENERATOR
        else if(lowerText.startsWith('/imagine ')) {
            let prompt = userText.substring(9);
            await new Promise(r => setTimeout(r, 1200)); 
            botReply = `Lijiye aapki image taiyar hai: 🎨<br><img src="https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}" style="width:100%; border-radius:10px; margin-top:5px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">`;
        } 
        
        // 6. 🧠 CORE AI API (Strict Fallback)
        else {
            let systemPrompt = `You are an exclusive AI assistant for 'fahimn.co.in' created by Fahim. Always reply in simple Hinglish (Hindi written in English alphabet). Keep it short (1-2 sentences). You offer premium unlocked apps and refer-and-earn features. If you don't know the answer or it's a complex query, reply EXACTLY with "mujhe samajh nahin aaya fir se bataiye". Do not introduce yourself unless asked.`;
            
            let res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(userText)}?system=${encodeURIComponent(systemPrompt)}`);
            if(!res.ok) throw new Error("API Failed");
            
            botReply = await res.text();
            
            // Safety Net Filters
            let badKeywords = ["i'm sorry", "i can't", "as an ai", "i cannot", "language model", "openai", "sorry"];
            let isBadOutput = badKeywords.some(kw => botReply.toLowerCase().includes(kw));
            
            if(!botReply || botReply.trim() === "" || isBadOutput) {
                botReply = "mujhe samajh nahin aaya fir se bataiye";
            }
        }
    } catch(e) {
        botReply = "mujhe samajh nahin aaya fir se bataiye";
    }

    // Replace line breaks with HTML breaks
    botReply = botReply.replace(/\n/g, "<br>");

    const tDiv = document.getElementById("local-typing");
    if(tDiv) tDiv.remove();

    db.ref(`chats/${activeChatRoomId}/messages`).push().set({
        text: botReply, senderId: aiBotObj.id, timestamp: firebase.database.ServerValue.TIMESTAMP, status: 'read'
    });
}

// ================= RENDER & READ RECEIPTS =================
function renderMessage(msg, msgId) {
    const box = document.getElementById("messages");
    if(document.getElementById(`msg_${msgId}`)) return;

    const isMe = msg.senderId === currentUid;
    const msgDiv = document.createElement("div");
    msgDiv.className = isMe ? "message sent" : "message received";
    msgDiv.id = `msg_${msgId}`;

    let displayText = escapeHTML(msg.text);

    if (msg.isEncrypted) {
        if(isSecretModeActive && currentSecretPin && typeof CryptoJS !== 'undefined') {
            try {
                const bytes = CryptoJS.AES.decrypt(msg.text, currentSecretPin);
                displayText = bytes.toString(CryptoJS.enc.Utf8);
                if(!displayText) throw new Error("Wrong PIN");
                displayText = `<div class="encrypted-badge" style="font-size:10px; color:#10b981; margin-bottom:3px;"><i class="fa-solid fa-lock"></i> Decrypted</div>` + escapeHTML(displayText);
            } catch(e) {
                displayText = `<div class="encrypted-badge" style="color:#ef4444; font-size:10px;"><i class="fa-solid fa-triangle-exclamation"></i> Decryption Failed</div>`;
            }
        } else {
            displayText = `🔒 Encrypted Message`;
        }
    } else if (activeChatUserId === aiBotObj.id && !isMe) {
        // Allow HTML for AI bot (for line breaks and images)
        displayText = msg.text; 
    }

    let senderNameHtml = '';
    if (!isMe && activeChatIsGroup) {
        const sender = allUsersData.find(u => u.id === msg.senderId);
        const safeName = sender ? escapeHTML(sender.name || sender.fullName || "Display Name") : "Display Name";
        senderNameHtml = `<div style="font-size:10px; color:#38bdf8; font-weight:600; margin-bottom:2px;">${safeName}</div>`;
    }

    const timeString = new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let tickHtml = '';
    if(isMe && !msg.isEncrypted) {
        if(msg.status === 'read') tickHtml = `<i class="fa-solid fa-check-double receipt-icon" style="color:#38bdf8; font-size:10px; margin-left:5px;"></i>`;
        else if(msg.status === 'delivered') tickHtml = `<i class="fa-solid fa-check-double receipt-icon" style="color:#94a3b8; font-size:10px; margin-left:5px;"></i>`;
        else tickHtml = `<i class="fa-solid fa-check receipt-icon" style="color:#94a3b8; font-size:10px; margin-left:5px;"></i>`;
    }

    msgDiv.innerHTML = `${senderNameHtml}${displayText} <div class="msg-meta" style="display:flex; justify-content:flex-end; align-items:center; margin-top:4px;"><span class="msg-time" style="font-size:9px; opacity:0.7;">${timeString}</span> <span id="tick_${msgId}">${tickHtml}</span></div>`;
    box.appendChild(msgDiv);
    
    const typingInd = document.getElementById("local-typing");
    if (typingInd) { box.appendChild(typingInd); }
    
    box.scrollTop = box.scrollHeight;

    if (!isMe && msg.status !== 'read' && !activeChatIsGroup && msg.senderId !== aiBotObj.id) {
        db.ref(`chats/${activeChatRoomId}/messages/${msgId}`).update({ status: 'read' });
    }
}

// ================= MESSAGE STATUS SYNC =================
function updateMessageStatus(msg, msgId) {
    const tickEl = document.getElementById(`tick_${msgId}`);
    if(tickEl && msg.senderId === currentUid) {
        if(msg.status === 'read') tickEl.innerHTML = `<i class="fa-solid fa-check-double receipt-icon" style="color:#38bdf8; font-size:10px; margin-left:5px;"></i>`;
        else if(msg.status === 'delivered') tickEl.innerHTML = `<i class="fa-solid fa-check-double receipt-icon" style="color:#94a3b8; font-size:10px; margin-left:5px;"></i>`;
    }
}

document.getElementById("sendBtn").addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });

// ================= SIDEBAR LOGIC =================
const menuBtn = document.getElementById("menuBtn");
if(menuBtn) {
    menuBtn.addEventListener("click", () => {
        const sb = document.getElementById("sidebar");
        const sbo = document.getElementById("sidebarOverlay");
        if(sb) sb.classList.add("active");
        if(sbo) sbo.classList.add("active");
    });
}

const sidebarOverlay = document.getElementById("sidebarOverlay");
if(sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => {
        const sb = document.getElementById("sidebar");
        if(sb) sb.classList.remove("active");
        sidebarOverlay.classList.remove("active");
    });
}
</script>
