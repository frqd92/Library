let myLibrary =[];

function Book(title,author,url, pagesTotal, read, pagesRead){
    this.title = title; this.author=author; this.url=url; this.pagesTotal=pagesTotal;this.read=read;this.pagesRead=pagesRead;
}
let textInputs = document.querySelectorAll("input[type=text]");
let addBookBtn = document.getElementById("add-book");
addBookBtn.addEventListener("click", checkForm);
let currentEditIndex=0;

// javascript form validation 

function checkForm(e){
    let validityCheck = false;
    let invalidIndex;
    from=e.target.id;


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

    if(validityCheck === true && from ==="add-book"){
        addBookToLibrary()

    }
    else if (validityCheck === true && from ==="edit-book"){
        let crntArrow = arrBtns;
        editBookFromLibrary(crntArrow);
    }
}

function editBook(editBtn, currentArrows){
    editBtn.addEventListener("click", (e)=>{
       bgDiv.style.display="block";
       addBox.style.display="block";
       addBookBtn.style.display="none";
       editBookBtn.style.display="block";
       let editBtns = document.querySelectorAll(".edit-book");
       for(let index=0;index<editBtns.length; index++){ 
           editBtns[index].id=index;
       }
       let currentIndex = e.target.id;
       textInputs[0].value = myLibrary[currentIndex].title;
       textInputs[1].value = myLibrary[currentIndex].author;
       textInputs[2].value = myLibrary[currentIndex].url;
       toggle.checked = myLibrary[currentIndex].read;
       textInputs[3].value = myLibrary[currentIndex].pagesTotal;
       textInputs[4].value = myLibrary[currentIndex].pagesRead;
       toggle.checked?pagesRead.style.visibility="visible":pagesRead.style.visibility="hidden";
       currentEditIndex = currentIndex;
       arrBtns = currentArrows;
       editBookBtn.addEventListener("click", checkForm);
    })
   }
   


//adds book card after form check passes
function addBookToLibrary(){
    let bookObj = new Book(textInputs[0].value,textInputs[1].value,textInputs[2].value,textInputs[3].value,toggle.checked,textInputs[4].value);
    myLibrary.push(bookObj);
    createBook();
}

function editBookFromLibrary(currentArrows){

    myLibrary[currentEditIndex].title = textInputs[0].value;
    myLibrary[currentEditIndex].author = textInputs[1].value;
    myLibrary[currentEditIndex].url = textInputs[2].value;
    myLibrary[currentEditIndex].checked = toggle.checked;
    myLibrary[currentEditIndex].pagesTotal= textInputs[3].value;
    myLibrary[currentEditIndex].pagesRead = textInputs[4].value;
    //edit title and author
    let bookTitles = document.querySelectorAll(".book-title");
    let bookAuthors = document.querySelectorAll(".book-author");
    let bookCovers = document.querySelectorAll(".book-image");

    //edit image url
    bookTitles[currentEditIndex].textContent = textInputs[0].value;
    bookAuthors[currentEditIndex].textContent = textInputs[1].value;
    if(textInputs[2].value){ 
        bookCovers[currentEditIndex].setAttribute("src",`${textInputs[2].value}`)
    }else{ 
        bookCovers[currentEditIndex].setAttribute("src","images/book-cover.png") 
    }

    //edit progress text
    let currentPageTexts = document.querySelectorAll(".current-page-text");
    toggle.checked?currentPageTexts[currentEditIndex].textContent="Current Page":currentPageTexts[currentEditIndex].textContent="Book Completed!";

    let currentPages = document.querySelectorAll(".current-page");
    currentPages[currentEditIndex].textContent = textInputs[4].value;

    let totalPages = document.querySelectorAll(".total-pages")
    totalPages[currentEditIndex].textContent = textInputs[3].value;

    //edit progress bars & arrows
    //arrowup arrowdown currentpage, totalpage, barprogress,currentText
    let arrowsUp = document.querySelectorAll(".up");
    let arrowsDown = document.querySelectorAll(".down");
    let arrowContainers = document.querySelectorAll(".arrow-container");
 

    let barProgress = document.querySelectorAll(".bar-progress")


    let percentageEdit = (textInputs[4].value / textInputs[3].value) * 100;
    barProgress[currentEditIndex].style.cssText = `width: ${percentageEdit}%;`;
    if(percentageEdit ===100) barProgress[currentEditIndex].style.background = 'rgb(27, 158, 34)';
    
    arrowFunc(arrowsUp[currentEditIndex], arrowsDown[currentEditIndex], currentPages[currentEditIndex], totalPages[currentEditIndex], barProgress[currentEditIndex],currentPageTexts[currentEditIndex], true);


}

