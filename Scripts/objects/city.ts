module objects {
    export class City {
        public buildings:objects.Building[];
        private _distanceMax:number;
        private _distanceMin:number;
        private _leftBorderPosition:number;
        private _rightBorder:number;
        private _scene:objects.Scene;

        constructor(scene:objects.Scene) {
            this._distanceMin = 400;
            this._distanceMax = 300;
            this._leftBorderPosition = 0;
            this._rightBorder = 0;
            this._scene = scene;
            this.buildings = new Array<objects.Building>();
            this.GetNewBuldings();
        }

        Scroll(distance:number):void {
            this._leftBorderPosition -= distance;
            for(let i:number = 0; i < this.buildings.length; i++) {
                this.buildings[i].Scroll(distance);
            }
            this.GetNewBuldings();
        }

        GetNewBuldings():void {
            while (this._rightBorder + this._leftBorderPosition < managers.SCREEN_WITH) {
                this._rightBorder += this._distanceMin + Math.floor(Math.random() * (this._distanceMax - this._distanceMin));
                let floors:number = Math.floor((Math.random() * 3) + 10);
                let position:number = this._rightBorder + this._leftBorderPosition;
                let found:boolean = false
                for(let i:number = 0; i < this.buildings.length; i++) {
                    if(!this.buildings[i].IsActive()) {
                        this.buildings[i].Reset(floors, position);
                        found = true
                        break;
                    }
                }
                if(!found) {
                    let building = new objects.Building(floors, position);
                    this.buildings[this.buildings.length] = building;
                    this._scene.addChild(building);
                }
            }
        }

        IsInBuilding(x:number, y:number):boolean {
            return false;
        }

    }
}