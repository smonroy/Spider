/**
 * Author: Sergio Monroy Escalante - 300930580
 * Date: Nov 11th, 2018
 * 
 * This is the main player character, the spider
 */
module objects {
    export enum SpiderStatus {hanging, falling, rolling, dead}

    export class Spider extends objects.GameObject {
        public status:SpiderStatus;        // status of the spider

        // rigid body variables
        private _anchor:util.Vector2;       // anchor of the web
        private _anchorDistance:number;     // distance of the web
        private _velocity:util.Vector2;     // velocity of the spider
        private _rotateSpeed:number;          // rotation speed of the spider
        private _time:number;               // time variable to apply gravity

        // objects references
        private _web:objects.Web;
        private _scene:objects.Scene;

        // constants
        private _webMinDistance:number;     // when the spider pull his web, it stops in this distance
        private _webUpSpeed:number;         // when the spider pull his web, this is the speed to do it.

        // animation
        private _animationTime:number;
        private _animationIndex:number;
        
        // constructors
        constructor(scene:objects.Scene, x:number, y:number) {
            super("spider1");
            this.y = y;
            this.x = x;
            this._scene = scene;
            this.Start();
        }

        // public methods
        public Start():void {
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;
            this._webMinDistance = 30;
            this._webUpSpeed = 0.5;
            this._rotateSpeed = 0;
            this._velocity = new util.Vector2(0,0);
            this._time = Date.now();
            this._web = new objects.Web();
            this._scene.addChild(this._web);
            this.SetAnchor(new util.Vector2(this.x, 0));
            this._animationTime = Date.now() + 2000;
            this._animationIndex = 1;
       }

        public Update():void {

            if(managers.Game.scoreboard.Lives <= 0) {
                this.status = SpiderStatus.dead;
                this._velocity.y = 0;
                this._rotateSpeed = -15;
            }

            switch (this.status) {

                case SpiderStatus.falling: {
                    this._applyGravity() // apply the gravity
                }
                break;

                case SpiderStatus.hanging: {
                    // automaticaly pull the web
                    if(this._anchorDistance > this._webMinDistance) {
                        this._anchorDistance -= this._webUpSpeed;
                    }
        
                    // manual modificator to the web distance
                    if(managers.Input.isKeydown("ArrowUp") && this._anchorDistance > this._webMinDistance) {
                        this._anchorDistance -= this._webUpSpeed;
                    }
                    if(managers.Input.isKeydown("ArrowDown")) {
                        this._anchorDistance += this._webUpSpeed * 2;
                    }

                    this._applyGravity() // apply the gravity

                    // constraing movement due the web (tangent movement)
                    if(this.GetFutureAnchorDistance() > this._anchorDistance)  {
                        let teta:number = Math.atan2(this._anchor.x - this.x, this.y - this._anchor.y);
                        if(this._rotateSpeed == 0) {
                            this.rotation = teta * 180 / Math.PI;
                        }
                        let sin:number = Math.sin(teta);
                        let cos:number = Math.cos(teta);
                        let velocityTan:number = (this._velocity.y * sin) + (this._velocity.x * cos);
                        this._velocity.y = velocityTan * sin;
                        this._velocity.x = velocityTan * cos;
                    }

                    // pulling the web
                    if(this.GetAnchorDistance() > this._anchorDistance) {
                        let diff:util.Vector2 = util.Vector2.Subtract(this._anchor, new util.Vector2(this.x, this.y));
                        diff = util.Vector2.Normilize(diff);
                        this.x += diff.x;
                        this.y += diff.y; 
                    }

                    
                }
                break;

                case SpiderStatus.rolling: {
                    this._velocity.x *= 0.90;   // friction effect of the sidewalk
                    this.rotation = - this._velocity.x * 30;
                    if(Math.abs(this._velocity.x) < 0.01) {
                        if(this.x < this.Width) {
                            this.x = 100;
                        }
                        this.y = 150;
                        this.rotation = 0;
                        this.SetAnchor(new util.Vector2(this.x, 0));
                    }
                }
                break;
            }

            // applying the velocity
            this.y += this._velocity.y;
            this.x += this._velocity.x;

            // rotating the web
            if(this.status == SpiderStatus.hanging) {
                this._web.Rotate(new util.Vector2(this.x, this.y));
            }
            
            // applying rotation
            this.rotation += this._rotateSpeed;

            // check sidewalk collision
            this._chechSidewalkCollision();

            // animation
            this._animation();
        }

        private _applyGravity():void {
            this._velocity.y += managers.GRAVITY * (Date.now() - this._time) / 1000;
            this._time = Date.now();
        }

        private _chechSidewalkCollision(){
            if(this.y > managers.SCREEN_HEIGHT - 52) {
                this.y = managers.SCREEN_HEIGHT - 52;
                let sound = createjs.Sound.play("sidewalkSound");
                sound.volume = 0.1;
                this._velocity.y = 0;
                if(this.status != SpiderStatus.rolling) {
                    this._web.Reset();
                    this.status = SpiderStatus.rolling;
                    managers.Game.scoreboard.Lives--;
                    if(managers.Game.scoreboard.Lives <= 0) {
                        managers.Game.currentState = config.Scene.OVER;
                    }
                }
            }
        }

        public Reset() {

        }
        
        public Destroy() {

        }

        public SetAnchor(anchor:util.Vector2):void {
            this._anchor = anchor;
            this._anchorDistance = this.GetAnchorDistance();
            this._web.Move(anchor, new util.Vector2(this.x, this.y), this._anchorDistance);
            this._rotateSpeed = 0;
            this.status = SpiderStatus.hanging;
            this._velocity.y += managers.GRAVITY / 2;   // initial extra impulse
        }

        private GetAnchorDistance():number {
            return util.Vector2.Distance(new util.Vector2(this.x, this.y), this._anchor);
        }

        private GetFutureAnchorDistance():number {
            return util.Vector2.Distance(new util.Vector2(this.x + this._velocity.x , this.y + this._velocity.y), this._anchor);
        }

        public Scroll(distance:number):void {
            this._anchor.x -= distance;
            this.x -= distance;
            this._web.Scroll(distance);
        }

        public Clothes():void {
            this._rotateSpeed = 10;
            this.status = SpiderStatus.falling;
            this._web.Reset();
        }

        private _animation(){
            if(Date.now() > this._animationTime) {
                switch(this._animationIndex) {
                    case 1: {
                        this._animationIndex = 2;           
                        this.image = managers.Game.assetMnager.getResult("spider2") as HTMLImageElement;        
                        this._animationTime = Date.now() + 200;
                    }
                    break;
                    case 2: {
                        this._animationIndex = 3;           
                        this.image = managers.Game.assetMnager.getResult("spider1") as HTMLImageElement;        
                        this._animationTime = Date.now() + 2000;
                    }
                    break;
                    case 3: {
                        this._animationIndex = 4;
                        this.image = managers.Game.assetMnager.getResult("spider3") as HTMLImageElement;        
                        this._animationTime = Date.now() + 200;
                    }
                    break;
                    case 4: {
                        this._animationIndex = 1;           
                        this.image = managers.Game.assetMnager.getResult("spider1") as HTMLImageElement;        
                        this._animationTime = Date.now() + 2000;
                    }
                    break;
                }
            }
        }
    }
}