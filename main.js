import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAiv4xuYxsYd9OX6PXz1cWokGeHwc9_esw",
  authDomain: "alerts-site.firebaseapp.com",
  projectId: "alerts-site",
  storageBucket: "alerts-site.firebasestorage.app",
  messagingSenderId: "594437817901",
  appId: "1:594437817901:web:0531fd83992572ca791aa4",
  measurementId: "G-R50NWKGGKN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

async function initNotifications() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, { 
        vapidKey: 'BKnRyRtq47RP6OakmLzS5FWhAcl4Fngo3JuQ_Mzq-isFQoQ6VoDqdzwjIcSjzpNOuwHBQAG5mqIYcyhGmXDV31Y' // זה המפתח מ-Cloud Messaging
      });

      if (currentToken) {
        // בדיקה ב-Firestore אם הטוקן כבר קיים
        const q = query(collection(db, "tokens"), where("token", "==", currentToken));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          await addDoc(collection(db, "tokens"), {
            token: currentToken,
            timestamp: new Date()
          });
          alert("מזל טוב! נרשמת בהצלחה.");
        } else {
          alert("אתה כבר רשום למערכת.");
        }
      }
    } else {
      alert("יש לאשר התראות בדפדפן.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

document.getElementById('btn-subscribe').addEventListener('click', initNotifications);
