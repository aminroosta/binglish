import { Key, defaultKeys } from "./default_keys";

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});

console.log("Hello from your Chrome extension!");

let bindings = [] as Key[];
chrome.storage.local.get(['keys'], (result) => {
  bindings = result.keys ?? defaultKeys;
});

chrome.storage.onChanged.addListener((changes, _namespace) => {
  for (const key in changes) {
    if (key === "keys") {
      bindings = changes[key].newValue;
    }
  }
});

window.addEventListener("keydown", function(e) {
  for (const binding of bindings) {
    if (
      binding.keys.code === e.code &&
      binding.keys.ctrl === e.ctrlKey &&
      binding.keys.command === e.metaKey &&
      binding.keys.shift === e.shiftKey &&
      binding.keys.alt === e.altKey
    ) {
      console.log("Matched: " + binding.name);
    }
  }
});
