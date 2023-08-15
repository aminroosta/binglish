import { onBindingTriggered } from "./actions";
import { Binding, defaultKeys } from "./default_keys";

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type == 'onProgress') {
    const target = document.getElementById(message.id);
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    ) {
      target.value = message.text;
    } else {
      target.innerText = message.text;
    }
  }
});

let bindings = [] as Binding[];
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

window.addEventListener("keydown", async (e) => {
  for (const binding of bindings) {
    if (
      binding.keys.code === e.code &&
      binding.keys.ctrl === e.ctrlKey &&
      binding.keys.command === e.metaKey &&
      binding.keys.shift === e.shiftKey &&
      binding.keys.alt === e.altKey
    ) {
      const target = e.target as any;
      const text = target?.value || target?.innerText || "";
      if (text) {
        target.id = Math.random().toString(36).substr(2, 9);
        let response = await onBindingTriggered(
          binding.template,
          text,
          target.id
        );
        console.log("Matched: " + binding.name);
      }
    }
  }
});
