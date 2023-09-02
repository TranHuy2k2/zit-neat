function meteorHitGround(meteor, groundCollided, scene) {
  const fire = scene.physics.add
    .sprite(meteor.x, meteor.y + 10, "fire")
    .setScale(0.25);
  scene.physics.add.collider(fire, ground);
  scene.physics.add.overlap(
    fire,
    duck,
    (fire, duck) => fireHitDuck(fire, duck, scene),
    null,
    scene
  );
  fire.play("fire");
  meteor.destroy();
  setTimeout(() => {
    fire.destroy();
  }, 1500);
}
function meteorHitDuck(meteor, duck, scene) {
  meteor.destroy();
}
function fireHitDuck(fire, duck, scene) {
  const text = scene.add.text(16, 16, "Ouch!", {
    fontSize: "64px",
    fill: "#000",
  });
  setTimeout(() => {
    text.destroy();
  }, 1500);
  hitTimer = hitDuration;
  fire.destroy();
}
