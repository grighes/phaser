var menuState = {

    create: function() {

        // Menu Audio
        menuAudio.loop = true;
        menuAudio.volume = 0.2;
        menuAudio.play();

        // Stage One Ambiente Sound
        stageOneAudio.loop = true;
        stageOneAudio.volume = 0.5;

        // Add a background image
        game.add.image(0, 0, 'introTexture');

        // Display the name of the game
        var nameLabel = game.add.text(game.world.centerX, 80, 'Galaxy Warfare', {
            font: '50px Play',
            fill: '#222'
        });
        nameLabel.anchor.setTo(0.5, 0.5);

        // Show the score at the center of the screen
        var scoreLabel = game.add.text(game.world.centerX, game.world.centerY,
            'score: ' + game.global.score, {
                font: '25px Play',
                fill: '#222'
            });

        scoreLabel.anchor.setTo(0.5, 6.5);

        // Explain how to start the game
        startLabel = game.add.text(game.world.centerX, game.world.height - 440,
            'PRESS ENTER', {
                font: '25px Play',
                fill: 'red'
            });
        startLabel.anchor.setTo(0.5, 0.5);

        // Create a tween on the label

        game.add.tween(startLabel).to({
            y: 180
        }, 1000).easing(Phaser.Easing.Bounce.Out).start();

        //game.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2}, 500).loop().start();

        // Create a new Phaser keyboard variable: the up arrow key
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        // When the 'upKey' is pressed, it will call the 'start' function once
        upKey.onDown.addOnce(this.start, this);
    },

    update: function() {
        timer += game.time.elapsed; //this is in ms, not seconds.
        if (timer >= 1000) {
            timer -= 1000;
            startLabel.visible = !startLabel.visible;
        }
    },


    start: function() {

        // Start the actual game
        menuAudio.stop();
        game.state.start('play1');
        stageOneAudio.play();

    },
};