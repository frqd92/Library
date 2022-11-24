let myLibrary =[];
let addBoxBtn = document.querySelector(".add-box-container");
let addBox = document.querySelector(".add-box");
let bgDiv = document.querySelector(".bg-div");
let closeBtn = document.querySelector("close-btn");
let editBookBtn = document.getElementById("edit-book");
let textInputs = document.querySelectorAll(".form-input");
let addBookBtn = document.getElementById("add-book");
let currentEditIndex=0;

function Book(title,author,url, pagesTotal, read, pagesRead){
    this.title = title; this.author=author; this.url=url; this.pagesTotal=pagesTotal;this.read=read;this.pagesRead=pagesRead;
}
addBookBtn.addEventListener("click", checkForm);


//DON'T FORGET:
//When search bar is selected it should have a shiny outline thing 
// fix bug: when select option is turned off the selected items are deleted(not from library)










//select books 
let navSelectBtn = document.querySelector(".nav-select");
let selectNavMenu = document.querySelector(".select-nav-menu");
let numItemsSelectedText = document.querySelector(".num-items-selected");
let isSelect = false;
navSelectBtn.addEventListener("click",navSelect);
let numItemsSelected = 0;

function navSelect(){
    let selectNavClose = document.querySelector(".close-select-nav");
    let allBooks = document.querySelectorAll(".book");
    if(!isSelect){ //if select button is not selected hide add book nav and show select nav
        addBoxBtn.style.display="none";
        selectNavMenu.style.display="flex";
        let selectAllBtn = document.getElementById("select-nav-all-btn");
        let deselectAllBtn = document.getElementById("deselect-nav-all-btn");


        for(let element of allBooks){
            let selectContainer = document.createElement("div");
            let selectCircle = document.createElement("div");
            element.appendChild(selectContainer);
            element.appendChild(selectCircle);
            selectContainer.classList.add("select-container");
            selectCircle.classList.add("select-circle");

        }
        selectNavClose.addEventListener("click",removeSelectMode);
        isSelect=true;
    }
    else{
        removeSelectMode();
        console.log("hello")
        selectNavClose.removeEventListener("click", removeSelectMode);
    }

    window.addEventListener("keyup", (e)=>{
    if(e.key==="Escape"){
        removeSelectMode();
    }

    

    });


    function removeSelectMode(){
        for(let element of allBooks){
          if(element.querySelector(".select-container")){
            element.querySelector(".select-container").remove();
            element.querySelector(".select-circle").remove();
          }

           }
           addBoxBtn.style.display="flex";
           selectNavMenu.style.display="none";
           selectNavClose.removeEventListener("click", removeSelectMode);
            isSelect=false;

    }
}



// function navSelect(){
//     let allBooks = document.querySelectorAll(".book");
//     if(!isSelect){
//         isSelect = true;
//         addBoxBtn.style.display="none";
//         selectNavMenu.style.display="flex";
//         for(let element of allBooks){
//             let selectContainer = document.createElement("div");
//             let selectCircle = document.createElement("div");
//             // let selectContainers = document.querySelectorAll(".select-container");
//             // let selectedCircles = document.querySelectorAll(".select-circle");
//             selectContainer.classList.add("select-container");
//             selectCircle.classList.add("select-circle");
//             element.appendChild(selectContainer);
//             element.appendChild(selectCircle);
//             selectContainer.addEventListener("click", ()=>{
//                 bookSelection("bookSelect", element);
//             })
//         }

//     }
//     else{
//         isSelect=false;
//         numItemsSelected=0;
//         addBoxBtn.style.display="flex";
//         selectNavMenu.style.display="none";

//         let selectedBooks = document.querySelectorAll(".selected-book");

//         let selectedCirclePoints = document.querySelectorAll(".select-circle-points")

//         for(let index = 0;index<selectContainers.length;index++){
//             selectContainers[index].remove();
//         }
//         for(let index=0; index<selectedBooks.length;index++){
//             selectedBooks[index].remove();
//         }
    
//     }

