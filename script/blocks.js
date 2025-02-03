class Blocks{
    /**
     * コンストラクタ
     * @param {ボールのインスタンス} ballInstance 
     */
    constructor(ballInstance){
        this.blocks=document.querySelector('.inner');

        const blockLine=5;
        const blockCol=6;

        this.ColPercent=17;
        this.RowPercent=10;

        this.blockArray=[];
        this.blockGenerate(blockLine,blockCol);
        this.ball=ballInstance;
    }

    /**
     * ブロックの生成
     */
    blockGenerate(line,col){
        this.blocks.querySelectorAll('.block').forEach(block=>block.remove());
        const blockLine=line;
        const blockCol=col;
        for(let i=0;i<blockLine*blockCol;i++){
            const block=document.createElement('div');
            block.classList.add('block');
            this.blocks.appendChild(block);

            const col=Math.floor(i/blockLine);
            const row=i%blockLine;

            block.style.left=col*this.ColPercent+'%';
            block.style.top=row*this.RowPercent+'%';

            this.blockArray.push(block);
        }
    }

    /**
     * 判定のチェック
     * @returns 強制終了
     */
    collisionCheck(){
        const ball=document.querySelector('.ball');
        const ballRect=ball.getBoundingClientRect();
        const blocks=document.querySelectorAll('.block');
        blocks.forEach(block=>{
            const blockRect=block.getBoundingClientRect();
            if(ballRect.top<=blockRect.bottom &&
                ballRect.bottom>=blockRect.top &&
                ballRect.left<=blockRect.right &&
                ballRect.right>=blockRect.left){
                    block.remove();
                    this.blockArray=this.blockArray.filter(item=>item!==block);
                    this.ball.reflectY();
                }
        });

        if(this.blockArray.length==0){
            document.querySelector('.game-clear').style.cssText='display:block !important';
            this.ball.gameStop();
            this.ball.gameClearFlgon();
            return;
        }

        // console.log(this.blockArray);

        requestAnimationFrame(()=>this.collisionCheck());
    }
}