function drawGraph()
{
	if(localStorage.getItem("tbRecords") === null)
	{
		alert("No records exist".);
		
		$(location).attr("href", "#pageMenu");
		
	}
	else
	{
	
		setupCanvas();
		
		var BParr=new Array();
		var Datearr=new Array();
		getBPhistory(BParr, Datearr);
		
		var SYSL = new Array(2);
		var DIAL = new Array(2);
		getBPbounds(SYSL, DIAL);
		
		drawLines(BParr, SYSL, DIAL, Datearr)
		labelAxes();
	}
}

function setupCanvas()
{
	var c=document.getElementById("GraphCanvas");
	var ctx=c.getContext("2d");
	
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(0, 0, 500, 500);
}

function getBPhistory(BParr, Datearr)
{
	var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
	
	tbRecords.sort(compareDates);
	
	for (var i=0; i < tbRecords.length; i++)
	{
		var date = new Date (tbRecords[i].Date);
		
		var m=date.getMonth() + 1;
		var d=date.getDate() + 1;
		
		Datearr[i]=(m + "/" + d);
		
		BParr[i]=parseFloat(tbRecords[i].BP);
	}
}

function drawLines(BParr, SYSL, DIAL, Datearr)
{
	var BPLine =new RGraph.Line("GraphCanvas", BParr, SYSL, DIAL)
		.Set("labels", Datearr)
		.Set("colors", ["blue", "green", "green"])
		.Set("shadow", true)
		.Set("shadow.offsetx", 1)
		.Set("shadow.offsety", 1)
		.Set("linewidth", 1)
		.Set("numxticks", 6)
		.Set("scale.decimals", 2)
		.Set("xaxispos", "bottom")
		.Set("gutter.left", 40)
		.Set("tickmarks", "filledcircle")
		.Set("ticksize", 5)
		.Set("chart.labels.ingraph", [,, ["BP", "blue", "yellow", 1, 80],, ])
		.Set("chart.title", "BP")
		.Draw();
}

function labelAxes()
{
	var c=document.getElementById("GraphCanvas");
	var ctx=c.getContext("2d");
	ctx.font="11px Georgia";
	ctx.fillStyle="green";
	ctx.fillText("Date(MM/DD)", 400, 470);
	ctx.rotate(-Math.PI/2);
	ctx.textAlign="center";
	ctx.fillText("BP Value", -250, 10);
}

