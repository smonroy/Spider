module objects {
    export class City {
        public buildings:objects.Building[];
        private _distanceMax:number;
        private _distanceMin:number;
        private _speed:number;
        private _leftBorderPosition:number;
        private _rightBorder:number;
        private _scene:objects.Scene;

        constructor(scene:objects.Scene) {
            this._distanceMin = 400;
            this._distanceMax = 300;
            this._speed = 1;
            this._leftBorderPosition = 0;
            this._rightBorder = 0;
            this._scene = scene;
            this.buildings = new Array<objects.Building>();
            this.CreateNewBuldings();
        }

        Update(distance:number = this._speed):void {
            this._leftBorderPosition += this._speed;
            this.buildings.forEach(building => {
                building.Move(this._speed);
            });
            this.CreateNewBuldings();
        }

        CreateNewBuldings():void {
            while (this._rightBorder - this._leftBorderPosition < managers.SCREEN_WITH) {
                this._rightBorder += this._distanceMin + Math.floor(Math.random() * (this._distanceMax - this._distanceMin));
                let building = new objects.Building(Math.floor((Math.random() * 3) + 10), this._rightBorder - this._leftBorderPosition);
                this.buildings[this.buildings.length] = building;
                this._scene.addChild(building)
            }
        }

    }
}