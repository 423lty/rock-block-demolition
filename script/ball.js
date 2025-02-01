class Ball{
    constructor(){
        //ゲームインナーの初期化
        this.inner=document.querySelector(".inner");
        this.innerRect=this.inner.getBoundingClientRect();
        
        // 以前に存在するボールを削除
        this.createBallElement();

        // それぞれのスタイルの取得
        this.ball=document.querySelector(".ball");

        this.blocks=document.querySelectorAll(".block");
        this.ball.style.display="block";
        
        // 位置の初期化
        this.x;
        this.y;
        this.ballSpeedX;
        this.ballSpeedY;
        this.MaxBallSpeed=1.0;    
        this.MinBallSpeed=.25;    
        this.isMoveFlg=false;
        this.gameClearFlg=false;    
        
        this.resetBall();
    }

    moveBall(){

        if(!this.isMoveFlg)
            return;

        this.x+=this.ballSpeedX;
        this.y+=this.ballSpeedY;
        this.ball.style.left=this.x+"px";
        this.ball.style.top=this.y+"px";

        //壁との衝突判定
        if(this.x<=this.ball.offsetWidth/4 || this.x>=this.innerRect.width-this.ball.offsetWidth/4){
            this.ballSpeedX*=-1;
        }
        if(this.y<=0){
            this.ballSpeedY*=-1;
        }
        if(this.y>=this.innerRect.height-this.ball.offsetHeight&&!this.gameClearFlg){
            const gameOver=document.querySelector(".game-over");
            gameOver.style.cssText="display:block !important";
            this.ball.style.display="none";
            this.gameStop();
            return;
        }

        //パドルとの衝突判定
        let ballRect=this.ball.getBoundingClientRect();
        let bar=document.querySelector(".bar");
        let barRect=bar.getBoundingClientRect();
        if( ballRect.bottom>=barRect.top&&
            ballRect.top<=barRect.bottom&&
            ballRect.right>=barRect.left&&
            ballRect.left<=barRect.right){
                this.ballSpeedY*=-1;
            }

        
        //アニメーションをする
        requestAnimationFrame(()=>this.moveBall());
    }

    gameStart(){
        this.isMoveFlg=true;
        this.moveBall();
    }

    gameStop(){
        this.isMoveFlg=false;
    }

    createBallElement(){
        const ball=document.querySelector(".ball");
        if(ball){
            ball.remove();
        }
        const newBall=document.createElement("div");
        newBall.classList.add("ball");
        this.inner.appendChild(newBall);
    }

    gameClearFlgOn(){
        this.gameClearFlg=true;
    }

    resetBall(){
        this.ball.style.display="block";
        this.x=this.inner.offsetWidth/2-this.ball.offsetWidth/2;
        this.y=(this.inner.offsetHeight*2)/3;
        this.ballSpeedX=this.getRandomFloat(this.MinBallSpeed,this.MaxBallSpeed)*this.getNagative();
        this.ballSpeedY=this.getRandomFloat(this.MinBallSpeed,this.MaxBallSpeed);
        this.ball.style.left=this.x+"px";
        this.ball.style.top=this.y+"px";
    }
    
    reflectY(){
        this.ballSpeedY*=-1;
    }

    getRandomFloat(min=-1,max=-1){
        return Math.random()*(max-min)+min;
    }
    getNagative(){
        return Math.random()<.5?-1:1;
    }
}
