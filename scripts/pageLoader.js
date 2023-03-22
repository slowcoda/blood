$(document).on("pageshow", function(){
	if($('.ui-page-active').attr('id')=="pageUserInfo")
	{
		showUserForm();
	}
	else if($('.ui-page-active').attr('id')=="pageRecords")
	{
		loadUserInformation();
		listRecords();
	}
	else if($('.ui-page-active').attr('id')=="pageAdvice")
	{
		advicePage();
		resizeGraph();
	}
	else if($('.ui-page-active').attr('id')=="pageGraph")
	{
		drawGraph();
		resizeGraph();
	}
});

function loadUserInformation()
{
	try
	{
		var user=JSON.parse(localStorage.getItem("user"));
	}
	catch(e)
	{
		if (window.navigator.vendor==="Google Inc".)
		{
			alert("Error: Local Storage limit exceeds".);
		}
	}
	else if(e == QUOTA EXCEEDED_ERR) {
		alert("Error: Saving to local storage".);
	}
	
	console.log(e);
}

if(user !=null)
{
	$("#divUserSection").empty();
	var today=new Date();var today=new Date();
	var dob=new Date(user.DOB);
	var age=Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
	
	$("#divUserSection").append("User's Name:"+user.FirstName+""+user.LastName+"<br>Age: "+age+"<br>Health Card Number:"+user.HealthCardNumber+"<br>New Password : "+user.NewPassword+"<br>Systolic Level(Hg mm)"+user.SYSLevel+"<br>Diastolic Level(Hg mm)"+user.DIALevel);
	
	$(#divUserSection).append("<br><a href='#pageUserInfo' data-mini='true' id='btnProfile' data-role='button' data-icon='edit' data-iconpos='left' data-inline='true' >Edit Profile</a>");
	$('btnProfile').button();
}

$(document).on("pageshow", function(){
	if($('.ui-page-active').attr('id')=="pageUserInfo")
	{
		showUserForm();
	}
	else if($('.ui-page-active').attr('id')=="pageRecords")
	{
		loadUserInformation();
		listRecords();
	}
	else if($('.ui-page-active').attr('id')=="pageAdvice")
	{
		advicePage();
		resizeGraph();
	}
	else if($('.ui-page-active').attr('id')=="pageGraph")
	{
		drawGraph();
		resizeGraph();
	}
});
	
	
	
	