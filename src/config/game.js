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
let METEOR_DIFFICULTY = 8;
const MAX_METEOR_DIFFICULTY = 10;
const DUCK_SPEED = 400;
var game = new Phaser.Game(config);
