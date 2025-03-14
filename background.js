chrome.runtime.onInstalled.addListener(() => {
  console.log('YouTube Automation Extension Installed');
  chrome.storage.local.set({ restart: true });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get('restart', (data) => {
    if (data.restart) {
      chrome.tabs.query({ url: "https://www.youtube.com/*" }, (tabs) => {
        if (tabs.length === 0) {
          chrome.tabs.create({ url: "https://www.youtube.com/" });
        }
      });
    }
  });
});
