module managers {
    export class ScoreBoard {
        private _score:number;
        private _lives:number;
        private _highScore:number;
    
        private _scoreLabel:objects.Label;
        private _livesLabel:objects.Label;
        private _highScoreLabel:objects.Label;    
        
        private _bonus:boolean[];
        private _bonusImages:createjs.Bitmap[];

        get Score():number {
            return this._score;
        }

        set Score(newValue:number) {
            this._score = Math.max(newValue, 0);
            this._scoreLabel.text = "Score: " + this._score;
            if(this._score > this._highScore) {
                this.HighScore = this._score;
            }
        }

        get Lives():number {
            return this._lives;
        }

        set Lives(newValue:number) {
            this._lives = newValue;
            this._livesLabel.text = "Lives: " + this._lives;
        }

        get HighScore():number {
            return this._highScore;
        }

        set HighScore(newValue:number) {
            this._highScore = newValue;
            this._highScoreLabel.text = "High Score: " + this._highScore;
        }

        public GetBonus(bonusNum:number):boolean {
            return this._bonus[bonusNum - 1];
        }

        public SetBonus(bonusNum:number, newValue:boolean) {
            this._bonus[bonusNum - 1] = newValue;
            this._bonusImages[bonusNum - 1].alpha = newValue ? 1 : 0.3;
            this._bonusImages[bonusNum - 1].y = newValue ? 10 : 30;
            if(newValue) {
                for (let i = 1; i <= 5; i++) {
                    if(!this.GetBonus(i)) {
                        return;
                    }
                }
                let sound = createjs.Sound.play("extraLifeSound");
                sound.volume = 1;
                this.Lives ++;
                this.Score += 1000;
                for (let i = 1; i <= 5; i++) {
                    this.SetBonus(i, false);
                }
            }
        }

        // contructor
        constructor(livesNum:number = 5, scoreNum:number = 0, highScoreNum:number = 0) {
            this.Start();
            this.Lives = livesNum;
            this.Score = scoreNum;
            this.HighScore = highScoreNum;
            this._bonus = new Array<boolean>(5);
            for(let bonus of this._bonus) {
                bonus = false;
            }
        }

        // private methods

        // public methods
        public Start():void {
            this._scoreLabel = new objects.Label("Score: 99999", "30px", "Consolas", "#000000", 350, 10, false);
            this._livesLabel = new objects.Label("Lives: 99", "30px", "Consolas", "#000000", 20, 10, false);
            this._highScoreLabel = new objects.Label("High Score: 999999", "60px", "Consolas", "#FF0000", 20, 10, false);
            this._bonus = new Array<boolean>(5);
            this._bonusImages = new Array<createjs.Bitmap>();
            for(let i = 0; i <= 4; i++) {
                this._bonusImages[i] = new createjs.Bitmap(managers.Game.assetMnager.getResult("bonus" + (i + 1)));
                this._bonusImages[i].y = 30;
                this._bonusImages[i].x = 750 + (i * 50);
                this._bonusImages[i].alpha = 0.3;
                this._bonusImages[i].scaleX = 1.5;
                this._bonusImages[i].scaleY = 1.5;
                this._bonus[i] = false;
            }
        }

        public AddGameUI(currentScene:objects.Scene):void {
            currentScene.addChild(this._scoreLabel);
            currentScene.addChild(this._livesLabel);
            for(let bonus of this._bonusImages) {
                currentScene.addChild(bonus);
            }
        }

        public Reset(livesNum:number = 5, scoreNum:number = 0):void {
            this.Lives = livesNum;
            this.Score = scoreNum;
            for(let i = 1; i <= 5; i++) {
                this.SetBonus(i, false);
            }
        }

        public AddHighScore(currentScene:objects.Scene):void {
            currentScene.addChild(this._highScoreLabel);
        }
    }
}