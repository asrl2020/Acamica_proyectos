// Import functions
import { trendingSection } from "./trendingSectionScripts.js";

// Constante para API key
const apikey = "0NZnU4ct8I0LcZ1Xd52YQ1kM5P7IMre8";

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
        let imgLupa = document.getElementById("lupa");
        imgLupa.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        let imgClose = document.getElementById("close");
        imgClose.src = "./images/icono_lupa.svg";
    });
}


// Comportamiento de la barra de busqueda (abrir)
function openSearchBar(){
    let inputSearch = document.getElementById("input_busqueda");
    
    inputSearch.addEventListener("keydown", () => {
        let searchBar = document.getElementById("sugerencias_container");
        searchBar.style.display = "block";
        let imgLupa = document.getElementById("lupa");
        imgLupa.src = "./images/icono_lupa.svg";
        let imgClose = document.getElementById("close");
        imgClose.src = "./images/close.svg";
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
    titleSearch.style.borderTop = "1px solid #9CAFC3";

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

// Toggle dark mode
function toggleDarkMode() {
    let darkModeBtn = document.getElementById("modo_nocturno");
    darkModeBtn.addEventListener("click", ()=> {
        let stylesheet = document.getElementById("style_main_page");
        if (stylesheet.href.match("./styles/main_page.css")) {
            stylesheet.href = "./styles/main_page_darkmode.css";    
        }
        else {
            stylesheet.href = "./styles/main_page.css";  
        }
    })
    
}toggleDarkMode();

openSearchBar();
closeSearchBar();
trendingSearches();

removeSearchResults();
searchSuggestions();
searchResultDropDown();
trendingSection();


