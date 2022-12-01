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

window.addEventListener("click", (e)=>{ //to test
    let target = e.target.textContent;
    if(target==="Library Thing"){
        addDemoBooks();
    }
    if(target==="Title"){
        console.log(myLibrary)
    }
})

//DON'T FORGET:
//When search bar is selected it should have a shiny outline thing 
//fix when users use search bar and then click select all, selects files that are invisible also
//style select menu buttons
//yes no labels on toggle not working properly on edit windows




//bullshit mode toggle effect
let modeToggle = document.querySelector(".toggle-in");

modeToggle.addEventListener("change", tableMode);
function toggleEffectMode(){
    let movingTextMode = document.querySelector(".moving-text-mode-yes");
    if(modeToggle.checked){
        movingTextMode.textContent="Table"
        movingTextMode.classList.add("moving-text-mode-no");
     
    }
    else{
        movingTextMode.textContent="Grid";
        movingTextMode.classList.remove("moving-text-mode-no");
    }
}



//Table Mode
let navSettingsBtn = document.querySelector(".nav-settings");
let bookTable = document.querySelector(".book-table");


let gridMode = true;
function tableMode(){
    let boxContainer = document.querySelector(".book-container")
    let books = document.querySelectorAll(".book");
    let rows = document.querySelectorAll(".table-row");
    for(let element of books){
        element.remove();
    }
    if(isSelect===true){

        navSelect("toggle-sel");
        checkIfEmpty();
        document.querySelector(".nav-select").style.background="";
        addBoxBtn.style.display="flex";
        selectNavMenu.style.display="none";
        isSelect=false;
    }
    toggleEffectMode()
    if(!boxContainer.classList.contains("book-container-grid") && gridMode===true){
        if(myLibrary.length>0){
            for(let index = 0; index<myLibrary.length;index++){
                designTable(myLibrary[index].url, myLibrary[index].title, myLibrary[index].author, myLibrary[index].pagesTotal,myLibrary[index].pagesRead, myLibrary[index].read)
            }
        }

        gridMode= false;
        boxContainer.classList.add("book-container-grid");
        if(bookTable.children.length>1){
            bookTable.style.display="flex";
        }
    }

    else{
        bookTable.style.display="none";
        gridMode=true;
        boxContainer.classList.remove("book-container-grid");
        for(let index=0;index<rows.length;index++){
            if(index!==0){
                rows[index].remove();
            }
         
        }
        for(let index = myLibrary.length-1; index>=0;index--){
            createBook(true, myLibrary[index].title, myLibrary[index].author, myLibrary[index].url, myLibrary[index].pagesTotal, myLibrary[index].read, myLibrary[index].pagesRead )
        }
       
    }
    

}


function designTable(url, title, author, totPages, readPages, read, value){
    
    let bookTable = document.querySelector(".book-table");
    let tableRow = document.createElement("div");
    tableRow.classList.add("table-row")
    tableRow.classList.add("table-body")
    let barProgress = document.querySelector(".bar-progress-table")
    for(let index = 0;index<7;index++){
        let div = document.createElement("div");
        div.classList.add("body-field");
        switch(index){
            case 0:
                div.classList.add("table-image-cnt");
                let img = document.createElement("img");
                img.classList.add("table-book-img");
                if(url){
                    img.setAttribute("src", url)      
                }
                else{
                    img.setAttribute("src", "images/book-cover.png")  
                }
                img.addEventListener("mouseover", (e)=>{imageHover(e)})
                div.appendChild(img);
                break;
            case 1: 
                div.classList.add("table-title");
                div.textContent=title;
                break;
            case 2: 
                div.classList.add("table-author");
                div.textContent=author;
                break;
            case 3:
                div.classList.add("table-pages");
                div.textContent=totPages;
                break;
            case 4:
                div.classList.add("table-pages-read");
                let arrowTable = document.createElement("div");
                arrowTable.classList.add("arrows-table");
                div.appendChild(arrowTable);
                let p = document.createElement("p");
                div.appendChild(p);
                p.classList.add("read-table-text-fuck")
                p.textContent=readPages;
                let arrowUp = document.createElement("img");
                let arrowDown = document.createElement("img");
                arrowUp.setAttribute("src", "images/arrow-up-white.png");
                arrowUp.classList.add("up-table")
                arrowDown.setAttribute("src", "images/arrow-down-white.png");
                arrowDown.classList.add("down-table")
                arrowTable.appendChild(arrowUp);
                arrowTable.appendChild(arrowDown);
                arrowFuncTable(arrowUp, arrowDown, p, totPages,barProgress,  true);
                break;
            case 5: 
                div.classList.add("table-progress");
                let progText = document.createElement("div")
                progText.classList.add("progress-text-table");
                let percentage = Math.floor(parseInt(readPages)/parseInt(totPages)*100)
                progText.textContent = `${percentage}%`;
                div.appendChild(progText);
                let barContainer = document.createElement("div");
                barContainer.classList.add("progress-bar-container-table");
                div.appendChild(barContainer);
                let barOut = document.createElement("div");
                barOut.classList.add("bar-table");
                barContainer.appendChild(barOut);
                let barIn = document.createElement("div");
                barIn.classList.add("bar-progress-table");
                barOut.appendChild(barIn);
                barIn.style.cssText = `width: ${percentage}%;`;
                percentage===100 ? barIn.style.background = 'rgba(151, 240, 179, 0.604)' : barIn.style.background = 'rgb(107, 122, 209);';
                break;
            case 6:
                div.classList.add("table-other");
                let imgDel = document.createElement("img");
                imgDel.setAttribute("src","images/delete-white.png" )
                imgDel.classList.add("table-delete");
                let imgEdit = document.createElement("img");
                imgEdit.setAttribute("src", "images/application-edit-white.png");
                imgEdit.classList.add("table-edit");
                div.appendChild(imgEdit);
                div.appendChild(imgDel);
                //del and edit hover text
                let delTextTable = document.createElement("p");
                delTextTable.classList.add("table-delete-text");
                delTextTable.textContent = `Hold 3 seconds to delete`;
                div.appendChild(delTextTable);
                deleteBook(imgDel, delTextTable);
                //edit
                let editTextTable = document.createElement("p");
                editTextTable.classList.add("table-edit-text");
                editTextTable.textContent="Edit";
                div.appendChild(editTextTable);
                editBook(imgEdit, readPages, editTextTable);
                break;
            }
            tableRow.appendChild(div)
    }
    if(value){
        bookTable.appendChild(tableRow)
        changeOrder();
        // bookTable.appendChild(tableRow);
        // let topElement = document.querySelectorAll(".table-row")[1];
        // let bottomElement = document.querySelectorAll(".table-row")[bookTable.children.length-1];
        // let parent = topElement.parentNode;
        // parent.insertBefore(bottomElement, topElement);
    }
    else{
        bookTable.appendChild(tableRow)
    }


}

