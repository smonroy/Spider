module managers {
    export class ScoreBoard {
        private _score:number;
        private _lives:number;
        private _highScore:number;
    
        private _scoreLabel:objects.Label;
        private _livesLabel:objects.Label;
        private _highScoreLabel:objects.Label;        

        get Score():number {
            return this._score;
        }

        set Score(newValue:number) {
            this._score = newValue;
            this._scoreLabel.text = "Score: " + this._score;
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

        // contructor
        constructor(livesNum:number = 5, scoreNum:number = 0, highScoreNum:number = 0) {
            this.Start();
            this.Lives = livesNum;
            this.Score = scoreNum;
            this.HighScore = highScoreNum;
            
        }

        // private methods

        // public methods
        public Start():void {
            this._scoreLabel = new objects.Label("Score: 99999", "30px", "Consolas", "#FFFF00", 350, 10, false);
            this._livesLabel = new objects.Label("Lives: 99", "30px", "Consolas", "#FFFF00", 20, 10, false);
            this._highScoreLabel = new objects.Label("High Score: 999999", "60px", "Consolas", "#FFFF00", 320, 140, true);
        }

        public AddGameUI(currentScene:objects.Scene):void {
            currentScene.addChild(this._scoreLabel);
            currentScene.addChild(this._livesLabel);
        }

        public Reset(livesNum:number = 5, scoreNum:number = 0):void {
            this.Lives = livesNum;
            this.Score = scoreNum;
        }

        public AddHighScore(currentScene:objects.Scene):void {
            currentScene.addChild(this._highScoreLabel);
        }
    }
}