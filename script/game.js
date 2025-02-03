class Game{

    #ball;
    #blocks;
    #bar;
    #interval=1000;

    /**
     * コンストラクタ
     */
    constructor(){
        this.button=document.querySelector('button');
        this.buttonAction();
    }
    /**
     * ボタンを押した時の処理
     */
    buttonAction(){
        this.button.addEventListener('click',()=>this.#startGame());  
    }
    /**
     * ゲームスタート
     */
    #startGame(){

        //インスタンス
        this.#ball = Ball.getBallInstance();
        this.#ball.resetBall();
        this.#bar = new Bar();
        this.#blocks=new Blocks(this.#ball);

        const countdownElement=document.createElement('div');
        countdownElement.classList.add('countdown');
        document.body.appendChild(countdownElement);

        this.#gameMessageReset();
        
        this.button.disabled=true;
        
        let count=3;
        countdownElement.textContent=count; 

        const coundownInterval=setInterval(()=>{
            count--;
            if(count>0){
                countdownElement.textContent=count;
            }
            else{
                clearInterval(coundownInterval);
                countdownElement.remove();
                this.button.disabled=false;
                this.#startMainGame();
            }
        }
        ,this.#interval);
    }   
    /**
     * メインゲーム
    */
   #startMainGame(){
       //インスタンスメッセージ
    //    this.#ball = Ball.getBallInstance();
    //    this.#ball.resetBall();
    //    this.#bar = new Bar();
    //    this.#blocks=new Blocks(this.#ball);
       this.#InstanceMessage();
       
       // バーを動かせるようにする
       this.#bar.setMoveFlgOn();
       
       //ゲーム関数
       document.addEventListener('keydown',(event)=>this.#bar.moveBar(event.key));
        this.#ball.gameStart();
        this.#blocks.collisionCheck();
    }
    /**
     * ゲームメッセージのリセット
     */
    #gameMessageReset(){
        const gameOver=document.querySelector(".game-over");
        const gameClear=document.querySelector(".game-clear");
        if(gameOver.style.display==='block')
            gameOver.style.cssText='diplay:none !important';
        if(gameClear.style.display==='block')
            gameClear.style.cssText='diplay:none !important';
    }
    /**
     * インスタンスを生成した時のメッセージ
     * @returns 強制終了
     */
    #InstanceMessage(){
        if (!document.querySelector(".inner")) {
            console.error("Block area is not created before starting the game.");
            return;
        }
        if (!document.querySelector(".bar")) {
            console.error("Bar area is not created before starting the game.");
            return;
        }
        if (!document.querySelector(".ball")) {
            console.error("Ball area is not created before starting the game.");
            return;
        }
        
        console.log("Initializing game...");
        console.log("Ball:", document.querySelector(".ball"));
        console.log("Bar:", document.querySelector(".bar"));
        console.log("Blocks:", document.querySelectorAll(".block"));
    }

}

/**
 * クラスの生成
 */
document.addEventListener('DOMContentLoaded',()=>{
    new Game();
});

