var population;
function setup(scene) {
  population = new Population(10, scene);
}
function randomGaussian() {
  return Math.random() * 2 - 1;
}
