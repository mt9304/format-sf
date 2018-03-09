headerCount=document.querySelectorAll('th');
//Prevents the script form running multiple times. ""
if (headerCount.length > 10 && headerCount[5].innerText.split("\n")[0] == "TICKET #")
{
  trimCols();
  replaceClasses();
  customSorting("Waiting for response");
  customSorting("Awaiting Fix");
  customSorting("In Progress");
  customSorting("Customer Responded");
  customSorting("New");
  linkJiras();
}

function trimCols()
{
  //Get all relevant cells.
  cls=document.querySelectorAll('[role="caseSummary"] > td');
  //0%0=0 and throws off the count, so make sure to watch for that. Worthy of comment because my math skills are not that great so it took me a while to catch that.
  var rowcount = 0;
  for (i = 0; i < cls.length; i++)
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
      cls[i].parentNode.removeChild(cls[i]);
    }

  }

  //Trims the header.
  colhead=document.querySelectorAll('th');
  for (i = 0; i < colhead.length; i++)
  {
    var multiplier = 0;
    if (i == 2+multiplier || i == 3+multiplier || i == 4+multiplier || i == 6+multiplier || i == 7+multiplier || i == 8+multiplier || i == 9+multiplier || i == 10+multiplier || i == 11+multiplier || i == 13+multiplier || i == 19+multiplier || i == 20+multiplier)
    {
      colhead[i].parentNode.removeChild(colhead[i]);
    }

  }
}

function replaceClasses()
{
  //Removes sorting classes on header, making it unclickable.
  //console.log("Replacing classes. ");
  colhead=document.querySelectorAll(".sortable");
  //console.log(colhead);
  for (i = 0; i < colhead.length; i++)
  {
    colhead[i].classList.add('c-headers');
    colhead[i].classList.remove('sortable');
  }
  //Removes default coloring classes and adds custom class.
  rows=document.querySelectorAll('[role="caseSummary"]');
  for (i = 0; i < rows.length; i++)
  {
    rows[i].classList.add('c-rows');
    rows[i].classList.remove('danger','info');
    //Adds colors to the rows based on text.
    //cells = rows[i];
    //console.log(cells);
  }
  cells=document.querySelectorAll('[role="caseSummary"] > td');
  //console.log("Before "+cells);
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

    var multiplier = 0;
    if (i==4 + rowcount*9)
    {
      //The text gotten form innerText contains a new line.
      var currentStatus = cells[i].innerText.split("\n")[0];
      //console.log(currentStatus);
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

function customSorting(theStatus)
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

function linkJiras()
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
      var jiraTask = cells[i].innerText.split("\n")[0];
      if (jiraTask)
      {
        cells[i].innerHTML = "<a href=\"https://visiercorp.atlassian.net/browse/"+jiraTask+"\">"+jiraTask+"</a>";

      }
    }
  }
}
