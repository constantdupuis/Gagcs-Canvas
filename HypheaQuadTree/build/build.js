var Particle = (function () {
    function Particle(x, y) {
        this.x = x;
        this.y = y;
    }
    return Particle;
}());
var qtree;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background("#2D142C");
    qtree = new QuadTree(new Boundary(20, 20, windowWidth - 40, windowHeight - 40), 8);
}
function draw() {
    background("#2D142C");
    qtree.forEach(function (e) {
        rectMode(CORNER);
        stroke("#801336");
        noFill();
        rect(e.boundary.x, e.boundary.y, e.boundary.w, e.boundary.h);
        e.points.forEach(function (e) {
            stroke("#C92A42");
            fill("#C92A42");
            circle(e.x, e.y, 5);
        });
    });
    if (mouseIsPressed === true && mouseButton === RIGHT) {
        rectMode(CORNER);
        var range = new Boundary(mouseX - 40, mouseY - 20, 80, 40);
        stroke("#EE4540");
        noFill();
        rect(range.x, range.y, range.w, range.h);
        var found = qtree.query(range);
        found.forEach(function (p) {
            stroke("#8FB9A8");
            fill("#8FB9A8");
            circle(p.x, p.y, 5);
        });
    }
    else if (mouseIsPressed === true && mouseButton === LEFT) {
        for (var i = 0; i < 5; i++) {
            qtree.insert(new Particle(mouseX + random(-5, 5), mouseY + random(-5, 5)));
        }
    }
}
var Boundary = (function () {
    function Boundary(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    Boundary.prototype.contains = function (p) {
        if (p.x >= this.x &&
            p.x <= this.x + this.w &&
            p.y >= this.y &&
            p.y <= this.y + this.h) {
            return true;
        }
        return false;
    };
    Boundary.prototype.intersects = function (r) {
        if (r.x > this.x + this.w ||
            r.y > this.y + this.h ||
            r.x + r.w < this.x ||
            r.y + r.h < this.y) {
            return false;
        }
        return true;
    };
    return Boundary;
}());
var QuadTree = (function () {
    function QuadTree(boundary, capacity) {
        this.points = [];
        this.capacity = 4;
        this.subdivided = false;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
        this.boundary = boundary;
        this.capacity = capacity;
    }
    QuadTree.prototype.insert = function (p) {
        if (!this.boundary.contains(p)) {
            return false;
        }
        if (this.points.length < this.capacity) {
            this.points.push(p);
            return true;
        }
        else {
            this.subdivide();
            if (this.topLeft.insert(p)) {
                return true;
            }
            else if (this.topRight.insert(p)) {
                return true;
            }
            else if (this.bottomLeft.insert(p)) {
                return true;
            }
            else if (this.bottomRight.insert(p)) {
                return true;
            }
            else {
                throw "Should never get here!";
            }
        }
        return false;
    };
    QuadTree.prototype.query = function (range) {
        var found = [];
        return this.innerQuery(range, found);
    };
    QuadTree.prototype.innerQuery = function (range, found) {
        if (found == null) {
            found = [];
        }
        if (!this.boundary.intersects(range))
            return found;
        this.points.forEach(function (p) {
            if (range.contains(p)) {
                found.push(p);
            }
        });
        if (this.subdivided) {
            this.topLeft.innerQuery(range, found);
            this.topRight.innerQuery(range, found);
            this.bottomLeft.innerQuery(range, found);
            this.bottomRight.innerQuery(range, found);
        }
        return found;
    };
    QuadTree.prototype.subdivide = function () {
        if (!this.subdivided) {
            this.subdivided = true;
            var x = this.boundary.x;
            var y = this.boundary.y;
            var newWidth = this.boundary.w / 2.0;
            var newHeight = this.boundary.h / 2.0;
            this.topLeft = new QuadTree(new Boundary(x, y, newWidth, newHeight), this.capacity);
            this.topRight = new QuadTree(new Boundary(x + newWidth, y, newWidth, newHeight), this.capacity);
            this.bottomLeft = new QuadTree(new Boundary(x, y + newHeight, newWidth, newHeight), this.capacity);
            this.bottomRight = new QuadTree(new Boundary(x + newWidth, y + newHeight, newWidth, newHeight), this.capacity);
        }
    };
    QuadTree.prototype.forEach = function (callback) {
        this.visiteALlQuadTree(this, callback);
    };
    QuadTree.prototype.forEachPoints = function (callback) {
        this.visiteAllPoints(this, callback);
    };
    QuadTree.prototype.forEachBoundaries = function (callback) {
        this.visiteAllBoundaries(this, callback);
    };
    QuadTree.prototype.visiteALlQuadTree = function (qtree, callback) {
        if (qtree == null)
            return;
        callback(qtree);
        this.visiteALlQuadTree(qtree.topLeft, callback);
        this.visiteALlQuadTree(qtree.topRight, callback);
        this.visiteALlQuadTree(qtree.bottomLeft, callback);
        this.visiteALlQuadTree(qtree.bottomRight, callback);
    };
    QuadTree.prototype.visiteAllPoints = function (qtree, callback) {
        if (qtree == null)
            return;
        qtree.points.forEach(function (point) {
            callback(point);
        });
        this.visiteAllPoints(qtree.topLeft, callback);
        this.visiteAllPoints(qtree.topRight, callback);
        this.visiteAllPoints(qtree.bottomLeft, callback);
        this.visiteAllPoints(qtree.bottomRight, callback);
    };
    QuadTree.prototype.visiteAllBoundaries = function (qtree, callback) {
        if (qtree == null)
            return;
        callback(qtree.boundary);
        this.visiteAllBoundaries(qtree.topLeft, callback);
        this.visiteAllBoundaries(qtree.topRight, callback);
        this.visiteAllBoundaries(qtree.bottomLeft, callback);
        this.visiteAllBoundaries(qtree.bottomRight, callback);
    };
    return QuadTree;
}());
//# sourceMappingURL=build.js.map