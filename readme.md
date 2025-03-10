# **Flash Card App 📚**

A mobile flashcard application built with **React Native & Expo**. Users can create decks, add cards, and quiz themselves while tracking progress.

## **Features**

- Create and manage flashcard decks.
- Add questions and answers to decks.
- Swipe gestures for quiz interactions.
- Secure authentication with Firebase.
- Data persistence using Firestore.
- Animated card flipping for an intuitive experience.

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/)
  Install globally via:
  ```sh
  npm install -g expo-cli
  ```

---

### **Installation**

1. **Extract the ZIP file and change into project's directory**

   ```sh
   cd flash-card
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Start the app**

   ```sh
   npx expo start
   ```

   This will open the **Expo Developer Tools** in your browser.

4. **Run on a device/simulator:**
   - Scan the QR code with the **Expo Go** app (Android/iOS).
   - To run on an emulator, press **'a'** for Android or **'i'** for iOS (Mac with Xcode required).

---

## **Firebase Configuration**

This project uses Firebase for authentication and Firestore for data storage. To configure Firebase:

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com/).
2. **Add a Web App** and copy the Firebase configuration.
3. **Replace the config in `firebaseConfig.js`:**
   ```js
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```
4. **Enable Firestore & Authentication** (Email/Password).

---

## **Running Tests**

This project includes automated tests for key functionalities.

1. Run unit tests:

   ```sh
   npm test
   ```

2. To update Jest snapshots:
   ```sh
   npm run test:updateSnapshots
   ```

---

## **Author**

Developed by **Lu Min Kha**
Feel free to reach out with any questions!
