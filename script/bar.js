class Bar {
    /**
     * コンストラクタ
     */
    constructor(){
        this.bar=document.querySelector('.bar');
        this.rect=document.querySelector('.inner');
        this.MoveVector=30;

        const rect=this.rect.getBoundingClientRect();
        const style=window.getComputedStyle(this.rect);
        const marginLeft=parseInt(style.marginLeft,10);
        const marginRight=parseInt(style.marginRight,10);
        this.leftEdge=rect.left-marginLeft;
        this.rightEdge=rect.right-marginRight-this.bar.offsetWidth;
    }

    // バーの移動
    barMove(){
        document.addEventListener('keydown',(event)=>this.barAction(event));
    }

    /**
     * 移動処理
     * @param {*} event 
     */
    barAction(event){
        //移動量を取得
        let vector=this.inputArrowKey(event.key);

        //位置の変更
        let pos=this.vectorArrowCheck(vector);
        this.bar.style.left=pos+'px';
    }
   /**
    * 入力されたボタンから取得
    * @param {*} arrow 入力した矢印キー
    * @returns 
    */
    inputArrowKey(arrow){   
        let x=0;
        if(arrow==='ArrowLeft')
            x=-this.MoveVector;
        if(arrow==='ArrowRight')        
            x=this.MoveVector;
        return x;
    }    

    /**
     * 移動してよいか
     * @param {*} vector 移動量
     * @returns 移動先
     */
    vectorArrowCheck(vector){
        const pos=parseInt(window.getComputedStyle(this.bar).left,10);
        const destination=pos+vector;
        if (destination > this.rightEdge  || destination < this.leftEdge)
            return pos;
        else
            return destination; 
    }

}

const bar=new Bar();
bar.barMove();