// }
// selectAllBtn.addEventListener("click", ()=>{
//     bookSelection("selectAll");
//     // let allBooks = document.querySelectorAll(".book");
//     // numItemsSelected=allBooks.length;
//     // numItemsSelected===1?numItemsSelectedText.innerText=`${allBooks.length} item selected`:numItemsSelectedText.innerText=`${allBooks.length} items selected`;               
// });
// deselectAllBtn.addEventListener("click", ()=>{
//     bookSelection("deselectAll");
// })

// function bookSelection(from, elem){
//     let allBooks = document.querySelectorAll(".book");

//     for(let element of allBooks){

//         if(from==="selectAll"){
//             console.log("selectAll")
//             let selectPoint = document.createElement("div");
//             selectPoint.classList.add("select-circle-point");
//             if(element.querySelector(".select-circle-point") ===null){ //check if circle point is there or not
//                 element.appendChild(selectPoint);
//                 element.classList.add("selected-book");
//             }

//         }
//         if(from==="deselectAll"){
//             console.log("deselectAll")
//             element.classList.remove("selected-book");
//                 if(element.querySelector(".select-circle-point") !==null){
//                     let circlePoints = document.querySelectorAll(".select-circle-point");
//                     for(let x=0;x<circlePoints.length;x++){
//                         circlePoints[x].remove();
//                     }

//                 }
//         }
        
//     }

//         if(from ==="bookSelect"){
//             let selectPoint = document.createElement("div");
//             if(!elem.classList.contains("selected-book")){
//                 elem.classList.add("selected-book");
//                 selectPoint.classList.add("select-circle-point");
//                 elem.appendChild(selectPoint);
    

//                 console.log("has select")

//             }
//             else{
//                 selectPoint.remove();
//                 let point = document.querySelector(".select-circle-point");
//                 if(elem.querySelector(".select-circle-point")!==null){
//                    elem.classList.remove("selected-book");
//                    selectPoint.classList.remove("select-circle-point");
//                    point.remove();

//                    console.log("no select")
//                 }
               
//             }
            
//         }
// }






window.addEventListener("click", (e)=>{ //to test
    let target = e.target.textContent;
    if(target==="Library Thing"){
        addDemoBooks();
    }
    if(target==="Stats"){
        console.log(myLibrary)
    }
})


window.addEventListener("keydown", (e)=>{
    let addBoxVis = addBox.style.display;
    if(e.key.match(/[a-z]/gi) && addBoxVis!=="block"){searchBar.focus();} //focusses search bar when users types letters
    })






















// javascript form validation 
function checkForm(e){

    let validityCheck = false;
    let invalidIndex;
    from=e.target.id;
    for(let index=0;index<textInputs.length;index++){

        if(Number(textInputs[3].value)<Number(textInputs[4].value)){
            textInputs[4].setCustomValidity("Invalid");
            textInputs[4].value="";
            textInputs[4].placeholder=`Must be <= than total ${textInputs[3].value}`;
        }
        else{
            textInputs[4].setCustomValidity("");
        }
        if(!textInputs[0].value ||!textInputs[1].value){
            textInputs[0].placeholder="mandatory field"; textInputs[1].placeholder="mandatory field";
        }
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
        createBook(false);
    }
}

function editBook(editBtn, currentPage, text){
    editBtn.addEventListener("mouseover", ()=>{text.style.display ="block";})
    editBtn.addEventListener("mouseleave", ()=>{text.style.display ="none";})
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
       textInputs[3].value = myLibrary[currentIndex].pagesTotal;
       textInputs[4].value = currentPage.textContent;
       textInputs[4].value === textInputs[3].value ? toggle.checked = false:toggle.checked = true;
       toggle.checked?pagesRead.style.visibility="visible":pagesRead.style.visibility="hidden";
       currentEditIndex = currentIndex;
       editBookBtn.addEventListener("click", checkForm);
    })
   }
   
//adds book card after form check passes
function addBookToLibrary(){
    let bookObj = new Book(textInputs[0].value,textInputs[1].value,textInputs[2].value,textInputs[3].value,toggle.checked,textInputs[4].value);
    myLibrary.push(bookObj);
    createBook(true);
}


