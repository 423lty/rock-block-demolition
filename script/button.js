class ButttonStart{
    constructor(){
        this.button=document.querySelector('button');
        this.buttonAction();
    }
    buttonAction(){
        this.button.addEventListener('click',()=>this.startGame());  
    }
    startGame(){
        const countdownElement=document.createElement('div');
        countdownElement.classList.add('countdown');
        countdownElement.style.position='absolute';
        countdownElement.style.top='50%';
        countdownElement.style.left='50%';
        countdownElement.style.transform='translate(-50%,-50%)';
        countdownElement.style.fontSize='7rem';
        countdownElement.style.color='white';
        this.button.disabled=true;
        this.button.appendChild(countdownElement);

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
        const block=new Blocks();

        if (!document.querySelector(".ball")) {
            console.error("Ball is not created before starting the game.");
            return;
        }
        
        if (!document.querySelector(".bar")) {
            console.error("Bar is not created before starting the game.");
            return;
        }
        
        if (!document.querySelector(".inner")) {
            console.error("Block container is not available.");
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
    new ButttonStart();
});

// const button=new ButttonStart();
// button.buttonAction();
