var objects;
(function (objects) {
    class Building extends createjs.Bitmap {
        constructor(floors, position) {
            super(managers.Game.assetMnager.getResult("building2"));
            this.floors = floors;
            this.x = position;
            this.y = managers.SCREEN_HEIGHT - (this.floors * managers.BLOCK_HEIGHT);
            this.Start();
        }
        Reset() {
        }
        Start() {
        }
        Update() {
        }
        Destroy() {
        }
        Move(distance) {
            this.x -= distance;
        }
    }
    objects.Building = Building;
})(objects || (objects = {}));
//# sourceMappingURL=building.js.map