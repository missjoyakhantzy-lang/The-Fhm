// 1. Firebase scripts ko background worker mein import karna (Version 8.10.1)
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// 2. Aapke Firebase project ki exact Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9T2Y5txsjo1qHvjEx6j3iN_4NMzyK9Qw",
    authDomain: "fahimn-co-in.firebaseapp.com",
    databaseURL: "https://fahimn-co-in-default-rtdb.firebaseio.com",
    projectId: "fahimn-co-in",
    storageBucket: "fahimn-co-in.firebasestorage.app",
    messagingSenderId: "698585907618",
    appId: "1:698585907618:web:c8e4a6646b6b8f5c7932fb"
};

// 3. Firebase ko initialize karna
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 4. Background Message Handler (Jab website band ho tab kya hoga)
messaging.onBackgroundMessage(function(payload) {
    console.log('Background message received: ', payload);
    
    // Notification ka Title aur Body set karna
    const notificationTitle = payload.notification ? payload.notification.title : 'New Message';
    const notificationOptions = {
        body: payload.notification ? payload.notification.body : 'You have a new message on fahimn.co.in',
        icon: 'https://ui-avatars.com/api/?name=Admin+Fahim&background=4f46e5&color=fff', // Aapka brand icon
        badge: 'https://ui-avatars.com/api/?name=F&background=4f46e5&color=fff', // Chhota icon
        data: { 
            url: 'https://fahimn.co.in' // Notification par click karne se kahan jayega
        }
    };

    // User ki screen par notification dikhana
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 5. Notification par click karne ka event (Jisko maine jodh diya hai)
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url || 'https://fahimn.co.in')
    );
});
