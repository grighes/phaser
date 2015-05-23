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
        game.load.image('player', 'assets/playerShip1_red.png');
        game.load.image('enemy', 'assets/enemyBlack1.png');
        game.load.image('coin', 'assets/star_gold.png');
        // game.load.image('wallV', 'assets/wallVertical.png');
        // game.load.image('wallH', 'assets/wallHorizontal.png');
        // Load a new asset that we will use in the menu state
        game.load.image('introTexture', 'assets/introTexture1.jpg');
        game.load.image('starfield', 'assets/starfield.png');
    },
    
    create: function() {
        // Go to the menu state
        game.state.start('menu');
    }
};