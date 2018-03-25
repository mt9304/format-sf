//Prevents the script form running multiple times. Checks to see if it is the default page.
defaultHeaders=document.querySelectorAll('th');
if (defaultHeaders.length > 10 && defaultHeaders[5].innerText.split("\n")[0] == "TICKET #")
{
   /* Runs the actual functions to format the page. */
   removeExtraColumnsFromTableHeaders();
   removeExtraColumnsFromTable();
   removeDefaultSortableHeaders();
   replaceDefaultColoring();
   performActionOnColumn(4, colorRowsBasedOnTicketStatus);
  sortTicketsByStatus();
   performActionOnColumn(7, convertJiraNumbersToLinks);
  performActionOnColumn(8, colorJiraStatuses)
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

function colorRowsBasedOnTicketStatus(cell, cellText)
{
   var currentStatus = cellText;
   if (currentStatus == "Customer Responded")
   {
      cell.closest('tr').className += " ta-danger";
   }
   if (currentStatus == "In Progress")
   {
      cell.closest('tr').className += " ta-danger";
   }
   if (currentStatus == "Waiting for response")
   {
      cell.closest('tr').className += " ta-info";
   }
   if (currentStatus == "Awaiting Fix")
   {
      cell.closest('tr').className += " ta-warning";
   }
   if (currentStatus == "New")
   {
      cell.closest('tr').className += " ta-new";
   }
  if (currentStatus == "Escalated to Dev")
  {
    cell.closest('tr').className += " ta-escalated";
  }
  if (currentStatus == "Customer Approved")
  {
    cell.closest('tr').className += " ta-customer-approved";
  }
  if (currentStatus == "Reopened")
  {
    cell.closest('tr').className += " ta-reopened";
  }
}

function sortTicketsByStatus()
{
  //Each of these will bring the status to the rows of tickets to the top of the page.
  //Which ever comes first here will end up at the bottom of the ticket page.
   //performActionOnColumn(4, bringStatusToTop, "Awaiting Customer Approval");
  performActionOnColumn(4, bringStatusToTop, "Escalated to Dev");
  performActionOnColumn(4, bringStatusToTop, "Waiting for response");
  performActionOnColumn(4, bringStatusToTop, "Awaiting Fix");
  performActionOnColumn(4, bringStatusToTop, "In Progress");
  performActionOnColumn(4, bringStatusToTop, "Customer Responded");
  performActionOnColumn(4, bringStatusToTop, "New");
  performActionOnColumn(4, bringStatusToTop, "Reopened");
  performActionOnColumn(4, bringStatusToTop, "Customer Approved");
}

function bringStatusToTop(cell, cellText, status)
{
   row = cell.closest('tbody');
   if (cellText == status)
   {
      row.parentNode.insertBefore(row, row.parentNode.firstChild);
   }
}

function convertJiraNumbersToLinks(cell, cellText)
{
   cell.innerHTML = "<a href=\"https://visiercorp.atlassian.net/browse/"+cellText+"\">"+cellText+"</a>";
}

//Remember to reuse the function below for colorRowsBasedOnTicketStatus(), bringStatusToTop(), and any future functions that require looping through cells to check for values.
function performActionOnColumn(columnNumber, action, valueToUse)
{

   cells=document.querySelectorAll('[role="caseSummary"] > td');
   var rowcount=0;
   for (i = 0; i < cells.length; i++)
   {
      if (i != 0)
      {
         //9th cell is the beginning of the next row.
         if (i%9==0)
         {
            rowcount++;
         }
      }

      //For columNumber, columns from 0-8:
      //Arrow, Number, Ticket #, Subject, Status, Last Activity, Account, Jira #, Jira Status
      //0         1      2      3        4            5          6         7       8
      row = cells[i].closest('tbody');
      if (i==columnNumber + rowcount*9)
      {
      //The text gotten from innerText contains a new line, so need to remove not include by splitting.
         var cellText = cells[i].innerText.split("\n")[0];
         if (cellText)
         {
            action(cells[i], cellText, valueToUse);
         }
      }
   }
}

//Colors the Jira statuses based on their value to attract attention on higher priority tasks.
function colorJiraStatuses(cell, cellText)
{
  if (cellText == "CS Validating")
  {
    cell.children[1].children[0].className += " ta-cs-validating";
  }
  if (cellText == "Waiting for Customer")
  {
    cell.children[1].children[0].className += " ta-waiting-for-customer";
  }
  if (cellText == "Wait For Requirements")
  {
    cell.children[1].children[0].className += " ta-wait-for-requirements";
  }
  if (cellText == "Done")
  {
    cell.children[1].children[0].className += " ta-done";
  }
  if (cellText == "Customer Validating")
  {
    cell.children[1].children[0].className += " ta-customer-validating";
  }
}
