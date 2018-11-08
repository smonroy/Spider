module objects {
    export class City {
        // Constants
        private _DISTANCE_MAX:number = 300;
        private _DISTANCE_MIN:number = 200;
        private _NUM_BUILDINGS:number = 10;
        private _BUILDINGDS_FLOOR_DECRESE:number = 30;
        
        // private
        private _leftBorderPosition:number;
        private _rightBorder:number;
        private _floorMin:number;
        private _scene:objects.Scene;
        private _buildingCount:number;

        // public variables
        public buildings:objects.Building[];
        public clothesLines:objects.Clothes[];

        constructor(scene:objects.Scene) {
            this._leftBorderPosition = 0;
            this._rightBorder = 0;
            this._floorMin = 10;
            this._scene = scene;
            this._buildingCount = 0;
            this.buildings = new Array<objects.Building>();
            this.clothesLines = new Array<objects.Clothes>();
            this.CheckBounderies();
        }

        Scroll(distance:number):void {
            this._leftBorderPosition -= distance;
            for(let i:number = 0; i < this.buildings.length; i++) {
                this.buildings[i].Scroll(distance);
            }
            for(let i:number = 0; i < this.clothesLines.length; i++) {
                this.clothesLines[i].Scroll(distance);
            }
            this.CheckBounderies();
        }

        CheckBounderies():void {
            while (this._rightBorder + this._leftBorderPosition < managers.SCREEN_WITH || this.buildings.length < this._NUM_BUILDINGS) {
                let separation = this._DISTANCE_MIN + Math.floor(Math.random() * (this._DISTANCE_MAX - this._DISTANCE_MIN));
                let previousBorder = this._rightBorder;
                this._rightBorder += separation;
                this._buildingCount++;
                console.log(this._buildingCount + ", " + this._floorMin, ", clothes:" + this.clothesLines.length);
                if(this._buildingCount % this._BUILDINGDS_FLOOR_DECRESE == 0) {
                    if(this._floorMin > 5) {
                        this._floorMin -= 1;
                    }
                }
                this._getBuilding();
                this._getCloths(previousBorder, separation);
            }
        }


        private _getBuilding():void {
            let floors:number = Math.floor((Math.random() * 3) + this._floorMin);
            let position:number = this._rightBorder + this._leftBorderPosition;
            let found:boolean = false;

            // look for any available building
            for(let i:number = 0; i < this.buildings.length; i++) {
                if(!this.buildings[i].IsActive()) {
                    this.buildings[i].Reset(floors, position);
                    this._rightBorder += this.buildings[i].getBounds().width;
                    found = true
                    break;
                }
            }

            // create a new building
            if(!found) {
                let building = new objects.Building(floors, position);
                this.buildings[this.buildings.length] = building;
                this._rightBorder += building.getBounds().width;
                this._scene.addChild(building);
            }
        }

        private _getCloths(previousBorder:number, separation:number):void {
            let clotheHeight = Math.floor((Math.random() * 400) + 300);
            let found:boolean;
            if(this._buildingCount > 2) {
                found = false;
                for(let i:number = 0; i < this.clothesLines.length; i++) {
                    if(!this.clothesLines[i].IsActive()) {
                        this.clothesLines[i].Activate(previousBorder + this._leftBorderPosition, clotheHeight, separation);
                        found = true;
                        break;
                    }
                }

                if(!found) {                        
                    let clothes = new objects.Clothes(previousBorder + this._leftBorderPosition, clotheHeight, separation);
                    this.clothesLines[this.clothesLines.length] = clothes;
                    this._scene.addChild(clothes);
                }
            }
        }

        IsInBuilding(x:number, y:number):boolean {
            return false;
        }

    }
}