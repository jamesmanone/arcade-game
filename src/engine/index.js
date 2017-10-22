import {
  BLOCK_WIDTH,
  BLOCK_HEIGHT,
  C_WIDTH,
  OFFSET
} from '../const';

import * as Resources from '../resources';

export default class Engine {
  constructor(player, enemies, ctx, scoreboard) {
    this.player = player;
    this.enemies = enemies;
    this.rocks = [];  // no rocks on lvl1
    this.ctx = ctx;
    this.rowImages = [
      'images/water-block.png',   // Top row is water
      'images/stone-block.png',   // Row 1 of 3 of stone
      'images/stone-block.png',   // Row 2 of 3 of stone
      'images/stone-block.png',   // Row 3 of 3 of stone
      'images/grass-block.png',   // Row 1 of 2 of grass
      'images/grass-block.png'    // Row 2 of 2 of grass
    ];
    Resources.load('images/rock.png');
    Resources.load('images/char-boy-icn.png');
    Resources.load(this.rowImages);
    Resources.onReady(this.init);
    this.level = 1;
    this.ctx.font = '16px monospace';
    window.rocks = this.getRocks;
    scoreboard.getLevel = this.getLevel;
    this.scoreboard = scoreboard;
    player.surrender = this.surrender;
  }

  getLevel = () => this.level;

  surrender = () => {
    this.player.reset();
    this.player.lives = 3;
    this.enemies.forEach(enemy => enemy.x = C_WIDTH);
    this.level = 1;
    this.rocks = [];
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
    this.player.update(this.enemies, this.win);
  }

  win = () => {
    ++this.level;
    this.setRocks();
  }

  setRocks = () => {
    let rocks = [];
    for(let i = this.level; i--;) {
      let row = Math.floor(Math.random() * 3) + 1;
      let col = Math.floor(Math.random() * 5);
      rocks.push({
        x: col * BLOCK_WIDTH,
        y: row * BLOCK_HEIGHT + OFFSET - 5
      });
    }
    this.rocks = rocks;
  }

  getRocks = () => this.rocks;

  render = () => {
    this.scoreboard.render();
    for(let row = 0; row < 6; ++row)
      for(let col = 0; col < 5; ++col)
        this.ctx.drawImage(Resources.get(this.rowImages[row]), col * BLOCK_WIDTH, row * BLOCK_HEIGHT + 5);

    if(this.rocks.length) this.rocks.forEach(rock => {
      this.ctx.drawImage(Resources.get('images/rock.png'), rock.x, rock.y);
    });

    for(let enemy of this.enemies) enemy.render();
    this.player.render();
  }
}