function changeOrder(){
    ;
        let topElement = document.querySelectorAll(".table-row")[1];
        let bottomElement = document.querySelectorAll(".table-row")[bookTable.children.length-1];
        let parent = topElement.parentNode;
        parent.insertBefore(bottomElement, topElement);
    
    }

    
function editTableMode(url, title, author, total, pagesRead, read ){

    myLibrary[currentEditIndex].title = textInputs[0].value;
    myLibrary[currentEditIndex].author = textInputs[1].value;
    myLibrary[currentEditIndex].url = textInputs[2].value;
    myLibrary[currentEditIndex].read = toggle.checked;
    myLibrary[currentEditIndex].pagesTotal= textInputs[3].value;
    myLibrary[currentEditIndex].pagesRead = textInputs[4].value;
    console.log(myLibrary[currentEditIndex].checked)
    let bookCovers = document.querySelectorAll(".table-book-img");
 
    if(textInputs[2].value){ 
        bookCovers[currentEditIndex].setAttribute("src",`${textInputs[2].value}`)
    }
    else{ 
        bookCovers[currentEditIndex].setAttribute("src","images/book-cover.png") 
    }

    document.querySelectorAll(".table-title")[currentEditIndex].textContent = textInputs[0].value; 
    document.querySelectorAll(".table-author")[currentEditIndex].textContent = textInputs[1].value; 
    document.querySelectorAll(".table-pages")[currentEditIndex].textContent = textInputs[3].value; 
    document.querySelectorAll(".read-table-text-fuck")[currentEditIndex].textContent = textInputs[4].value;

    let curr = document.querySelectorAll(".read-table-text-fuck")[currentEditIndex]; //change 0
    let tot = document.querySelectorAll(".table-pages")[currentEditIndex];
    let arrowContainers = document.querySelectorAll(".arrows-table");

    let arrowsUpDel = document.querySelectorAll(".up-table");
    let arrowsDownDel = document.querySelectorAll(".down-table");


    arrowsUpDel[currentEditIndex].remove();
    arrowsDownDel[currentEditIndex].remove();
    let newArrowUp = document.createElement("img");
    let newArrowDown = document.createElement("img");
    newArrowUp.setAttribute("src", "images/arrow-up-white.png");
    newArrowDown.setAttribute("src", "images/arrow-down-white.png");
    newArrowUp.classList.add("up-table");
    newArrowDown.classList.add("down-table");


    arrowContainers[currentEditIndex].appendChild(newArrowUp);
    arrowContainers[currentEditIndex].appendChild(newArrowDown);
   

    arrowFuncTable(newArrowUp, newArrowDown, curr, parseInt(tot.textContent));
    progressBarTable(currentEditIndex);

    }


function imageHover(e){ //incomplete
    getIndex("image")//everytime mouse leaves image and you added a book the index would change and hovered image order would be fucked
    let images = document.querySelectorAll(".table-book-img");
    for(let index=0;index<images.length;index++){
        images[index].id=index;
    }
    let tar = e.target.id;
    let imageContainer = document.querySelectorAll(".table-image-cnt");
    let hoverImg = document.createElement("img");
    hoverImg.classList.add("hover-img-table");
    hoverImg.setAttribute("src", `${myLibrary[tar].url}`)
    imageContainer[tar].appendChild(hoverImg);
    
    images[tar].addEventListener("mouseleave", ()=>{
        hoverImg.remove();
        getIndex("image")
    })

}

function arrowFuncTable(up, down, current, total){

    up.addEventListener("mousedown", (e)=>{
        getIndex("table");
        let tar = e.target.id;
        let crntPage= parseInt(current.textContent);
        if(crntPage<total){
           current.textContent= crntPage + 1;
           if(myLibrary[tar]){
            myLibrary[tar].pagesRead=current.textContent;
        }
        }
        if(current.textContent==total && myLibrary[tar] !== undefined ){
            myLibrary[tar].read=false;
        }
        progressBarTable(tar)
    })

    down.addEventListener("mousedown", (e)=>{
        getIndex("table");
        let tar = e.target.id;
        let crntPage= current.textContent;
        if(crntPage>0){
            current.textContent = current.textContent - 1;
            myLibrary[tar].pagesRead=current.textContent;
        }
        if(crntPage<(parseInt(total)+1)){ //+1 because of fucking header row, next time make header separate fuuuuck
            myLibrary[tar].read=true;
        }
        else{
            myLibrary[tar].read=false;
        }
        progressBarTable(tar)

    })


}
function progressBarTable(tar){
    let read = parseInt(document.querySelectorAll(".read-table-text-fuck")[tar].textContent)
    let total = parseInt(document.querySelectorAll(".table-pages")[tar].textContent)
    let text = document.querySelectorAll(".progress-text-table")[tar];
    let percentage = (read/total) * 100;
    
    text.textContent=`${Math.floor(percentage)}%`;
    

    let barProgress = document.querySelectorAll(".bar-progress-table")[tar];
    barProgress.style.cssText = `width: ${percentage}%;`;
    percentage===100 ? barProgress.style.background = 'rgba(151, 240, 179, 0.604)' : barProgress.style.background = 'rgb(107, 122, 209);';

}


