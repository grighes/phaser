var wonState = {

    create: function() {

      victory.play();
      menuAudio.play();

      // Add a background image
      game.add.image(0, 0, 'wonImage');

      //  Text
      stateText = game.add.text(game.world.centerX, game.world.centerY - 200, ' ', {
        font: '50px Play',
        fill: 'green',
        shadow: '(5, 5, rgba(0,0,0,0.5), 15)'
      });

      stateText.anchor.setTo(0.5);
      stateText.visible = true;
      stateText.text = "YOU WON!!!";

      // Explain how to restart the game
      restart = game.add.text(game.world.centerX, game.world.height - 500,
        'CLICK AND GO TO MENU', {
          font: '25px Play',
          fill: 'green'
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
      menuAudio.stop();

      score = 0;
      game.state.start('menu');
      
  },



};