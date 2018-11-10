var managers;
(function (managers) {
    class ScoreBoard {
        // contructor
        constructor(livesNum = 5, scoreNum = 0, highScoreNum = 0) {
            this.Start();
            this.Lives = livesNum;
            this.Score = scoreNum;
            this.HighScore = highScoreNum;
            this._bonus = new Array(5);
            for (let bonus of this._bonus) {
                bonus = false;
            }
        }
        get Score() {
            return this._score;
        }
        set Score(newValue) {
            this._score = Math.max(newValue, 0);
            this._scoreLabel.text = "Score: " + this._score;
            if (this._score > this._highScore) {
                this.HighScore = this._score;
            }
        }
        get Lives() {
            return this._lives;
        }
        set Lives(newValue) {
            this._lives = newValue;
            this._livesLabel.text = "Lives: " + this._lives;
        }
        get HighScore() {
            return this._highScore;
        }
        set HighScore(newValue) {
            this._highScore = newValue;
            this._highScoreLabel.text = "High Score: " + this._highScore;
        }
        GetBonus(bonusNum) {
            return this._bonus[bonusNum - 1];
        }
        SetBonus(bonusNum, newValue) {
            this._bonus[bonusNum - 1] = newValue;
            this._bonusImages[bonusNum - 1].alpha = newValue ? 1 : 0.3;
            this._bonusImages[bonusNum - 1].y = newValue ? 10 : 30;
            if (newValue) {
                for (let i = 1; i <= 5; i++) {
                    if (!this.GetBonus(i)) {
                        return;
                    }
                }
                this.Lives++;
                this.Score += 1000;
                for (let i = 1; i <= 5; i++) {
                    this.SetBonus(i, false);
                }
            }
        }
        // private methods
        // public methods
        Start() {
            this._scoreLabel = new objects.Label("Score: 99999", "30px", "Consolas", "#000000", 350, 10, false);
            this._livesLabel = new objects.Label("Lives: 99", "30px", "Consolas", "#000000", 20, 10, false);
            this._highScoreLabel = new objects.Label("High Score: 999999", "60px", "Consolas", "#FF0000", 20, 10, false);
            this._bonus = new Array(5);
            this._bonusImages = new Array();
            for (let i = 0; i <= 4; i++) {
                this._bonusImages[i] = new createjs.Bitmap(managers.Game.assetMnager.getResult("bonus" + (i + 1)));
                this._bonusImages[i].y = 30;
                this._bonusImages[i].x = 750 + (i * 50);
                this._bonusImages[i].alpha = 0.3;
                this._bonusImages[i].scaleX = 1.5;
                this._bonusImages[i].scaleY = 1.5;
                this._bonus[i] = false;
            }
        }
        AddGameUI(currentScene) {
            currentScene.addChild(this._scoreLabel);
            currentScene.addChild(this._livesLabel);
            for (let bonus of this._bonusImages) {
                currentScene.addChild(bonus);
            }
        }
        Reset(livesNum = 5, scoreNum = 0) {
            this.Lives = livesNum;
            this.Score = scoreNum;
            for (let i = 1; i <= 5; i++) {
                this.SetBonus(i, false);
            }
        }
        AddHighScore(currentScene) {
            currentScene.addChild(this._highScoreLabel);
        }
    }
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=scoreboard.js.map