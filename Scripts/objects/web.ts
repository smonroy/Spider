module objects {
    export class Web extends objects.GameObject {
        private _point1:util.Vector2;
        private _point2:util.Vector2;
        private _distance:number;

        constructor(anchor:util.Vector2, spider:util.Vector2, distance:number) {
            super("webLine");
            this._point1 = anchor;
            this._point2 = spider;
            this._distance = distance;
            this.Start();
        }


        // public methods
        public Reset():void {
            this.x = this._point1.x;
            this.y = this._point1.y;
            let teta:number = Math.atan2(this._point1.x - this._point2.x, this._point2.y - this._point1.y);
            this.rotation = (teta * 180 / Math.PI) + 90;
            this.scaleX = util.Vector2.Distance(this._point1, this._point2) / this.Width;
        }

        public Start():void {
            this.Reset();
        }

        public Update():void {
        }

        public Destroy():void {
            
        }

        public Rotate(spider:util.Vector2):void {
            this._point2 = spider;
            this.Reset();
        }

        public Move(anchor:util.Vector2, spider:util.Vector2, distance:number):void {
            this._point1 = anchor;
            this._point2 = spider;
            this._distance = distance;
            this.Reset();
        }

        public Scroll(distance:number):void {
            this.x -= distance;
        }
    }
}