function createBook(create,tot,aut,url,pagesTot,rd, pagesRe){
        //creates empty book
    let book = document.createElement("div"); //*****
    let bookContainer = document.querySelector(".book-container");
    let trashBtn = document.createElement("img");
    let editBtn = document.createElement("img");
    let holdDelText = document.createElement("p");
    let editHoverText = document.createElement("p");
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
        //edit book stuff
    let bookTitles = document.querySelectorAll(".book-title");
    let bookAuthors = document.querySelectorAll(".book-author");
    let bookCovers = document.querySelectorAll(".book-image");
    let currentPages = document.querySelectorAll(".current-page");
    let currentPageTexts = document.querySelectorAll(".current-page-text");
    let totalPagesEdit = document.querySelectorAll(".total-pages")
    let barProgressEdit = document.querySelectorAll(".bar-progress")
    let percentageEdit = (textInputs[4].value / textInputs[3].value) * 100;
    let arrowContainers = document.querySelectorAll(".arrow-container");


    if(create){
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
        holdDelText.textContent = `Hold 3 seconds to delete`;
        editHoverText.classList.add("hold-edit-text");
        editHoverText.textContent = "Edit";
        book.appendChild(editHoverText);
        book.appendChild(holdDelText);
        let titleField = textInputs[0].value;
        let authorField = textInputs[1].value;
        let imageField = textInputs[2].value;
        let totalField = textInputs[3].value;
        let readField = textInputs[4].value;
        let tog = rd;
        if(tot){ //if demo books
            titleField = tot;
            authorField = aut;
            imageField = url;
            totalField = pagesTot;
            readField = pagesRe;
        }

       
    
        //book cover
        bookCover.setAttribute("alt",`cover of ${titleField}`)
        if(imageField){ //if user inserts an image
            bookCover.setAttribute("src",`${imageField}`)
        }else{ //default image if none is inserted
            bookCover.setAttribute("src","images/book-cover.png") 
        }
        bookCover.classList.add("book-image");
        book.appendChild(bookCover);
    
        //title and author
        titleAuthorContainer.classList.add("title-author");
        bookTitle.classList.add("book-title");
        bookAuthor.classList.add("book-author");
        bookTitle.textContent = titleField;
        bookAuthor.textContent = authorField;
        titleAuthorContainer.appendChild(bookTitle);
        titleAuthorContainer.appendChild(bookAuthor);
        book.appendChild(titleAuthorContainer);
    
        //pages read
        pageProgress.classList.add("page-progress");
        book.appendChild(pageProgress);
        currentText.classList.add("current-page-text");
        currentPage.classList.add("current-page");
        arrowContainer.classList.add("arrow-container");
        pageProgress.appendChild(currentText);
        pageProgress.appendChild(arrowContainer);
        currentPage.textContent=readField;
        arrowContainer.appendChild(currentPage);
    

        readField<totalField ? currentText.textContent="Current Page":currentText.textContent="Book Completed!"; 

        
   

        //arrows 
        arrowUp.setAttribute("src", "images/arrow-up-white.png");
        arrowDown.setAttribute("src", "images/arrow-down-white.png");
        arrowUp.classList.add("arrow");
        arrowUp.classList.add("up");
        arrowDown.classList.add("arrow");
        arrowDown.classList.add("down");
        arrowContainer.appendChild(arrowUp);
        arrowContainer.appendChild(arrowDown);
        
        //divider and pages total
        divider.classList.add("divider");
        divider.textContent="|";
        pageProgress.appendChild(divider);
        
    
        totalPages.classList.add("total-pages");
        totalPages.textContent=parseInt(totalField);
        pageProgress.appendChild(totalPages);
    
        //progress bar
    
        book.appendChild(progressBarContainer);
        progressBarContainer.classList.add("progress-bar-container");
    
        bar.classList.add("bar");
        progressBarContainer.appendChild(bar);
        barProgress.classList.add("bar-progress");
        bar.appendChild(barProgress);
        percentageComplete = (readField / totalField)*100;
        barProgress.style.cssText = `width: ${percentageComplete}%;`;
        if(percentageComplete===100) barProgress.style.background = 'rgb(27, 158, 34)';
       
        arrowFunc(arrowUp,arrowDown, currentPage, totalField, barProgress, currentText); 

    }

    if(!create){
        myLibrary[currentEditIndex].title = textInputs[0].value;
        myLibrary[currentEditIndex].author = textInputs[1].value;
        myLibrary[currentEditIndex].url = textInputs[2].value;
        myLibrary[currentEditIndex].checked = toggle.checked;
        myLibrary[currentEditIndex].pagesTotal= textInputs[3].value;
        myLibrary[currentEditIndex].pagesRead = textInputs[4].value;
        //edit title and author
        //edit image url
        bookTitles[currentEditIndex].textContent = textInputs[0].value;
        bookAuthors[currentEditIndex].textContent = textInputs[1].value;
        if(textInputs[2].value){ 
            bookCovers[currentEditIndex].setAttribute("src",`${textInputs[2].value}`)
        }else{ 
            bookCovers[currentEditIndex].setAttribute("src","images/book-cover.png") 
        }
    
        //edit progress text

        toggle.checked?currentPageTexts[currentEditIndex].textContent="Current Page":currentPageTexts[currentEditIndex].textContent="Book Completed!";
    
        let arrowsUpDel = document.querySelectorAll(".up");
        let arrowsDownDel = document.querySelectorAll(".down");
        arrowsUpDel[currentEditIndex].remove();
        arrowsDownDel[currentEditIndex].remove();

        let newArrowUp = document.createElement("img");
        let newArrowDown = document.createElement("img");
        newArrowUp.setAttribute("src", "images/arrow-up-white.png");
        newArrowDown.setAttribute("src", "images/arrow-down-white.png");
        newArrowUp.classList.add("arrow");
        newArrowUp.classList.add("up");
        newArrowDown.classList.add("arrow");
        newArrowDown.classList.add("down");
        arrowContainers[currentEditIndex].appendChild(newArrowUp);
        arrowContainers[currentEditIndex].appendChild(newArrowDown);

        currentPages[currentEditIndex].textContent = parseInt(textInputs[4].value);
        totalPagesEdit[currentEditIndex].textContent = parseInt(textInputs[3].value);
        

        barProgressEdit[currentEditIndex].style.cssText = `width: ${percentageEdit}%;`;
        if(percentageEdit ===100) barProgressEdit[currentEditIndex].style.background = 'rgb(27, 158, 34)';
        
        arrowFunc(newArrowUp,newArrowDown, currentPages[currentEditIndex], textInputs[3].value, barProgressEdit[currentEditIndex], currentPageTexts[currentEditIndex]); 


    }
    editBook(editBtn,currentPage,editHoverText);
    deleteBook(trashBtn, holdDelText);

    if(create){clearInputs();}
    if(!create){bgDiv.style.display="none"; addBox.style.display="none"}
}

