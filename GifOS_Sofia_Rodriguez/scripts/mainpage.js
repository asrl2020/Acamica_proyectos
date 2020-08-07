const apikey = "0NZnU4ct8I0LcZ1Xd52YQ1kM5P7IMre8";
// Scripts para la sección de trending gifs
/*async function gifsTrendingSection() {
    let url = "https://api.giphy.com/v1/gifs/trending?api_key=0NZnU4ct8I0LcZ1Xd52YQ1kM5P7IMre8&limit=3&rating=g"
    let response = await fetch(url);
    let commits = await response.json();
    console.log(commits);

    // Obtener imagenes
    for (let i=0; i<commits.data.length; i++){
        let image = commits.data[i].images.original.url;
        let trendingGifHTML = document.getElementById("gifjs" + (i+1));
        let trendingGif = document.createElement("img");
        trendingGif.src = image;
        trendingGif.style.height = "18rem";
        trendingGif.style.width = "100%";
        trendingGifHTML.appendChild(trendingGif);
    }

    // Obtener usernames
    for(let i=0; i<commits.data.length; i++) {
        let username = commits.data[i].username;
        let gifUserHTML = document.getElementById("gif_user" + (i+1));
        gifUserHTML.innerHTML = username;
    }

    // Obtener titulos
    for(let i=0; i<commits.data.length; i++) {
        let title = commits.data[i].title;
        let titleHTML = document.getElementById("gif_titulo" + (i+1));
        titleHTML.innerHTML = title;
    }
}
gifsTrendingSection();*/

// Obtener las busquedas más populares
async function trendingSearches() {
    let url = "https://api.giphy.com/v1/trending/searches?api_key=" + apikey;
    let response = await fetch(url);
    let commits = await response.json();
    
    for(let i=0; i<=5; i++) {
        let trendingSearch = commits.data[i];
        let spanTrending = document.getElementById("trending" + (i+1));
        spanTrending.innerHTML = (trendingSearch + ", ");
    }
}


// Comportamiento de la barra de busqueda (cerrar)
function closeSearchBar(){
    let btnClose = document.getElementById("btn_close");
    
    btnClose.addEventListener("click", () => {
        let inputSearch = document.getElementById("input_busqueda");
        let searchBar = document.getElementById("sugerencias_container");
        searchBar.style.display = "none";
        inputSearch.value = " ";
    });
}


// Comportamiento de la barra de busqueda (abrir)
function openSearchBar(){
    let inputSearch = document.getElementById("input_busqueda");
    
    inputSearch.addEventListener("keydown", () => {
        let searchBar = document.getElementById("sugerencias_container");
        searchBar.style.display = "block";
    });
}


// Sugerencias de busqueda
function searchSuggestions(){
    let inputSearch = document.getElementById("input_busqueda");
    inputSearch.addEventListener("keydown", function(){giphySearchbar(inputSearch)});
}
async function giphySearchbar(inputSearch){
    let url = "https://api.giphy.com/v1/tags/related/" + inputSearch.value + "?api_key=0NZnU4ct8I0LcZ1Xd52YQ1kM5P7IMre8"
    let response = await fetch(url);
    let commits = await response.json();
    console.log(commits);
    
    for(let i=0; i<4; i++) {
        let searchSuggestions = commits.data[i].name;
        let suggestion = document.getElementById("sugerencia" + (i+1));
        suggestion.innerHTML = (searchSuggestions);
    }
}


