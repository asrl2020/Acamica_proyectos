// Resultados de búsqueda
function searchResultDropDown() {
    let searchBtn = document.getElementById("btn_lupa");
    searchBtn.addEventListener("click", function(){searchResults()});
}

async function searchResults() {
    let searchSectionContainer = document.getElementById("search_section_container");
    let trendingSection = document.getElementById("trending_principal");
    let inputSearch = document.getElementById("input_busqueda");
    let url = "https://api.giphy.com/v1/gifs/search?api_key=0NZnU4ct8I0LcZ1Xd52YQ1kM5P7IMre8&q=" + inputSearch.value + "&limit=&offset=0&rating=g&lang=en"
    let response = await fetch(url);
    let commits = await response.json();
    //console.log(commits);
    let titleSearch = document.getElementById("search_title");
    let gridHTML = document.getElementById("search_grid");
    

    // Si el grid de resultados ya tiene hijos, eliminarlos
    console.log(gridHTML.childElementCount);

    if (gridHTML.childElementCount > 0) {
        removeChilds();
        console.log("hola");
    }

    // Titulo de la búsqueda actual
    titleSearch.innerHTML = inputSearch.value;
    titleSearch.style.borderTop = "1px solid #9CAFC3";
    trendingSection.style.display = "none";
    searchSectionContainer.style.display = "block";

    for (let i=0; i<12; i++){

        // Obtener gifs
        let gifImg = commits.data[i].images.original.url;
        console.log(commits);
        let gridElementImg = document.createElement("img");
        gridElementImg.src = gifImg;
        gridHTML.appendChild(gridElementImg);
        gridElementImg.style.height = "200px";
        gridElementImg.style.width = "250px";
        gridElementImg.setAttribute("id","gif" + i);

        // Obtener los hovers
        let gridElementHover = document.createElement("div");
        let hoversGridHTML = document.getElementById("hovers_grid");
        gridElementHover.classList.add("grid_element_hover");
        hoversGridHTML.appendChild(gridElementHover);

        // Insertar botones de like, download y expand
        // Like
        let divBtns = document.createElement("div");
        divBtns.classList.add("div_buttons_search");

        // Like button
        let likeBtn = document.createElement("button");
        likeBtn.classList.add("btnSearchResults", "favBtn");
        likeBtn.setAttribute("id",i);
        let likeBtnImg = document.createElement("img");
        likeBtnImg.src = "./images/icon-fav.svg";
        //likeBtnImg.setAttribute("id",i);
        
        // Download button
        let downloadBtn = document.createElement("button");
        downloadBtn.classList.add("btnSearchResults");
        let downloadBtnImg = document.createElement("img");
        downloadBtnImg.src = "./images/icon-download.svg";
        
        // Expand Button
        let expandBtn = document.createElement("button");
        expandBtn.classList.add("btnSearchResults");
        let expandBtnImg = document.createElement("img");
        expandBtnImg.src = "./images/icon-max.svg";

        // Append child de botones
        gridElementHover.appendChild(divBtns);
    
        divBtns.appendChild(likeBtn);
        divBtns.appendChild(downloadBtn);
        divBtns.appendChild(expandBtn);

        likeBtn.appendChild(likeBtnImg);
        downloadBtn.appendChild(downloadBtnImg);
        expandBtn.appendChild(expandBtnImg);

        // Obtener usernames y su estilo
        let username = commits.data[i].username;
        let gifUsername = document.createElement("p");
        gifUsername.classList.add("gif_username");
        gifUsername.innerHTML = username;
        gridElementHover.appendChild(gifUsername);

        // Obtener titulos y su estilo
        let title = commits.data[i].title;
        let gifTitle = document.createElement("p");
        gifTitle.classList.add("gif_title");
        gifTitle.innerHTML = title;
        gridElementHover.appendChild(gifTitle);


         // Hover gif mouse over
         gridElementHover.addEventListener("mouseover", () => {
            gridElementHover.style.backgroundColor = "rgba(86, 46, 229, 0.467)";
            gifTitle.style.opacity = "1";
            gifUsername.style.opacity = "1";
            likeBtn.style.display = "block";
            downloadBtn.style.display = "block";
            expandBtn.style.display = "block";
        });

        // Hover gif mouse out
        gridElementHover.addEventListener("mouseout", () => {
            gridElementHover.style.backgroundColor = "rgba(86, 46, 229, 0)";
            gifTitle.style.opacity = "0";
            gifUsername.style.opacity = "0";
            likeBtn.style.display = "none";
            downloadBtn.style.display = "none";
            expandBtn.style.display = "none";
        });
    } fetchFavorites(commits);
}

function fetchFavorites(gifsArray){
    let favBtns = document.getElementsByClassName("favBtn");
    console.log("favbtns lenght" + favBtns.length);
    let gifsIds = new Array();

    // Add event listener to all search results buttons
    for (let i=0 ; i<favBtns.length ; i++){
        console.log("hola console1");
        favBtns[i].addEventListener("click", function(e) {
            let favImgActive = document.createElement("img");
            favImgActive.src = "images/icon-twitter.svg";
            let favBtnChild = e.currentTarget;
            favBtnChild.replaceChild(favImgActive, favBtnChild.childNodes[0]);
            let gifID = gifsArray.data[favBtnChild.id].id;
            //console.log(gifID);
            gifsIds.push(gifID);

            //console.log(gifsIds);

            window.localStorage.setItem("gifsIds", JSON.stringify(gifsIds));
        });
    }
}

export { searchResultDropDown } ;
