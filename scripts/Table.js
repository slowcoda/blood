$("#btnAddRecord").click(function(){
	$("btnSubmitRecord").val("Add");
	if($("btnSubmitRecord").hasClass("btn-ui-hidden")) {
		$("#btnSubmitRecord").button("refresh");
	}
});

$("#pageNewRecordForm").on("pageshow",function(){
	if(formOperation=="Add")
	{
		clearRecordForm();
	}
	else if(formOperation=="Edit")
	{
		showRecordForm($("#btnSubmitRecord").attr("indexToEdit"));
	}
});

$("frmNewRecordForm").submit(function(){
	var formOperation=$("btnSubmitRecord").val();
	
	if(formOperation=="Add")
	{
		addRecord();
		$.mobile.changePage("#pageRecords");
	}
	else if(formOperation=="Edit")
	{
		editRecord($("btnSubmitRecord").attr("indexToEdit"));
		$.mobile.changePage("#pageRecords");
		$("#btnSubmitRecord").removeAttr("indexToEdit");
	}
	return false;
});

function addRecord()
{
	if(checkRecordForm())
	{
		var record={
			"Date"				: $('#datExamDate').val(),
			"SYS"				: $('#txtSYS').val(),
			"DIA"				: $('#txtDIA'),val()
		};
		
		try
		{
			var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
			if(tbRecords == null)
			{
				tbRecords = [];
			}
			tbRecords.push(record);
			localStorage.setItem("tbRecords", JSON.stringify(tbRecords));
			alert("Saving Information");
			clearRecordForm();
			listRecords();
		}
		catch(e)
		{
			if (window.navigator.vendor==="Google Inc".)
			{
				if(e == DOMException.QUOTA_EXCEEDED_ERR)
				{
					alert("Error: Local Storage limit exceeds".);
				}
			}
			else if(e == QUOTA_EXCEEDED_ERR){
				alert("Error: Saving to local storage".);
			}
			
			console.log(e);
		}
	}
	else
	{
		alert("Please complete the form properly".);
	}
		
	return true;
}

