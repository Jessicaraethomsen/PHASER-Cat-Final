var catcher, cat, score, scoreTXT, cursors, winText, loseText ;
	var timer, timerEvent, text;
	var countDown = 30;


CatchACat.Game = function(game) {
	'use strict';
	this.catcher1;
	this.cat1;
	this.bg1;
	
};

CatchACat.Game.prototype = {
    
create:function(){
	 'use strict';
	this.buildWorld();
	
	
		catcher = this.add.sprite(this.world.width/ 2, this.world.height/2, 'catcher1');
        catcher.anchor.setTo(0.5, 0.5);
        this.physics.enable(catcher, Phaser.Physics.ARCADE);
        catcher.enableBody = true;
		
		cat = this.add.sprite(this.world.width* Math.random(), this.world.height* Math.random(),'cat1');
        cat.anchor.setTo(0.5, 0.5);
        this.physics.enable(cat, Phaser.Physics.ARCADE);
        cat.enableBody = true;
		

		cursors = this.input.keyboard.createCursorKeys();
		
		//create SCORE
		score = 0;
		scoreTXT = this.add.text(10, 10, score.toString(), { font: "30px Press Start 2P", fill: '#ffffff'});
	
	
		// Create a custom timer
        timer = this.time.create();
        
        // Create a delayed event 1m and 30s from now
        timerEvent = timer.add(Phaser.Timer.SECOND * countDown, this.endTimer, this);
        
        // Start the timer
        timer.start();
      
        text = this.add.text(750, 30, this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 
        { font: "30px 'Press Start 2P'", fill: "#ff0044" });
      
        text.anchor.set(0.5);

	
   },
	
	
	update: function () {
	'use strict';
	this.keyboard();
	this.physics.arcade.overlap(cat, catcher, catHitHandler, null, this);	
	},
	   


  //building my world
   buildWorld:function(){
	 'use strict';
		this.add.image(0,0, 'bg1');
	},
	

	//Movement with Keyboard
	keyboard:function(){
		'use strict';
		
		if(cursors.left.isDown && catcher.x>10){
			catcher.x -= 5;
			//scaling 100% pointing in the orginal directiosn
			catcher.scale.x = -1;
			
		}
		
		if(cursors.right.isDown && catcher.x<this.world.width-10){
			catcher.x += 5;
			catcher.scale.x = 1;
			
		}
		
		if(cursors.up.isDown && catcher.y>10){
			catcher.y -= 5;
			
		}
		
		if(cursors.down.isDown && catcher.y<this.world.height-10){
			catcher.y += 5;
			}
		
	var tmp = this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));
		
		
        if (timer.running && tmp >= 1) {
          text.text = this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));

        }
    },
	
	
    render: function () {
		'use strict';
        // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (!timer.running && score !== 6) {
			loseText = this.add.bitmapText(this.world.centerX-155, this.world.centerY+180, 'eightbitwonder', 'play again', 24);
    		loseText.anchor.setTo(0.5, 0.5);
			this.input.onDown.addOnce(restart, this);
			text.kill();
			cat.destroy();
			catcher.destroy();
			
        }
    },
	

    endTimer: function() {
		'use strict';
       // Stop the timer when the delayed event triggers
        timer.stop();
    },
	
	
    formatTime: function(s) {
		'use strict';
		// Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "" + (s - minutes * 60);
        return seconds.substr(-2);     
    },

};


function catHitHandler(){
		'use strict';
		console.log('Cat caught!');
		cat.x = this.world.width * Math.random();
		cat.y = this.world.height * Math.random();
		score++;
		scoreTXT.setText(score.toString());
		if (score === 6) {
		winText = this.add.bitmapText(this.world.centerX, this.world.centerY, 'eightbitwonder', "- YOU WON.. -\nClick for Level 2", 28);
		this.input.onDown.addOnce(nextLevel, this);
    	winText.anchor.setTo(0.5, 0.5);
		text.kill();
		cat.destroy();
		catcher.destroy();
		
	}}


	function restart() {
	'use strict';
    loseText.destroy();
	this.state.start('Game');	
	}

	function nextLevel() {
	'use strict';
    winText.destroy();
	this.state.start('Game2');	
	}

	