function arrowFunc(up, down,page, total, barProgress, text){
    let currentPage = parseInt(page.textContent);
    total = parseInt(page.textContent);


    up.addEventListener("mousedown", incrementFunc, true);
    function incrementFunc(){
        if(currentPage<total){
            currentPage += 1;
            page.textContent = currentPage;
        }
        updateProgressBar(currentPage,total, barProgress, text);

    }   
    down.addEventListener("mousedown", decrementFunc);
    function decrementFunc(){
        if(currentPage>0){
            currentPage -= 1;
            page.textContent = currentPage;
        }
        updateProgressBar(currentPage,total, barProgress, text);
    }
    

    
//WHERE YOU LEFT OFF.. ARROW THING NOT WORKING, FORK AND REWRITE IT ALL


 function updateProgressBar(currentPage, total, barProgress, text){
    let percentageComplete = (currentPage/total)*100;
    barProgress.style.cssText = `width: ${percentageComplete}%;`;
    percentageComplete===100 ? barProgress.style.background = 'rgb(27, 158, 34)' : barProgress.style.background = 'rgb(107, 122, 209)';
    percentageComplete<100 ? text.textContent = "Current Page" : text.textContent="Book Completed!";
 }
 
}




function createBook(){
    //creates empty book
    let book = document.createElement("div"); //*****
    let bookContainer = document.querySelector(".book-container");
    let trashBtn = document.createElement("img");
    let editBtn = document.createElement("img");
    let holdDelText = document.createElement("p");
    let bookCover = document.createElement("img"); //*****
    let titleAuthorContainer = document.createElement("div");
    let bookTitle = document.createElement("p"); 
    let bookAuthor = document.createElement("p");
    let pageProgress = document.createElement("div");
    let currentText = document.createElement("p");
    let currentPage = document.createElement("span");
    let arrowContainer= document.createElement("div");
    let arrowUp = document.createElement("img");
    let arrowDown = document.createElement("img");
    let divider = document.createElement("p");
    let totalPages = document.createElement("span");
    let progressBarContainer = document.createElement("div");
    let bar = document.createElement("div");
    let barProgress = document.createElement("div");

    book.classList.add("book");
    bookContainer.appendChild(book);
    //trash and edit buttons
    trashBtn.setAttribute("src", "images/delete-white.png");
    trashBtn.setAttribute("class", "delete-book");
    editBtn.setAttribute("src", "images/application-edit-white.png");
    editBtn.setAttribute("class", "edit-book");
    book.appendChild(trashBtn);
    book.appendChild(editBtn);
    holdDelText.classList.add("hold-delete-text");
    holdDelText.textContent = `Hold for 3 seconds to delete`;
    book.appendChild(holdDelText);
    

    //book cover
    bookCover.setAttribute("alt",`cover of ${textInputs[0].value}`)
    if(textInputs[2].value){ //if user inserts an image
        bookCover.setAttribute("src",`${textInputs[2].value}`)
    }else{ //default image if none is inserted
        bookCover.setAttribute("src","images/book-cover.png") 
    }
    bookCover.classList.add("book-image");
    book.appendChild(bookCover);

    //title and author
    titleAuthorContainer.classList.add("title-author");
    bookTitle.classList.add("book-title");
    bookAuthor.classList.add("book-author");
    bookTitle.textContent = textInputs[0].value;
    bookAuthor.textContent = textInputs[1].value;
    titleAuthorContainer.appendChild(bookTitle);
    titleAuthorContainer.appendChild(bookAuthor);
    book.appendChild(titleAuthorContainer);

    //progress text
    pageProgress.classList.add("page-progress");
    book.appendChild(pageProgress);
    currentText.classList.add("current-page-text");
    currentPage.classList.add("current-page");
    arrowContainer.classList.add("arrow-container");
    pageProgress.appendChild(currentText);
    pageProgress.appendChild(arrowContainer);
    currentPage.textContent=textInputs[4].value;
    arrowContainer.appendChild(currentPage);

    toggle.checked?currentText.textContent="Current Page":currentText.textContent="Book Completed!"; //change to "book completed" if book done
    
    //arrows 
    arrowUp.setAttribute("src", "images/arrow-up-white.png");
    arrowDown.setAttribute("src", "images/arrow-down-white.png");
    arrowUp.classList.add("arrow");
    arrowUp.classList.add("up");
    arrowDown.classList.add("arrow");
    arrowDown.classList.add("down");
    arrowContainer.appendChild(arrowUp);
    arrowContainer.appendChild(arrowDown);
    
    //divider and text progress
    divider.classList.add("divider");
    divider.textContent="|";
    pageProgress.appendChild(divider);
    

    totalPages.classList.add("total-pages");
    totalPages.textContent=textInputs[3].value;
    pageProgress.appendChild(totalPages);

    //progress bar

    book.appendChild(progressBarContainer);
    progressBarContainer.classList.add("progress-bar-container");

    bar.classList.add("bar");
    progressBarContainer.appendChild(bar);
    barProgress.classList.add("bar-progress");
    bar.appendChild(barProgress);
    percentageComplete = (textInputs[4].value / textInputs[3].value)*100;
    barProgress.style.cssText = `width: ${percentageComplete}%;`;

    if(percentageComplete===100) barProgress.style.background = 'rgb(27, 158, 34)';
    
    arrowFunc(arrowUp,arrowDown, currentPage, textInputs[3].value, barProgress, currentText); //increment and decrement pages

 
    deleteBook(trashBtn, holdDelText);
    editBook(editBtn)

    clearInputs();

}



