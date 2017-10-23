import {
  BLOCK_WIDTH,
  BLOCK_HEIGHT,
  C_WIDTH,
  OFFSET
} from '../const';

import * as Resources from '../resources';

const Enemy = function(ctx) {
  this.ctx = ctx;
  this.sprite = 'images/enemy-bug.png';
  this.setSpeed();
  this.x = 0;
  this.getLane();
  if(Resources.get(this.sprite) === undefined) Resources.load(this.sprite);
};

Enemy.prototype.update = function(dt) {
    this.x+=(dt*this.speed);
    if(this.x >= C_WIDTH) {
      this.setSpeed();
      this.x = -(this.speed*Math.random()*1.5) - BLOCK_WIDTH;  // Off screen up to 1.5s
      this.getLane();
    }
};

Enemy.prototype.setSpeed = function() {
  this.speed = Math.floor((Math.random()*300) + 50);
};

Enemy.prototype.render = function() {
    this.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getLane = function() {
  let lane = Math.floor(Math.random()*3)+1;
  this.y = lane * BLOCK_HEIGHT + OFFSET;
};

export default Enemy;
