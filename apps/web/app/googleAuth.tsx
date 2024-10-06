"use client";

import Script from "next/script";
import { useEffect } from "react";
import { BACKEND_URL, GOOGLE_CLIENT_ID } from "./const";

// Extend the Window interface to include the Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (input: IdConfiguration) => void;
          renderButton: (
            parent: HTMLElement,
            options: GsiButtonConfiguration,
          ) => void;
          prompt: () => void;
        };
      };
    };
    onGoogleLibraryLoad?: () => void;
  }
}

// Type for the response from Google One-Tap
interface CredentialResponse {
  credential: string;
  select_by: string;
}

// Type for Google Identity Services initialization
interface IdConfiguration {
  client_id: string;
  callback: (response: CredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

// Type for Google Sign-In button configuration
interface GsiButtonConfiguration {
  type?: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signup_with";
  shape?: "rectangular" | "pill" | "circle" | "square";
  logo_alignment?: "left" | "center";
  width?: string;
  local?: string;
}

function GoogleAuth() {
  useEffect(() => {
    const handleCredentialResponse = (response: CredentialResponse) => {
      // Handle the encoded JWT ID token
      console.log("Encoded JWT ID token: " + response.credential);

      // Send the token to your backend for verification and user login/creation
      fetch(`${BACKEND_URL}/auth-google/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.credential }),
      });
    };

    window.onGoogleLibraryLoad = () => {
      window.google?.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      //   const buttonElement = document.getElementById("googleOneTapButton");

      //   if (buttonElement) {
      //     window.google?.accounts.id.renderButton(buttonElement, {
      //       type: "standard",
      //       theme: "filled_black",
      //       size: "large",
      //     });
      //   }

      window.google?.accounts.id.prompt();
    };
  }, []);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />
      <div id="googleOneTapButton"></div>
    </>
  );
}

export default GoogleAuth;
