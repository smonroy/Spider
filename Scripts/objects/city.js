var objects;
(function (objects) {
    class City {
        constructor(scene) {
            this._distanceMin = 400;
            this._distanceMax = 300;
            this._leftBorderPosition = 0;
            this._rightBorder = 0;
            this._numBuldings = 10;
            this._scene = scene;
            this.buildings = new Array();
            this.GetNewBuldings();
        }
        Scroll(distance) {
            this._leftBorderPosition -= distance;
            for (let i = 0; i < this.buildings.length; i++) {
                this.buildings[i].Scroll(distance);
            }
            this.GetNewBuldings();
        }
        GetNewBuldings() {
            while (this._rightBorder + this._leftBorderPosition < managers.SCREEN_WITH || this.buildings.length < this._numBuldings) {
                this._rightBorder += this._distanceMin + Math.floor(Math.random() * (this._distanceMax - this._distanceMin));
                let floors = Math.floor((Math.random() * 3) + 10);
                let position = this._rightBorder + this._leftBorderPosition;
                let found = false;
                for (let i = 0; i < this.buildings.length; i++) {
                    if (!this.buildings[i].IsActive()) {
                        this.buildings[i].Reset(floors, position);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    let building = new objects.Building(floors, position);
                    this.buildings[this.buildings.length] = building;
                    this._scene.addChild(building);
                }
            }
        }
        IsInBuilding(x, y) {
            return false;
        }
    }
    objects.City = City;
})(objects || (objects = {}));
//# sourceMappingURL=city.js.map