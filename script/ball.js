class Ball {

    /**
     * コンストラクタ
     */
    constructor(){
        this.ball=document.querySelector('.ball');
        this.gravity=.5;
        this.velocity=0;
        this.interval=null;
        this.updateTime=20;
        this.revese=-1;

        this.bar=document.querySelector('.bar');
        this.barRect=this.bar.getBoundingClientRect();
        console.log(this.barRect);

        this.wall=document.querySelector('.inner');
        this.wallRect=this.wall.getBoundingClientRect();
        console.log(this.wallRect);

        this.blocks=document.querySelectorAll('.block');
        console.log(this.blocks);
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
        this.velocity+=this.gravity;
        const newPos=pos+this.velocity;

        this.collisionCheck(newPos);
        this.ball.style.top=newPos+'px';

        // console.log(newPos);
    }

    /**
     * 当たり判定
     * @param {*} newPos 
     */
    collisionCheck(newPos){

        // ballと壁のあたり判定
        if(newPos<=this.wallRect.top){
            // this.ball.style.top=this.wallRect.top+'px';
            this.gravity*=this.revese;
        }
        if(newPos>=this.wallRect.bottom){
            this.ball.style.top=this.wallRect.bottom+'px';
            console.log("ゲーム終了");
            this.stopFalling();
        }

        //bar と 　ballのあたり判定
        if(newPos>=this.barRect.top){
            this.gravity*=this.revese;
        }

        this.blocks.forEach(block=>{
            const blockRect=block.getBoundingClientRect();
            if(this.isColliding(this.ball.getBoundingClientRect(),blockRect)){
                console.log("削除");
                block.style.display=none;
                this.gravity*=this.revese;
            }
            else
                console.log("当たってない");
        })
    }
    isColliding(rect1,rect2){
        return !(
            rect1.right<rect2.left||
            rect1.left>rect2.right||
            rect1.bottom<rect2.top||
            rect1.top>rect2.bottom
        );
    }
}

const ball=new Ball();
ball.startFalling();


