import React, { useEffect, useState } from "react";
import { onConnect } from "./actions";
export const Session = () => {
  const [cookie, setCookie] = useState("");
  const inputRef = React.useRef<any>(null);

  useEffect(() => {
    chrome.storage.local.get(['cookie'], (result) => {
      setCookie(result.cookie ?? '');
    });
  }, []);

  useEffect(() => {
    inputRef.current.placeholder = [
      "To find and copy the _U cookie value, you need to follow these steps:",
      "- Go to Bing Chat website.",
      "- Press Ctrl+Shift+I on your keyboard to open the Chrome DevTools.",
      "- Alternatively, you can right-click on any element on the page and select Inspect from the menu.",
      "- In the DevTools window, click on the Application tab at the top.",
      "- On the left sidebar, expand the Cookies section and select bing.com.",
      "- On the right panel, you will see a table of cookies that are stored by Bing Chat.",
      "- Look for the cookie with the name _U and copy it.",
    ].join('\n');
  }, []);

  return <div className="p-2 border">
    <div>
      <b>You need access to Bing Chat OR a valid cookie from someone who has access.</b>
    </div>

    <div>
      The cookie you need from Bing is the _U cookie (or just all of the cookies concatenated together; both will work).
    </div>

    <textarea
      className={[
        "w-full h-44 p-2 bg-neutral-100 rounded-sm",
        "border border-gray-300 outline-sky-700"
      ].join(' ')}
      ref={inputRef}
      value={cookie}
      onChange={(e) => {
        setCookie(e.target.value);
        chrome.storage.local.set({ cookie: e.target.value });
        chrome.action.setIcon({ path: "vm-outline.png" });
      }}
    ></textarea>

    <button className="mt-2 bg-sky-700 text-white rounded-sm px-2 py-1"
      onClick={() => {
        onConnect(cookie);
      }}
    >Connect</button>
  </div>;
};
