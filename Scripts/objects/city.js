var objects;
(function (objects) {
    class City {
        constructor(scene) {
            // Constants
            this._DISTANCE_MAX = 300;
            this._DISTANCE_MIN = 200;
            this._NUM_BUILDINGS = 10;
            this._BUILDINGDS_FLOOR_DECRESE = 30;
            this._leftBorderPosition = 0;
            this._rightBorder = 0;
            this._floorMin = 10;
            this._scene = scene;
            this._buildingCount = 0;
            this.buildings = new Array();
            this.clothesLines = new Array();
            this.CheckBounderies();
        }
        Scroll(distance) {
            this._leftBorderPosition -= distance;
            for (let i = 0; i < this.buildings.length; i++) {
                this.buildings[i].Scroll(distance);
            }
            for (let i = 0; i < this.clothesLines.length; i++) {
                this.clothesLines[i].Scroll(distance);
            }
            this.CheckBounderies();
        }
        CheckBounderies() {
            while (this._rightBorder + this._leftBorderPosition < managers.SCREEN_WITH || this.buildings.length < this._NUM_BUILDINGS) {
                let separation = this._DISTANCE_MIN + Math.floor(Math.random() * (this._DISTANCE_MAX - this._DISTANCE_MIN));
                let previousBorder = this._rightBorder;
                this._rightBorder += separation;
                this._buildingCount++;
                if (this._buildingCount % this._BUILDINGDS_FLOOR_DECRESE == 0) {
                    if (this._floorMin > 5) {
                        this._floorMin -= 1;
                    }
                }
                this._getBuilding();
                this._getCloths(previousBorder, separation);
            }
        }
        _getBuilding() {
            this._floorPrev = this._floorCurrent;
            this._floorCurrent = Math.floor((Math.random() * 3) + this._floorMin);
            let position = this._rightBorder + this._leftBorderPosition;
            let found = false;
            // look for any available building
            for (let i = 0; i < this.buildings.length; i++) {
                if (!this.buildings[i].IsActive()) {
                    this.buildings[i].Reset(this._floorCurrent, position);
                    this._rightBorder += this.buildings[i].getBounds().width;
                    found = true;
                    break;
                }
            }
            // create a new building
            if (!found) {
                let building = new objects.Building(this._floorCurrent, position);
                this.buildings[this.buildings.length] = building;
                this._rightBorder += building.getBounds().width;
                this._scene.addChild(building);
            }
        }
        _getCloths(previousBorder, separation) {
            let clothesProbability = 50 + this._buildingCount;
            if (Math.random() * 100 > clothesProbability) {
                let clothesHeightMax = managers.SCREEN_HEIGHT - (Math.min(this._floorCurrent, this._floorPrev) * managers.BLOCK_HEIGHT) + 36;
                let clothesHeightMin = managers.SCREEN_HEIGHT - (3 * managers.BLOCK_HEIGHT) + 36;
                let clothesHeight = (Math.random() * (clothesHeightMax - clothesHeightMin)) + clothesHeightMin;
                let found;
                if (this._buildingCount > 2) {
                    found = false;
                    for (let i = 0; i < this.clothesLines.length; i++) {
                        if (!this.clothesLines[i].IsActive()) {
                            this.clothesLines[i].Activate(previousBorder + this._leftBorderPosition, clothesHeight, separation);
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        let clothes = new objects.Clothes(previousBorder + this._leftBorderPosition, clothesHeight, separation);
                        this.clothesLines[this.clothesLines.length] = clothes;
                        this._scene.addChild(clothes);
                    }
                }
            }
        }
        CheckCollision() {
            for (let clothes of this.clothesLines) {
                clothes.CheckCollision();
            }
        }
    }
    objects.City = City;
})(objects || (objects = {}));
//# sourceMappingURL=city.js.map