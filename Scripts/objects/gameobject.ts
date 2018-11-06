module objects {
    export abstract class GameObject extends createjs.Bitmap {
        // private instance variables
        private _with:number;
        private _height:number;
        private _halfWidth:number;
        private _halfHeight:number;
        private _position:util.Vector2;
        private _isColliding:boolean;

        // public properties
        get IsColliding():boolean {
            return this._isColliding;
        }

        set IsColliding(value:boolean){
            this._isColliding = value;
        }

        get Width():number {
            return this._with;
        }

        set Width(newValue:number) {
            this._with = newValue;
            this.HalfWidth = this._with *.5;
        }

        get Height():number {
            return this._height;
        }

        set Height(newValue:number) {
            this._height = newValue;
            this.HalfHeight = this._height *.5;
        }

        get HalfWidth():number {
            return this._halfWidth;
        }

        set HalfWidth(newValue:number) {
            this._halfWidth = newValue;
        }

        get HalfHeight():number {
            return this._halfHeight;
        }

        set HalfHeight(newValue:number) {
            this._halfHeight = newValue;
        }

        get Position():util.Vector2 {
            return this._position;
        }

        set Position(vec:util.Vector2) {
            this._position = vec;
        }

        protected _updatePosition():void {
            this._position.x = this.x;
            this._position.y = this.y;
        }



        // constructors
        constructor(imageString:string) {
           super(managers.Game.assetMnager.getResult(imageString));
           this.name = imageString;
           this._initialize();
        }

       // private methods
       private _initialize():void {
            this.Width = this.getBounds().width;
            this.Height = this.getBounds().height;
            this.Position = new util.Vector2(this.x, this.y);
       }

       // public methods
       public abstract Reset():void;

       public abstract Start():void;

       public abstract Update():void;

       public abstract Destroy():void;
    
          
    }
 
}