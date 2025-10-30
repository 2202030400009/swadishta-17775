import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ==========================================
// FIREBASE CONFIGURATION PLACEHOLDER
// ==========================================
// Replace the values below with your actual Firebase project credentials
// You can find these in your Firebase Console:
// 1. Go to Project Settings
// 2. Scroll down to "Your apps"
// 3. Click on the web app icon (</>)
// 4. Copy the configuration object

const firebaseConfig = {
  apiKey: "AIzaSyBWK1r3HKonDys9XHUJpxAj3ByECHIBuS8",
  authDomain: "swadishta-5063e.firebaseapp.com",
  projectId: "swadishta-5063e",
  storageBucket: "swadishta-5063e.firebasestorage.app",
  messagingSenderId: "135600482003",
  appId: "1:135600482003:web:c059cf308ccfb58e181626",
  measurementId: "G-QNW36E9W3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// ==========================================
// FIRESTORE COLLECTIONS STRUCTURE
// ==========================================
// 
// Collection: "menuItems"
// Fields: { name, description, price, imageUrl, createdAt }
//
// Collection: "orders"
// Fields: { 
//   customerName, 
//   mobile, 
//   tableNumber, 
//   items: [{ name, price, quantity }],
//   totalAmount,
//   status: "pending" | "completed",
//   createdAt 
// }
//
// ==========================================
