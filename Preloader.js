// JavaScript Document
CatchACat.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

CatchACat.Preloader.prototype = {
	
	preload: function () {
		'use strict';
		//this will center the title in the center
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY+90, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
		
		this.titleText = this.add.image(this.world.centerX, this.world.centerY, 'titleimage');
		this.titleText.anchor.setTo(0.5, 0.5);
		
		
		//title page
		this.load.image('titlescreen', 'images/titleBackground.png');
		this.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');

		
		
		
		
		//level1
		this.load.image('bg1', 'images/level-1.png');
		this.load.image('catcher1', 'images/catcher1.png', 32, 32);
		this.load.image('cat1', 'images/cat1.png');
		
		//level2
		this.load.image('bg2', 'images/level-2.png');
		this.load.image('catcher2', 'images/catcher2.png', 32, 32);
		this.load.image('cat2', 'images/cat.png');
		
		this.load.image('palm', 'images/palm.png', 32, 32);

		//audio1
		this.load.audio('background','audio/Gameboy.mp3');
   		this.load.audio('boing','audio/boing.mp3');
		
		//audio2
		this.load.audio('background2','audio/Sunrise.mp3');
		this.load.audio('boing2','audio/boing.mp3');
		
		   
        
    },


	create: function() {
		'use strict';
		this.preloadBar.cropEnabled = false;
	},
	
	
		update: function() {
			'use strict';
		//this runs consistently
			this.ready = true;
			
			this.state.start('StartMenu');
		},

	
};