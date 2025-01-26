class Blocks{
    constructor(){
        this.blocks=document.querySelector('.inner');
        this.gameClear=document.querySelector('.game-clear');    
        this.blockArray=[];
        this.gameClear.style.display='none';
        this.blockGenerate();
    }

    blockGenerate(){
        this.blocks.innerHTML='';   
        const blockLine=5;
        const blockNum=6;
        for(let i=0;i<blockLine*blockNum;i++){
            const block=document.createElement('div');
            block.classList.add('block');
            this.blocks.appendChild(block);

            const col=Math.floor(i/blockLine);
            const row=i%blockLine;

            block.style.left=col*17+'%';
            block.style.top=row*10+'%';

            this.blockArray.push(block);
        }
    }
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
                    Ball.Reflect();
                }
        });

        if(this.blockArray.length==0)
            this.gameClear.style.display='block';

        // console.log(this.blockArray);

        requestAnimationFrame(()=>this.collisionCheck());
    }
}

// blocks=new Blocks();
// blocks.collisionCheck();