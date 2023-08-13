import { BingChat } from "./bing-chat";
import { ConversationResult } from "./types";

let api: BingChat | null = null;
let conv: ConversationResult | null = null;
async function setUp(cookie: string) {
  api = new BingChat({ cookie: cookie })
  chrome.action.setIcon({ path: "/vm-pending.png" });
  console.log("setting up ...");
  try {
    conv = await api.createConversation();
    chrome.action.setIcon({ path: "/vm-active.png" });
  } catch (e) {
    console.log("error setting up", e);
    chrome.action.setIcon({ path: "/vm-outline.png" });
  }
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.type === "onConnect") {
      sendResponse({ farewell: "goodbye" });
      setUp(request.cookie);
    }
  }
);

// chrome.runtime.onConnect.addListener(function(port) {
//   console.assert(port.name === "binding");
//   port.onMessage.addListener(function(msg) {
//     if (msg.joke === "Knock knock")
//       port.postMessage({ question: "Who's there?" });
//     else if (msg.answer === "Madame")
//       port.postMessage({ question: "Madame who?" });
//     else if (msg.answer === "Madame... Bovary")
//       port.postMessage({ question: "I don't get it." });
//   });
// });

//   await api.sendMessage(prompt, {
//     onProgress: (partial) => {
//       // console.clear()
//       console.log(partial.text)
//     }
//   });
