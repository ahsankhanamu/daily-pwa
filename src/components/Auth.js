import React, { useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your actual Client ID

const Auth = ({ setUser }) => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/drive.file profile email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return null; // This component initializes OAuth and doesn't render anything
};

export default Auth;
