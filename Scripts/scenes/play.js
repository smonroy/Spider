var scenes;
(function (scenes) {
    class Play extends objects.Scene {
        // private _island:objects.Island;
        // private _clouds:objects.Clound[];
        // private _cloudNum:number;
        // private _engineSound:createjs.AbstractSoundInstance;
        constructor() {
            super();
            // this._cloudNum = 3;
            // this._clouds = new Array<objects.Clound>();
            // for (let i = 0; i < this._cloudNum; i++) {
            //     this._clouds[i] = new objects.Clound();
            // }
            this.Start();
        }
        Start() {
            this.Main();
        }
        ;
        Update() {
            this._city.Update();
            // this._ocean.Update();
            // this._player.Update();
            // this._island.Update();
            // managers.Collision.Check(this._player, this._island);
            // for (let cloud of this._clouds) {
            //     cloud.Update();
            //     managers.Collision.Check(this._player, cloud);
            // }
        }
        ;
        Destroy() {
            this.removeAllChildren();
            // this._engineSound.stop();
        }
        ;
        Reset() {
        }
        ;
        Main() {
            // this._ocean = new objects.Ocean();
            // this.addChild(this._ocean);
            // this._island = new objects.Island();
            // this.addChild(this._island);
            // this._player = new objects.Player();
            // this.addChild(this._player);   
            // for (let cloud of this._clouds) {
            //     this.addChild(cloud); 
            // }  
            // this._building = new objects.Building(10, 300);
            // this.addChild(this._building);
            this._city = new objects.City(this);
            // this._engineSound = createjs.Sound.play("engineSound");
            // this._engineSound.volume = 0.1;
            // this._engineSound.loop = 1;
            managers.Game.scoreboard.AddGameUI(this);
        }
        ;
    }
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map