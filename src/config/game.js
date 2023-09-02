var config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.RESIZE,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
var METEOR_DIFFICULTY = 3;
var game = new Phaser.Game(config);
