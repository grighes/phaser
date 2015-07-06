var gameOverState = {

    create: function() {

      gameOverVoice.play();
      deathScream.play();
      staticSound.play();
      gametrack.stop();

      // Add a background image
      game.add.image(0, 0, 'background');

      //  Text
      stateText = game.add.text(game.world.centerX, game.world.centerY - 10, ' ', {
        font: '24px Play',
        fill: 'red',
        shadow: '(5, 5, rgba(0,0,0,0.5), 15)'
      });

      stateText.anchor.setTo(0.5);
      stateText.visible = true;
      stateText.text = "GAME OVER";

      // Explain how to restart the game
      restart = game.add.text(game.world.centerX, game.world.height - 440,
        'CLICK TO RESTART', {
          font: '25px Play',
          fill: 'red'
        });
      restart.anchor.setTo(0.5, 0.5);

      // Create a tween on the label

      game.add.tween(restart).to({
        y: 180
      }, 1000).easing(Phaser.Easing.Bounce.Out).start();
      
      game.input.onTap.addOnce(this.restart, this);

    },

    restart: function() {

      // se for na primeira 10 na segunda 20
      counterDead = 10;

      // Ao retornar para som estatica
      staticSound.stop();

      score1 = 0;

      sea.play();

      game.state.start('play1');
  },



};