//table header scroll effect thing
window.addEventListener('scroll',()=>{
    let headerCell = document.querySelectorAll(".header-field");
    let tableHeader = document.querySelector(".table-header");
    let scroll = window.scrollY;
    scroll>51?tableHeader.classList.add("header-border-scroll"):tableHeader.classList.remove("header-border-scroll");

    if(scroll>=50 && scroll<100){
        let numBg = Math.abs((53-scroll) / 53).toFixed(3) ;
        let numBr = numBg / 2.32;
        tableHeader.style.background = ` linear-gradient(to right, rgba(40, 40, 114, ${numBg}), rgba(42, 45, 140, ${numBg}), rgba(12, 21, 65, ${numBg})`
        for(element of headerCell){
            element.style.borderLeft = ` 0.5px solid rgba(248, 248, 248, ${numBr})`
        }
    }
    else if (scroll<50){
        tableHeader.style.background = `none`
        for(element of headerCell){
            element.style.borderLeft = ` none`
        }
    }
    else if(scroll > 100){
        tableHeader.style.background = ` linear-gradient(to right, rgba(40, 40, 114, 0.92), rgba(42, 45, 140,0.85), rgba(12, 21, 65, 0.92)`
        for(element of headerCell){
            element.style.borderLeft = ` 0.5px solid rgba(248, 248, 248, 0.37)`
        }
    }
})




//Book stats Menu
let statMenu = document.querySelector(".stats");//change to button
let statMenuBtn = document.querySelector(".nav-stats");
let statMode = false;
statMenuBtn.addEventListener("click", ()=>{
    let allBooks = document.querySelectorAll(".book");
    let allBooksTab = document.querySelectorAll(".table-row")
    if(gridMode && !document.querySelector(".book") ){
        checkIfEmpty("nav");
    }
    else if(document.querySelectorAll(".table-row").length<2){     
        checkIfEmpty("table");
    }
    if(allBooks.length>0 || allBooksTab.length>1){
        if(!statMode){
            document.querySelector(".nav-stats").style.background="rgba(80, 80, 97, 0.28)";
            statMenu.classList.add("stats-shown");   //for unnecessary animation
            statMode=true;
            statMenu.style.cssText=``;
        }
        else{
            statMenu.style.cssText=` animation: statAnimOut .4s ease-out;`;
            document.querySelector(".nav-stats").style.background="";
            statMode=false;
            setTimeout(()=>{statMenu.classList.remove("stats-shown");},300)
            statMenu.innerHTML="";
        }
        calcStats();
    }

    function calcStats(){
         if(statMenu.childNodes!==0){
            statMenu.innerHTML="";
       }
      
        gridMode?statMode(allBooks):statMode(allBooksTab);
        function statMode(books){
            let totalPages = 0;
            let totalRead = 0;
            let totalLeft= 0;
            let totalBooks= books.length;
            if(!gridMode){totalBooks-=1} //minus the header row

            for(let index = 0;index<totalBooks;index++){       
                //total pages
                totalPages +=Number(myLibrary[index].pagesTotal);
                //total completed books
                myLibrary[index].read===false?totalRead++:totalLeft++; 
            }
            //longest book  //shortest book
            let libraryCopy = [...myLibrary]; //need to use spread not to mess with original
            libraryCopy.sort((a,b) => a.pagesTotal - b.pagesTotal);
            let longestBook = libraryCopy[libraryCopy.length-1].title;
            let shortestBook = libraryCopy[0].title;
            let statArr = [totalBooks, totalRead, totalLeft,totalPages, longestBook, shortestBook];
            for(let index=0;index<6;index++){
                let div = document.createElement("div");
                let left = document.createElement("p");
                let right = document.createElement("p");
                div.appendChild(left);
                div.appendChild(right);
                div.classList.add("stats-div")
                left.classList.add("stats-left");
                right.classList.add("stats-right");
                statMenu.appendChild(div);
                switch(index){
                    case 0:left.textContent = "Total Books"; break;
                    case 1: left.textContent = "Books Read"; break;
                    case 2: left.textContent = "Books Not Read"; break;
                    case 3: left.textContent = "Total Pages"; break;
                    case 4: left.innerHTML = `Longest Book <sup>${libraryCopy[libraryCopy.length-1].pagesTotal} pages</sup>`; break;
                    case 5: left.innerHTML = `Shortest Book <sup>${libraryCopy[0].pagesTotal} pages</sup>`; break;
                }
                right.textContent=statArr[index];
            }
        }
    }
    

})



document.addEventListener("mousedown", (e)=>{
    let tar= e.target;
    if(tar.textContent==="Stats" || tar.className==="nav-btn nav-stats"){return;}
    if(!tar.closest(".stats")){
        statMenu.style.cssText=` animation: statAnimOut .4s ease-out;`;
        document.querySelector(".nav-stats").style.background="";
        setTimeout(()=>{document.querySelector(".stats").classList.remove("stats-shown");},300)
        statMode=false;
    }
})

