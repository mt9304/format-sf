trimCols();
replaceClasses();

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
  console.log("Replacing classes. ");
  colhead=document.querySelectorAll(".sortable");
  console.log(colhead);
  for (i = 0; i < colhead.length; i++)
  {
    colhead[i].classList.add('myclass');
    colhead[i].classList.remove('sortable');
    console.log(i);
  }
}
