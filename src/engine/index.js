import {
  BLOCK_WIDTH,
  BLOCK_HEIGHT,
  C_WIDTH,
  OFFSET
} from '../const';
import * as Resources from '../resources';
import Enemy from '../classes/Enemy';

const keyImg = 'images/key.png';
const rockImg = 'images/rock.png';

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
    Resources.load([rockImg, keyImg]);
    Resources.load(this.rowImages);
    Resources.onReady(this.init);
    this.level = 1;
    this.keys = [];
    this.ctx.font = '16px monospace';
    window.rocks = this.getRocks;
    window.keys = this.getKeys;
    scoreboard.getLevel = this.getLevel;
    this.scoreboard = scoreboard;
    player.surrender = this.surrender;
  }

  getLevel = () => this.level;

  surrender = () => {
    this.player.reset();
    this.player.lives = 3;
    this.player.keys = 0;
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
    if(!(this.level % 3)) {
      this.setKeys();
    } else {
      this.keys = [];
    }
    // Add enemy every 7 levels
    if(this.level && !(this.level % 7)) this.enemies.push(new Enemy(this.ctx));
  }

  setKeys = () => {
    let keyCount = this.level / 3;
    if(keyCount > 3) keyCount = 3;
    if(this.level > 30) keyCount = 1;
    else if(this.level > 20) keyCount = 2;

    while(keyCount--) {
      let y = (Math.floor(Math.random() * 3) + 1) * BLOCK_HEIGHT + OFFSET - 5;
      let x = (Math.floor(Math.random() * 5)) * BLOCK_WIDTH;
      // Remove overlapping rocks
      this.rocks.forEach((rock, i) => {
        if(rock.y === y && rock.x === x) this.rocks.splice(i, 1);
      });
      this.keys.push({x, y});
    }
  }

  getKeys = () => this.keys;

  removeKey = i => this.keys.splice(i, 1);

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
    this.renderBoard();
    this.renderObjects();
    this.renderChars();
  }

  renderObjects = () => {
    if(this.rocks.length) this.rocks.forEach(rock => {
      this.ctx.drawImage(Resources.get(rockImg), rock.x, rock.y);
    });

    if(this.keys.length) this.keys.forEach(key => {
      this.ctx.drawImage(Resources.get(keyImg), key.x, key.y);
    });
  }

  renderChars = () => {
    for(let enemy of this.enemies) enemy.render();
    this.player.render();
  }

  renderBoard = () => {
    for(let row = 0; row < 6; ++row)
      for(let col = 0; col < 5; ++col)
        this.ctx.drawImage(Resources.get(this.rowImages[row]), col * BLOCK_WIDTH, row * BLOCK_HEIGHT + 5);
  }
}
