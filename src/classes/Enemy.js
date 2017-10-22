import {
  BLOCK_WIDTH,
  BLOCK_HEIGHT,
  C_WIDTH,
  C_HEIGHT,
  OFFSET
} from '../const';

import * as Resources from '../resources';

const Enemy = function(ctx) {
  this.ctx = ctx;
  this.sprite = 'images/enemy-bug.png';
  this.speed = Math.floor((Math.random()*400)+50);
  this.x = -(this.speed * Math.random()) - BLOCK_WIDTH;
  this.y = this.getLane();
}

Enemy.prototype.update = function(dt) {
    this.x+=(dt*this.speed);
    if(this.x>=C_WIDTH) {
      this.x= -(this.speed*Math.random()*1.5) - BLOCK_WIDTH;  // Off screen up to 1.5s
      this.speed = Math.floor((Math.random()*400)+50);  // Random speed 50 - 450 PxPS
      this.lane = this.getLane();
    }
};

Enemy.prototype.render = function() {
    this.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getLane = function() {
  let lane = Math.floor(Math.random()*3)+1;
  return lane * BLOCK_HEIGHT + 50;
};

export default Enemy;
