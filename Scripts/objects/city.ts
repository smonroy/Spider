/**
 * Author: Sergio Monroy Escalante - 300930580
 * Date: Nov 11th, 2018
 * 
 * class used to manager the buildings, the clotheslines and the bonus
 */
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
        private _floorPrev:number;
        private _floorCurrent:number;

        // public variables
        public buildings:objects.Building[];
        public clothesLines:objects.Clothes[];
        public bonus:objects.Bonus[];

        constructor(scene:objects.Scene) {
            this._leftBorderPosition = 0;
            this._rightBorder = 0;
            this._floorMin = 10;
            this._scene = scene;
            this._buildingCount = 0;
            this.buildings = new Array<objects.Building>();
            this.clothesLines = new Array<objects.Clothes>();
            this.bonus = new Array<objects.Bonus>();
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
            for(let i:number = 0; i < this.bonus.length; i++) {
                this.bonus[i].Scroll(distance);
            }
            this.CheckBounderies();
        }

        CheckBounderies():void {
            while (this._rightBorder + this._leftBorderPosition < managers.SCREEN_WITH || this.buildings.length < this._NUM_BUILDINGS) {
                let separation = this._DISTANCE_MIN + Math.floor(Math.random() * (this._DISTANCE_MAX - this._DISTANCE_MIN));
                let previousBorder = this._rightBorder;
                this._rightBorder += separation;
                this._buildingCount++;
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
            this._floorPrev = this._floorCurrent;
            this._floorCurrent = Math.floor((Math.random() * 3) + this._floorMin);
            let position:number = this._rightBorder + this._leftBorderPosition;
            let found:boolean = false;

            // look for any available building
            for(let i:number = 0; i < this.buildings.length; i++) {
                if(!this.buildings[i].IsActive()) {
                    this.buildings[i].Reset(this._floorCurrent, position);
                    this._rightBorder += this.buildings[i].getBounds().width;
                    found = true
                    break;
                }
            }

            // create a new building
            if(!found) {
                let building = new objects.Building(this._floorCurrent, position);
                this.buildings[this.buildings.length] = building;
                this._rightBorder += building.getBounds().width;
                this._scene.addChild(building);
            }

            this._getBonus(position, this._floorCurrent);
        }

        private _getCloths(previousBorder:number, separation:number):void {
            let clothesProbability = 50 + this._buildingCount;
            if(Math.random() * 100 < clothesProbability) {
                let clothesHeightMax = managers.SCREEN_HEIGHT - (Math.min(this._floorCurrent, this._floorPrev) * managers.BLOCK_HEIGHT) + 36;
                let clothesHeightMin = managers.SCREEN_HEIGHT - (3 * managers.BLOCK_HEIGHT) + 36;
                let clothesHeight = (Math.random() * (clothesHeightMax - clothesHeightMin)) + clothesHeightMin;
                let found:boolean;
                if(this._buildingCount > 2) {
                    found = false;
                    for(let i:number = 0; i < this.clothesLines.length; i++) {
                        if(!this.clothesLines[i].IsActive()) {
                            this.clothesLines[i].Activate(previousBorder + this._leftBorderPosition, clothesHeight, separation);
                            found = true;
                            break;
                        }
                    }
    
                    if(!found) {                        
                        let clothes = new objects.Clothes(previousBorder + this._leftBorderPosition, clothesHeight, separation);
                        this.clothesLines[this.clothesLines.length] = clothes;
                        this._scene.addChild(clothes);
                    }
                }
            }
        }

        private _getBonus(position:number, floors:number):void {
            let bonusProbability = 30 + this._buildingCount;
            if(Math.random() * 100 < bonusProbability) {
                let floor = Math.floor((Math.random() * (floors - 4)) + 4);
                let column = Math.floor((Math.random() * 4) + 1); 
                let x = position + (column * 32) - 32 + 3;
                let y = managers.SCREEN_HEIGHT - ((floor - 1) * managers.BLOCK_HEIGHT) - 12;
                let found:boolean;
                if(this._buildingCount > 2) {
                    found = false;
                    for(let i:number = 0; i < this.bonus.length; i++) {
                        if(!this.bonus[i].IsActive()) {
                            this.bonus[i].Activate(x, y);
                            found = true;
                            break;
                        }
                    }
    
                    if(!found) {                        
                        let bonus = new objects.Bonus(x, y);
                        this.bonus[this.bonus.length] = bonus;
                        this._scene.addChild(bonus);
                    }
                }
            }
        }

        public CheckCollision():void {
            for(let clothes of this.clothesLines) {
                clothes.CheckCollision();
            }
            for(let bonus of this.bonus) {
                bonus.CheckCollision();
            }
        }

    }
}