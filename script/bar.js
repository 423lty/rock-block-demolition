class Bar{
    /**
     * コンストラクタ
     */
    constructor() {
        this.bar=document.querySelector('.bar');
        this.inner=document.querySelector('.inner');
        this.style=window.getComputedStyle(this.bar);
        this.x=this.inner.offsetWidth/2-this.bar.offsetWidth/2;
        this.speed=this.inner.offsetWidth/30;
    }

    resetPosition(){
        this.x=this.inner.offsetWidth/2;
        this.bar.style.left=this.x+"px";
    }

    /**
     * バーの移動
     * @param {イベントキー} event 
     */
    moveBar(event) {  
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
}

// bar = new Bar();
// document.addEventListener('keydown', (event)=>bar.moveBar(event.key));
