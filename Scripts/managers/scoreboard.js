var managers;
(function (managers) {
    class ScoreBoard {
        // contructor
        constructor(livesNum = 5, scoreNum = 0, highScoreNum = 0) {
            this.Start();
            this.Lives = livesNum;
            this.Score = scoreNum;
            this.HighScore = highScoreNum;
        }
        get Score() {
            return this._score;
        }
        set Score(newValue) {
            this._score = newValue;
            this._scoreLabel.text = "Score: " + this._score;
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
        // private methods
        // public methods
        Start() {
            this._scoreLabel = new objects.Label("Score: 99999", "30px", "Consolas", "#000000", 350, 10, false);
            this._livesLabel = new objects.Label("Lives: 99", "30px", "Consolas", "#000000", 20, 10, false);
            this._highScoreLabel = new objects.Label("High Score: 999999", "60px", "Consolas", "#FFFF00", 320, 140, true);
        }
        AddGameUI(currentScene) {
            currentScene.addChild(this._scoreLabel);
            currentScene.addChild(this._livesLabel);
        }
        Reset(livesNum = 5, scoreNum = 0) {
            this.Lives = livesNum;
            this.Score = scoreNum;
        }
        AddHighScore(currentScene) {
            currentScene.addChild(this._highScoreLabel);
        }
    }
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=scoreboard.js.map