function bookSelectionTable(index){
    let allRows = document.querySelectorAll(".table-body");
    let numItemsSelectedText = document.querySelector(".num-items-selected");
    if(!allRows[index].classList.contains("selected-book-table")){
        allRows[index].classList.add("selected-book-table");
        numItemsSelected++;
    }
    else{
        allRows[index].classList.remove("selected-book-table");
        numItemsSelected--;
    }
    switch(numItemsSelected){
        case 0: numItemsSelectedText.textContent = "No items selected";break;
        case 1: numItemsSelectedText.textContent = `${numItemsSelected} item selected`; break;
        default: numItemsSelectedText.textContent = `${numItemsSelected} items selected`;
        }
}

function selectAllTable(){
    let allRows = document.querySelectorAll(".table-body");
    for(let element of allRows){
        if(!element.classList.contains("selected-book-table")){
            element.classList.add("selected-book-table");
        }
    }
    numItemsSelected=allRows.length;
    numItemsSelected===1?numItemsSelectedText.textContent = `${numItemsSelected} item selected`:numItemsSelectedText.textContent = `${numItemsSelected} items selected`;
}

function deselectAllTable(){
    let allRows = document.querySelectorAll(".table-body");

      for(let element of allRows){
        if(element.classList.contains("selected-book-table")){
            element.classList.remove("selected-book-table");
        }
    }
    numItemsSelected=0;
    numItemsSelectedText.textContent = `No items selected`;
}









