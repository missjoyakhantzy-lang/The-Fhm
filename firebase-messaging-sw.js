// firebase-messaging-sw.js

// 1. Firebase ki service worker wali libraries import karna
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// 2. Aapki Aavira Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCMGx6C5_al22KjCmdhGVKugJoR2UmZ1Ng",
    authDomain: "aavira-co-in.firebaseapp.com",
    projectId: "aavira-co-in",
    storageBucket: "aavira-co-in.firebasestorage.app",
    messagingSenderId: "247971292356",
    appId: "1:247971292356:web:82780c6dffe9ba530f9591"
};

// 3. Firebase Initialize karna
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 4. Background Notification Receiver (Jab website background mein ho ya band ho)
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Background message received: ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png' // Agar logo nahi hai toh is line ko hata sakte hain
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
