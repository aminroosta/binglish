import { BingChat } from "./bing-chat";
import { ConversationResult } from "./types";

chrome.storage.local.get(['cookie'], (result) => {
  if(result.cookie) {
    setUp(result.cookie);
  }
});

let api: BingChat | null = null;
let conv: ConversationResult | null = null;
async function setUp(cookie: string) {
  api = new BingChat({ cookie: cookie })
  chrome.action.setIcon({ path: "/vm-pending.png" });
  try {
    conv = await api.createConversation();
    chrome.action.setIcon({ path: "/vm-active.png" });
  } catch (e) {
    console.log("error setting up", e);
    chrome.action.setIcon({ path: "/vm-outline.png" });
  }
}


chrome.runtime.onMessage.addListener(
  async (request, sender, sendResponse) => {
    if (request.type === "onConnect") {
      try {
        sendResponse({ farewell: "goodbye" });
        await setUp(request.cookie);
        sendResponse({ result: "success" });
      } catch (e) {
        console.error(e);
        sendResponse({ error: e.toString() });
      }
    }
    if (request.type = 'onBindingTriggered') {
      const prompt = request.template.replace('{{text}}', request.text);
      api.sendMessage(prompt, {
        // conversationId: conv?.conversationId,
        onProgress: (partial) => {
          chrome.tabs.sendMessage(
            sender.tab.id,
            {
              type: "onProgress",
              text: partial.text,
              id: request.id
            });
        }
      });
      console.log(request);
      sendResponse({ result: "success" });
    }
  }
);
