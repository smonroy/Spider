/**
 * Author: Sergio Monroy Escalante - 300930580
 * Date: Nov 11th, 2018
 *
 * Background imagen of the game
 */
var objects;
(function (objects) {
    class Sky extends objects.GameObject {
        constructor() {
            super("sky");
            this.x = 0;
            this.y = 0;
        }
        Reset() {
        }
        Start() {
        }
        Update() {
        }
        Destroy() {
        }
    }
    objects.Sky = Sky;
})(objects || (objects = {}));
//# sourceMappingURL=sky.js.map