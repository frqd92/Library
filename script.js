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
    else{addBookToLibrary()}
}

//adds book card after form check passes
function addBookToLibrary(){
    let bookObj = new Book(textInputs[0].value,textInputs[1].value,textInputs[2].value,textInputs[3].value,toggle.checked,textInputs[4].value);
    myLibrary.push(bookObj);
  
    createBook();
    console.log(myLibrary)
}

function createBook(){
    //creates empty book
    let book = document.createElement("div");
    let bookContainer = document.querySelector(".book-container");
    book.classList.add("book");
    bookContainer.appendChild(book);

    //trash and edit buttons
    let trashBtn = document.createElement("img");
    trashBtn.setAttribute("src", "images/delete-white.png");
    trashBtn.setAttribute("id", "delete-book");
    let editBtn = document.createElement("img");
    editBtn.setAttribute("src", "images/application-edit-white.png");
    editBtn.setAttribute("id", "edit-book");
    book.appendChild(trashBtn);
    book.appendChild(editBtn);

    //book cover
    let bookCover = document.createElement("img");
    bookCover.setAttribute("alt",`cover of ${textInputs[0].value}`)
    if(textInputs[2].value){ //if user inserts an image
        bookCover.setAttribute("src",`${textInputs[2].value}`)
    }else{ //default image if none is inserted
        bookCover.setAttribute("src","images/book-cover.png") 
    }
    bookCover.classList.add("book-image");
    book.appendChild(bookCover);

    //title and author
    let titleAuthorContainer = document.createElement("div");
    titleAuthorContainer.classList.add("title-author");
    let bookTitle = document.createElement("p");
    bookTitle.classList.add("book-title");
    let bookAuthor = document.createElement("p");
    bookAuthor.classList.add("book-author");
    bookTitle.textContent = textInputs[0].value;
    bookAuthor.textContent = textInputs[1].value;
    titleAuthorContainer.appendChild(bookTitle);
    titleAuthorContainer.appendChild(bookAuthor);
    book.appendChild(titleAuthorContainer);

    //progress text
    let pageProgress = document.createElement("div");
    pageProgress.classList.add("page-progress");
    book.appendChild(pageProgress);
    let currentText = document.createElement("p");
    currentText.classList.add("current-page-text");
    let currentPage = document.createElement("span");
    currentPage.classList.add("current-page");
    let arrowContainer= document.createElement("div");
    arrowContainer.classList.add("arrow-container");
    pageProgress.appendChild(currentText);
    pageProgress.appendChild(arrowContainer);
    currentPage.textContent=textInputs[4].value;
    arrowContainer.appendChild(currentPage);

    toggle.checked?currentText.textContent="Current Page":currentText.textContent="Book Completed!"; //change to "book completed" if book done
    
    let arrowUp = document.createElement("img");
    let arrowDown = document.createElement("img");
    arrowUp.setAttribute("src", "images/arrow-up-white.png");
    arrowDown.setAttribute("src", "images/arrow-down-white.png");
    arrowUp.classList.add("arrow");
    arrowUp.classList.add("up");
    arrowDown.classList.add("arrow");
    arrowDown.classList.add("down");
    arrowContainer.appendChild(arrowUp);
    arrowContainer.appendChild(arrowDown);
    
    let divider = document.createElement("p");
    divider.classList.add("divider");
    divider.textContent="|";
    pageProgress.appendChild(divider);
    
    let totalPages = document.createElement("span");
    totalPages.classList.add("total-pages");
    totalPages.textContent=textInputs[3].value;
    pageProgress.appendChild(totalPages);


    //progress bar
    let progressBarContainer = document.createElement("div");
    book.appendChild(progressBarContainer);
    progressBarContainer.classList.add("progress-bar-container");


    let bar = document.createElement("div");
    bar.classList.add("bar");
    progressBarContainer.appendChild(bar);
   
    let barProgress = document.createElement("div");
    barProgress.classList.add("bar-progress");
    bar.appendChild(barProgress);
    percentageComplete = (textInputs[4].value / textInputs[3].value)*100;
   
    barProgress.style.cssText = `width: ${percentageComplete}%;`;

    if(percentageComplete===100) barProgress.style.background = 'rgb(27, 158, 34)';
    
    arrowFunc(arrowUp,arrowDown, currentPage, textInputs[3].value, barProgress, currentText);
    clearInputs();
}



function arrowFunc(up, down,page, total, barProgress, text){
    let currentPage = parseInt(page.textContent);
    up.addEventListener("mousedown", ()=>{
        if(currentPage<total){
            currentPage += 1;
            page.textContent = currentPage;
        }
        updateProgressBar(currentPage,total, barProgress, text);
    })
    down.addEventListener("mousedown", ()=>{
        if(currentPage>0){
            currentPage -= 1;
            page.textContent = currentPage;
        }
        updateProgressBar(currentPage,total, barProgress, text);
    })


 function updateProgressBar(currentPage, total, barProgress, text){
    let percentageComplete = (currentPage/total)*100;
    barProgress.style.cssText = `width: ${percentageComplete}%;`;
    percentageComplete===100 ? barProgress.style.background = 'rgb(27, 158, 34)' : barProgress.style.background = 'rgb(107, 122, 209)';
    percentageComplete<100 ? text.textContent = "Current Page" : text.textContent="Book Completed!";
 }
 
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