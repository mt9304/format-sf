//Prevents the script form running multiple times. Checks to see if it is the default page. 
defaultHeaders=document.querySelectorAll('th');
if (defaultHeaders.length > 10 && defaultHeaders[5].innerText.split("\n")[0] == "TICKET #")
{
	//*** Runs the actual scripts to format the page. ***
	removeExtraColumnsFromTableHeaders();
	removeExtraColumnsFromTable();
	removeDefaultSortableHeaders();
	removeDefaultSortableHeaders();
	replaceDefaultColoring();
	colorRowsBasedOnTicketStatus();
	bringStatusToTop("Waiting for response");
	bringStatusToTop("Awaiting Fix");
	bringStatusToTop("In Progress");
	bringStatusToTop("Customer Responded");
	bringStatusToTop("New");
	convertJiraNumbersToLinks();
}

function removeExtraColumnsFromTableHeaders()
{
	//Removes same cells from the header.
	columnHeaders=document.querySelectorAll('th');
	for (i = 0; i < columnHeaders.length; i++)
	{
		var multiplier = 0;
	    if (i == 2+multiplier || i == 3+multiplier || i == 4+multiplier || i == 6+multiplier || i == 7+multiplier || i == 8+multiplier || i == 9+multiplier || i == 10+multiplier || i == 11+multiplier || i == 13+multiplier || i == 19+multiplier || i == 20+multiplier)
	    {
	    	columnHeaders[i].parentNode.removeChild(columnHeaders[i]);
	    }
	}
}

function removeExtraColumnsFromTable()
{
	//Get all relevant allTableCells.
   	allTableCells=document.querySelectorAll('[role="caseSummary"] > td');
	//0%0=0 and throws off the count, so make sure to watch for that. Worthy of comment because my math skills are not that great so it took me a while to catch that.
	var rowcount = 0;
	for (i = 0; i < allTableCells.length; i++)
	{
		if (i != 0)
		{
		 	if (i%21==0)
		  	{
		    	rowcount++;
		  	}
		}
		//Trims the table cells for every 2nd, 3rd, etc cell in each row.
		var multiplier = 21*rowcount;
		if (i == 2+multiplier || i == 3+multiplier || i == 4+multiplier || i == 6+multiplier || i == 7+multiplier || i == 8+multiplier || i == 9+multiplier || i == 10+multiplier || i == 11+multiplier || i == 13+multiplier || i == 19+multiplier || i == 20+multiplier)
		{
			allTableCells[i].parentNode.removeChild(allTableCells[i]);
		}
	}
}

function removeDefaultSortableHeaders()
{
	//Removes sorting classes on header, making it unclickable.
	sortableHeaders=document.querySelectorAll(".sortable");
	for (i = 0; i < sortableHeaders.length; i++)
	{
		sortableHeaders[i].classList.add('c-headers');
		sortableHeaders[i].classList.remove('sortable');
	}
}

function replaceDefaultColoring()
{
	//Removes default coloring classes and adds custom class.
	rows=document.querySelectorAll('[role="caseSummary"]');
	for (i = 0; i < rows.length; i++)
	{
		rows[i].classList.add('c-rows');
		rows[i].classList.remove('danger','info');
	}
}

function colorRowsBasedOnTicketStatus()
{
	cells=document.querySelectorAll('[role="caseSummary"] > td');
	var rowcount=0;
	for (i = 0; i < cells.length; i++)
	{
		if (i != 0)
		{
			if (i%9==0)
		  	{
		    	rowcount++;
		  	}
		}

		if (i==4 + rowcount*9)
		{
			//The text gotten from innerText contains a new line, so need to remove not include by splitting. 
		  	var currentStatus = cells[i].innerText.split("\n")[0];
			if (currentStatus == "Customer Responded")
			{
				cells[i].closest('tr').className += " ta-danger";
			}
			if (currentStatus == "In Progress")
			{
				cells[i].closest('tr').className += " ta-danger";
			}
			if (currentStatus == "Waiting for response")
			{
				cells[i].closest('tr').className += " ta-info";
			}
			if (currentStatus == "Awaiting Fix")
			{
				cells[i].closest('tr').className += " ta-warning";
			}
			if (currentStatus == "New")
			{
				cells[i].closest('tr').className += " ta-new";
			}
		}
	}
}

function bringStatusToTop(theStatus)
{
	cells=document.querySelectorAll('[role="caseSummary"] > td');
	var rowcount=0;
	for (i = 0; i < cells.length; i++)
	{
		if (i != 0)
		{
		 	if (i%9==0)
			{
				rowcount++;
			}
		}

		row = cells[i].closest('tbody');
		if (i==4 + rowcount*9)
		{
			var currentStatus = cells[i].innerText.split("\n")[0];
			if (currentStatus == theStatus)
			{
				row.parentNode.insertBefore(row, row.parentNode.firstChild);
			}
		}
	}
}

function convertJiraNumbersToLinks()
{
	cells=document.querySelectorAll('[role="caseSummary"] > td');
	var rowcount=0;
	for (i = 0; i < cells.length; i++)
	{
		if (i != 0)
		{
			if (i%9==0)
			{
				rowcount++;
			}
		}

		row = cells[i].closest('tbody');
		if (i==7 + rowcount*9)
		{
			var jiraTaskNumber = cells[i].innerText.split("\n")[0];
			if (jiraTaskNumber)
			{
				cells[i].innerHTML = "<a href=\"https://visiercorp.atlassian.net/browse/"+jiraTaskNumber+"\">"+jiraTaskNumber+"</a>";
			}
		}
	}
}