let numItemsSelectedText = document.querySelector(".num-items-selected");
//all the select option logic
let navSelectBtn = document.querySelector(".nav-select");
let selectNavMenu = document.querySelector(".select-nav-menu");
let isSelect = false;
let numItemsSelected = 0;
navSelectBtn.addEventListener("click",navSelect);
function navSelect(from){
    let selectNavClose = document.querySelector(".close-select-nav");
    let selectAllBtn = document.getElementById("select-nav-all-btn");
    let deselectAllBtn = document.getElementById("deselect-nav-all-btn");
    let deleteSelectionBtn = document.getElementById("delete-select");
    let allBooks = document.querySelectorAll(".book");
    if(!gridMode){
        allBooks = document.querySelectorAll(".table-body");
    }
    if(allBooks.length===0){
        checkIfEmpty("navBtn")
    };
        if(from==="toggle"){
        gridMode?removeSelectMode(): removeSelectModeTable();
        return;

    }

    if(gridMode){
        if(!isSelect && allBooks.length>0 ){ //if select button is not selected hide add book nav and show select nav
            let index = 0;
            addBoxBtn.style.display="none";
            selectNavMenu.style.display="flex";
            document.querySelector(".nav-select").style.background="rgba(80, 80, 97, 0.28)";
            for(let element of allBooks){
                let selectPoint = document.createElement("div");
                let selectContainer = document.createElement("div");
                let selectCircle = document.createElement("div");
                selectCircle.classList.add("select-circle");
                selectPoint.classList.add("select-circle-point")
                selectPoint.classList.add("circle-point-shown");
                element.appendChild(selectContainer);
                element.appendChild(selectCircle);
                element.appendChild(selectPoint);
                selectContainer.classList.add("select-container");
                selectContainer.id=index;
                selectContainer.addEventListener("click", (e)=>{
                    bookSelection(e.target.id, selectPoint);
                 })
                 element.querySelector(".delete-book").style.opacity="0.2";
                 element.querySelector(".edit-book").style.opacity="0.2";
                 element.querySelector(".book-image").style.opacity="0.6";
              
                index++;
            }
            selectAllBtn.addEventListener("click", selectAll);
            deselectAllBtn.addEventListener("click", deselectAll);
            deleteSelectionBtn.addEventListener("click", deleteSelected);
            selectNavClose.addEventListener("click", removeSelectMode);
    
            function deleteSelected(){ //delete all selected books
                let allBooks = document.querySelectorAll(".book");
                let boxContainer = document.querySelector(".book-container")
                let index=0;
          
                for(let element of allBooks){
                    if(element.classList.contains("selected-book")){
                        element.remove();
                        myLibrary.splice(index,1);
                        index--;
                    };
                    index++;
                }
                index=0;
                numItemsSelected=0;
                numItemsSelectedText.textContent = `No items selected`;
                if(boxContainer.querySelector(".book")===null){
                    removeSelectMode();
                    checkIfEmpty();
                    selectAllBtn.removeEventListener("click", selectAll);
                    deselectAllBtn.removeEventListener("click", deselectAll);
                    deleteSelectionBtn.removeEventListener("click", deleteSelected);
                
                }
            }
    
            window.addEventListener("keyup", (e)=>{if(e.key==="Escape"){removeSelectMode();} });//esc key closes select nav
            isSelect=true;
            }
               
    else{
        deselectAllBtn.removeEventListener("click", deselectAll);
        selectAllBtn.removeEventListener("click", selectAll);
        selectNavClose.removeEventListener("click", removeSelectMode); 
        removeSelectMode(); 
    }    

    
    }
    else{ //table mode
        if(!isSelect && allBooks.length>0){
            console.log("hello")
            let index=0;
            addBoxBtn.style.display="none";
            selectNavMenu.style.display="flex";
            document.querySelector(".nav-select").style.background="rgba(80, 80, 97, 0.28)"
            for(let element of allBooks){
                let selectContainer = document.createElement("div");
                selectContainer.classList.add("select-table"); //where you left off, select color for book select mode
                element.appendChild(selectContainer)
                selectContainer.id=index;
                element.classList.add("table-body-select-mode");
                selectContainer.addEventListener("click", (e)=>{
                    bookSelectionTable(e.target.id);
                 })
        
                element.querySelector(".table-edit").style.opacity="0.2";
                element.querySelector(".table-delete").style.opacity="0.2";
                element.querySelector(".table-book-img").style.opacity="0.6";
                index++;
            }
            selectAllBtn.addEventListener("click", selectAllTable);
            deselectAllBtn.addEventListener("click", deselectAllTable);
            deleteSelectionBtn.addEventListener("click", deleteSelectedTable);
            selectNavClose.addEventListener("click", removeSelectModeTable);

            function deleteSelectedTable(){
                let allRows = document.querySelectorAll(".table-body");
                let selectTables = document.querySelectorAll(".select-table");
                let boxContainer = document.querySelector(".book-container-grid");
                let index = 0;
                for(let element of allRows){
           
                    if(element.classList.contains("selected-book-table")){
                        console.log(index)
                        element.remove();
                        myLibrary.splice(index,1);
                        index--;
                        idRefresh(); //why the fuck do i need this for table mode and not grid mode 
                    }
                    index++;
                }

                index=0;
                numItemsSelected=0;
                numItemsSelectedText.textContent = `No items selected`;
                if(boxContainer.querySelector(".table-body")===null){
                    removeSelectModeTable();
                    checkIfEmpty("selectTable");
                    selectAllBtn.removeEventListener("click", selectAllTable);
                    deselectAllBtn.removeEventListener("click", deselectAllTable);
                    deleteSelectionBtn.removeEventListener("click", deleteSelectedTable);
                }
                function idRefresh(){
                    let selectTables = document.querySelectorAll(".select-table");
                    let x=0;
                    for (element of selectTables){
                        element.removeAttribute("id");
                        element.id=x;
                        x++;
                      
                    }
                }
            }
            window.addEventListener("keyup", (e)=>{if(e.key==="Escape"){
                removeSelectModeTable();} });//esc key closes select nav
            isSelect=true;
        }
        else{
            deselectAllBtn.removeEventListener("click", deselectAll);
            selectAllBtn.removeEventListener("click", selectAll);
            selectNavClose.removeEventListener("click", removeSelectModeTable); 
            removeSelectModeTable(); 
        }    
    }


    function removeSelectModeTable(){
        document.querySelector(".nav-select").style.background="";
        let allRows = document.querySelectorAll(".table-body");
        let all = document.querySelectorAll(".select-table");
        let index=0;
        for(let element of allRows){
            element.classList.remove("table-body-select-mode");
            element.classList.remove("selected-book-table");
            if(all[index]!==undefined){ //test
                all[index].remove()
            }
            element.querySelector(".table-delete").style.opacity="1";
            element.querySelector(".table-edit").style.opacity="1";
            element.querySelector(".table-book-img").style.opacity="1";
            index++;
        }
        index=0;
        addBoxBtn.style.display="flex";
        selectNavMenu.style.display="none";
        selectNavClose.removeEventListener("click", removeSelectModeTable);
        isSelect=false;
        numItemsSelected = 0
        numItemsSelectedText.textContent = "No items selected";
     
    }
    function selectAll(){
        let allBooks = document.querySelectorAll(".book");

        for(let element of allBooks){
       
            if(!element.classList.contains("selected-book")){
                element.classList.add("selected-book");
            
            }
            if(element.querySelector(".circle-point-shown")!==null){
                element.querySelector(".select-circle-point").classList.remove("circle-point-shown");
            }
        }

        numItemsSelected=allBooks.length;
        numItemsSelected===1?numItemsSelectedText.textContent = `${numItemsSelected} item selected`:numItemsSelectedText.textContent = `${numItemsSelected} items selected`;
    }    

    function deselectAll(){
        let allBooks = document.querySelectorAll(".book");
        for(let element of allBooks){
            if(element.classList.contains("selected-book")){
                element.classList.remove("selected-book");
            }
            if(element.querySelector(".circle-point-shown")===null){
                element.querySelector(".select-circle-point").classList.add("circle-point-shown");
            }
        }
    numItemsSelected=0;
    numItemsSelectedText.textContent = `No items selected`;
    }

    function bookSelection(index, point){
    if(!allBooks[index].classList.contains("selected-book")){
        point.classList.remove("circle-point-shown");
        allBooks[index].classList.add("selected-book");
        numItemsSelected++;
        }
    else{
        allBooks[index].classList.remove("selected-book");
        point.classList.add("circle-point-shown");
        numItemsSelected--;
    }
    switch(numItemsSelected){
        case 0: numItemsSelectedText.textContent = "No items selected";break;
        case 1: numItemsSelectedText.textContent = `${numItemsSelected} item selected`; break;
        default: numItemsSelectedText.textContent = `${numItemsSelected} items selected`;
        }
    }

    function removeSelectMode(){
        document.querySelector(".nav-select").style.background="";
    
    for(let element of allBooks){
        if(element.classList.contains("selected-book")){
            element.classList.remove("selected-book")
            element.querySelector(".select-circle-point").remove();
        }

        if(element.querySelector(".select-container")){
            element.querySelector(".select-container").remove();
            element.querySelector(".select-circle").remove();
        }
        if(element.querySelector(".select-circle-point")!==null){
            element.querySelector(".select-circle-point").remove();
        }
        element.querySelector(".delete-book").style.opacity="1";
        element.querySelector(".edit-book").style.opacity="1";
        element.querySelector(".book-image").style.opacity="1";
    }

    addBoxBtn.style.display="flex";
    selectNavMenu.style.display="none";
    selectNavClose.removeEventListener("click", removeSelectMode);
    isSelect=false;
    numItemsSelected = 0
    numItemsSelectedText.textContent = "No items selected"; 
    }
}


