class Bar{
    /**
     * コンストラクタ
     */
    constructor(){
        
        this.inner=document.querySelector('.inner');
        // 以前に存在するバーを削除
        this.createBarElement();

        this.bar=document.querySelector('.bar');
        this.isMoveFlg=false;
        //this変数の定義
        this.x;
        this.speed;

        // 変数の初期化
        this.resetBar();
    }

    /**
     * ボールの要素を生成
     */
    createBarElement(){
        const bar = document.querySelector('.bar');
        if(bar)
            bar.remove();

        const newBar=document.createElement('div');
        newBar.classList.add('bar');
        this.inner.appendChild(newBar);
    }

    /**
     * バーのリセット
     */
    resetBar(){
        this.x=this.inner.offsetWidth/2;
        this.bar.style.left=this.x+"px";
        this.speed=this.inner.offsetWidth/20;
    }

    /**
     * バーの移動
     * @param {イベントキー} event 
     */
    moveBar(event) {  
        if(!this.isMoveFlg)
            return;

        if(event==="ArrowLeft"&&this.x>=0){
            this.x-=this.speed;
            if(this.x<this.bar.offsetWidth/2)
                this.x=this.bar.offsetWidth/2;
        }
        if(event==="ArrowRight"&&this.x<=this.inner.offsetWidth-this.bar.offsetWidth/3){
            this.x+=this.speed;
            if(this.x>this.inner.offsetWidth-this.bar.offsetWidth/2)
                this.x=this.inner.offsetWidth-this.bar.offsetWidth/2;

        }
        this.bar.style.left=this.x+"px";
    }   

    /**
     * バーの移動フラグをオンにする
     */
    setMoveFlgOn(){
        this.isMoveFlg=true;
    }
}