// Resultados de búsqueda
function searchResultDropDown() {
    let searchBtn = document.getElementById("btn_lupa");
    searchBtn.addEventListener("click", function(){searchResults()});
}
async function searchResults() {
    let searchSectionContainer = document.getElementById("search_section_container");
    searchSectionContainer.style.display = "block";
    let trendingSection = document.getElementById("trending_principal");
    trendingSection.style.display = "none";
    let inputSearch = document.getElementById("input_busqueda");
    let url = "https://api.giphy.com/v1/gifs/search?api_key=0NZnU4ct8I0LcZ1Xd52YQ1kM5P7IMre8&q=" + inputSearch.value + "&limit=&offset=0&rating=g&lang=en"
    let response = await fetch(url);
    let commits = await response.json();
    console.log(commits);
    let titleSearch = document.getElementById("search_title");
    titleSearch.innerHTML = inputSearch.value;

    for (let i=0; i<12; i++){
        let gifImg = commits.data[i].images.original.url;
        let gridElementImg = document.createElement("img");
        gridElementImg.src = gifImg;
        let gridHTML = document.getElementById("search_grid");
        gridHTML.appendChild(gridElementImg);
        gridElementImg.style.height = "200px";
        gridElementImg.style.width = "250px";

    }
}


// Borrar resultados de busqueda y volver a vista inicial
function removeSearchResults() {
    let closeBtn = document.getElementById("btn_close");
    
    closeBtn.addEventListener("click", () => {
        let title = document.getElementById("search_title");
        title.innerHTML = " ";
        let trendingSection = document.getElementById("trending_principal");
        trendingSection.style.display = "block";
        let searchSection = document.getElementById("search_section_container");
        searchSection.style.display = "none";
        let grid = document.getElementById("search_grid");
        const childCount = grid.childElementCount;
        for(let i=0; i < childCount; i++){
            grid.removeChild(grid.childNodes[0]);
        }
    });
}

// Trending gifs prueba
async function gifsTrendingSectionInfo() {
    let url = "https://api.giphy.com/v1/gifs/trending?api_key=0NZnU4ct8I0LcZ1Xd52YQ1kM5P7IMre8&limit=3&rating=g"
    let response = await fetch(url);
    let commits = await response.json();
    console.log(commits);
    
    // Obtener imagenes
    for (let i=0; i<3; i++){
        let image = commits.data[i].images.original.url;
        let containerGifs = document.getElementById("trending_gifs");
        let trendingGif = document.createElement("img");
        trendingGif.src = image;
        trendingGif.style.height = "300px";
        trendingGif.style.width = "350px";
        containerGifs.appendChild(trendingGif);

        let hoverContainer = document.getElementById("trending_hover");
        let hover = document.createElement("div");
        hover.style.backgroundColor = "rgba(86, 46, 229, 0)";
        hover.style.height = "300px";
        hover.style.width = "350px";
        hover.style.display = "flex";
        hover.style.flexDirection = "column";
        hoverContainer.appendChild(hover);

        let username = commits.data[i].username;
        let gifUsername = document.createElement("p");
        gifUsername.innerHTML = username;
        gifUsername.style.color = "white";
        gifUsername.style.fontSize = ".9rem";
        gifUsername.style.fontWeight = "100";
        gifUsername.style.opacity = "0";
        gifUsername.style.fontFamily = "Montserrat,sans-serif";
        gifUsername.style.zIndex = "200";
        hover.appendChild(gifUsername);

        let title = commits.data[i].title;
        let gifTitle = document.createElement("p");
        gifTitle.innerHTML = title;
        gifTitle.style.color = "white";
        gifTitle.style.opacity = "0";
        gifTitle.style.fontFamily = "Montserrat,sans-serif";
        gifTitle.style.zIndex = "200";
        hover.appendChild(gifTitle);

        hover.addEventListener("mouseover", () => {
            hover.style.backgroundColor = "rgba(86, 46, 229, 0.467)";
            gifTitle.style.opacity = "1";
            gifUsername.style.opacity = "1";
        });

        hover.addEventListener("mouseout", () => {
            hover.style.backgroundColor = "rgba(86, 46, 229, 0)";
            gifTitle.style.opacity = "0";
            gifUsername.style.opacity = "0";
        });

        
    }
}gifsTrendingSectionInfo();

async function showUserandTitleOnGifs(){

}



openSearchBar();
closeSearchBar();
trendingSearches();

removeSearchResults();
searchSuggestions();
searchResultDropDown();


