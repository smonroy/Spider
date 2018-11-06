var objects;
(function (objects) {
    class GameObject extends createjs.Bitmap {
        // constructors
        constructor(imageString) {
            super(managers.Game.assetMnager.getResult(imageString));
            this.name = imageString;
            this._initialize();
        }
        // public properties
        get IsColliding() {
            return this._isColliding;
        }
        set IsColliding(value) {
            this._isColliding = value;
        }
        get Width() {
            return this._with;
        }
        set Width(newValue) {
            this._with = newValue;
            this.HalfWidth = this._with * .5;
        }
        get Height() {
            return this._height;
        }
        set Height(newValue) {
            this._height = newValue;
            this.HalfHeight = this._height * .5;
        }
        get HalfWidth() {
            return this._halfWidth;
        }
        set HalfWidth(newValue) {
            this._halfWidth = newValue;
        }
        get HalfHeight() {
            return this._halfHeight;
        }
        set HalfHeight(newValue) {
            this._halfHeight = newValue;
        }
        get Position() {
            return this._position;
        }
        set Position(vec) {
            this._position = vec;
        }
        _updatePosition() {
            this._position.x = this.x;
            this._position.y = this.y;
        }
        // private methods
        _initialize() {
            this.Width = this.getBounds().width;
            this.Height = this.getBounds().height;
            this.Position = new util.Vector2(this.x, this.y);
        }
    }
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map