function meteorHitGround(meteor, ground, scene) {
  const fire = scene.add.sprite(meteor.x, meteor.y, "fire").setScale(0.35);
  fire.play("fire");
  meteor.destroy();
  setTimeout(() => {
    fire.destroy();
  }, 1500);
}
function meteorHitDuck(meteor, duck, scene) {
  meteor.destroy();
}
