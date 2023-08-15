export const onConnect = (cookie: string) => {
  return chrome.runtime.sendMessage({ type: 'onConnect', cookie: cookie });
};

export const onBindingTriggered = (
  template: string,
  text: string,
  id: string
) => {
  return chrome.runtime.sendMessage({
    type: 'onBindingTriggered',
    template,
    text,
    id
  });
};