//Make the add book box appear and disappear
addBoxBtn.addEventListener("click", ()=>{
    clearInputs();
    bgDiv.style.display="block"
    addBox.style.display="block"
    addBookBtn.style.display="block";
    editBookBtn.style.display="none";
})



function arrowFunc(up, down,page, total, barProgress, text){
   function getIndex(){
   //to update pages read changes from arrows to the library
    let allArrowsUp = document.querySelectorAll(".up");
    let allArrowsDown = document.querySelectorAll(".down")
    for(let x=0;x<allArrowsUp.length;x++){
        allArrowsUp[x].id=`${x}`;
        allArrowsDown[x].id=`${x}`;
    }
    
   }
    up.addEventListener("mousedown", incrementFunc);
    function incrementFunc(e){
        let tar = e.target.id;
        getIndex();
        if(page.textContent<parseInt(total)){
            page.textContent = Number(page.textContent) + 1;
            if(myLibrary[tar]){
                myLibrary[tar].pagesRead=page.textContent;
            }
       
        }
        updateProgressBar(page.textContent,total, barProgress, text);
    }   
    down.addEventListener("mousedown", decrementFunc);
    function decrementFunc(e){
        let tar = e.target.id;
        getIndex();
        if(page.textContent>0){
            page.textContent = page.textContent - 1;
            myLibrary[tar].pagesRead=page.textContent;
        }
        updateProgressBar(page.textContent, total, barProgress, text);
    }
    function updateProgressBar(currentPage, total, barProgress, text){
    let percentageComplete = (currentPage/total)*100;
    barProgress.style.cssText = `width: ${percentageComplete}%;`;
    percentageComplete===100 ? barProgress.style.background = 'rgb(27, 158, 34)' : barProgress.style.background = 'rgb(107, 122, 209)';
    percentageComplete<100 ? text.textContent = "Current Page" : text.textContent="Book Completed!";
    }
}

