// JavaScript Document

// retrieve phone number and guarantee modal content from REST API
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
	  
	  var today = new Date();
	  
	  var starthour = parseInt(parseInt(officehours[today.getDay()].starting_time)/100);
	  var startmin = starthour*100 - parseInt(officehours[today.getDay()].starting_time);
	  
	  var endhour = parseInt(parseInt(officehours[today.getDay()].closing_time)/100);
	  var endmin = endhour*100 - parseInt(officehours[today.getDay()].closing_time);
	  
	  var starttime = new Date(today.getFullYear(),today.getMonth(),today.getDate(),starthour,startmin,0,0);
	  var endtime = new Date(today.getFullYear(),today.getMonth(),today.getDate(),endhour,endmin,0,0);
	  
	  if(today.getTime() >= starttime.getTime() && today.getTime() <= endtime.getTime()){
		  // show "speak to our bone health specialists message"
		  $(".speak-msg").show();
	  }
	  
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