//Make the add book box appear and disappear
let addBoxBtn = document.querySelector(".add-box-container");
let addBox = document.querySelector(".add-box");
let bgDiv = document.querySelector(".bg-div");
let closeBtn = document.querySelector("close-btn");
let editBookBtn = document.getElementById("edit-book");
addBoxBtn.addEventListener("click", ()=>{
    bgDiv.style.display="block"
    addBox.style.display="block"
    addBookBtn.style.display="block";
    editBookBtn.style.display="none";
})
function deleteBook(trashBtn, text){
    //hold for 3 seconds to delete
    let timer = 0;
    let counter =2;
    let revTimer;
    let interval;

    trashBtn.addEventListener("mouseover", ()=>{
        text.style.display="block"
    })

    trashBtn.addEventListener("mousedown", (e)=>{
    
        interval=setInterval(()=>{
            timer +=1;
            revTimer = counter + timer;
            text.innerText = `Hold for ${revTimer-1} seconds to delete`;
            counter = counter - 2;
            if(timer===3){
                
                let deleteBtns = document.querySelectorAll(".delete-book");
                for(let index=0;index<deleteBtns.length; index++){ //gets the index of each trash can and ultimately each book
                deleteBtns[index].id=index;
                let currentIndex = e.target.id;
                myLibrary.splice(currentIndex,1);
                e.target.parentNode.remove();
                clearInterval(interval);
           }
            }
        },1000)
    })
    trashBtn.addEventListener("mouseup", ()=>{ //didn't know how to simplify.. how the fuk do you add multiple event listeners to same element google that shit after
        clearInterval(interval);
        timer =0;
        counter=2;
        text.innerText = `Hold for 3 seconds to delete`;
    })
    trashBtn.addEventListener("mouseleave", ()=>{
        text.style.display="none"
        clearInterval(interval);
        timer =0;
        counter=2;
        text.innerText = `Hold for 3 seconds to delete`;
    })
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


//closes the book box window if user clicks outside of it
window.addEventListener("click", (e)=>{
    if(e.target.className==="bg-div" || e.target.className ==="close-btn"){
        addBox.style.display="none"
        bgDiv.style.display="none"
    }
})
// Enables Enter key to work as submit button when book box is in display
window.addEventListener("keydown", (e)=>{if(e.key === "Enter" && addBox.style.display==="block"){ checkForm();}})