function checkIfEmpty(from){
    let main = document.querySelector("main");
    let allBooks = document.querySelectorAll(".book");
    let allRows = document.querySelectorAll(".table-row");
    if(from==="selectTable"){
        bookTable.style.display="none";
        createText(true);
        return;
    }
    if(gridMode){
        if(!allBooks.length){
            createText(true);
            if(from){wiggleText()}
          
        }
        if(from==="toggle-sel"){
            createText(false);
       
        }

        else{
       
            createText(false);
        }
   
    }
    else{
        if(allRows.length>0 && !from){
            createText(false);
            bookTable.style.display="flex";
           
        }
        else{
            wiggleText()
       
        }
    
     
    }

    function createText(is){
        if(is){
            let emptyText = document.createElement("div");
            emptyText.classList.add("empty-text");
            main.appendChild(emptyText);
            emptyText.innerHTML=`Click on <span>Add Book+</span> button or <span>Settings</span> > <span>Add Demo Books</span> to add content...`;
          
        }
        else{
            if(document.querySelector(".empty-text")!==null){
                document.querySelector(".empty-text").remove();
            }      
        }
    }
        function wiggleText(){
            let text = main.querySelector(".empty-text");
            text.classList.add("wiggle-effect");
            setTimeout(()=>{
                text.classList.remove("wiggle-effect");
            }, 400)  
        }
        
    }





//focusses search bar when users types letters
window.addEventListener("keydown", (e)=>{
    let addBoxVis = addBox.style.display;
    if(e.key.match(/[a-z]/gi) && addBoxVis!=="block"){searchBar.focus();} 
    })



// javascript form validation 
function checkForm(e){
    let validityCheck = false;
    let invalidIndex;
    from=e.target.id;
    for(let index=0;index<textInputs.length;index++){
        if(Number(textInputs[3].value)>9999){
            textInputs[3].value="";
            textInputs[3].placeholder="Max 9999 pages";
        }
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
        // checkIfEmpty("main");
        addBookToLibrary()
        clearInputs();
    }
    else if (validityCheck === true && from ==="edit-book" && gridMode===true){
        createBook(false);
    }
    else if (validityCheck === true && from==="edit-book" && gridMode===false){

        editTableMode(textInputs[2].value, textInputs[0].value,textInputs[1].value, textInputs[3].value,textInputs[4].value,toggle.checked, "edit")
      
    }
    checkIfEmpty();
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
       if(!gridMode){
        editBtns = document.querySelectorAll(".table-edit")
       }
  
       for(let index=0;index<editBtns.length; index++){ 
           editBtns[index].id=index;
       }
       let currentIndex = e.target.id;
       textInputs[0].value = myLibrary[currentIndex].title;
       textInputs[1].value = myLibrary[currentIndex].author;
       textInputs[2].value = myLibrary[currentIndex].url;
       textInputs[3].value = myLibrary[currentIndex].pagesTotal;
       let crntP;
       if(!gridMode){
        crntP = document.querySelectorAll(".read-table-text-fuck")[currentIndex].textContent;
       }

       gridMode?textInputs[4].value = currentPage.textContent:textInputs[4].value = crntP;
       textInputs[4].value === textInputs[3].value ? toggle.checked = false:toggle.checked = true;
       toggle.checked?pagesRead.style.visibility="visible":pagesRead.style.visibility="hidden";
       currentEditIndex = currentIndex;
       toggleFunc();
       editBookBtn.addEventListener("click", checkForm);
    })
   }
   
//adds book card after form check passes
function addBookToLibrary(){
    let bookObj = new Book(textInputs[0].value,textInputs[1].value,textInputs[2].value,textInputs[3].value,toggle.checked,textInputs[4].value);
    myLibrary.unshift(bookObj); //changed from push order check if theres bugs
    gridMode===true? createBook(true):designTable(textInputs[2].value, textInputs[0].value,textInputs[1].value, textInputs[3].value,textInputs[4].value,toggle.checked, "add");
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
        bookContainer.prepend(book); //changed from appendchild order check if there's bugs
        //trash and edit buttons
        trashBtn.setAttribute("src", "images/delete-white.png");
        trashBtn.setAttribute("class", "delete-book");
        trashBtn.setAttribute("draggable", "false");
        editBtn.setAttribute("src", "images/application-edit-white.png");
        editBtn.setAttribute("class", "edit-book");
        editBtn.setAttribute("draggable", "false");
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
        bookCover.setAttribute("draggable","false")
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
        arrowUp.setAttribute("draggable", "false");
        arrowUp.classList.add("up");
        arrowDown.classList.add("arrow");
        arrowUp.setAttribute("draggable", "false");
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
        newArrowUp.setAttribute("draggable", "false");
        newArrowDown.setAttribute("draggable", "false");
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
        textInputs[3].value===textInputs[4].value?myLibrary[currentEditIndex].read=false:myLibrary[currentEditIndex].read=true;
        arrowFunc(newArrowUp,newArrowDown, currentPages[currentEditIndex], textInputs[3].value, barProgressEdit[currentEditIndex], currentPageTexts[currentEditIndex]); 


    }
    editBook(editBtn,currentPage,editHoverText);
    deleteBook(trashBtn, holdDelText);

    if(create){clearInputs();}
    if(!create){bgDiv.style.display="none"; addBox.style.display="none";}
    checkIfEmpty();
}

//Make the add book box appear and disappear
addBoxBtn.addEventListener("click", ()=>{
    clearInputs();
    bgDiv.style.display="block"
    addBox.style.display="block"
    addBookBtn.style.display="block";
    editBookBtn.style.display="none";
})

function getIndex(from){
    //to update pages read changes from arrows to the library
    let allArrowsUp, allArrowsDown;
    let allImages = document.querySelectorAll(".table-book-image")
    if(!from){
         allArrowsUp = document.querySelectorAll(".up");
         allArrowsDown = document.querySelectorAll(".down")
         for(let x=0;x<allArrowsUp.length;x++){
            allArrowsUp[x].id=`${x}`;
            allArrowsDown[x].id=`${x}`;
        }
    }
    else if(from==="table"){
         allArrowsUp = document.querySelectorAll(".up-table");
         allArrowsDown = document.querySelectorAll(".down-table")
         for(let x=0;x<allArrowsUp.length;x++){
            allArrowsUp[x].id=`${x}`;
            allArrowsDown[x].id=`${x}`;
        }
    }
    if(from!=="image"){
        for(let x=0;x<allImages.length;x++){
            allImages[x].id=`${x}`;
            allImages[x].id=`${x}`;
        }
    }
    else{
        let images = document.querySelectorAll(".table-book-img");
        for(let index=0;index<images.length;index++){
            images[index].id="";
            images[index].id=index;
        }
    }
    }

