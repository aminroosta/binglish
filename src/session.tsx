import React, { useEffect, useState } from "react";
export const Session = () => {
  const [cookie, setCookie] = useState("");

  useEffect(() => {
    chrome.storage.local.get(['cookie'], (result) => {
      setCookie(result.cookie ?? 0);
    });
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
        "w-full h-40 p-2 bg-neutral-100 rounded-sm",
        "border border-gray-300 outline-sky-700"
      ].join(' ')}
      placeholder="Paste your bing chat cookie here"
      value={cookie}
      onChange={(e) => {
        setCookie(e.target.value);
        chrome.storage.local.set({ cookie: e.target.value });
        chrome.action.setIcon({ path: "vm-outline.png" });
      }}
    ></textarea>

    <button className="mt-2 bg-sky-700 text-white rounded-sm px-2 py-1"
      onClick={() => {
        chrome.action.setIcon({ path: "vm-pending.png" });
      }}
    >Connect</button>
  </div>;
};
