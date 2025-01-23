class Ball {
    constructor(){
        this.ball=document.querySelector(".ball");
        this.blocks=document.querySelectorAll(".block");
        this.x=400;
        this.y=600;
        this.ballSpeedX=2;
        this.ballSpeedY=2;

        this.inner=document.querySelector(".inner");
        this.innerRect=this.inner.getBoundingClientRect();
        console.log(this.inner.getBoundingClientRect());
    }
    moveBall(){
        this.x+=this.ballSpeedX;
        this.y+=this.ballSpeedY;
        this.ball.style.left=this.x+"px";
        this.ball.style.top=this.y+"px";

        //壁との衝突判定
        if(this.x<=-90 || this.x>=640){
            this.ballSpeedX*=-1;
        }
        if(this.y<=0 || this.y>=this.innerRect.bottom-this.innerRect.y){
            this.ballSpeedY*=-1;
        }

        //パドルとの衝突判定
        let ballRect=this.ball.getBoundingClientRect();
        let bar=document.querySelector(".bar");
        if( this.x>=bar.offsetLeft && 
            this.x<=bar.offsetLeft-bar.offsetWidth && 
            this.y>=bar.offsetTop && 
            this.y<=bar.offsetTop+bar.offsetHeight){
                this.ballSpeedY*=-1;
            }

        
        //アニメーションをする
        requestAnimationFrame(()=>this.moveBall());
    }
    
    static Reflect(){
        this.ballSpeedY*=-1;
    }
}

ball=new Ball();
ball.moveBall();
