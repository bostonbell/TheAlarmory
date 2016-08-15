alarmAudio = new Audio("../sounds/alarm.ogg");

var synchronizeClock = function(){
    var sHours = $(".btn-square-hours-active").text();
    var sMinutes = $(".btn-square-minutes-active").text();
    var sWhen = $(".btn-square-types-active").text();

    $("#hour-alarm").html(TimeFormatter.formatHour(sHours, "American"));
    $("#minute-alarm").html(TimeFormatter.formatMinute(sMinutes, "American"));
    $("#when-alarm").html(sWhen);

    var cDate = new Date();

    var cHours = cDate.getHours();
    var cMinutes = cDate.getMinutes();


    var cWhen = cHours >= 12 ? 'PM' : 'AM';


    if (sWhen == "PM") {
	var twentyFourHoursUser = Number(sHours) + 12;
    } else {
	var twentyFourHoursUser = Number(sHours);
    };

    if (twentyFourHoursUser < cHours) {
	var timeDelta = 24 - (Number(cHours) - twentyFourHoursUser);
    } else {
	var timeDelta = twentyFourHoursUser - Number(cHours);
    }

    $("#delta").html(timeDelta);


    cHours = cHours % 12;

    if (sHours == cHours && sMinutes == cMinutes && sWhen == cWhen) {
	console.log("Playing");
	alarmAudio.addEventListener('ended', function() {
	}, false);
	alarmAudio.play();
    }

    if (cMinutes.toString().length == 1) {
	cMinutes = "0" + cMinutes;
    }

    $("#current-hour-alarm").html(cHours);
    $("#current-minute-alarm").html(cMinutes);
    $("#current-when-alarm").html(cWhen);


};

var generateJQuery = function(i, type, cName){
    var x = $("#"+type+"-"+i);
    x.click(function(){
	$('.' + cName).removeClass(cName);
	x.addClass(cName);
	synchronizeClock();
    });
};

$(document).ready(function(){
    var navigationButtons = new ButtonCollection();

    navigationButtons.appendButton(new Button($("#btn-at"), "atTimeButton", true, "btn-mode-red-active"), $('#at-content'));
    navigationButtons.appendButton(new Button($("#btn-in"), "inTimeButton", false, "btn-mode-purple-active"), $('#in-content'));

    for (var i = 0; i < 60; i++) {
	generateJQuery(i, "minute", "btn-square-minutes-active");
    };

    for (var i = 0; i < 12; i++) {
	generateJQuery(i, "hour", "btn-square-hours-active");
    };

    generateJQuery(0, "type", "btn-square-types-active");
    generateJQuery(1, "type", "btn-square-types-active");
    synchronizeClock();

    setInterval(function() {
      synchronizeClock();
    }, 10000);

    

});


