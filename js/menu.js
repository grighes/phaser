var menuState = {
    
    create: function() {
        
        // Menu Audio
        menuAudio = game.add.audio('menu-audio');
        menuAudio.loop = true;
        menuAudio.volume = 0.2;
        menuAudio.play();
        
        // Stage One Ambiente Sound
        stageOneAudio = game.add.audio('sea');
        stageOneAudio.loop = true;
        stageOneAudio.volume = 0.5;
        
        // Add a background image
        game.add.image(0, 0, 'introTexture');
        
        // Display the name of the game
        var nameLabel = game.add.text(game.world.centerX, 80, 'Warfare Galaxy', {
            font: '50px Arial',
            fill: '#222'
        });
        nameLabel.anchor.setTo(0.5, 0.5);
        
        // Show the score at the center of the screen
        var scoreLabel = game.add.text(game.world.centerX, game.world.centerY,
            'score: ' + game.global.score, {
                font: '25px Arial',
                fill: '#222'
            });
        scoreLabel.anchor.setTo(0.5, 6.5);
        
        // Explain how to start the game
        var startLabel = game.add.text(game.world.centerX, game.world.height - 440,
            'press ENTER', {
                font: '25px Arial',
                fill: 'red'
            });
        startLabel.anchor.setTo(0.5, 0.5);
        
        // Create a new Phaser keyboard variable: the up arrow key
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        // When the 'upKey' is pressed, it will call the 'start' function once
        upKey.onDown.addOnce(this.start, this);
    },
    

    start: function() {
        
        // Start the actual game
        menuAudio.stop();
        game.state.start('play1');
        stageOneAudio.play();
        
    },
};