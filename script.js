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
        textInputs[invalidIndex].style.borderBottom='1px solid rgba(204, 40,40 , 0.8)';
    }
    else{addCard()}
}

//adds book card after form check passes
function addCard(){
    let bookObj = new Book(textInputs[0].value,textInputs[1].value,textInputs[2].value,textInputs[3].value,toggle.checked,textInputs[4].value);
    myLibrary.push(bookObj);
    clearInputs();
    console.log(myLibrary)
}

function clearInputs(){
    for (let index = 0; index<textInputs.length;index++){
        textInputs[index].value=""
    }
    toggle.checked=false;
    pagesRead.style.visibility="hidden";
}



















//add book box toggle
let toggle = document.querySelector('input[type="checkbox"]');
let pagesRead = document.querySelector(".pages-read");
toggle.addEventListener("change",toggleFunc)
function toggleFunc (){
    toggle.checked ? pagesRead.style.visibility="visible":pagesRead.style.visibility="hidden";
    toggle.checked ? textInputs[4].value ="":textInputs[4].value=textInputs[3].value ;
}
//validates pages read input with total pages if user has read or not
textInputs[3].addEventListener("focusout", ()=>{if(!toggle.checked){textInputs[4].value = textInputs[3].value;}})
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
//closes the book box window if user clicks outside of it
window.addEventListener("click", (e)=>{
    if(e.target.className==="bg-div" || e.target.className ==="close-btn"){
        addBox.style.display="none"
        bgDiv.style.display="none"
    }
})
// Enables Enter key to work as submit button when book box is in display
window.addEventListener("keydown", (e)=>{if(e.key === "Enter" && addBox.style.display==="block"){ checkForm();}})