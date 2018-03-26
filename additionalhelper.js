/* To look into later if I want to get podnums from accounts page. */

x-grid3-cell-inner x-grid3-col-ACCOUNT_NAME
x-grid3-cell-inner x-grid3-col-ACCOUNT_NAME

x-grid3-cell-inner x-grid3-col-00NE0000005aEIG

x-grid3-col-ACCOUNT_NAME


function getAccountLinkFromCurrentAccountPage()
{
	var currentAccountsURL = "https://visier.my.salesforce.com/001?fcf=00BE0000004Ex2m";
	var accountCells = document.getElementsByClassName("x-grid3-col-ACCOUNT_NAME");
	var searchText = "KeyCorp";
	var found;

	for (var i = 0; i < accountCells.length; i++)
	{
		if (accountCells[i].textContent == searchText)
		{
		    found = accountCells[i];
		    accountLink = found.children[0].href;
			console.log(accountLink);
		}
	}
}

function parseRawHTMLToDocumentObject(rawHTML)
{
	var xmlString = rawHTML, parser = new DOMParser(), doc = parser.parseFromString(xmlString, "text/xml");
	/*
	var markup = '<div><p>text here</p></div>';
	var parser = new DOMParser()
	var el = parser.parseFromString(markup, "text/xml");
	el.firstCHild...
	*/
}

function getAccountsPageAsRawHTML()
{
	var currentAccountsURL = "https://visier.my.salesforce.com/001?fcf=00BE0000004Ex2m";
}


function getPageHTMLWithAjax(url)
{
	/*
	var currentAccountsURL = "https://visier.my.salesforce.com/001?fcf=00BE0000004Ex2m";
	data = "";
	url = currentAccountsURL;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4)
		{
	    	data = xhr.responseText
	    }
	}
	xhr.send();
	*/


	var currentAccountsURL = "https://visier.my.salesforce.com/001?fcf=00BE0000004Ex2m";
    url = currentAccountsURL;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function()
    {
   		if (xhr.readyState == 4)
    	{
        	console.log(xhr.responseText)
        }
    }
    xhr.send();

}

function getPageHTMLWithAjax()
{
	var currentAccountsURL = "https://visier.my.salesforce.com/001?fcf=00BE0000004Ex2m";
    url = currentAccountsURL;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    var rawHTML = "test";
    xhr.onload = function()
    {
		returnString(xhr.responseText);
    }
    xhr.send();
}

console.log(getPageHTMLWithAjax);


function returnString(string)
{
	return string;
}
