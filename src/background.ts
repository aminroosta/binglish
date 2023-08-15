import { BingChat } from "./bing-chat";

chrome.storage.local.get(['cookie'], (result) => {
  if(result.cookie) {
    setUp(result.cookie);
  }
});

let api: BingChat | null = null;
async function setUp(cookie: string) {
  api = new BingChat({ cookie: cookie })
  chrome.action.setIcon({ path: "/vm-pending.png" });
  try {
    let progressed = false;
    setIcon(["/vm-connect.png", "/vm-outline.png"]);
    const resp = await api.sendMessage("Hello", {
      onProgress: (_partial) => {
        if (!progressed) {
          progressed = true;
          setIcon(["/vm-active.png"]);
        }
      }
    });
    console.log("resp", resp);
    if (!progressed) {
      setIcon(["/vm-outline.png"]);
    }
  } catch (e) {
    console.log("error setting up", e);
    chrome.action.setIcon({ path: "/vm-outline.png" });
  }
}

let setIconInterval: any = null;
function setIcon(icons: string[]) {
  if (setIconInterval) {
    clearInterval(setIconInterval);
  }
  if (icons.length === 1) {
    chrome.action.setIcon({ path: icons[0] });
    return;
  }
  let i = 0;
  setIconInterval = setInterval(() => {
    chrome.action.setIcon({ path: icons[i] });
    i = (i + 1) % icons.length;
  }, 500);
};


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
    if (request.type == 'onBindingTriggered') {
      const prompt = request.template.replace('{{text}}', request.text);

      setIcon(["/vm-pending.png", "/vm-active.png"]);
      await api.sendMessage(prompt, {
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
      setIcon(["/vm-active.png"]);
      sendResponse({ result: "success" });
    }
  }
);
