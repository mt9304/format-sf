addClassToAccountLink();
actionWhenHoveringClass(insertTableAfterPopupLoads, "ta-hover-load");

/** *********************************** **/
/** START: Setting Up And Checking Page **/
/** *********************************** **/
function addClassToAccountLink() {
    var element = document.getElementById("cas4_ileinner");
    element.classList.add("ta-hover-load");
}

function actionWhenHoveringClass(action, className) {
	var element = document.getElementsByClassName(className)[0];
	element.addEventListener("mouseover", action);
}

function insertTableAfterPopupLoads() {
	if(!popupIsLoaded()) {
    	window.setTimeout(insertTableAfterPopupLoads, 200);
    } 
    if (popupIsLoaded()) {
    	insertTable();
    }
}

function popupIsLoaded() {
	var element = document.getElementsByClassName("labelCol last");
	var textIndicator = "Parent Account";
	var popupLoaded = false;
	for (var i = 0; i < element.length; i++) {
		if (element[i].textContent == textIndicator) {
			popupLoaded = true; 
			break;
		}
	}
	return popupLoaded;
}

function getCustomTableElement() {
		var custTable = document.createElement("table");
	 		custTable.className += " list";

		var custTableBody = document.createElement("tbody");

		var custHeaderRow = document.createElement("tr");
	 		custHeaderRow.className += " headerRow ta-cust-header-row";

		var custTableHeader1 = document.createElement("th");
		 	custTableHeader1.className += " zen-deemphasize";
		 	custTableHeader1.textContent = "Support Ticket";

 		var custTableHeader2 = document.createElement("th");
		 	custTableHeader2.className += " zen-deemphasize";
		 	custTableHeader2.textContent = "Contact Name";

		var custTableHeader3 = document.createElement("th");
		 	custTableHeader3.className += " zen-deemphasize";
		 	custTableHeader3.textContent = "Subject";

		var custTableHeader4 = document.createElement("th");
		 	custTableHeader4.className += " zen-deemphasize";
		 	custTableHeader4.textContent = "Date";

		var custTableHeader5 = document.createElement("th");
		 	custTableHeader5.className += " zen-deemphasize";
		 	custTableHeader5.textContent = "Status";

		var custTableHeader6 = document.createElement("th");
		 	custTableHeader6.className += " zen-deemphasize";
		 	custTableHeader6.textContent = "Owner";

		//Insert td elements for cell. Uncomment below for more columns. Also uncomment sections in insertDataCellsFromDocument(doc). 
		//custHeaderRow.appendChild(custTableHeader1); //Ticket
		//custHeaderRow.appendChild(custTableHeader2); //Contact Name
		custHeaderRow.appendChild(custTableHeader3);
		custHeaderRow.appendChild(custTableHeader4);
		custHeaderRow.appendChild(custTableHeader5);
		custHeaderRow.appendChild(custTableHeader6);

		custTableBody.appendChild(custHeaderRow);
		custTable.appendChild(custTableBody);

		return custTable;
}

function insertTable() {
	//Used to check if already loaded the table. 
	var tempClass = document.getElementsByClassName("bPageBlock brandSecondaryBrd bDetailBlock secondaryPalette")[0];

	if (!tempClass.classList.contains("ta-table-appended")) {
		tempClass.className += " ta-table-appended";
		var referenceNode = document.getElementsByClassName("accountBlock topLeft")[0];
		var lastOriginalTable = referenceNode.getElementsByClassName("pbBody")[0].getElementsByClassName("detailList")[0];

		var customTable = getCustomTableElement();
		lastOriginalTable.parentNode.insertBefore(customTable, lastOriginalTable.nextSibling);

		//Need the value after the forward slash, since it is used for various pages related to the account. 
		accountURL = currentAccountLink().split(".com/")[1];
		getDocAndInsertData(accountURL);
		
	}
}
/** ********************************** **/
/** END: Setting Up And Checking Page  **/
/** ********************************** **/

/** *************************************** **/
/** START: Getting Links And Data With AJAX **/
/** *************************************** **/

var accountTicketDocument;

function insertDataCellsFromDocument(doc) {
	for (var i = 7; i >= 0; i--) {
		try {
			var rowtr = document.createElement("tr");
			rowtr.className += " dataRow";
			var row = doc.getElementsByClassName("pbBody")[0].getElementsByClassName("dataRow")[i];
			//Uncommend below 2 sections for more columns. 
			/**
			var rowSupportTicket = document.createElement("td");
				rowSupportTicket.className += " dataCell";
				rowSupportTicket.innerHTML = row.getElementsByTagName("th")[0].innerHTML;
				rowtr.appendChild(rowSupportTicket);
			**/
			/**
			var rowContactName = document.createElement("td");
				rowContactName.className += " dataCell";
				rowContactName.innerHTML = row.getElementsByTagName("td")[3].innerHTML;
				rowtr.appendChild(rowContactName);
			**/
			var rowSubject = document.createElement("td");
				rowSubject.className += " dataCell";
				rowSubject.innerHTML = row.getElementsByTagName("td")[4].innerHTML;
				rowtr.appendChild(rowSubject);
			var rowDate = document.createElement("td");
				rowDate.className += " dataCell";
				rowDate.textContent = row.getElementsByTagName("td")[6].textContent;
				rowtr.appendChild(rowDate);
			var rowStatus = document.createElement("td");
				rowStatus.className += " dataCell";
				rowStatus.textContent = row.getElementsByTagName("td")[7].textContent;
				rowtr.appendChild(rowStatus);
			var rowOwner = document.createElement("td");
				rowOwner.className += " dataCell";
				rowOwner.innerHTML = row.getElementsByTagName("td")[8].innerHTML;
				rowtr.appendChild(rowOwner);

			var custTableNode = document.getElementsByClassName("ta-cust-header-row")[0];
			custTableNode.parentNode.insertBefore(rowtr, custTableNode.nextSibling);
		} catch (err) {
			//console.log("Ticket does not exist. ");
		}
	}
}

function currentAccountLink() {
	return document.getElementById("cas4_ileinner").getElementsByTagName("a")[0].href;
}

function getDocAndInsertData(accountURL) {
	var fullURL = "https://visier.my.salesforce.com/500?rlid=RelatedCaseList&id=" + accountURL;

	getHTML( fullURL, function (response) {
		//console.log(response.getElementsByClassName("listRelatedObject caseBlock")[0]);
		accountTicketDocument = response.getElementsByClassName("listRelatedObject caseBlock")[0];
		insertDataCellsFromDocument(accountTicketDocument);
	});

	//console.log(accountTicketDocument);

	var rowData = {
		ticketUrl1: "ticketurl 1", 
		supportTicket: "0561561"
	}
	//console.log(ticketTableElement.toString());
	return rowData;
}

//Gets the HTML document of a page
var getHTML = function ( url, callback ) {
	// Feature detection
	if ( !window.XMLHttpRequest ) return;
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		if ( callback && typeof( callback ) === 'function' ) {
			callback( this.responseXML );
		}
	}
	//Get the HTML document for the customer page.
	xhr.open( 'GET', url );
	xhr.responseType = 'document';
	xhr.send();
};
/** ************************************** **/
/** END: Getting Links And Data With AJAX  **/
/** ************************************** **/