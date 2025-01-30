class ButtonStart{
    constructor(){
        this.button=document.querySelector('button');
        this.buttonAction();
        this.ball;
    }
    buttonAction(){
        this.button.addEventListener('click',()=>this.startGame());  
    }
    startGame(){
        this.ball=new Ball();
        const countdownElement=document.createElement('div');
        const gameOver=document.querySelector(".game-over");
        if(gameOver){
            gameOver.style.setPrp='none';
        }
        document.querySelector(".game-over").style.display="none";

        countdownElement.classList.add('countdown');

        this.button.disabled=true;
        document.body.appendChild(countdownElement);

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
        const bar=new Bar();
        const block=new Blocks(this.ball);

        if (!document.querySelector(".inner")) {
            console.error("Block container is not available.");
            return;
        }
        if (!document.querySelector(".bar")) {
            console.error("Bar is not created before starting the game.");
            return;
        }
        if (!document.querySelector(".ball")) {
            console.error("Ball is not created before starting the game.");
            return;
        }
        
        console.log("Initializing game...");
        console.log("Ball:", document.querySelector(".ball"));
        console.log("Bar:", document.querySelector(".bar"));
        console.log("Blocks:", document.querySelectorAll(".block"));

        
        document.addEventListener('keydown',(event)=>bar.moveBar(event.key));
        this.ball.gameStart();
        block.collisionCheck();

    }
    reLoad(){
        location.reload();
    }

}

document.addEventListener('DOMContentLoaded',()=>{
    new ButtonStart();
});

