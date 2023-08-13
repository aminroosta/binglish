import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Session } from "./session";
import './style.css';

const Tab = (p: { onClick?: () => void, children: any, active: boolean }) => {
  return <div className={[
    "px-2 w-44 h-full justify-start items-center flex transition-all cursor-pointer",
    "box-border border-r border-r-gray-300",
    p.active ? "bg-white border-t border-t-sky-700 border-b border-b-white" : "border-y border-y-gray-300"
  ].join(' ')}
    onClick={p.onClick}
  >
    {p.children}
  </div >
}

const Popup = () => {
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    chrome.storage.local.get(['activeTab'], (result) => {
      setActiveTab(result.activeTab ?? 0);
    });
  }, []);

  const onClick = () => {
    chrome.action.setIcon({ path: "vm-active.png" });
  };

  return (
    <div className="min-w-[700px]">
      <div className="h-8 bg-neutral-100 flex">
        <Tab
          active={activeTab === 0}
          onClick={() => {
            setActiveTab(0);
            chrome.storage.local.set({ activeTab: 0 });
          }}>
          <img src="symbol-keyword.svg" className="mr-2" />
          Session
        </Tab>
        <Tab active={activeTab == 1} onClick={() => {
          setActiveTab(1);
          chrome.storage.local.set({ activeTab: 1 });
        }}>
          <img src="record-keys.svg" className="mr-2" />
          Key Bindings
        </Tab>
        <div className="box-border border-b border-gray-300 h-full w-full"></div>
      </div>
      <Session />
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
