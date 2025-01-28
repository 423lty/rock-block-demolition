class ButtonStart{
    constructor(){
        this.button=document.querySelector('button');
        this.buttonAction();
    }
    buttonAction(){
        this.button.addEventListener('click',()=>this.startGame());  
    }
    startGame(){
        const countdownElement=document.createElement('div');
        document.querySelector('.game-clear').style.display='none';
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
        const ball=new Ball();
        const bar=new Bar();
        const block=new Blocks(ball);

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
        
        
        
        //イベントリスナー
        ball.resetPosition();
        bar.resetPosition();
        block.blockGenerate();

        console.log("Initializing game...");
        console.log("Ball:", document.querySelector(".ball"));
        console.log("Bar:", document.querySelector(".bar"));
        console.log("Blocks:", document.querySelectorAll(".block"));

        
        document.addEventListener('keydown',(event)=>bar.moveBar(event.key));
        ball.moveBall();
        block.collisionCheck();
    }
    reLoad(){
        location.reload();
    }

}

document.addEventListener('DOMContentLoaded',()=>{
    new ButtonStart();
});

// const button=new ButttonStart();
// button.buttonAction();
