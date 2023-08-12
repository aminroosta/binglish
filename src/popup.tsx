import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import './style.css';

const Session = () => { return "Todo: Session" };
const KeyBindings = () => { return "Todo: KeyBindings" };

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();


  return (
    <div className="min-w-[700px]">
      <div className="h-8 bg-neutral-100">
      </div>
      TODO: Popup
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
