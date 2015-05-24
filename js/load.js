var loadState = {
    
    preload: function() {
        // Add a 'loading...' label on the screen
        var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', {
            font: '30px Arial',
            fill: '#ffffff'
        });
        loadingLabel.anchor.setTo(0.5, -2);
        // Display the progress bar
        var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, -3);
        game.load.setPreloadSprite(progressBar);
        
        // Load all our assets
        game.load.image('player', 'assets/player2.png');
        game.load.image('bullet', 'assets/bullets.png');
        game.load.image('life', 'assets/green_ball.png');
        game.load.image('invader', 'assets/alien-sprite.png');
        game.load.image('kaboom', 'assets/explosion.png');
        // game.load.image('bullet', 'assets/bullets.png');

        // Load a new asset that we will use in the menu state
        game.load.image('introTexture', 'assets/spaceBackground.jpg');
        game.load.image('starfield', 'assets/water_texture.jpg');
    },
    
    create: function() {
        // Go to the menu state
        game.state.start('menu');
    }
};