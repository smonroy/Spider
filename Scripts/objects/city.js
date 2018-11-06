var objects;
(function (objects) {
    class City {
        constructor(scene) {
            this._distanceMin = 400;
            this._distanceMax = 300;
            this._speed = 1;
            this._leftBorderPosition = 0;
            this._rightBorder = 0;
            this._scene = scene;
            this.buildings = new Array();
            this.CreateNewBuldings();
        }
        Update(distance = this._speed) {
            this._leftBorderPosition += this._speed;
            this.buildings.forEach(building => {
                building.Move(this._speed);
            });
            this.CreateNewBuldings();
        }
        CreateNewBuldings() {
            while (this._rightBorder - this._leftBorderPosition < managers.SCREEN_WITH) {
                this._rightBorder += this._distanceMin + Math.floor(Math.random() * (this._distanceMax - this._distanceMin));
                let building = new objects.Building(Math.floor((Math.random() * 3) + 10), this._rightBorder - this._leftBorderPosition);
                this.buildings[this.buildings.length] = building;
                this._scene.addChild(building);
            }
        }
    }
    objects.City = City;
})(objects || (objects = {}));
//# sourceMappingURL=city.js.map