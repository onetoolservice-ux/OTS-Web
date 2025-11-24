import { initializeApp } from "firebase/app";

const firebaseConfig = {
      apiKey: "YOUR_API_KEY_HERE",
        authDomain: "one-tool-bf01d.firebaseapp.com",
          projectId: "one-tool-bf01d",
            storageBucket: "one-tool-bf01d.firebasestorage.app",
              messagingSenderId: "539338256940",
                appId: "1:539338256940:web:2e737752689c969070d789"
};

export const app = initializeApp(firebaseConfig);
