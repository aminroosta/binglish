export const onConnect = (cookie: string) => {
  chrome.runtime.sendMessage({ type: 'onConnect', cookie: cookie });
};
