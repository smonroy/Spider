var util;
(function (util) {
    class Vector2 extends createjs.Point {
        // private
        // public
        // contructor
        constructor(x = 0, y = 0) {
            super(x, y);
        }
        // private M
        // public M
        /**
         *
         *
         * @static
         * @param {util.Vector2} vec1
         * @param {util.Vector2} vec2
         * @returns {number}
         * @memberof Vector2
         */
        static Distance(vec1, vec2) {
            return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
        }
        static Normilize(vec) {
            return util.Vector2.Divide(vec, util.Vector2.Distance(util.Vector2.zero(), vec));
        }
        /**
         *
         *
         * @static
         * @param {util.Vector2} vec1
         * @param {util.Vector2} vec2
         * @returns {util.Vector2}
         * @memberof Vector2
         */
        static Add(vec1, vec2) {
            let result = new util.Vector2(vec1.x + vec2.x, vec1.y + vec2.y);
            return result;
        }
        static Subtract(vec1, vec2) {
            let result = new util.Vector2(vec1.x - vec2.x, vec1.y - vec2.y);
            return result;
        }
        static Multiply(vec1, scalar) {
            let result = new util.Vector2(vec1.x * scalar, vec1.y * scalar);
            return result;
        }
        static Divide(vec1, scalar) {
            let result = new util.Vector2(vec1.x / scalar, vec1.y / scalar);
            return result;
        }
        static up() {
            return new Vector2(0, -1);
        }
        static down() {
            return new Vector2(0, 1);
        }
        static right() {
            return new Vector2(1, 0);
        }
        static left() {
            return new Vector2(-1, 0);
        }
        static zero() {
            return new Vector2(0, 0);
        }
    }
    util.Vector2 = Vector2;
})(util || (util = {}));
//# sourceMappingURL=vector2.js.map