function deleteBook(trashBtn, text){
    //hold for 3 seconds to delete
    let timer = 0;
    let counter =2;
    let revTimer;
    let interval;

    trashBtn.addEventListener("mouseover", ()=>{
        text.style.display="block"
        text.style.color="rgb(180, 92, 97)";
    })
    trashBtn.addEventListener("mousedown", (e)=>{
        interval=setInterval(()=>{
            timer +=1;
            revTimer = counter + timer;
            text.innerText = `Hold ${revTimer-1} seconds to delete`;
            counter = counter - 2;
            switch(timer){
                case 1: text.style.color="rgb(199, 45, 45)"; break;
                case 2: text.style.color="red"; break;
            }
            if(timer===3){
            let deleteBtns = document.querySelectorAll(".delete-book");
                for(let index=0;index<deleteBtns.length; index++){ //gets the index of each trash can and ultimately each book
                    deleteBtns[index].id=index;
                }
                let currentIndex = e.target.id;
                myLibrary.splice(currentIndex,1);
                e.target.parentNode.remove();
                clearInterval(interval);
            }
        },1000)
    })
    trashBtn.addEventListener("mouseup", ()=>{
        clearInterval(interval);
        timer =0;
        counter=2;
        text.innerText = `Hold 3 seconds to delete`;
        text.style.color="rgb(180, 92, 97)";
    })
    trashBtn.addEventListener("mouseleave", ()=>{
        text.style.display="none"
        clearInterval(interval);
        timer =0;
        counter=2;
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
    let tar = e.target.className;
    if(
        tar==="bg-div"||
        tar ==="close-btn"||
        tar ==="search"||
        e.target.id==="search-bar"||
        e.target.id==="selected-option"
        ){
        addBox.style.display="none"
        bgDiv.style.display="none"
    }
})



//search bar functionality 
let searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", searchBarFunc);

searchBar.addEventListener("focus",searchBarFunc);
function searchBarFunc(){
    let allBooks= document.querySelectorAll(".book");
    let barText = searchBar.value;
    let bookTitles = document.querySelectorAll(".book-title");
    let bookAuthors = document.querySelectorAll(".book-author");

    if(option==="title"){
        searchBy(bookTitles);
    }
    else if(option==="author"){
        searchBy(bookAuthors);
    }
    function searchBy(element){
        if(barText){
            for(let index in allBooks){
                    if(element[index].textContent!==undefined){
                        if(element[index].textContent.match(/[a-z!?]/gi).join("").toLowerCase().includes(barText.toLocaleLowerCase().replace(/\s/g, "").match(/[a-z!?]/gi).join(""))){
                            allBooks[index].style.display="grid";
                        }
                        else{allBooks[index].style.display="none";}
                    }
            }
            }
            else{
                    for(let index in allBooks){
                        if(element[index].textContent!==undefined){
                            allBooks[index].style.display="grid";
                        }
                    }
                }
    }

}



let selectActive = false;
let option = "title";
let selectDropOption = document.querySelector(".option-2");
let selectArrow = document.getElementById("down-select");
let selectDrop = document.querySelector(".search-drop-down");
//main drop down button
selectDrop.addEventListener("click", ()=>{
    if (!selectActive){
        selectActive=true;
        selectDropOption.classList.add("option-2-drop");
        selectArrow.classList.add("down-animation");
    }
    else if(selectActive){
      removeDropDown();

    }
    searchBar.addEventListener("focus",removeDropDown);
    searchBar.addEventListener("click", removeDropDown)


    function removeDropDown(){
        selectDropOption.classList.remove("option-2-drop");
        selectArrow.classList.remove("down-animation");
        selectActive=false;
    }
},true)
//the hidden option
let otherOption = document.getElementById("other-option");
otherOption.addEventListener("click", ()=>{
    selectDropOption.classList.remove("option-2-drop");
    let selectedOption = document.getElementById("selected-option");
   
    if(option==="title"){
        selectedOption.textContent="Author";
        otherOption.textContent="Title"
        option="author";
        searchBar.placeholder="Search by author";
    }
    else{
        selectedOption.textContent="Title";
        otherOption.textContent="Author"
        option="title";
        searchBar.placeholder="Search by title";
    }
    searchBar.focus();
})

//addBook hover effect bullshit
window.onload = function addBookBtnEffects(){
    let plusSign = document.getElementById("plus-svg");
    let addBookText = document.getElementById("add-book-text");

    addBoxBtn.addEventListener("mouseover", ()=>{
        plusSign.classList.add("plus-effect");
        plusSign.style.marginLeft='10px';
        addBookText.style.transform='scale(1.1)';
    })
    addBoxBtn.addEventListener("mouseleave", ()=>{
        plusSign.classList.remove("plus-effect");
        addBookText.style.transform= 'scale(1)';
        plusSign.style.marginLeft='0px';
    })
    addBoxBtn.addEventListener("mousedown", ()=>{
        addBookText.style.transform= 'scale(1)';
        plusSign.style.marginLeft='0px';
   
    })
}




function addDemoBooks(){
    let demoArray = [
        {title: "The Short-Timers", author: "Gustav Hasford", url: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/The_Short_timers_Cover.jpg/220px-The_Short_timers_Cover.jpg', pagesTotal:192, read:true, pagesRead: 69},
        {title: "The Illuminatus! Trilogy", author: "Robert Shea, Robert Anton Wilson", url: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Illuminatus1sted.jpg', pagesTotal: 805, read:true, pagesRead: 420},
        {title: "Lullaby", author: "Chuck Palahniuk", url:'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Lullabycvr.jpg/220px-Lullabycvr.jpg', pagesTotal: 272, read: false, pagesRead: 272},
        {title: "Flowers for Algernon", author: "Daniel Keyes", url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/FlowersForAlgernon.jpg/220px-FlowersForAlgernon.jpg', pagesTotal: 311, read:true, pagesRead: 32},
        {title: "Prometheus Rising", author: "Robert Anton Wilson", url: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/PrometheusRisingCover.jpg/220px-PrometheusRisingCover.jpg', pagesTotal:262 , read:false, pagesRead:262 },
        {title: "If on a Winter's Night a Traveler", author: "Italo Calvino", url: 'https://pictures.abebooks.com/isbn/9780749399238-us.jpg', pagesTotal: 260, read:true, pagesRead:34},
        {title: "A Scanner Darkly", author: "Philip K. Dick", url: 'https://upload.wikimedia.org/wikipedia/en/2/27/AScannerDarkly%281stEd%29.jpg', pagesTotal: 220 , read:false , pagesRead: 220},
        {title: "Eloquent Javascript", author: "Marijn Haverbeke", url: 'https://m.media-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg', pagesTotal: 472 , read: true, pagesRead: 98},
        {title: "The Pragmatic Programmer", author: "Andy Hunt, Dave Thomas", url: 'https://kbimages1-a.akamaihd.net/63002aee-af94-4a52-b41c-3bbb6bc2c6f6/1200/1200/False/pragmatic-programmer-the-1.jpg', pagesTotal: 320 , read:true, pagesRead: 0}
    ]
    for(let index in demoArray){
        let bookObj = new Book(demoArray[index].title, demoArray[index].author, demoArray[index].url, demoArray[index].pagesTotal, demoArray[index].read, demoArray[index].pagesRead);
        myLibrary.push(bookObj);
        createBook(true, demoArray[index].title, demoArray[index].author, demoArray[index].url, demoArray[index].pagesTotal, demoArray[index].read, demoArray[index].pagesRead);

    }

}


