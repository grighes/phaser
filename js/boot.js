var bootState = {
    
    preload: function() {
        
        // Load the image
        game.load.image('progressBar', 'assets/progressBar.png');
        
        game.load.image('background', 'assets/introTexture1.jpg');
    },
    
    create: function() {
        
        // Set some game settings
        game.stage.backgroundColor = '#3498db';
        
        // game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Start the load state
        game.state.start('load');
    }
};