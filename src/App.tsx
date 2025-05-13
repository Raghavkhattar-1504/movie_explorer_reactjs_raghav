import { useEffect } from "react";
import RoutingModule from "./RoutingModule"
import { generateToken, messaging, onMessage } from "./Notifications/firebase";
import { Toaster } from 'react-hot-toast';

function App() {
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
    });
  }, []);
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <RoutingModule />
    </>
  )
}

export default App
