import { initializeApp } from "firebase/app";
import { deleteToken, getMessaging, getToken, onMessage } from "firebase/messaging";
import { sendTokenToBackend } from "../utils/API";

const firebaseConfig = {
  apiKey: "AIzaSyBlF0bxNZh0PdRZ-0EQfgzGBY_ZS9wNCBs",
  authDomain: "movieverse-dbde5.firebaseapp.com",
  projectId: "movieverse-dbde5",
  storageBucket: "movieverse-dbde5.firebasestorage.app",
  messagingSenderId: "49295472820",
  appId: "1:49295472820:web:ee9f6b4295965970c5bfe1",
  measurementId: "G-5WNK8B0DS4"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  try {
    if (Notification.permission === "granted") {
      const vapidKey = "BMbtxvpKPBp60LCiyVUjTirdot_19uvnaVrrqf-D5xR9Wv2J0j_H1-32weWUG1_Sbn1lwqp0Il85KYUZhqLx2Eg";
      const token = await getToken(messaging, { vapidKey }).catch(async (error) => {
        if (error.code === "messaging/token-unsubscribed" || error.code === "messaging/invalid-token") {
          await deleteToken(messaging).catch(() => console.log("No token to delete"));
          return await getToken(messaging, { vapidKey });
        }
        throw error;
      });

      if (token && typeof token === "string" && token.length >= 50) {
        console.log("Existing FCM Token:", token);
        await sendTokenToBackend(token);
        return token;
      }
    }

    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.warn("Notification permission not granted:", permission);
        return null;
      }
    }

    const vapidKey = "BMbtxvpKPBp60LCiyVUjTirdot_19uvnaVrrqf-D5xR9Wv2J0j_H1-32weWUG1_Sbn1lwqp0Il85KYUZhqLx2Eg";
    const token = await getToken(messaging, { vapidKey });

    if (!token || typeof token !== "string" || token.length < 50) {
      console.warn("Generated token appears invalid");
      return null;
    }

    await sendTokenToBackend(token);
    console.log("Token sent to backend:", token);
    return token;
  } catch (error) {
    console.error("Error generating FCM token or sending to backend:", error);
    return null;
  }
};

export const monitorToken = async () => {
  try {
    const vapidKey = "BMbtxvpKPBp60LCiyVUjTirdot_19uvnaVrrqf-D5xR9Wv2J0j_H1-32weWUG1_Sbn1lwqp0Il85KYUZhqLx2Eg";
    const token = await getToken(messaging, { vapidKey }).catch(async (error) => {
      if (error.code === "messaging/token-unsubscribed" || error.code === "messaging/invalid-token") {
        const newToken = await generateToken();
        return newToken;
      }
      throw error;
    });

    if (!token || typeof token !== "string" || token.length < 50) {
      console.warn("Monitored token appears invalid");
      return null;
    }

    await sendTokenToBackend(token);
    return token;
  } catch (error) {
    console.error("Error monitoring FCM token:", error);
    return null;
  }
};

export { onMessage };