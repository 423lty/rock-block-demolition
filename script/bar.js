class Bar {
    /**
     * コンストラクタ
     */
    constructor() {
        this.bar=document.querySelector('.bar');
        this.inner=document.querySelector('.inner');
        this.style=window.getComputedStyle(this.bar);
        this.x=400;
        this.y=680;
        this.speed=10;
    }

    resetPosition(){
        this.x=400;
        this.bar.style.left=this.x+"px";
    }

    /**
     * バーの移動
     * @param {イベントキー} event 
     */
    moveBar(event) {  
        if(event==="ArrowLeft"&&this.x>=0+this.bar.offsetWidth/2)
            this.x-=this.speed;
        if(event==="ArrowRight"&&this.x<=this.inner.offsetWidth-this.bar.offsetWidth/2)
            this.x+=this.speed;
        this.bar.style.left=this.x+"px";
    }   
}

// bar = new Bar();
// document.addEventListener('keydown', (event)=>bar.moveBar(event.key));
