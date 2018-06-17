// JavaScript Document

var today, starttime, endtime;

// retrieve phone number, office hours, and guarantee modal content from REST API
$.ajax({
  url: "https://www.algaecal.com/wp-json/acf/v3/options/options",
  dataType: "text",
  success:function(data){
	  var optiondata = JSON.parse(data);
	  
	  var phonenum = optiondata.acf.default_phone_number;
	  var guarantee = optiondata.acf["7yr_full_copy"];
	  var officehours = optiondata.acf.office_hours;
	  
	  $(".phone-num").html("<a href='tel:" + phonenum + "'>" + phonenum + "</a>");
	  
	  $(".modal-body").html(guarantee);
	  
	  today = new Date();
	  
	  var starthour = parseInt(parseInt(officehours[today.getDay()].starting_time)/100);
	  var startmin = starthour*100 - parseInt(officehours[today.getDay()].starting_time);
	  
	  var endhour = parseInt(parseInt(officehours[today.getDay()].closing_time)/100);
	  var endmin = endhour*100 - parseInt(officehours[today.getDay()].closing_time);
	  
	  starttime = new Date(today.getFullYear(),today.getMonth(),today.getDate(),starthour,startmin,0,0);
	  
	  endtime = new Date(today.getFullYear(),today.getMonth(),today.getDate(),endhour,endmin,0,0);
	  
	  // calculate offset for timezones (PST or PDT) to ensure that AlgaeCal is actually open (using Vancouver, B.C.)
	  
	  var tzurl = "https://maps.googleapis.com/maps/api/timezone/json?location=49.246670,-123.094729&timestamp=" + parseInt(today.getTime()/1000) + "&key=AIzaSyACPIqxYiiRjBvsB7uXPST6vFibTXPHKZs";
	  
	  $.ajax({
		  url: tzurl,
		  dataType: "text",
		  success:function(tzdata){
			  
			  var timezonedata = JSON.parse(tzdata);
			  
			  // subtract offsets to get GMT of start and end times of office hours and convert to milliseconds:
			  var chkstarttime = starttime.getTime() - timezonedata.dstOffset*1000 - timezonedata.rawOffset*1000;
			  var chkendtime = endtime.getTime() - timezonedata.dstOffset*1000 - timezonedata.rawOffset*1000;

			  // get offset for current local time and convert to milliseconds
			  var tz = today.toString().split("GMT")[1].split(" (")[0];
			  var chktoday = today.getTime() - parseInt(tz)/100*60*60*1000;
			  
			  // check if current time is truly during open office hours:
			  if(chktoday >= chkstarttime && chktoday <= chkendtime){
				  // show "speak to our bone health specialists message"
				  $(".speak-msg").show();
			  }
		  }
	  });
	  	  
  }
});

//watch video status and display/hide packages accordingly

window._wq = window._wq || [];
_wq.push({ id: "cecdwaq3dz", onReady: function(video) {
	//alert("I got a handle to the video!", video);
	var vid = Wistia.api("cecdwaq3dz");
	
	vid.bind("timechange", function(t) {
		if(t >= 133.0){
			$(".packages").show();
		}
		else{
			$(".packages").hide();
		}
	});
	
}});

$(".packages").hide();

