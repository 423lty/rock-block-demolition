class Bar {
    constructor() {
        this.bar=document.querySelector('.bar');
        this.inner=document.querySelector('.inner');
        this.style=window.getComputedStyle(this.bar);
        this.x=400;
        this.y=680;
    }
    moveBar(event) {  

        const mouseX=event.clientX-this.inner.getBoundingClientRect().left;
        const barX=mouseX-this.bar.offsetWidth/2;
        // console.log(this.inner.getBoundingClientRect().left);
        this.bar.style.left=this.x+"px";

        if(barX<this.inner.getBoundingClientRect().left-this.inner.getBoundingClientRect().width/2) {
            this.x=this.inner.getBoundingClientRect().left-this.inner.getBoundingClientRect().width/2;
        }
        else{

        }

    }   
}

bar = new Bar();
document.addEventListener('mousemove', (event)=>bar.moveBar(event));
