// import { Ball } from "./ball";

/**
 * ブロック
 */
class Blocks{

    /**
     * コンストラクタ
     * @param {*} row 行
     * @param {*} col 列
     */
    constructor(row,col){
        this.table=document.querySelector('.blocks');
        const blockWidth=70;
        const blockHeight=40;
        const mapWidth=this.table.clientWidth;
        const mapHeight=this.table.clientHeight;    
        this.blockArray=[];

        this.ball=document.querySelector('.ball');

        // 生成
        for (let r = 0; r < row; r++) {
            const block = document.createElement('div');

            block.classList.add('flex');
            // block.style.position = 'relative';
            block.style.margin = '5px 5px';
            block.style.display = 'flex';
            block.style.justifyContent = 'space-between';
            
            for (let c = 0; c < col; c++) {
                const blockList = document.createElement('div');
                blockList.classList.add('block');
                blockList.style.width = `${blockWidth}px`;
                blockList.style.height = `${blockHeight}px`;
                blockList.style.top = `${r * blockHeight}px`;
                blockList.style.left = `${c * blockWidth}px`;

                block.appendChild(blockList);
                this.blockArray.push(blockList);
            }

            this.table.appendChild(block);
        }

        this.blocks = document.querySelectorAll('.block')

        console.log(this.blockArray);

        // this.blockCollisionCheck(); 
    }

    /**判定
     * ブロックとの衝突判定
     */
    blockCollisionCheck(){
        this.blockArray.forEach(block=>{
            const blockRect=block.getBoundingClientRect();
            console.log("blockRect");
            if(this.ballRect<blockRect.bottom&&
                this.ballRect.top<blockRect.bottom&&
                this.ballRect.right>blockRect.left&&
                this.ballRect.left<blockRect.right)
                {
                    console.log("");
                    block.remove();
                    this.blocks=Array.from(this.blockArray.querySelectorAll('.block')).filter(b=>b!==block);
                    this.gravity*=this.revese;
                }
        });

    }
}


/**
 * 生成
 */
const blocks = new Blocks(5, 6);    
blocks.blockCollisionCheck();
// document.addEventListener('DOMContentLoaded',()=>
//     new Blocks(5,6)
// )


                // const leftBlock=this.blocks[index-1];
                // const rightBlock=this.blocks[index+1];
                
                // if(leftBlock){
                //     leftBlock.style.position='absolute';
                //     leftBlock.style.left= `${blockRect.left}px`;
                // }
                // if (rightBlock) {
                //     rightBlock.style.position = 'absolute';
                //     rightBlock.style.left = `${blockRect.right}px`;
                // }

                        // const blockArray=document.querySelector('.blocks');
        // this.blocks.forEach((block,index)=>{
        //     try{
        //         // それぞれのブロックの位置をそれぞれ取得
        //         const ballRect=this.ball.getBoundingClientRect();
        //         const blockRect=block.getBoundingClientRect();

        //         // 当たり判定
        //         console.log("当たり判定開始");
        //         if(Ball.isColliding(ballRect,blockRect)){
        //             console.log("削除");
        //             block.remove();
        //             this.blocks=Array.from(this.blockArray.querySelectorAll('.block')).filter(b=>b!==block);
        //             this.gravity*=this.revese;
            
        //         }
        //     }
        //     catch(e){
        //         console.log(e.message);
        //     }
            
        // })