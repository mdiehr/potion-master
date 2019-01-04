// Game.js template for Spielmatrix

var player = {x: 1, y: 1, color:0x206be5, glyphColor:0xb270e5, glyph:0xf6};




const tileset = {
    " ": {wall: 0, spawn: 0, color:0, glyphColor:0, glyph:0x00},    // empty
    "#": {wall: 1, spawn: 0, color:0x7c1d35, glyphColor:0xc6babd, glyph:0xda},    // brick
    "=": {wall: 1, spawn: 0, color:0x595959, glyphColor:0xbcbcbc, glyph:0xda},    // brick 2
    "~": {wall: 1, spawn: 0, color:0x2358ba, glyphColor:0x73aadd, glyph:0xf7},    // water
    "D": {wall: 0, spawn: 1, color:0x000000, glyphColor:0xeafffc, glyph:0xeb},    // DIAMOND
    "P": {wall: 0, spawn: 1, color:0x000000, glyphColor:0xb92ccc, glyph:0xde},    // POTION
    "E": {wall: 0, spawn: 1, color:0x000000, glyphColor:0x76a86b, glyph:0xee},    // ENEMY
};

var map = [
"#################",
"#               #",
"#         =D   =#",
"#         ==   D#",
"#         =D   =#",
"#      PPP==   D#",
"#==========D   =#",
"#~~~~~~~~~==   D#",
"#~~PPEEEEE     =#",
"#################"
];

const w = map[0].length;
const h = map.length;

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

    if(getTile(player.x, player.y).wall){
        player.x = old.x;
        player.y = old.y;
    }

    drawScreen();
}

function setup() {
    drawScreen();
}

function getTile(x, y) {
    return tileset[map[y][x]];
}

function drawMap() {
    for(let x = 0; x < w; x++) {
        for( let y = 0; y < h; y++) {
            SM.set(x, y, getTile(x,y))
        }
    }
}

function clearScreen(){
    S().color(0).glyphColor(0);
}

function drawScreen() {
    clearScreen();
    drawMap();
    drawPlayer();
}

function drawPlayer(){
    SM.color(player.x, player.y, player.color);
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

setup();