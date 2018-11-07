module scenes {
    export class Play extends objects.Scene{

        private _city:objects.City;
        private _building:objects.Building;
        private _spider:objects.Spider;
        // private _engineSound:createjs.AbstractSoundInstance;

        constructor() {
            super();

            this.Start();
        }

        public Start():void {
            this.Main();
        };

        public Update():void {
            if(!this._spider.IsAnchor()) {
                this._spider.SetAnchor(new util.Vector2(100, 0));
            }

            this._spider.Update();
            let diff = Math.floor(this._spider.x - managers.SCROLL_TRIGER);
            if(diff > 0) {
                this._city.Scroll(diff);
                this._spider.Scroll(diff);
            }


            // managers.Collision.Check(this._player, this._island);

            // for (let cloud of this._clouds) {
            //     cloud.Update();
            //     managers.Collision.Check(this._player, cloud);
            // }

        };

        public Destroy():void {
            this.removeAllChildren();
            // this._engineSound.stop();
        };

        public Reset():void {

        };

        public Main():void {

            this._city = new objects.City(this);
            this._spider = new objects.Spider(100, 100);
            managers.Game.player = this._spider;
            this.addChild(this._spider);


            // this._engineSound = createjs.Sound.play("engineSound");
            // this._engineSound.volume = 0.1;
            // this._engineSound.loop = 1;

            managers.Game.scoreboard.AddGameUI(this);
        };

        // public ShootWeb(x: number, y:number):void {
        //     console.log(x + ", " + y);
        // }
    }
}