function arrowFunc(up, down,page, total, barProgress, text, table){

    up.addEventListener("mousedown", incrementFunc);
    function incrementFunc(e){
        getIndex();
        let tar = e.target.id;
        if(page.textContent<parseInt(total)){
            page.textContent = Number(page.textContent) + 1;
            if(myLibrary[tar]){
                myLibrary[tar].pagesRead=page.textContent;
            }

        }
        if(page.textContent==total && myLibrary[tar] !== undefined ){
            myLibrary[tar].read=false;
        }
        updateProgressBar(page.textContent,total, barProgress, text);
    }   
    down.addEventListener("mousedown", decrementFunc);
    function decrementFunc(e){
        getIndex();
        let tar = e.target.id;
        if(page.textContent>0){
            page.textContent = page.textContent - 1;
            myLibrary[tar].pagesRead=page.textContent;
        }
        if(page.textContent<parseInt(total)){
            myLibrary[tar].read=true;
        }
        updateProgressBar(page.textContent, total, barProgress, text);
    }
    if(gridMode){ //temporary for testing
        function updateProgressBar(currentPage, total, barProgress, text){
            let percentageComplete = (currentPage/total)*100;
            barProgress.style.cssText = `width: ${percentageComplete}%;`;
            percentageComplete===100 ? barProgress.style.background = 'rgb(27, 158, 34)' : barProgress.style.background = 'rgb(107, 122, 209)';
            percentageComplete<100 ? text.textContent = "Current Page" : text.textContent="Book Completed!";
            }
    }

}

