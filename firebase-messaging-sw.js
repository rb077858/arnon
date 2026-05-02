importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAiv4xuYxsYd9OX6PXz1cWokGeHwc9_esw",
  authDomain: "alerts-site.firebaseapp.com",
  projectId: "alerts-site",
  storageBucket: "alerts-site.firebasestorage.app",
  messagingSenderId: "594437817901",
  appId: "1:594437817901:web:0531fd83992572ca791aa4",
  measurementId: "G-R50NWKGGKN"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
