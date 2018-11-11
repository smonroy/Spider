module scenes {
    export class Instructions extends objects.Scene{

        private _titleLabel:objects.Label;
        private _sideWalkLabel:objects.Label;
        private _building:objects.Building;
        private _anchorLabel:objects.Label;
        private _buildingLabel:objects.Label;
        private _clothes:objects.Clothes;
        private _clothesLabel:objects.Label;
        private _bonus:objects.Bonus;
        private _bonusLabel:objects.Label;
        private _sky:objects.Sky;
        private _spider:objects.Spider;
        private _sidewalk:objects.Sidewalk;
        private _menuButton:objects.Button;
        private _background:objects.Background[];
        

        constructor() {
            super();

            this.Start();
        }

        public Start():void {
            this._sky = new objects.Sky();
            this.addChild(this._sky);

            this._background = new Array<objects.Background>();

            this._background[0] = new objects.Background(0, 256, 0.5, 2, 1);
            this._background[1] = new objects.Background(4096, 256, 0.5, 2, 1);
            this._background[2] = new objects.Background(0, 384, 0.25, 1.5, 0.5);
            this._background[3] = new objects.Background(3072, 384, 0.25, 1.5, 0.5);

            for (let background of this._background) {
                this.addChild(background);
            }

            this._titleLabel = new objects.Label("Instructions", "60px", "Consolas", "#FF0000", managers.SCREEN_WITH/2, 80, true);
            this.addChild(this._titleLabel);

            this._building = new objects.Building(13, 100);
            this.addChild(this._building);

            this._spider = new objects.Spider(this, 50, 250);
            this.addChild(this._spider);

            this._spider.SetAnchor(new util.Vector2(170, 150));

            this._anchorLabel = new objects.Label("1.- Click the buildings to shoot a web and swing the spider or save her when is falling.", "22px", "Consolas", "#000000", 250, 150, false);
            this.addChild(this._anchorLabel);

            this._buildingLabel = new objects.Label("2.- Use up and down arrow keys to modify the length of the web.", "22px", "Consolas", "#000000", 250, 250, false);
            this.addChild(this._buildingLabel);

            this._clothes = new objects.Clothes(-150, 350, 250);
            this.addChild(this._clothes);

            this._clothesLabel = new objects.Label("3.- If the spider touch the clotheslines, the web will break and you will lose 90 points.", "22px", "Consolas", "#000000", 250, 350, false);
            this.addChild(this._clothesLabel);


            this._bonus = new objects.Bonus(103, 444);
            this.addChild(this._bonus);

            this._bonusLabel = new objects.Label("4.- Collect the 5 different happy faces to win an extra life. Each one score 20 points.", "22px", "Consolas", "#000000", 250, 450, false);
            this.addChild(this._bonusLabel);

            this._buildingLabel = new objects.Label("5.- Each building that leaves the left part of the screen score 100 points.", "22px", "Consolas", "#000000", 250, 550, false);
            this.addChild(this._buildingLabel);

            this._sidewalk = new objects.Sidewalk(0, 704, 1, 1, 1);
            this.addChild(this._sidewalk);

            this._sideWalkLabel = new objects.Label("6.- Be careful with the floor! If the spider touches it, will die.", "22px", "Consolas", "#000000", 250, 650, false);
            this.addChild(this._sideWalkLabel);




            this._menuButton = new objects.Button("mainMenuButton", 920, 660, true);
            this.addChild(this._menuButton);

            this._menuButton.on("click", ()=>{
                managers.Game.currentState = config.Scene.START;
            });
        };

        public Update():void {
            // this._sky.Update();
            // this._spider.Update();
            // this._sidewalk.Scroll(1);
            // for (let background of this._background) {
            //     background.Scroll(1);
            // }
        };

        public Destroy():void {
            this.removeAllChildren();
        };

        public Reset():void {

        };

        public Main():void {
            
        };
    }
}