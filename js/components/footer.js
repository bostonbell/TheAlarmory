var FooterComponent = function( DOMId ){
    _checkForType( DOMId, "string", "Invalid data type passed to TimeDeltaComponent parameter 1 (DOMId): must be a string.");

    return ( function( ) {
	// CoreComponent
	var _internalDOMIdentifier = DOMId;
	var $el = $(_internalDOMIdentifier);

	// Handles Events
	var _actions = [];

	// Node
	var _children = [];
	var _parent = undefined;
	var _interval = function(){};
	var _currentTimeout = function(){};
	var _service = undefined;

	var _setService = function( s ) {
	    _service = s;
	}

	/*
	View components: _render should only be called on initial render and following this
	a rerender should be called: JQuery will do this by changing text elements or any 
	class attributes.
	*/

	/*
	_render: Internal function to remove the element that is current hooked to 
	our component and following this rerender the HTML: Unless there is some 
	reason to do so, we should in general keep this used only once, otherwise
	we should hook JQuery functions to our _handle function, implemented by
	the ComponentMessanger trait.
	*/
	var _render = function( ) {
	    $el.empty().append( _generateTemplate( ) );

	    // Initialize the interval.
	    _interval = setInterval(function(){
		_currentTimeout();
		_currentTimeout = function(){};
	    }, 1000)

	    // When we get input from our child
	    _children[0].onChange(function(f) {
		// Restart our interval so it doesn't
		// cut into our current input (this helps
		// us wait out user changes.)
		clearInterval(_interval);

		// Perform desired function on our object, closing
		// over info passed from child.
		_currentTimeout = function() {
		    _service.sendParameters(f.split(' '))
		    console.log(f);
		}

		// Reset interval.
		_interval = setInterval(function(){
		    _currentTimeout();
		    _currentTimeout = function(){
			if ( _service.getPending() !== null ) {
			    console.log(_service.getPending());
			    _interval = null;
			}
		    };
		}, 1000)
	    });
	};

	/*
	_generateTemplate: Internal function for render: The creates the HTML markup
	for our component. Core view trait requires this to be implemented.
	*/
	var _generateTemplate = function( ) {
	    var tag = '<div class="inline-section">';

	    if (_children.length > 0) {
		// Push our first child to our footer, make it 8 columns large.
		tag +=   '<div class="col-lg-8">';
		tag +=     _children[0].__generateTemplate();
		tag +=   '</div>';
		tag +=   '<div class="col-lg-4">';
		tag +=     '<a class="btn header footer footer-blue" href="http://www.bluebikedesign.com">Created By Blue Bike Web Design</a>';
		tag +=   '</div>';
		tag += '</div>';
	    } else {
		// If we haven't pushed any children to our footer (searchable components)
		// then we are going to want to make it full sized.
		tag +=   '<div class="col-lg-12">';
		tag +=     '<a class="btn header footer footer-blue" href="http://www.bluebikedesign.com">Created By Blue Bike Web Design</a>';
		tag +=   '</div>';
		tag += '</div>';
	    }

	    return tag;
	};

	/*
	OrderedComponents trait: OrderedComponents will require our object to both
	implement a _pushParent function which our component can notify, and a 
	_pushChild function, which our component can receive notification from.
	*/

	/*
	_pushChild: Pushes a child to the internal stack of children components.
	*/
	var _pushChild = function( component ) {
	    component.pushParent( this );
	    _children.push( component );
	};

	/*
	_pushParent: Pushes a parent to the parent component.
	Note that this is a top level component so we do not
	implement this function totally.
	*/
	var _pushParent = function( component ) {
	    _parent = component;
	};

	/* 
	Node trait: Node means we have to implement _notify and _handle:
	both of these allow our component to send and recieve events 
	and messages from other components respectively.
	*/

	/* 
	_notify: notify sends our parent a handle function with a JavaScript
	object: our parent is then free to implement handle in whatever way
	it sees fit to handle messaging between components. 
	*/
	var _notify = function( ) {
	    if ( _parent ) {
		_parent.__handle( {
		    hourActive: _hourActive,
		    minuteActive: _minuteActive,
		    periodActive: _periodActive,
		    componentName: "ControlPanelComponent"
		} );
	    }
	};

	/* 
	_handle: _handle will take a JavaScript object and analyize it to do 
	whatever actions it needs to do.
	*/
	var _handle = function( data ) {
	    if ( data && data.componentName === "SelectorPortionComponent" ) {
		if ( data.name === "Hours" ) {
		    _hourActive = data.currentActive;
		} else if ( data.name === "Minutes" ) {
		    _minuteActive = data.currentActive;
		} else if ( data.name === "AM/PM" ) {
		    _periodActive = data.currentActive;
		}

		_notify();
	    } else if ( data && data.componentName === "ApplicationController" ) {
		for (var item = 0; item < _children.length; item++) {
		    _children[item].__handle( {
			componentName: "ControlPanelComponent",
			active: true,
			id: data.list[item]
		    } );
		}
	    };
	};

	// Debug function: Because this is ES6 syntax, we should disable these on
	// deployment of the website.
	/*
	var _display = function( ) {
	    console.log( `_hourActive: (${_hourActive})` );
	    console.log( `_minuteActive: (${_minuteActive})` );
	    console.log( `_periodActive: (${_periodActive})` );
	    console.log( `html: (${_generateTemplate()})` );
	};
	*/

	/*
	  _getComponentMatches: Takes an argument componentName and searches the internal
	  stack to find a component with the passed name: Note that the JavaScript object
	  must actually have a __componentName field to be able to utilize this function,
	  otherwise the map will basically fail.
	*/
	var _getComponentMatches = function( componentName ) {
	    return _children.filter( function( item ) {
		return item.__componentName === componentName;
	    } );
	};

	var _getActiveTimes = function( ) {
	    return [ _hourActive,_minuteActive, _periodActive ];
	};

	return {
	    //__display: _display,
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    __actions: _actions,
	    __render: _render,
	    __this: this,
	    __handle: _handle,
	    __notify: _notify,
	    __componentName: "ControlPanelComponent",
	    getActiveTimes: _getActiveTimes,
	    pushChild: _pushChild,
	    pushParent: _pushParent,
	    setService: _setService
	};
    })( );
};
