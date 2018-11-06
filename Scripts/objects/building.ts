module objects {
    export class Building extends createjs.Bitmap {
//        private _position:number;
//        private _blockNum:number;
//        public blocks:createjs.Bitmap[];

        public floors:number;

        constructor(floors:number, position:number) {
            super(managers.Game.assetMnager.getResult("building2"));
            this.floors = floors;
            this.x = position;
            this.y = managers.SCREEN_HEIGHT - (this.floors * managers.BLOCK_HEIGHT);

            this.Start();
        }

        public Reset(): void {

        }

        public Start(): void {

        }

        public Update(): void {

        }

        public Destroy(): void {

        }

        public Move(distance:number) {
            this.x -= distance;
        }
    }
}