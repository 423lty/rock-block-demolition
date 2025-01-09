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

        this.ball=document.querySelector('.ball');

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
                // blockList.style.position = 'absolute';
                blockList.style.width = `${blockWidth}px`;
                blockList.style.height = `${blockHeight}px`;
                blockList.style.top = `${r * blockHeight}px`;
                blockList.style.left = `${c * blockWidth}px`;
                // blockList.style.padding='10px';
                // blockList.style.margin='10px';

                block.appendChild(blockList);

                // ブロックがマップの外に出ないようにする
                if (parseInt(block.style.left) + blockWidth <= mapWidth && parseInt(block.style.top) + blockHeight <= mapHeight) {
                }
            }

            this.table.appendChild(block);
        }
        console.log( this.blocks = document.querySelectorAll('.block'));

        // this.blockCollisionCheck(); 
    }

    blockCollisionCheck(){
        const ballRect=this.ball.getBoundingClientRect();
        this.blocks.forEach((block,index)=>{
            const blockRect=block.getBoundingClientRect();
            if(Ball.isColliding(ballRect,blockRect)){
                console.log("削除");
                block.remove();
                this.blocks=Array.from(this.blockArray.querySelectorAll('.block')).filter(b=>b!==block);
                this.gravity*=this.revese;
                
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
            }
        })
        console.log(ballRect);
    }
}


/**
 * 生成
 */
// document.addEventListener('DOMContentLoaded',()=>
//     new Blocks(5,6)
// )
const blocks = new Blocks(5, 6);    
blocks.blockCollisionCheck();