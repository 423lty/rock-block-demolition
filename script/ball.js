class Ball {

    /**
     * コンストラクタ
     */
    constructor(){
        this.ball=document.querySelector('.ball');
        this.gravity=9.8;
        this.velocity=1;
        this.maxVelocity=7;
        this.interval=null;
        this.updateTime=20;
        this.updateMicroTime=10000;
        this.revese=-1;

        this.bar=document.querySelector('.bar');

        this.wall=document.querySelector('.inner');
        this.wallRect=this.wall.getBoundingClientRect();

        this.blocks=Array.from(document.querySelectorAll('.block'));
        // console.log(this.blocks);
    }

    /**
     * 落下開始
     */
    startFalling(){
        this.interval=setInterval(()=>this.ballAction(),this.updateTime);
    }

    /**
     * 落下終了
     */
    stopFalling(){
        clearInterval(this.interval);
    }

    /**
     * 移動処理
     */
    ballAction(){
        const pos=parseInt(window.getComputedStyle(this.ball).top,10);
        // console.log(pos);
        this.velocity+=this.gravity*this.updateTime/this.updateMicroTime;
        if(this.velocity>this.maxVelocity)
            this.velocity=this.maxVelocity;
        const newPos=parseInt(pos+this.velocity);

        this.collisionCheck();
        this.ball.style.top=newPos+'px';

        // console.log(newPos);
    }

    /**
     * 当たり判定
     * @param {*} newPos 
     */
    collisionCheck(){

        const ballRect = this.ball.getBoundingClientRect();
        const barRect = this.bar.getBoundingClientRect();

        this.wallCollisionCheck(ballRect);
        this.barCollisionCheck(ballRect,barRect);
        this.blockCollisionCheck();  
    }
    isColliding(rect1,rect2){
        return !(
            rect1.right<rect2.left||
            rect1.left>rect2.right||
            rect1.bottom<rect2.top||
            rect1.top>rect2.bottom
        );
    }

    /**
     * バートのあたり判定
     * @param {*} ballRect 
     * @param {*} barRect 
     */
    barCollisionCheck(ballRect,barRect){
        // ボールとバーのあたり判定
        if (ballRect.bottom > barRect.top && ballRect.top < barRect.bottom &&
            ballRect.right > barRect.left && ballRect.left < barRect.right) {

            if(ballRect.right>barRect.right){
                this.velocity=Math.abs(this.velocity);
            }
            else if(ballRect.left<barRect.left){
                this.velocity=-Math.abs(this.velocity);
            }
            else{
                this.gravity=-Math.abs(this.gravity);
                this.velocity=-Math.abs(this.velocity);
            }

            // console.log("バーに当たった");
        }
    }
    
    /**
     * 壁とのあたり判定
     * @param {*} newPosRect 
     */
    wallCollisionCheck(newPosRect){
        // ballと壁のあたり判定
        if(newPosRect.top<=this.wallRect.top){
            this.ball.style.top=this.wallRect.top+'px';
            this.gravity=Math.abs(this.gravity);
            this.velocity=Math.abs(this.velocity);
        }
        
        if(newPosRect.bottom>=this.wallRect.bottom){
            this.ball.style.bottom=this.wallRect.top+'px';
            console.log("ゲーム終了");
            this.stopFalling();
        }

        if(newPosRect.left<=this.wallRect.left){
            this.ball.style.left=this.wallRect.left+'px';
            this.gravity=-Math.abs(this.gravity);
            this.velocity=-Math.abs(this.velocity);
        }

        if(newPosRect.right>=this.wallRect.right){
            this.ball.style.right=this.wallRect.right+'px';
            this.gravity=-Math.abs(this.gravity);
            this.velocity=-Math.abs(this.velocity);
        }   
    }

    blockCollisionCheck(){
        this.blocks.forEach(block=>{
            const blockRect=block.getBoundingClientRect();
            if(this.isColliding(this.ball.getBoundingClientRect(),blockRect)){
                console.log("削除");
                block.remove();
                this.blocks=Array.from(this.blocks).filter(b=>b!==block);
                this.gravity*=this.revese;
                
                // block.style.display='none';
                // this.gravity=Math.abs(this.gravity);
                // this.velocity=Math.abs(this.velocity);
            }
        })
    }
}

const ball=new Ball();
ball.startFalling();


