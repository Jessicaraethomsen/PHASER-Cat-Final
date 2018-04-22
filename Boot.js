// JavaScript Document

var CatchACat = {}; //delcare a reference for different states its empty state
CatchACat.Boot = function(game){};//this is the object from the html file

CatchACat.Boot.prototype = {
    preload: function() {
		'use strict';
        this.load.image('preloaderBar', 'images/loader.png');
        this.load.image('titleimage', 'images/titleImage.png');
    },
    
    create: function() {
		'use strict';
		this.input.maxPointers = 1;

		this.stage.disableVisibilityChange = false;
		//this.scale.pageAlignHorizontally = true;
		//this.scale.pageAlignVertically = true;
 		this.input.addPointer();

		this.stage.backgroundColor = '#0086ff';
        this.state.start('Preloader');
    }
};// JavaScript Document