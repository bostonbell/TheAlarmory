var alarmAudio = new Audio("../sounds/alarm.ogg");
alarmAudio.loop = true;

var alarmSnoozeMode = false;

$(document).ready(function(){
    var controller = ApplicationController();
    var tds = ControlPanelComponent( "#control-panel" );
    var sr = undefined;
    
    // Hours Container
    var tdsA = SelectorPortionComponent( "#hour-container", "Hours", 1);
    for (var itemNumber = 1; itemNumber < 13; itemNumber++) {
	var temp = SelectorButtonComponent( "hour", itemNumber, "btn-square-hours", undefined, false ) 

	if (itemNumber == 1) {
	    sr = temp;
	}

	tdsA.pushChild( temp );
    }
    tds.pushChild( tdsA );
    tdsA.__render();
    tdsA.__notify();
    for (var i of tdsA.children) {
	i.setEvent("click");
    }
    // End Hours Container

    // Minute Container
    var tdsC = SelectorPortionComponent( "#minute-container", "Minutes", 1);
    for (var itemNumber = 0; itemNumber < 60; itemNumber++) {
	var temp =  SelectorButtonComponent( "minute", itemNumber, "btn-square-minutes" );
	tdsC.pushChild( temp );
    }
    tds.pushChild( tdsC );
    tdsC.__render();
    tdsC.__notify();
    for (var i of tdsC.children) {
	i.setEvent("click");
    }
    // End Minute Container

    // When Contains
    var tdsE = SelectorPortionComponent( "#when-container", "AM/PM", 1);
    tdsE.pushChild( SelectorButtonComponent( "type", "AM", "btn-square-when", true ) );
    tdsE.pushChild( SelectorButtonComponent( "type", "PM", "btn-square-when", true ) );
    tds.pushChild( tdsE );
    tdsE.__render();
    tdsE.__notify();
    for (var i of tdsE.children) {
	i.setEvent("click");
    }
    // End When Container

    var timeDisplay = TimeDisplayComponent( "time-display-component" );
    timeDisplay.__render();

    var timeDelta = TimeDeltaComponent( "time-delta-component" );
    timeDelta.__render();

    var timeCurrent = TimeCurrentComponent( "time-current-component" );
    timeCurrent.__render();


    controller.pushChild(tds);
    controller.pushChild(timeDisplay);
    controller.pushChild(timeDelta);
    controller.pushChild(timeCurrent);

    var x = ModalWindow( )
    x.__render();
    sr.__notify();
});


