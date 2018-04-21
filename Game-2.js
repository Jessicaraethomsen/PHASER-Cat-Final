	var catcher2, cat2, bg2;
	var timer, timerEvent, text;
	var score, scoreTXT, cursors, winText, loseText ;
	var countDown = 20;



CatchACat.Game-2 = function(game) {
	 'use strict';
	this.catcher2;
	this.cat2;
	this.bg2;
	
};

CatchACat.Game-2.prototype = {
    
create:function(){
	 'use strict';
	this.buildWorld();
	
	
		catcher2 = this.add.sprite(this.world.width* Math.random(), this.world.height* Math.random(),'catcher2');
        catcher2.anchor.setTo(0.5, 0.5);
        this.physics.enable(catcher2, Phaser.Physics.ARCADE);
        catcher2.enableBody = true;
		
		cat2 = this.add.sprite(this.world.width* Math.random(), this.world.height* Math.random(),'cat2');
        cat2.anchor.setTo(0.5, 0.5);
        this.physics.enable(cat2, Phaser.Physics.ARCADE);
        cat2.enableBody = true;
		

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
	this.physics.arcade.overlap(cat2, catcher2, catHitHandler2, null, this);	
	},
	   


  //building my world
   buildWorld:function(){
	 'use strict';
		this.add.image(0,0, 'bg2');
	},
	

	//Movement with Keyboard
	keyboard:function(){
		'use strict';
		
		if(cursors.left.isDown && catcher2.x>10){
			catcher2.x -= 5;
			//scaling 100% pointing in the orginal directiosn
			catcher2.scale.x = -1;
			
		}
		
		if(cursors.right.isDown && catcher2.x<this.world.width-10){
			catcher2.x += 5;
			catcher2.scale.x = 1;
			
		}
		
		if(cursors.up.isDown && catcher2.y>10){
			catcher2.y -= 5;
			
		}
		
		if(cursors.down.isDown && catcher2.y<this.world.height-10){
			catcher2.y += 5;
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
			cat2.destroy();
			catcher2.destroy();
			
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
		winText = this.add.bitmapText(this.world.centerX, this.world.centerY, 'eightbitwonder', "- You Won -\nclick for next Level", 24);
		this.input.onDown.addOnce(nextLevel, this);
    	winText.anchor.setTo(0.5, 0.5);
			text.kill();
			cat2.destroy();
			catcher2.destroy();
		
	}}


	function restart() {
	'use strict';
    loseText.destroy();
	this.state.start('Game-2');	
	}

	function nextLevel() {
	'use strict';
    winText.destroy();
	this.state.start('StartMenu');	
	}

	


