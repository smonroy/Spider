var managers;
(function (managers) {
    class Collision {
        static Check(object1, object2) {
            if (!object2.IsColliding) {
                if (util.Vector2.Distance(object1.Position, object2.Position) < (object1.HalfHeight + object2.HalfHeight)) {
                    object2.IsColliding = true;
                    console.log("collision with " + object2.name);
                    switch (object2.name) {
                        case "island":
                            let yaySound = createjs.Sound.play("yaySound");
                            yaySound.volume = 0.1;
                            managers.Game.scoreboard.Score += 100;
                            break;
                        case "enemy":
                            let explosionSound = createjs.Sound.play("explosionSound");
                            explosionSound.volume = 0.1;
                            managers.Game.scoreboard.Lives -= 1;
                            break;
                        case "cloud":
                            let thunderSound = createjs.Sound.play("thunderSound");
                            thunderSound.volume = 0.1;
                            managers.Game.scoreboard.Lives -= 1;
                            break;
                    }
                    if (managers.Game.scoreboard.Lives <= 0) {
                        managers.Game.currentState = config.Scene.OVER;
                        if (managers.Game.scoreboard.HighScore <= managers.Game.scoreboard.Score) {
                            managers.Game.scoreboard.HighScore = managers.Game.scoreboard.Score;
                        }
                    }
                }
            }
        }
    }
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map