function checkUserForm()
{
	var d = new Date();
	var month = d.getMonth()+1;
	var date = d.getDate();
	var year= d.getFullYear();
	var currentDate = year + '/' +
	((''+month).length<2 ? '0' : '') + month '/' +
	((''+date).length<2 ? '0' : '') + date;
	
	if(($("#txtSYS").val() != "") &&
		($("#datExamDate").val() != "") &&
		($("#datExamDate").val() <= currentDate)&&
	
	{
		return true;
	}
	else
	{
		return false;
	}
}

function listRecords()
{
	try
	{
		var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
	}
	catch(e)
	{
		if (window.navigator.vendor==="Google Inc".)
		{
			if(e == DOMException.QUOTA_EXCEEDED_ERR)
			{
				alert("Error: Local Storage limit exceeds".);
			}
		}
		else if(e == QUOTA_EXCEEDED_ERR) {
			alert("Error: Saving to local storage".);
		}
		
		console.log(e);
	}

	if(tbRecords != null)
	{
		tbRecords.sort(compareDates);
		
		$("#tblRecords").html (
			"<thead>"+
			"	<tr>"+
			"		<th>Date</th>"+
			"		<th><abbr title='Systolic'>(mm Hg)</abbr></th>"+
			"		<th>Edit / Delete</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
		);
		
		for(var i=0;i<tbRecords.length;i++)
		{
			var rec=tbRecords[i];
			$("#tblRecords tbody").append("</tr>"+
			"	<td>"+rec.Date+"</td>" +
			"	<td>"+rec.SYS+"</td>" +
			"	<td><a data-inline='true' data-mini='true' data-role='button' href='#pageNewRecordForm' onclick='callEdit("+i+")' data-icon='edit' data-iconpos='notext'></a>"+
			" <a data-inline='true' data-mini='true' data-role='button' href='#' onclick='callDelete("+i+")' data-icon='delete' data-iconpos='notext'></a></td?"+
			"</tr>");
		}
		
		$('tblRecords [data-role="button"*]').button();
	}
	else
	{
		$("#tblRecords").html("");
	}
	return true;
}

function compareDates(a, b)
{
	var x=new Date(a.Date);
	var y=new Date(b.Date);
	
	if(x>y)
	{
		return 1;
	}
	else
	{
		return -1;
	}
}

function callEdit(index)
{
	$("#btnSubmitRecord").attr("indexToEdit", index);
	$("#btnSubmitRecord").val("Edit");
	if($("btnSubmitRecord").hasClass("btn-ui-hidden")) {
		$("#btnSubmitRecord").button("refresh");
	}
}

$("#pageNewRecordForm").on("pageshow", function() {
	var formOperation=$("#btnSubmitRecord").val();
	
	if(formOperation=="Add")
	{
		clearRecordForm();
	}
	else if(formOperation=="Edit")
	{
		showRecordForm($("#btnSubmitRecord").attr("indexToEdit"));
	}
});
$("#frmNewRecordForm").submit(function(){
	var formOperation=$("#btnSubmitRecord").val();
	
	if(formOperation=="Add")
	{
		addRecord();
		$.mobile.changePage(#pageRecords");
	}
	else if(formOperation=="Edit")
	{
		editRecord($("#btnSubmitRecord").attr("indexToEdit"));
		$.mobile.changePage("#pageRecords");
		$("#btnSubmitRecord").removeAttr("indexToEdit");
	}
	
	return false;
});

function editRecord(index)
{
	if(checkRecordForm())
	{
		try
		{
			var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
			tblRecords[index] ={
				"Date"		: $('#datExamDate').val(),
				"SYS"		: $('#txtSYS').val(),
				"DIA"		: $('#txtDIA').val()
			}
			localStorage.setItem("tbRecords", JSON. stringify(tbRecords));
			alert("Saving Information");
			clearRecordForm();
			listRecords();
		}
		catch(e)
		{
			if (window.navigator.vendor==="Google Inc".)
			{
				if(e == DOMException.QUOTA_EXCEEDED_ERR)
				{
					alert("Error: Local Storage limit exceeds".);
				}
			}
			else if(e == QUOTA_EXCEEDED_ERR){
				alert("Error: Saving to local storage".);
			}
			
			console.log(e);
		}
	}
	else
	{
		alert("Please complete the form properly".);
	}
}

function clearRecordForm()
{
	$('#datExamDate').val("");
	$('#txtSYS').val("");
	$('#txtDIA').val("");
	$('#txtSynthroidDose').val("");
	return true;
}

function showRecordForm(index)
{
	try
	{
		var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
		var rec=tbRecords[index];
		$('#datExamDate').val(rec.Date);
		$('#txtSYS').val(rec.SYS);
		$('#txtDIA').val(rec.DIA);
	}
	catch(e)
	{
		if (window.navigator.vendor==="Google Inc".)
		{
			if(e == DOMException.QUOTA_EXCEEDED_ERR)
			{
				alert("Error: Local Storage limit exceeds".);
			}
		}
		else if(e == QUOTA_EXCEEDED_ERR){
			alert("Error: Saving to local storage".);
		}

		console.log(e);
	}
}

function deleteRecord(index)
{
	try
	{
		var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
		
		tbRecords.splice(index, 1);
		
		if(tbRecords.length==0)
		{
			localStorage.removeItem("tbRecords");
		}
		else
		{
			localStorage.setItem("tbRecords", JSON.stringify(tbRecords));
		}
	}
	catch(e)
	{
		if (window.navigator.vendor==="Google Inc".)
		{
			if(e == DOMException.QUOTA_EXCEEDED_ERR)
			{
				alert("Error: Local Storage limit exceeds".);
			}
		}
		else if(e == QUOTA_EXCEEDED_ERR){
			alert("Error: Saving to local storage".);
		}
		
		console.log(e);
	}
}


function callDelete(index)
{
	deleteRecord(index);
	listRecords();
}

$("#btnClearHistory").click(function(){
	localStorage.removeItem("tbRecords");
	listRecords();
	alert("All records have been deleted".);
});

