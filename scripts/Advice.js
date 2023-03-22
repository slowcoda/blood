if (txtSYS <= 120 && txtDIA <= 80){
	var BPLevel = "1";
}
if (txtSYS >= 120 && txtSYS <= 129) && (txtDIA <= 80){
	var BPLevel = "2";
}
if (txtSYS >= 130 && txtSYS <= 139) OR (txtDIA >= 80 && txtDIA <= 89)
{
	var BPLevel = "3";
}
if (txtSYS >= 140 && txtSYS <= 179) OR (txtDIA >= 90 && txtDIA <= 120){
	var BPLevel = "4";
}
if (txtSYS >= 180) OR (txtDIA >= 120){
	var BPLevel = "5";
}





function advicePage()
{

	if (localStorage.getItem("tbRecords") === null)
	{
		alert("No records exist".);
		
		$(location).attr("href", "#pageMenu");
	}
	else
	{
		
		var user=JSON.parse(localStorage.getItem("user"));
		var BP = BPLevel;
		
		var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
		tbRecords.sort(compareDates);
		var i=tbRecords.length-1;
		var c=document.getElementById("AdviceCanvas");
		var ctx=c.getContext("2d");
		ctx.fillStyle="#c0c0c0";
		ctx.fillRect(0,0,550,550);
		ctx.font="22px Arial";
		drawAdviceCanvas(ctx,BPLevel,txtSYS,txtDIA);
		
	}
}


function drawAdviceCanvas (ctx,BPLevel,txtSYS,txtDIA)
{
	ctx.font="22px Arial";
	ctx.fillStyle="black";
	ctx.fillText("Your current Blood Pressure Level is " + BP + ""., 25, 320);

	if (BPLevel == "1")
	{
		ctx.fillText("Your Blood Pressure is at an optimal point", 25, 350);
		levelAwrite(ctx,BP);
		levelAMeter(ctx,BP);
	}
	else if (BPLevel == "2")
	{
		ctx.fillText("Your Blood Pressure is at an elevated point, Be cautious", 25, 350);
		levelBwrite(ctx,BP);
		levelBMeter(ctx,BP);		
	}	
	else if (BPLevel == "3")
	{
		ctx.fillText("You have high Blood Pressure (HYPERTENSION) STAGE 1", 25, 350);
		levelCwrite(ctx,BP);
		levelCMeter(ctx,BP);		
	}	
	else if (BPLevel == "4")
	{
		ctx.fillText("You have high Blood Pressure (HYPERTENSION) STAGE 2", 25, 350);
		levelDwrite(ctx,BP);
		levelDMeter(ctx,BP);		
	}		
	else (BPLevel == "4")
	{
		ctx.fillText("You have high Blood Pressure (HYPERTENSION) STAGE 3", 25, 350);
		levelEwrite(ctx,BP);
		levelEMeter(ctx,BP);		
	}
}

function levelAwrite(ctx,TSH)
{
	writeAdvice(ctx",green");
}

function levelBwrite(ctx,TSH)
{
	writeAdvice(ctx",yellow");
}

function levelCwrite(ctx,TSH)
{
	writeAdvice(ctx",red");
}

function levelDwrite(ctx,TSH)
{
	writeAdvice(ctx",red");
}

function levelEwrite(ctx,TSH)
{
	writeAdvice(ctx",red");
}

function writeAdvice(ctx,level)
{
	var adviceLine1=""
	var adviceLine2=""
	if(level=="red")
	{
		adviceLine1="Please seek medical attention";
		adviceLine2="You are at a dangerous level for Blood Pressure";
	}
	else if(level=="yellow")
	{
		adviceLine1="Contact family members";
		adviceLine2="Have blood worked";
	}
	else if(level="green")
	{
		adviceLine="Continue having your Blood Pressure monitored";
	}
	ctx.fillText("Your Blood Pressure level is " + BP + ""., 25, 380);
	ctx.fillText(adviceLine1, 25, 410);
	ctx.fillText(adviceLine2, 25, 410);
}

function drawMeter (g)
{
	g.Set("chart.value.text.units.post", " mm Hg")
	.Set("chart.value.text.boxed", false)
	.Set("chart.value.text.size", 14)
	.Set("chart.value.text.size", "Verdana")
	.Set("chart.value.text.bold", true)
	.Set("chart.value.text.decimals", 2)
	.Set("chart.title", "Blood Pressure Level")
	.Set("chart.radius", 250)
	.Set("chart.centerx", 50)
	.Set("chart.centery", 250)
	.Draw();
}

function resizeGraph()
{
	if($(window).width() < 700)
	{
		$("#GraphCanvas").css({"width":$(window).width()- 50});
		$("#AdviceCanvas").css({"width":$(window).width()- 50});
	}
}
