//Listener for clicking icon/button on browser.
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
});

//Scripts here will always be loaded and ran when the page updates.
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
      chrome.tabs.executeScript(tabId, { file: script }, function(resp)
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
