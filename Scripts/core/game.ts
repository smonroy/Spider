// IIFE - Immediately Invoked Function Expression
(function(){
    // game variables
    let canvas:HTMLCanvasElement;
    let stage:createjs.Stage;
    let assetManager:createjs.LoadQueue;

    let currentScene:objects.Scene;
    let currentState:config.Scene;
    let scoreBoard:managers.ScoreBoard;

    let assetManifest = [
        {id:"playButton", src:"./Assets/Images/button_play.png"},
        {id:"instructionsButton", src:"./Assets/Images/button_instructions.png"},
        {id:"exitButton", src:"./Assets/Images/button_exit.png"},
        {id:"mainMenuButton", src:"./Assets/Images/button_main-menu.png"},
        {id:"playAgainButton", src:"./Assets/Images/button_play-again.png"},
        {id:"building", src:"./Assets/Images/Building.png"},
        {id:"spider1", src:"./Assets/Images/Spider1.png"},
        {id:"spider2", src:"./Assets/Images/Spider2.png"},
        {id:"spider3", src:"./Assets/Images/Spider3.png"},
        {id:"sky", src:"./Assets/Images/Sky.png"},
        {id:"webLine", src:"./Assets/Images/WebLine.png"},
        {id:"cityBackground", src:"./Assets/Images/City.png"},
        {id:"sidewalk", src:"./Assets/Images/SideWalk.png"},
        {id:"clothes", src:"./Assets/Images/Clothes.png"},
        {id:"bonus1", src:"./Assets/Images/bonus1.png"},
        {id:"bonus2", src:"./Assets/Images/bonus2.png"},
        {id:"bonus3", src:"./Assets/Images/bonus3.png"},
        {id:"bonus4", src:"./Assets/Images/bonus4.png"},
        {id:"bonus5", src:"./Assets/Images/bonus5.png"},
        {id:"engineSound", src:"./Assets/audio/engine.ogg"},
        {id:"thunderSound", src:"./Assets/audio/thunder.ogg"},
        {id:"yaySound", src:"./Assets/audio/yay.ogg"},
        {id:"bulletSound", src:"./Assets/audio/bullet.mp3"},
        {id:"explosionSound", src:"./Assets/audio/explosion.mp3"},
    ];

    function Init():void {
        assetManager = new createjs.LoadQueue();
        managers.Game.assetMnager = assetManager;
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start);

    }

    function Start():void {
        console.log(`%c Game Somewhat 3 Started`, "color:blue; font-size: 20px;");
        canvas = document.getElementsByTagName("canvas")[0];
        stage = new createjs.Stage(canvas);
        managers.Game.stage = stage;
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60; // game will run at 60fps
        createjs.Ticker.on("tick", Update);

        currentState = config.Scene.START;
        managers.Game.currentState = currentState;
        
        document.addEventListener("keydown", (event) => {
            managers.Input.HandleInput(event);
        })
        document.addEventListener("keyup", (event) => {
            managers.Input.HandleUpInput(event);
        })

        scoreBoard = new managers.ScoreBoard();
        managers.Game.scoreboard = scoreBoard;
        Main();
    }

    // this is the game loop
    function Update():void {
        currentScene.Update();

        if(currentState != managers.Game.currentState) {
            currentState = managers.Game.currentState;
            Main();
        }

        stage.update();
    }

    function Main():void {

        if(currentScene) {
            currentScene.Destroy();
            stage.removeAllChildren();
        }

        switch(currentState) {
            case config.Scene.START:
            currentScene = new scenes.Start();
            break;
            case config.Scene.PLAY:
            currentScene = new scenes.Play();
            break;
            case config.Scene.OVER:
            currentScene = new scenes.Over();
            break;
            case config.Scene.INSTRUCTIONS:
            currentScene = new scenes.Instructions();
            break;
            case config.Scene.ABOUT:
            currentScene = new scenes.About();
            break;
        }
        managers.Game.currentScene = currentScene;

        stage.addChild(currentScene);
    }

    window.addEventListener("load", Init);
})();