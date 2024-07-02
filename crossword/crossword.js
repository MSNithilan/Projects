const values=["bwwww","wwwww","wwwww","wwwww","wwwww","wwwwb"];
const ans_key=["-BASS","FISHY","ORSON","ADOUT","MIRTH","SETS"];
    const total_rows=values.length;
    const total_cols=values[0].length;
    const spans_value={"0,1":"1","0,2":"2","0,3":"3","0,4":"4","1,0":"5","2,0":"6","3,0":"7","4,0":"8","5,0":"9"};
    let current=null;
    function createBoxes(){
        var boxes="";
        for(let i=0;i<values.length;i++){
            boxes+="<tr>";
            for(let j=0;j<values[i].length;j++){
                const s=spans_value[i+","+j]??"";
                boxes+=`<th onclick='myclick(this)' row='${i}' col='${j}' class="${values[i][j]}"><span>${s}</span><b></b></th>`;
            }
            boxes+="</tr>";
        }
        document.getElementById("table").innerHTML=boxes;
    }
    createBoxes();
    function myclick(box){
        if(box.classList.contains("w")){
            let row=box.getAttribute("row");
            let col=box.getAttribute("col");
            if(current!=null){
                current.style.background="transparent";
            }
            current=box;
            current.style.background="orange";
            const existingHighlights = document.querySelectorAll(".highlighted-cell");
            existingHighlights.forEach((element) => element.classList.remove("highlighted-cell"));
        }
    }
    document.body.onkeyup=function(event){
        if(current!=null){
            if(event.keyCode>=37 && event.keyCode<=40){
                nextmover(event.keyCode);
            }
            if(event.keyCode>=65 && event.keyCode<=90){
                current.querySelector("b").innerHTML=event.key.toUpperCase();
                nextmover(39); //right
            }
            if(event.keyCode==8 || event.keyCode==46){
                current.querySelector("b").innerHTML="";
                nextmover(37); //left
            }
        }
    }
    function nextmover(code){
        let row=parseInt(current.getAttribute("row"));
        let col=parseInt(current.getAttribute("col"));
        switch(code){
            case 37: //left
                col=col==0 ? total_cols-1 : col-1;
                
                break;
            case 38: //top
                row=row==0 ? total_rows-1 : row-1;
                break;
            case 39: //right
                col=col==total_cols-1 ? 0 : col+1;
                
                break;
            case 40: //bottom
                row=row==total_rows-1 ? 0 : row+1;
                
                break;
            default:
                break;
        }
        if(current.classList.contains("w")){
            current.style.background="transparent";
            const existingHighlights = document.querySelectorAll(".highlighted-cell");
            existingHighlights.forEach((element) => element.classList.remove("highlighted-cell"));
        }
        current=document.querySelectorAll("tr")[row].querySelectorAll("th")[col];
        if(current.classList.contains("b")){
            nextmover(code);
        }
        else{
            current.style.background="orange";
        }
    } 
    let red=[];
    let green=[];
function key_check(){
    red.splice(0);
    green.splice(0);
    let whites=document.querySelectorAll(".w");
    whites.forEach(element=>{
        let text=element.querySelector("b").innerHTML;
        if(text.length>0){
            let row=element.getAttribute("row");
            let col=element.getAttribute("col");
            if(text==ans_key[row][col]){
                element.style.background="greenyellow";
                green.push(element);
            }
            else{
                element.style.background="coral";
                red.push(element);
            }
        }
    });
    if(green.length==whites.length){
        console.log("YOU GOT IT!");
    }
}
function color_clear(){
    red.forEach(element=>{
        element.style.background="transparent";
        element.querySelector("b").innerHTML="";
    });
    green.forEach(element=>{
        element.style.background="transparent";
    });
    red.splice(0);
    green.splice(0);
}
const btnElList=document.querySelectorAll('.btn');
btnElList.forEach(btnEl=>{
    btnEl.addEventListener('click',()=>{
        document.querySelector('.active')?.classList.remove('active');
        btnEl.classList.add('active');
        const num = getSelectedNumber();
        const tableElement=document.getElementById("table");
        highlightRowCells(selectTableCell(tableElement,num));
        }
    )
}); 

const btnElList2=document.querySelectorAll('.btn2');
btnElList2.forEach(btnEl=>{
    btnEl.addEventListener('click',()=>{
        document.querySelector('.active')?.classList.remove('active');
        btnEl.classList.add('active');
        const num = getSelectedNumber();
        const tableElement=document.getElementById("table");
        highlightColumnCells(selectTableCell(tableElement,num));
        }
    )
}); 

function getSelectedNumber() {
    const selectedButton = document.querySelector(".active");
    if (selectedButton) {
      const numberElement = selectedButton.querySelector("b.num");
      if (numberElement) {
        const numberString = numberElement.innerText.toString();
        for (const key in spans_value) {
            if (spans_value[key] === numberString) {
              return key;
            }
          }
          return undefined;
      } else {
        return null;
      }
    } else {
      return null;
    }
}
function selectTableCell(tableElement, keyPair) {
    const [rowIndex, columnIndex] = keyPair.split(",");
    const row = parseInt(rowIndex);
    const col = parseInt(columnIndex);
    if (!tableElement || row < 0 || col < 0) {
      return; 
    }
    const selectedCell = tableElement.rows[row].cells[col];
    myclick(selectedCell);
    return selectedCell
}

function highlightRowCells(selectedCell) {
    const ele_var = document.querySelectorAll(".highlighted-cell");
    ele_var.forEach((element) => {  
        element.classList.remove("highlighted-cell");  
        });  
    const row = selectedCell.parentNode;
    for (const cell of row.cells) {
        if(cell.classList.contains("w")){
            cell.classList.add("highlighted-cell");
        }
    }
}
  
  function highlightColumnCells(selectedCell) {
    const existingHighlights = document.querySelectorAll(".highlighted-cell");
    existingHighlights.forEach((element) => element.classList.remove("highlighted-cell"));
    const tableBody = selectedCell.parentNode.parentNode; 
    const columnIndex = selectedCell.cellIndex;
    for (const row of tableBody.rows) {
      const cellToHighlight = row.cells[columnIndex];
      if (cellToHighlight) { 
        if (cellToHighlight.classList.contains("w")) { 
          cellToHighlight.classList.add("highlighted-cell");
        }
      }
    }
}