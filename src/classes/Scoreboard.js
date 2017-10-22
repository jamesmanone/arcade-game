import { C_WIDTH } from '../const';
import * as Resources from '../resources';

const char = 'images/char-boy-icn.png';
const key = 'images/key-icn.png';

export default class Scoreboard {
  constructor(ctx, getLives, getKeys) {
    this.ctx = ctx;
    this.getLives = getLives;
    this.getKeys = getKeys;
    Resources.load([char, key]);
  }
  render() {
    const lives = this.getLives();
    const keys = this.getKeys();
    const level = this.getLevel ? this.getLevel() : 0;  // getLevel will be injected by engine
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0,0,C_WIDTH,20);
    this.renderLvl(level);
    this.renderLives(lives);
    this.renderKeys(keys);
  }

  renderLvl = lvl => {
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Level ${lvl}`, 25, 12);
  }

  renderLives = lives => {
    let x = C_WIDTH - 25;
    while(lives--) {
      this.ctx.drawImage(Resources.get(char), x - 13, 0);
      x -= 20;
    }
  }

  renderKeys = keys => {
    let x = (C_WIDTH / 2) - ((Math.floor(keys / 2)) * 20);
    while(keys--) {
      this.ctx.drawImage(Resources.get(key), x - 8, 0);
      x += 20;
    }
  }

}
