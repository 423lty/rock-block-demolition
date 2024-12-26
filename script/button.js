class ButtonStart{
    constructor(){
        this.button=document.querySelector('button');
        this.buttonAction();
    }
    buttonAction(){
        this.button.addEventListener('click',()=>this.reLoad());  
    }
    reLoad(){
        location.reload();
    }

}

document.addEventListener('DOMContentLoaded',()=>{
    new ButtonStart();
});