import {
  BLOCK_WIDTH,
  BLOCK_HEIGHT,
  C_WIDTH,
  C_HEIGHT,
  OFFSET
} from '../const';

import * as Resources from '../resources';

const Player = function(ctx) {
  this.ctx = ctx;
  this.x = BLOCK_WIDTH * 3 + 15;
  this.y = BLOCK_HEIGHT * 4.65;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  if (allEnemies && allEnemies.length) allEnemies.forEach(enemy => {
    // collision check
    if(this.y >= enemy.y && this.y <= enemy.y + BLOCK_HEIGHT &&
       this.x <= enemy.x + BLOCK_WIDTH && this.x >= enemy.x
     ) {
       this.x = BLOCK_WIDTH * 3 + 15;
       this.y = BLOCK_HEIGHT * 4.65;
     }
  })
};

Player.prototype.render = function() {
  this.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function({keyCode}) {
  // Checks for off board condition and updates player pos
  switch (keyCode) {
    case 37:
      if(this.x>=BLOCK_WIDTH) this.x-=BLOCK_WIDTH;
      break;
    case 38:
      if(this.y>=BLOCK_HEIGHT) this.y-=BLOCK_HEIGHT;
      break;
    case 39:
      if(this.x<C_WIDTH - BLOCK_WIDTH) this.x+=BLOCK_WIDTH;
      break;
    case 40:
      if(this.y<C_HEIGHT - BLOCK_HEIGHT - OFFSET) this.y+=BLOCK_HEIGHT;
  }
}

export default Player;
