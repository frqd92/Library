
























//Make the add book box appear and disappear
let addBoxBtn = document.querySelector(".add-box-container");
let addBox = document.querySelector(".add-box");
let bgDiv = document.querySelector(".bg-div");
addBoxBtn.addEventListener("click", ()=>{
    bgDiv.style.display="block"
    addBox.style.visibility="visible"
})
window.addEventListener("click", (e)=>{
    if(e.target.className==="bg-div"){
        addBox.style.visibility="hidden"
        bgDiv.style.display="none"
    }
})