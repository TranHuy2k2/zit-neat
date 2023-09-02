function preload() {
  this.load.image("bg", "public/images/bg.png");
  this.load.spritesheet("cloud1", "public/images/cloud1.png", {
    frameWidth: 162,
    frameHeight: 109,
  });
  this.load.spritesheet("cloud2", "public/images/cloud2.png", {
    frameWidth: 162,
    frameHeight: 109,
  });
  this.load.image("ground", "public/images/ground.png");
  this.load.spritesheet("duck", "public/images/duck.png", {
    frameWidth: 140,
    frameHeight: 140,
  });
  this.load.spritesheet("meteor", "public/images/meteor.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("fire", "public/images/fire.png", {
    frameWidth: 195,
    frameHeight: 441,
  });
}
