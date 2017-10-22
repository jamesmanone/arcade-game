import './images/char-boy.png';
import './images/enemy-bug.png';
import './images/grass-block.png';
import './images/stone-block.png';
import './images/water-block.png';
import './images/rock.png';
import './images/char-boy-icn.png';
import './images/key.png';
import './images/key-icn.png';

import Player from './classes/Player';
import Enemy from './classes/Enemy';
import Engine from './engine';
import Scoreboard from './classes/Scoreboard';
import { C_WIDTH, C_HEIGHT } from './const';


const c = document.createElement('canvas');
c.width = C_WIDTH;
c.height = C_HEIGHT;
const ctx = c.getContext('2d');
document.body.appendChild(c);

const player = new Player(ctx);
document.addEventListener('keyup', player.handleInput.bind(player));

let enemies = [];
for(let i = 5; --i;) enemies.push(new Enemy(ctx));

const scoreboard = new Scoreboard(ctx, player.getLives, player.getKeys);


new Engine(player, enemies, ctx, scoreboard);
