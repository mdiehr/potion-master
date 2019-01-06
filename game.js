// Game.js template for Spielmatrix

var player = {x: 1, y: 1, color:0x206be5, glyphColor:0xb270e5, glyph:0xf6};

const tileset = {
    " ": {wall: 0, type: "Empty",   spawn: 0, color:0, glyphColor:0, glyph:0x00},    // empty
    "#": {wall: 1, type: "Brick",   spawn: 0, color:0x7c1d35, glyphColor:0xc6babd, glyph:0xda},    // brick
    "=": {wall: 1, type: "Brick",   spawn: 0, color:0x595959, glyphColor:0xbcbcbc, glyph:0xda},    // brick 2
    "~": {wall: 0, type: "Water",   spawn: 0, color:0x2358ba, glyphColor:0x73aadd, glyph:0xf7},    // water
    "D": {wall: 0, type: "Diamond", spawn: 0, color:0x000000, glyphColor:0xeafffc, glyph:0xeb},    // DIAMOND
    "P": {wall: 0, type: "Potion",  spawn: 0, color:0x000000, glyphColor:0xb92ccc, glyph:0xde},    // POTION
    "E": {wall: 0, type: "Enemy",   spawn: Enemy, glyphColor:0x76a86b, glyph:0xee},    // ENEMY
};

var gameObjects = [];

var LEVEL_ONE = [
"#################",
"# D             #",
"#P        =D   =#",
"#   E     ==   D#",
"#         =D   =#",
"#      PPP==   D#",
"#==========D   =#",
"#~~~~~~~~~==   D#",
"#~~PP EE   E   =#",
"#################"
].map(line => line.split(''));

let current_level;

const w = LEVEL_ONE[0].length;
const h = LEVEL_ONE.length;

function selectFromList(list) {
    return list[SM.randBetween(0, list.length-1)];
}

function KeyHandler(key) {
    // SM.log(["keydown", key].join(", "));
    var old = {x: player.x, y: player.y};
    if (key === 'UP') {
        player.y--;
    } else if (key === 'DOWN') {
        player.y++;
    } else if (key === 'LEFT') {
        player.x--;
    } else if (key === 'RIGHT') {
        player.x++;
    }

    if(getTile(current_level, player.x, player.y).wall){
        player.x = old.x;
        player.y = old.y;
    }
    if(getTile(current_level, player.x, player.y).type == "Diamond"){
        SM.play('Coin3');
        setTile(current_level, player.x, player.y, " ");
    }
        if(getTile(current_level, player.x, player.y).type == "Potion"){
        SM.play('Powerup2');
        setTile(current_level, player.x, player.y, " ");
    }
    tickGameObjects();
    drawScreen(current_level);
}

function tickGameObjects(){
    gameObjects.forEach(obj => {
        obj.tick();
    });
}

function renderGameObjects(){
    gameObjects.forEach(obj => {
        obj.render();
    });
}

function setup(level) {
    current_level = level;
    spawnObjects(level);
    drawScreen(level);
}

function spawnObjects(level) {
    for(let x = 0; x < w; x++) {
        for( let y = 0; y < h; y++) {
            let tile = getTile(level, x,y);
            if(tile.spawn) {
                let object = new tile.spawn(level, x, y);
                gameObjects.push(object);
                setTile(level, x, y, " ");
            }
        }
    }
}

function getTile(level, x, y) {
    return tileset[level[y][x]];
}

function setTile(level, x, y, tile) {
    level[y][x] = tile;
}

function drawLevel(level) {
    for(let x = 0; x < w; x++) {
        for( let y = 0; y < h; y++) {
            SM.set(x, y, getTile(level, x,y))
        }
    }
}

function clearScreen(){
    S().color(0).glyphColor(0);
}

function drawScreen(level) {
    clearScreen();
    drawLevel(level);
    renderGameObjects();
    drawPlayer();
}

function drawPlayer(){
    // SM.color(player.x, player.y, player.color);
    SM.glyph(player.x, player.y, player.glyph);
    SM.glyphColor(player.x, player.y, player.glyphColor);
}

var SM = new Spielmatrix({
    place : document.getElementById('game'),
    width : w,
    height : h,
    defaultColor : 0x000000,
    mousedown : function(x, y) {
        // SM.log(["mousedown", x, y].join(", "));
        SM.glyph(x, y, 0xde);
        SM.glyphColor(x, y, 0x33aa66);
        SM.play('Blip1');
    },
    mouseup : function(x, y) {
        // SM.log(["mouseup", x, y].join(", "));
    },
    mousemove : function(oldX, oldY, x, y) {
        // SM.log(["mousemove", oldX, oldY, x, y].join(", "));
    },
    mouseenter : function(x, y) {
        // SM.log(["mouseenter", x, y].join(", "));
    },
    mouseleave : function(x, y) {
        // SM.log(["mouseleave", x, y].join(", "));
    },
    mouseout : function(x, y) {
        // SM.log(["mouseout", x, y].join(", "));
    },
    mouseover : function(x, y) {
        // SM.log(["mouseover", x, y].join(", "));
    },
    update : function(data) {
        // drawAll(colors[++colorCount%colors.length]);
    },
    keydown : KeyHandler,
    keyup : () => {}
});

// Get a reference to the tile selector
var S = SM.selector();
// Draw a glyph & glyph in every bead 
S().glyph(0xF9).glyphColor(0x232355);

setup(LEVEL_ONE);