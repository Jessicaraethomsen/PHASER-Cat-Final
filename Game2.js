var catcher2, cat2, cursors2, palm;
var score2, scoreTXT2;
var timer2, timerEvent2, text2;
var winText2, loseText2;
var trees, tree;
var countDown2 = 25;


CatchACat.Game2 = function (game) {
	'use strict';
	this.background2;
    this.boing2;
	this.trees;
	
	this.lose;
    this.win;
};

CatchACat.Game2.prototype = {

	create: function () {
		'use strict';
		this.buildWorld2();
		
		
		this.background2 = this.add.audio('background2');
	   	this.background2.play('', 0, 0.3, true);
		
	   	this.boing2 = this.add.audio('boing2');
		
		this.lose = this.add.audio('lose');
		this.win = this.add.audio('win');
		
		catcher2 = this.add.sprite(this.world.width/ 2, this.world.height/2, 'catcher2');
		catcher2.anchor.setTo(0.5, 0.5);
		this.physics.enable(catcher2, Phaser.Physics.ARCADE);
		catcher2.enableBody = true;

		cat2 = this.add.sprite(this.world.width * Math.random(), this.world.height * Math.random(),'cat2');
		cat2.anchor.setTo(0.5, 0.5);
		this.physics.enable(cat2, Phaser.Physics.ARCADE);
		cat2.enableBody = true;
		
		this.buildtrees();
		cursors2 = this.input.keyboard.createCursorKeys();

		//create SCORE
		score2 = 0;
		scoreTXT2 = this.add.text(10, 10, score2.toString(), { font: "30px Press Start 2P", fill: '#ffffff'});
		
		
		// Create a custom timer
        timer2 = this.time.create();
        
        // Create a delayed event 1m and 30s from now
        timerEvent2 = timer2.add(Phaser.Timer.SECOND * countDown2, this.endTimer2, this);
        
        // Start the timer
        timer2.start();
      
        text2 = this.add.text(750, 30, this.formatTime2(Math.round((timerEvent2.delay - timer2.ms) / 1000)), 
        { font: "30px 'Press Start 2P'", fill: "#ff0044" });
      
        text2.anchor.set(0.5);

		
	},
	
	
	
	update: function () {
		'use strict';
		this.keyboard2();
		
		this.physics.arcade.overlap(cat2, catcher2, jungleHitHandler, null, this);
		this.physics.arcade.collide(tree, catcher2 ,treeHitHandler, null, this);


	},
	
	
 buildtrees: function() {
		 'use strict';
        this.trees = this.game.add.group();
        for (var i = 0; i < 200; i++) {
        var tree= this.trees.create(this.world.randomX, this.world.randomY, 'palm');
        this.trees.add(tree);
		this.trees.enableBody = true;
        }
    },



	
	
	
	
	keyboard2:function(){
		'use strict';
		
		if(cursors2.left.isDown && catcher2.x>10){
			catcher2.x -= 5;
			//scaling 100% pointing in the orginal directiosn
			catcher2.scale.x = -1;
			
		}
		
		if(cursors2.right.isDown && catcher2.x<this.world.width-10){
			catcher2.x += 5;
			catcher2.scale.x = 1;
			
		}
		
		if(cursors2.up.isDown && catcher2.y>10){
			catcher2.y -= 5;
			
		}
		
		if(cursors2.down.isDown && catcher2.y<this.world.height-10){
			catcher2.y += 5;
			}
		
		
		var tmp2 = this.formatTime2(Math.round((timerEvent2.delay - timer2.ms) / 1000));
		
		
        if (timer2.running && tmp2 >= 1) {
          text2.text = this.formatTime2(Math.round((timerEvent2.delay - timer2.ms) / 1000));
			
        }
   
    },
	

	//building my world
	buildWorld2: function () {
		'use strict';
		this.add.image(0, 0, 'bg2');

	},
	


	
	render: function () {
		'use strict';
        // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (!timer2.running && score2 !== 10) {
			

			loseText2 = this.add.bitmapText(this.world.centerX, this.world.centerY, 'eightbitwonder', 'You Lost!!! -\n click  to Try Again', 24);
    		loseText2.anchor.setTo(0.5, 0.5);
			
			this.input.onDown.addOnce(restart2, this);
			text2.kill();
			cat2.destroy();
			catcher2.destroy();
			
        }
    },


	
    endTimer2: function() {
		'use strict';
       // Stop the timer when the delayed event triggers
        timer2.stop();
    },
	
	
    formatTime2: function(s) {
		'use strict';
		// Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "" + (s - minutes * 60);
        return seconds.substr(-2);     
    },
	
};



function jungleHitHandler(){
		'use strict';
		console.log('jungle caught!');
		this.boing2.play();
		cat2.x = this.world.width * Math.random();
		cat2.y = this.world.height * Math.random();
		score2++;
		scoreTXT2.setText(score2.toString());
		if (score2 === 10) {
		winText2 = this.add.bitmapText(this.world.centerX, this.world.centerY, 'eightbitwonder', "- You won it all, Baby!! -\nclick for the Menu", 24);
		this.win.play();

		this.input.onDown.addOnce(nextLevel2, this);
    	winText2.anchor.setTo(0.5, 0.5);
		text2.kill();
		cat2.destroy();
		catcher2.destroy();
		
	}}



function treeHitHandler(){
		'use strict';
		console.log('boom!');		
		
	}


function restart2() {
	'use strict';
    loseText2.destroy();
	this.background2.stop();
	this.state.start('Game2');	
	}



function nextLevel2() {
	'use strict';
  
    winText2.destroy();  
	this.background2.stop();
	this.state.start('StartMenu');	
	}





