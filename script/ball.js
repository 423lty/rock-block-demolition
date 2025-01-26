class Ball {
    constructor(){
        
        // それぞれのスタイルの取得
        this.gameOver=document.querySelector(".game-over");
        this.ball=document.querySelector(".ball");
        
        if(!this.ball){
            console.log("ball is not found");
            return;
        }
        this.blocks=document.querySelectorAll(".block");
        this.gameOver.style.display="none";
        this.ball.style.display="block";

        // 位置の初期化
        this.x=400;
        this.y=600;
        this.ballSpeedX=1;
        this.ballSpeedY=1;

        //ゲームインナーの初期化
        this.inner=document.querySelector(".inner");
        this.innerRect=this.inner.getBoundingClientRect();
        // console.log(this.inner.getBoundingClientRect());
    }
    moveBall(){
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
        if(this.y>=this.innerRect.height-this.ball.offsetHeight){
            this.gameOver.style.display="block";
            this.ball.style.display="none";
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
    resetPosition(){
        this.ball.style.display="block";
        this.x=400;
        this.y=600;
        this.ball.style.left=this.x+"px";
        this.ball.style.top=this.y+"px";
    }
    
    static Reflect(){
        this.ballSpeedY*=-1;
    }
}

// ball=new Ball();
// ball.moveBall();
