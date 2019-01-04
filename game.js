// Game.js template for Spielmatrix

var player = {x: 1, y: 1, color:0x206be5, glyphColor:0xb270e5, glyph:0xf6};
var w = 16, h = 16;

function KeyHandler(key) {
    // SM.log(["keydown", key].join(", "));

    if (key === 'UP' && player.y > 0) {
        player.y--;
    } else if (key === 'DOWN' && player.y < h-1) {
        player.y++;
    } else if (key === 'LEFT' && player.x > 0) {
        player.x--;
    } else if (key === 'RIGHT' && player.x < w-1) {
        player.x++;
    }
    drawPlayer();
}

function setup() {
    drawPlayer();
}
function clearScreen(){
    S().color(0).glyphColor(0);
}

function drawPlayer(){
    clearScreen();
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