class Ball{

    /**
     * インスタンス
     */
    static instance;

    static animationId;

    /**
     * コンストラクタ
     */
    constructor(){

        //インスタンスが存在する場合はインスタンスを返す
        if(Ball.instace)
            return Ball.instace;

        //インスタンスが存在しない場合はインスタンスを生成
        Ball.instace=this;

        //ゲームインナーの初期化
        this.inner=document.querySelector(".inner");
        this.innerRect=this.inner.getBoundingClientRect();
        
        // 以前に存在するボールを削除
        // this.createBallElement();

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
        this.MinBallSpeed=.5;    
        this.isMoveFlg=false;
        this.gameClearFlg=false;    
        
        this.resetBall();
    }

    /**
     * バーの移動
     */
    moveBall(){
        if(!this.isMoveFlg)
            return;
    
        const animate=()=>{
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
            Ball.animationId=requestAnimationFrame(animate);
        };

        if(Ball.animationId)
            cancelAnimationFrame(Ball.animationId);

        animate();
    }

    /**
     * ゲームスタート処理
     */
    gameStart(){
        this.isMoveFlg=true;
        this.moveBall();
    }

    /**
     * 移動を止める
     */
    gameStop(){
        this.isMoveFlg=false;
        if(Ball.animationId){
            cancelAnimationFrame(Ball.animationId);
            Ball.animationId=null;
        }

    }

    /**
     * ボールの要素の生成
     */
    createBallElement(){
        const balls=document.querySelectorAll(".ball");

        balls.forEach(ball =>{
            ball.style.display="none";
            ball.remove();
        });

        const newBall=document.createElement("div");
        newBall.classList.add("ball");
        this.inner.appendChild(newBall);
    }

    /**
     * ゲームクリアフラグを立てる
     */
    gameClearFlgOn(){
        this.gameClearFlg=true;
    }

    /**
     * ボールのリセット
     */
    resetBall(){
        this.gameStop();
        this.ball.style.display="block";
        this.x=this.inner.offsetWidth/2-this.ball.offsetWidth/2;
        this.y=(this.inner.offsetHeight*2)/3;
        this.ballSpeedX=this.getRandomFloat(this.MinBallSpeed,this.MaxBallSpeed)*this.getNagative();
        this.ballSpeedY=this.getRandomFloat(this.MinBallSpeed,this.MaxBallSpeed);
        this.ball.style.left=this.x+"px";
        this.ball.style.top=this.y+"px";
    }
    
    /**
     * ボールの反射
     */
    reflectY(){
        this.ballSpeedY*=-1;
    }

    /**
     * 浮動小数点を取得
     * @param {最小} min 
     * @param {最大} max 
     * @returns ランダムな数字を生成
     */
    getRandomFloat(min=-1,max=-1){
        return Math.random()*(max-min)+min;
    }

    /**
     * 正負の数を取得
     * @returns ランダムな正負の数を取得
     */
    getNagative(){
        return Math.random()<.5?-1:1;
    }

    /**
     * ボールのインスタンスを取得
     * @returns ボールのインスタンス
     */
    static getBallInstance(){
        if(!Ball.instace)
            Ball.instace=new Ball();
        return Ball.instace;
    }

}
