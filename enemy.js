class Enemy {
    constructor(level, x, y) {
        this.level = level;
        this.x = x;
        this.y = y;
        this.style = {...tileset["E"]};
    }

    render() {
        SM.set(this.x, this.y, this.style);
    }

    tick() {
        this.style.glyphColor = SM.randBetween(0x000000, 0xFFFFFF);
        var old = {...this};
        let directions = ['UP', 'LEFT', 'DOWN', 'RIGHT'];
        let key = selectFromList(directions);

        if (key === 'UP') {
            this.y--;
        } else if (key === 'DOWN') {
            this.y++;
        } else if (key === 'LEFT') {
            this.x--;
        } else if (key === 'RIGHT') {
            this.x++;
        }

        if(getTile(this.level, this.x, this.y).wall){
            this.x = old.x;
            this.y = old.y;
        }
    }
}