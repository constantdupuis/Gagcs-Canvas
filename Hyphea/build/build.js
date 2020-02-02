var Branch = (function () {
    function Branch(pos, dir, radius) {
        this.ground = null;
        this.parentBranch = null;
        this.dir = 0.0;
        this.radius = 0.0;
        this.buds = [];
        this.childBranches = [];
        this.growing = true;
        this.maxLife = 100;
        this.life = 100;
        this.budDrawer = null;
        this.rootPos = pos;
        this.dir = dir;
        this.radius = radius;
    }
    Branch.prototype.setGround = function (g) {
        this.ground = g;
        this.ground.addBranch(this);
    };
    Branch.prototype.grow = function () {
        this.childBranches.forEach(function (b) {
            b.grow();
        });
        if (!this.growing)
            return;
        if (this.buds.length == 0) {
            var newBud = new Bud(this.rootPos, this.dir, this.radius);
            this.buds.push(newBud);
            this.lastBud = newBud;
            this.budDrawer.draw(newBud);
        }
        else {
            var growth = p5.Vector.fromAngle(this.lastBud.dir, 4.0);
            var newBud = new Bud(p5.Vector.add(this.lastBud.pos, growth), this.lastBud.dir + randomGaussian(0, QUARTER_PI / 8.0), this.lastBud.radius);
            this.buds.push(newBud);
            this.lastBud = newBud;
            this.budDrawer.draw(newBud);
        }
        if (this.buds.length % 10 == 0) {
            var newB = new Branch(this.lastBud.pos, this.lastBud.dir + randomGaussian(0.0, QUARTER_PI), this.lastBud.radius);
            newB.setGround(this.ground);
            newB.budDrawer = this.budDrawer;
            newB.life = this.life / 2.0;
            this.childBranches.push(newB);
        }
        if (this.buds.length >= this.life)
            this.growing = false;
    };
    return Branch;
}());
var Bud = (function () {
    function Bud(pos, dir, radius) {
        this.dir = 0.0;
        this.radius = 0.0;
        this.pos = pos;
        this.dir = dir;
        this.radius = radius;
    }
    Bud.prototype.draw = function () {
        fill(122, 126, 93);
        noStroke();
        circle(this.pos.x, this.pos.y, this.radius);
    };
    return Bud;
}());
var BudDrawer = (function () {
    function BudDrawer() {
    }
    BudDrawer.prototype.init = function () { };
    BudDrawer.prototype.draw = function (b) {
        fill(122, 126, 93);
        noStroke();
        circle(b.pos.x, b.pos.y, b.radius);
    };
    return BudDrawer;
}());
var Ground = (function () {
    function Ground() {
        this.allBranches = [];
    }
    Ground.prototype.addBranch = function (b) {
        this.allBranches.push(b);
    };
    Ground.prototype.toCLose = function (b) {
        return false;
    };
    return Ground;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var myBudDrawer = (function (_super) {
    __extends(myBudDrawer, _super);
    function myBudDrawer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    myBudDrawer.prototype.init = function () {
        this.colorScale = chroma.scale(['#fafa6e', '#2A4858']);
    };
    myBudDrawer.prototype.draw = function (b) {
        var color = this.colorScale(0.5 + randomGaussian(0, 0.2));
        fill(color.rgb());
        noStroke();
        circle(b.pos.x, b.pos.y, b.radius + randomGaussian(0, 2.0));
    };
    return myBudDrawer;
}(BudDrawer));
var b;
var g;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(45, 33, 46);
    g = new Ground();
    b = new Branch(createVector(windowWidth / 2.0, windowHeight * 0.8), -HALF_PI, 10.0);
    b.budDrawer = new myBudDrawer();
    b.budDrawer.init();
    b.setGround(g);
}
function draw() {
    b.grow();
}
//# sourceMappingURL=build.js.map