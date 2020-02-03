var Branch = (function () {
    function Branch(pos, dir, radius, maxLife, generation) {
        this.ground = null;
        this.parentBranch = null;
        this.dir = 0.0;
        this.radius = 0.0;
        this.buds = [];
        this.childBranches = [];
        this.growing = true;
        this.maxLife = 500;
        this.life = 0;
        this.budDrawer = null;
        this.idx = -1;
        this.generation = 0;
        this.rootBudIdx = -1;
        this.rootPos = pos;
        this.dir = dir;
        this.radius = radius;
        this.maxLife = maxLife;
        this.life = 0;
        this.generation = generation;
    }
    Branch.prototype.grow = function () {
        this.childBranches.forEach(function (b) {
            b.grow();
        });
        if (!this.growing)
            return;
        if (this.buds.length == 0) {
            var newBud = new Bud(this.rootPos, this.dir, this.radius);
            this.buds.push(newBud);
            this.life++;
            this.lastBud = newBud;
            newBud.branch = this;
            this.budDrawer.draw(newBud, this.ground.colorScale((this.idx % 10.0) / 10.0));
        }
        else {
            var growth = p5.Vector.fromAngle(this.lastBud.dir, 4.0);
            var newBud = new Bud(p5.Vector.add(this.lastBud.pos, growth), this.lastBud.dir + randomGaussian(0, QUARTER_PI / 8.0), this.lastBud.radius);
            newBud.branch = this;
            if (this.ground.toClose(newBud)) {
                this.growing = false;
                return;
            }
            newBud.idx = this.buds.length;
            this.buds.push(newBud);
            this.life++;
            this.lastBud = newBud;
            this.budDrawer.draw(newBud, this.ground.colorScale((this.idx % 10.0) / 10.0));
        }
        if (this.lastBud.pos.x < 0 || this.lastBud.pos.x > windowWidth ||
            this.lastBud.pos.y < 0 || this.lastBud.pos.y > windowHeight) {
            this.growing = false;
        }
        if (this.life >= this.maxLife)
            this.growing = false;
        if (this.life % 20 == 0) {
            var dir = (random(0.0, 6.0) < 3.0 ? -1.0 : 1.0);
            var newB = new Branch(this.lastBud.pos, this.lastBud.dir + (QUARTER_PI * dir), this.lastBud.radius, this.maxLife / 2.0, this.generation + 1);
            this.ground.addBranch(newB);
            newB.rootBudIdx = this.lastBud.idx;
            newB.budDrawer = this.budDrawer;
            newB.parentBranch = this;
            this.childBranches.push(newB);
        }
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
    BudDrawer.prototype.draw = function (b, c) {
        fill(122, 126, 93);
        noStroke();
        circle(b.pos.x, b.pos.y, b.radius);
    };
    return BudDrawer;
}());
var Ground = (function () {
    function Ground() {
        this.allBranches = [];
        this.colorScale = chroma.scale(['red', 'yellow', 'black', 'blue', 'white', 'green']);
    }
    Ground.prototype.addBranch = function (b) {
        b.ground = this;
        b.idx = this.allBranches.length;
        this.allBranches.push(b);
        console.log("New branche with id " + (this.allBranches.length - 1));
        return this.allBranches.length - 1;
    };
    Ground.prototype.toClose = function (b) {
        for (var i = 0; i < this.allBranches.length; i++) {
            var br = this.allBranches[i];
            if (br.idx == b.branch.idx) {
                if (br.buds.length > 10) {
                    for (var y = 0; y < br.buds.length - 10; y++) {
                        var bu = br.buds[y];
                        if (p5.Vector.dist(b.pos, bu.pos) < 10.0) {
                            console.log("1 Branch " + b.branch.idx + " to close from parent branch " + br.idx);
                            console.log("current branche id " + br.idx + " bud branch id " + b.branch.idx);
                            return true;
                        }
                    }
                }
                else {
                    return false;
                }
            }
            else if (br.idx == b.branch.parentBranch.idx) {
                var budRootIndex = b.branch.rootBudIdx;
                if (budRootIndex < 10) {
                    return false;
                }
                else if (budRootIndex > 10 && budRootIndex < br.buds.length - 5) {
                    for (var y = 0; y < budRootIndex - 5; y++) {
                        var bu = br.buds[y];
                        if (p5.Vector.dist(b.pos, bu.pos) < 20.0) {
                            console.log("2 Branch " + b.branch.idx + " to close from grand parent branch " + br.idx);
                            console.log("current branch " + br.idx + ", curretn bud " + b.idx + " bud branch " + b.branch.idx + ", parent branch " + b.branch.parentBranch.idx);
                            return true;
                        }
                    }
                    for (var y = budRootIndex + 10; y < br.buds.length; y++) {
                        var bu = br.buds[y];
                        if (p5.Vector.dist(b.pos, bu.pos) < 20.0) {
                            console.log("3 Branch " + b.branch.idx + " to close from grand parent branch " + br.idx);
                            console.log("current branch " + br.idx + ", curretn bud " + b.idx + " bud branch " + b.branch.idx + ", parent branch " + b.branch.parentBranch.idx);
                            return true;
                        }
                    }
                }
            }
            else {
                for (var y = 0; y < br.buds.length; y++) {
                    var bu = br.buds[y];
                    if (p5.Vector.dist(b.pos, bu.pos) < 15.0) {
                        console.log("3 Branch " + b.branch.idx + " to close of branch " + br.idx);
                        console.log("current branche id " + br.idx + " bud branch id " + b.branch.idx);
                        return true;
                    }
                }
            }
            return false;
        }
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
    myBudDrawer.prototype.draw = function (b, c) {
        fill(c.rgb());
        noStroke();
        circle(b.pos.x, b.pos.y, b.radius);
    };
    return myBudDrawer;
}(BudDrawer));
var b;
var g;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(45, 33, 46);
    g = new Ground();
    b = new Branch(createVector(windowWidth * 1 / 2, windowHeight * 1 / 2), -HALF_PI, 5.0, 100, 0);
    b.budDrawer = new myBudDrawer();
    b.budDrawer.init();
    g.addBranch(b);
}
function draw() {
    b.grow();
}
//# sourceMappingURL=build.js.map