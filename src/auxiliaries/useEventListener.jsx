// Note: The below code is from https://usehooks.com/useEventListener/ (changed a bit)
// It is used to listen to keydown events in the App component.

import { useEffect } from "react";

export default function useEventListener(eventName, handler, capture = false, element = window){

    useEffect(() => {
        // Make sure element supports addEventListener
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;
  
        // Add event listener
        element.addEventListener(eventName, handler, { capture: capture });

        // Remove event listener on cleanup
        return () => {
          element.removeEventListener(eventName, handler, { capture: capture });
        };
      }
    );
  };