let myLibrary =[];

function Book(title,author,url, pagesTotal, read, pagesRead){
    this.title = title; this.author=author; this.url=url; this.pagesTotal=pagesTotal;this.read=read;this.pagesRead=pagesRead;
}

let addBookBtn = document.getElementById("add-book");
addBookBtn.addEventListener("click", checkForm);

// javascript form validation 
let textInputs = document.querySelectorAll("input[type=text]");
function checkForm(){
    let validityCheck = false;
    let invalidIndex;
    for(let index=0;index<textInputs.length;index++){
        if(textInputs[index].checkValidity()){
            validityCheck=true;
            textInputs[index].style.borderBottom='1px solid rgb(238, 236, 236, 0.3)';
        }
        else{
            validityCheck=false;
            invalidIndex = index;
            break;
        }
    }
    if(validityCheck === false ){
        console.log(textInputs[invalidIndex].style.border)
        textInputs[invalidIndex].style.borderBottom='1px solid rgba(204, 40,40 , 0.8)';
    }
 
}
























//add book box toggle
let toggle = document.querySelector('input[type="checkbox"]');
let pagesRead = document.querySelector(".pages-read");
toggle.addEventListener("change",toggleFunc)
function toggleFunc (){
    toggle.checked ? pagesRead.style.visibility="visible":pagesRead.style.visibility="hidden";
    toggle.checked ? textInputs[4].value ="":textInputs[4].value=textInputs[3].value ;
}
textInputs[3].addEventListener("focusout", ()=>{
    if(!toggle.checked){textInputs[4].value = textInputs[3].value;}
})
textInputs[4].addEventListener("input", ()=>{
    if(textInputs[4].value === textInputs[3].value){
        toggle.checked = false;
        pagesRead.style.visibility="hidden"
    }
} )

//Make the add book box appear and disappear
let addBoxBtn = document.querySelector(".add-box-container");
let addBox = document.querySelector(".add-box");
let bgDiv = document.querySelector(".bg-div");
let closeBtn = document.querySelector("close-btn");
addBoxBtn.addEventListener("click", ()=>{
    bgDiv.style.display="block"
    addBox.style.display="block"
})
window.addEventListener("click", (e)=>{
    if(e.target.className==="bg-div" || e.target.className ==="close-btn"){
        addBox.style.display="none"
        bgDiv.style.display="none"
    }
})