function deleteBook(trashBtn, text){
    //hold for 3 seconds to delete
    let timer = 0;
    let counter =2;
    let revTimer;
    let interval;

    trashBtn.addEventListener("mouseover", ()=>{
        text.style.cssText = 
        `border: 0.5px solid rgba(180, 92, 97, 0.5); 
        display: block;
        color: rgb(180, 92, 97);
        `
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
            let deleteBtnsTable = document.querySelectorAll(".table-delete");
            gridMode?getTrashIndex(deleteBtns):getTrashIndex(deleteBtnsTable);
            function getTrashIndex(trashBtns){
                for(let index=0;index<trashBtns.length; index++){ //gets the index of each trash can and ultimately each book
                    trashBtns[index].id=index;
                }
            }
                let currentIndex = e.target.id;

                myLibrary.splice(currentIndex,1);
                if(gridMode){
                    e.target.parentNode.remove() 
                }
                else{
                    let parent = e.target.parentNode;
                    parent.parentNode.remove();
                }
              
        
                clearInterval(interval);
                checkIfEmpty();
        
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
        textInputs[index].setCustomValidity("");
        textInputs[index].style.borderBottom='1px solid rgba(238, 236, 236, 0.3)'
        textInputs[index].value=""
    }
    toggle.checked=false;
    movingText.textContent="Yes";
    pagesRead.style.visibility="hidden";
    movingText.classList.remove("moving-text-no")
}



//add book box toggle
let toggle = document.querySelector('.toggle-input');
let pagesRead = document.querySelector(".pages-read");
let movingText = document.querySelector(".moving-text-yes");
toggle.addEventListener("change",toggleFunc)
function toggleFunc (){
    if(toggle.checked){
        movingText.textContent="No";
        movingText.classList.add("moving-text-no")
        pagesRead.style.visibility="visible"
        if(addBookBtn.style.display==="block"){
            textInputs[4].value =""
        }
    
    }
    else{
        pagesRead.style.visibility="hidden";
        textInputs[4].value=textInputs[3].value ;
        movingText.textContent="Yes";
        movingText.classList.remove("moving-text-no")
    }
}
//validates pages read input with total pages if user has read or not
textInputs[3].addEventListener("focusout", ()=>{
    if(!toggle.checked){
        textInputs[4].value = textInputs[3].value;

    }
})
textInputs[4].addEventListener("input", ()=>{
    if(textInputs[4].value === textInputs[3].value){
        movingText.textContent="Yes";
        movingText.classList.remove("moving-text-no")
        toggle.checked = false;
        pagesRead.style.visibility="hidden"
    }
} )

//closes the book box window if user clicks outside of it
window.addEventListener("click", (e)=>{

    if(e.target.closest(".add-box-container") || 
        e.target.className==="edit-book"||
        e.target.className==="table-edit")
        {
            return;
        }

    if(!e.target.closest(".add-box") || e.target.className==="close-btn"){
        addBox.style.display="none"; bgDiv.style.display="none";
    }
})




//main drop down button
let selectActive = false;
let option = "title";
let selectDropOption = document.querySelector(".option-2");
let selectArrow = document.getElementById("down-select");
let selectDrop = document.querySelector(".search-drop-down");
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
function addBookBtnEffects(){
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


window.onload = function (){
    addBookBtnEffects();
    checkIfEmpty();
}



function addDemoBooks(){
    checkIfEmpty();
    let demoArray = [
        {title: "The Short-Timers", author: "Gustav Hasford", url: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/The_Short_timers_Cover.jpg/220px-The_Short_timers_Cover.jpg', pagesTotal:192, read:true, pagesRead: 69},
        {title: "The Illuminatus! Trilogy", author: "Robert Shea, Robert Anton Wilson", url: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Illuminatus1sted.jpg', pagesTotal: 805, read:true, pagesRead: 420},
        {title: "Lullaby", author: "Chuck Palahniuk", url:'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Lullabycvr.jpg/220px-Lullabycvr.jpg', pagesTotal: 272, read: false, pagesRead: 272},
        {title: "Flowers for Algernon", author: "Daniel Keyes", url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/FlowersForAlgernon.jpg/220px-FlowersForAlgernon.jpg', pagesTotal: 311, read:true, pagesRead: 32},
        {title: "Prometheus Rising", author: "Robert Anton Wilson", url: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/PrometheusRisingCover.jpg/220px-PrometheusRisingCover.jpg', pagesTotal:262 , read:false, pagesRead:262 },
        {title: "If on a Winter's Night a Traveler", author: "Italo Calvino", url: 'https://pictures.abebooks.com/isbn/9780749399238-us.jpg', pagesTotal: 260, read:true, pagesRead:34},
        {title: "A Scanner Darkly", author: "Philip K. Dick", url: 'https://upload.wikimedia.org/wikipedia/en/2/27/AScannerDarkly%281stEd%29.jpg', pagesTotal: 220 , read:false , pagesRead: 220},
        {title: "Eloquent Javascript", author: "Marijn Haverbeke", url: 'https://m.media-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg', pagesTotal: 472 , read: true, pagesRead: 98},
        {title: "The Pragmatic Programmer", author: "Andy Hunt, Dave Thomas", url: 'https://kbimages1-a.akamaihd.net/63002aee-af94-4a52-b41c-3bbb6bc2c6f6/1200/1200/False/pragmatic-programmer-the-1.jpg', pagesTotal: 320 , read:true, pagesRead: 0},
        {title: "Maen", author:"Qaddoura", url:'https://ambassadors.cert.gov.om/images/ambassadors/Mae6089272016.jpg', pagesTotal: 10, read: false, pagesRead: 10}
    ]
    
    injectBooks(demoArray);

    function injectBooks(arr){
        if(gridMode){
            for(let index in arr){
                let bookObj = new Book(arr[index].title, arr[index].author, arr[index].url, arr[index].pagesTotal, arr[index].read, arr[index].pagesRead);
                myLibrary.unshift(bookObj); //changed from push check if there's bugs
                createBook(true, arr[index].title, arr[index].author, arr[index].url, arr[index].pagesTotal, arr[index].read, arr[index].pagesRead);
            }
        }
        else{
            for(let index=arr.length-1;index>=0;index--){
                let bookObj = new Book(arr[index].title, arr[index].author, arr[index].url, arr[index].pagesTotal, arr[index].read, arr[index].pagesRead);
                myLibrary.unshift(bookObj); 
                designTable(arr[index].url, arr[index].title, arr[index].author, arr[index].pagesTotal, arr[index].pagesRead, arr[index].read);
            }
            getIndex("image")
    }

    }
 
}

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
                        if(element[index].textContent.match(/[a-z\d!?]/gi).join("").toLowerCase().includes(barText.toLocaleLowerCase().replace(/\s/g, "").match(/[a-z\d!?]/gi).join(""))){
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


//export table 
class ExportTable{
    constructor(table) {
        this.table = table;
    }
    exportExcel(){
    let tableContent = this.table.outerHTML.replace(/\s/g, '%20');
    let tableHTMLUrl = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8,' + tableContent;
  
    this.triggerDownload(tableHTMLUrl, "books.xls");
    }
    triggerDownload(url,filename){
        let downloadLink = document.createElement("a");
        downloadLink.href=url;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
}

let exportSelectBtn = document.getElementById("export-select");
exportSelectBtn.addEventListener("click", ()=>{
    exportTable()
})

function exportTable(){
    let table = document.createElement("table");
    table.id="table";
    table.setAttribute("border", "1");
    let thead = document.createElement("thead");

    let tr = document.createElement("tr");
    let thTitle = document.createElement("th");
    let thAuthor = document.createElement("th");
    let thPages = document.createElement("th");
    let thRead = document.createElement("th");
    table.appendChild(thead);
    thead.appendChild(tr);
    tr.appendChild(thTitle);
    tr.appendChild(thAuthor);
    tr.appendChild(thPages);
    tr.appendChild(thRead);
    thTitle.textContent="Name";
    thAuthor.textContent="Author";
    thPages.textContent="Pages";
    thRead.textContent="Read?";

    let allBooks, selectedItem;

    if(!gridMode){
        allBooks = document.querySelectorAll(".table-body")
        selectedItem="selected-book-table";
    }
    else{
        allBooks = document.querySelectorAll(".book");
        selectedItem="selected-book";
    }
    let tbody = document.createElement("tbody");
    for(let index=0;index<allBooks.length;index++){
        if(allBooks[index].classList.contains(selectedItem)){
            let tr = document.createElement("tr");
            let tdTitle = document.createElement("td");
            let tdAuthor = document.createElement("td");
            let tdPages = document.createElement("td");
            let tdRead = document.createElement("td");
            tdTitle.setAttribute("style", "text-align: center");
            tdTitle.textContent = myLibrary[index].title;
            tdAuthor.textContent = myLibrary[index].author;
            tdPages.textContent = myLibrary[index].pagesTotal;
            tdPages.setAttribute("style", "text-align: center");
            tdRead.setAttribute("style", "text-align: center");
            myLibrary[index].read?tdRead.textContent = "No" : tdRead.textContent = "Yes";
            tr.appendChild(tdTitle);
            tr.appendChild(tdAuthor);
            tr.appendChild(tdPages);
            tr.appendChild(tdRead);
            tbody.appendChild(tr);
        }
    }
    table.appendChild(tbody);


    let tableExporter = new ExportTable(table);
    tableExporter.exportExcel();
}