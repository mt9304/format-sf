/*
chrome.browserAction.onClicked.addListener(function(activeTab)
{
  var bkg = chrome.extension.getBackgroundPage();
  bkg.console.log('Icon clicked');
  //Executes the scripts to interact with DOM, since this file cannot.
  chrome.tabs.executeScript(null,
  {
    file: "content.js"
  });

  /*
  chrome.tabs.insertCSS(tab.id,
  {
    file: "content.css"
  });
});
*/

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.tabs.executeScript(null,
    {
      file: "content.js"
    });
  }
})
