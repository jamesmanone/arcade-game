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
  this.reset();
  this.sprite = 'images/char-boy.png';
  this.lives = 3;
  Resources.load(this.sprite);
};

Player.prototype.update = function(allEnemies, win) {
  if(this.y < BLOCK_HEIGHT) {
    this.reset();
    win();
    return;
  }
  if (allEnemies && allEnemies.length) allEnemies.forEach(enemy => {
    // collision check
    if(this.y >= enemy.y && this.y <= enemy.y + BLOCK_HEIGHT - 2 &&
       this.x + 5 <= enemy.x + BLOCK_WIDTH && this.x >= enemy.x
     ) {
       this.reset();
       if(!--this.lives && this.surrender) this.surrender();
       // surrender is injected by engine on instantiation
     }
  });
};

Player.prototype.reset = function() {
  this.x = BLOCK_WIDTH * 3 + 15;
  this.y = BLOCK_HEIGHT * 4 + OFFSET;
};

Player.prototype.render = function() {
  this.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.checkRock = function(x, y, rock) {
  if(rock.y <= y && rock.y + BLOCK_HEIGHT >= y &&
     rock.x <= x && rock.x + BLOCK_WIDTH >= x
  ) return true;
  return false;
};

Player.prototype.checkRocks = function(x, y) {
  const rocks = window.rocks();
  for(let rock of rocks) {
    if(this.checkRock(x, y, rock)) return true;
  }
  return false;
};

Player.prototype.moveUp = function() {
  if(this.y<=OFFSET) return;
  const newX = this.x;
  const newY = this.y - BLOCK_HEIGHT;
  if(!this.checkRocks(newX, newY)) this.y = newY;
};

Player.prototype.moveDown = function() {
  if(this.y>=C_HEIGHT - BLOCK_HEIGHT - OFFSET) return;
  const newX = this.x;
  const newY = this.y + BLOCK_HEIGHT;
  if(!this.checkRocks(newX, newY)) this.y = newY;
};

Player.prototype.moveLeft = function() {
  if(this.x<BLOCK_WIDTH) return;
  const newX = this.x - BLOCK_WIDTH;
  const newY = this.y;
  if(!this.checkRocks(newX, newY)) this.x = newX;
};

Player.prototype.moveRight = function () {
  if(this.x>=C_WIDTH - BLOCK_WIDTH) return;
  const newX = this.x + BLOCK_WIDTH;
  const newY = this.y;
  if(!this.checkRocks(newX, newY)) this.x = newX;
};

Player.prototype.handleInput = function({keyCode}) {
  // Checks for off board condition and updates player pos
  switch (keyCode) {
    case 37:
      return this.moveLeft();
    case 38:
      return this.moveUp();
    case 39:
      return this.moveRight();
    case 40:
      return this.moveDown();
  }
};

export default Player;
