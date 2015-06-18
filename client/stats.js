stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms, 2: mb

// align top-left
stats.domElement.style.position = 'fixed';
stats.domElement.style.bottom = '0px';
stats.domElement.style.right = '0px';

update = function () {

  stats.begin();

  // monitored code goes here

  stats.end();

  requestAnimationFrame(update);

};

requestAnimationFrame(update);
