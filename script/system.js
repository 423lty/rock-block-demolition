class System{
    constructor(){
        this.$gameOver=document.querySelector('.game-over');
        // console.log(this.$gameOver);
    }

    gameOverProcess(){
        const ball=document.querySelector('.ball');
        const ballRect=ball.getBoundingClientRect();
        console.log(ballRect);
    }
}

const syetem=new System();
syetem.gameOverProcess();
