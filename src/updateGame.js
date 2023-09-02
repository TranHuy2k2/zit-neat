function update() {
  moveCloud();
  listenDuckMovement(this);
}
function moveCloud() {
  cloud1.play("cloud1-idle", true);
  cloud2.play("cloud2-idle", true);
  cloud1.x += 0.25;
  cloud2.x += 0.25;

  // Reset the cloud's position to the left when it goes off-screen
  if (cloud1.x > game.config.width) {
    cloud1.x = -cloud1.width;
  }
  if (cloud2.x > game.config.width) {
    cloud2.x = -cloud2.width;
  }
}
function listenDuckMovement(scene) {
  const cursors = scene.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    duck.setVelocityX(-300);

    duck.anims.play("left", true);
  } else if (cursors.right.isDown) {
    duck.setVelocityX(300);

    duck.anims.play("right", true);
  } else {
    duck.setVelocityX(0);

    duck.anims.play("turn");
  }

  if (cursors.up.isDown && duck.body.touching.down) {
    duck.setVelocityY(-330);
  }
}
