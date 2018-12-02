
chrome.browserAction.onClicked.addListener(function(activeTab)
{
  var bkg = chrome.extension.getBackgroundPage();
  bkg.console.log('Icon clicked');
  //Executes the scripts to interact with DOM, since this file cannot.
  var scripts = [
    'formatCases.js'
  ];
  scripts.forEach(function(script)
  {
    chrome.tabs.executeScript(null, { file: script }, function(resp)
    {
      if (script!=='formatCases.js') return;
    });
  });

  /*
  chrome.tabs.insertCSS(tab.id,
  {
    file: "content.css"
  });
  */
});

/*
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.sync.get('state', function(data) {
    if (data.state === 'on') {
      chrome.storage.sync.set({state: 'off'});
      //do something, removing the script or whatever
    } else {
      chrome.storage.sync.set({state: 'on'});
      //inject your script
    }
  });
});
*/

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab)
{
  if (changeInfo.status == 'complete')
  {
    var scripts = [
      'formatCases.js', 
      'accountHoverAddon.js'
    ];
    scripts.forEach(function(script)
    {
      chrome.tabs.executeScript(null, { file: script }, function(resp)
      {
        if (script!=='formatCases.js') return;
      });

      chrome.tabs.executeScript(tabId, { file: script }, function(resp)
      {
        if (script!=='accountHoverAddon.js') return;
      });
    });
  }
})
