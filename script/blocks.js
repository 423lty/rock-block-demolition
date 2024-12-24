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
        let html='';
        for(let r=0;r<row;r++){
            // console.log(r+'行目');
            html+='<div class="flex">'
            for(let c=0;c<col;c++){
                html+=`<div class="block"></div>`
            }
            html+='</div>'
        }
        this.table.innerHTML+=html;
    }
}


/**
 * 生成
 */
document.addEventListener('DOMContentLoaded',()=>
    new Blocks(5,6)
)
