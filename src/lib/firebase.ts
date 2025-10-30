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
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE"
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
