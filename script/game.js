class Game{
    constructor(){
        this.button=document.querySelector('button');
        this.buttonAction();
        this.ball;
        this.bar;
    }
    buttonAction(){
        this.button.addEventListener('click',()=>this.startGame());  
    }
    startGame(){
        this.ball=new Ball();
        this.bar=new Bar();
        const countdownElement=document.createElement('div');
        countdownElement.classList.add('countdown');
        document.body.appendChild(countdownElement);

        this.gameMessageReset();

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
                this.startMainGame();
            }
        }
        ,1000);
    }   
    startMainGame(){
        
        //インスタンス
        const block=new Blocks(this.ball);

        //インスタンスメッセージ
        this.InstanceMessage();

        // バーを動かせるようにする
        this.bar.setMoveFlgOn();

        //ゲーム関数
        document.addEventListener('keydown',(event)=>this.bar.moveBar(event.key));
        this.ball.gameStart();
        block.collisionCheck();

    }
    gameMessageReset(){
        const gameOver=document.querySelector(".game-over");
        const gameClear=document.querySelector(".game-clear");
        if(gameOver.style.display==='block')
            gameOver.style.cssText='diplay:none !important';
        if(gameClear.style.display==='block')
            gameClear.style.cssText='diplay:none !important';
    }
    InstanceMessage(){
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

document.addEventListener('DOMContentLoaded',()=>{
    new Game();
});

