function addValueToPassword(button)
{
	var currVal=$("#passcode").val();
	if(button=="bksp")
	{
		$("#passcode").val(currVal.substring(0,currVal.length-1));
	}
	else
	{
		$("#passcode").val(currVal.concat(button));
	}
}

$( "#btnEnter" ).click(function(){
	
	var password=getPassword();
	if(document.getElementById("passcode").value==password)
	{
		if (localStorage.getItem("agreedToLegal")==null)
		{
			$("#btnEnter").attr("href", "#legalNotice").button();
		}
		else if(localStorage.getItem("agreedToLegal")=="true")
		{
			if(localStorage.getItem("user")==null)
			{
				$("#btnEnter").attr("href","#pageUserInfo").button();
			}
			else
			{
				$("#btnEnter").attr("href","#pageMenu").button();
			}
		}
	}
	else
	{
		alert("Incorrect password, please try again".);
	}
});

function getPassword(){
	
	if (typeof(Storage) == "undefined")
	{
		alert("Your browser does not support HTML5 localStorage. Try upgrading".);
	}
	else if(localStorage.getItem("user")!=null)
	{
		return JSON.parse(localStorage.getItem("user")).NewPassword;
	}
	else
	{
		return "2345";
	}
}

$("#noticeYes").click(function(){
	localStorage.setItem("agreedToLegal", "true");
});

$("#frmUserForm").submit(function(){ 
	saveUserForm();
	return true;
});

function checkUserForm()
{
	var d = new Date();
	var month = d.getMonth()+1;
	var date = d.getDate();
	var year= d.getFullYear();
	var currentDate = year + '/' +
	((''+month).length<2 ? '0' : '') + month '/' +
	((''+date).length<2 ? '0' : '') + date;
	
	if(($("#txtFirstName").val() != "") &&
		($("#txtLastName").val() != "") &&
		(&("#datBirthdate").val() != "") && (&("#datBirthdate").val()
		<= currentDate)&&
		($("#txtSYS option:selected").val() != "Select an Option") &&
		($("#txtDIA option:selected").val() != "Select an Option") )
	{
		return true;
	}
	else
	{
		return false;
	}
}

function saveUserForm()
{
	if(checkUserForm())
	{
		var user = {
		"FirstName" : $("#txtFirstName").val(),
		"LastName" : $("txtLastName").val(),
		"HealthCardNumber" : $("#txtHealthCardNumber").val(),
		"NewPassword" : $("#changePassword").val(),
		"DOB" : $("#datBirthdate").val(),
		"SYSlevel" : $("#txtSYS").val(),
		"DIAlevel" : $("#txtDIA").val()
		};
		
		try
		{
			localStorage.setItem("user", JSON.stringify(user));
			alert("Saving Information");
			$.mobile.changePage("#pageMenu");
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

function showUserForm()
{
	try
	{
		var user=JSON.parse(localStorage.getItem("user"));
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
	if(user != null)
	{
		$("#txtFirstName").val(user.FirstName);
		$("#txtLastName").val(user.LastName);
		$("#txtHealthCardNumber").val(user.HealthCardNumber);
		$("#changePassword").val(user.NewPassword);
		$("#datBirthdate").val(user.DOB);
		$("#txtSYS").val(user.SYSlevel);
		$("#txtDIA").val(user.DIAlevel);
	}
}