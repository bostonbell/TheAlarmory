var alarmAudio = new Audio("../sounds/alarm.ogg");

function generateMiniButton( numeric, type, cName, cb ) {
    var temp = $('#' + type + "-" + numeric);
    temp.click( function() {
	$( '.' + cName ).removeClass( cName );
	temp.addClass( cName );
	cb();
    });
};

$(document).ready(function(){
    //Page navigation.
    var navigationButtons = new ButtonCollection();
    navigationButtons.appendButton(new Button($("#btn-at"), "atTimeButton", true, "btn-mode-red-active"), $('#at-content'));
    navigationButtons.appendButton(new Button($("#btn-in"), "inTimeButton", false, "btn-mode-purple-active"), $('#in-content'));

    //Alarm Clock Timer
    var hookAlarmClockTimer = function(){return generateSynchronizableClock(
	$(".btn-square-hours-active"),
	$(".btn-square-minutes-active"),
	$(".btn-square-types-active"),
	$("#hour-alarm"),
	$("#minute-alarm"),
	$("#when-alarm"),
	$("#delta"),
	$("#current-hour-alarm"),
	$("#current-minute-alarm"),
	$("#current-when-alarm"),
	true,
	function(){console.log("Firing");}
    )();};

    for (var i = 0; i < 60; i++) {
	generateMiniButton(i, "minute", "btn-square-minutes-active", hookAlarmClockTimer);
    };

    for (var i = 0; i < 12; i++) {
	generateMiniButton(i, "hour", "btn-square-hours-active", hookAlarmClockTimer);
    };

    generateMiniButton(0, "type", "btn-square-types-active", hookAlarmClockTimer);
    generateMiniButton(1, "type", "btn-square-types-active", hookAlarmClockTimer);


    hookAlarmClockTimer();

    setInterval(function() {
	hookAlarmClockTimer();
    }, 5000);

    

});


