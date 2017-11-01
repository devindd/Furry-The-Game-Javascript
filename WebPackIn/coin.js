function Coin(x, y) { // Object Coin which is returning random place on our field to create new coin 
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};
module.exports = Coin;
