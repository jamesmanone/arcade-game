import {
  BLOCK_WIDTH,
  BLOCK_HEIGHT,
  C_WIDTH,
  C_HEIGHT
} from '../const';

import * as Resources from '../resources';

export default class Engine {
  constructor(player, enemies, ctx) {
    this.player = player;
    this.enemies = enemies;
    this.ctx = ctx;
    this.rowImages = [
      'images/water-block.png',   // Top row is water
      'images/stone-block.png',   // Row 1 of 3 of stone
      'images/stone-block.png',   // Row 2 of 3 of stone
      'images/stone-block.png',   // Row 3 of 3 of stone
      'images/grass-block.png',   // Row 1 of 2 of grass
      'images/grass-block.png'    // Row 2 of 2 of grass
    ];
    Resources.load(this.rowImages);
    Resources.onReady(this.init);
  }

  init = () => {
    this.lastTime = Date.now();
    this.main();
  }

  main = () => {
    const now = Date.now(),
          dt = (now-this.lastTime) / 1000.0;
    this.update(dt);
    this.render();
    this.lastTime = now;
    window.requestAnimationFrame(this.main);
  }

  update = dt => {
    for(let enemy of this.enemies) enemy.update(dt);
    this.player.update(this.enemies);
  }

  render = () => {
    for(let row = 0; row < 6; ++row)
      for(let col = 0; col < 5; ++col)
        this.ctx.drawImage(Resources.get(this.rowImages[row]), col * BLOCK_WIDTH, row * BLOCK_HEIGHT);

    for(let enemy of this.enemies) enemy.render();
    this.player.render();
  }
}
