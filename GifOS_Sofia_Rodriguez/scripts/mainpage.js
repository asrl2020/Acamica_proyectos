// Import functions
import { trendingSection } from "./trendingSectionScripts.js";
import { searchResultDropDown } from "./searchResults.js";


// Constante para API key
const apikey = "0NZnU4ct8I0LcZ1Xd52YQ1kM5P7IMre8";

// Obtener las busquedas más populares
async function trendingSearches() {
    let url = "https://api.giphy.com/v1/trending/searches?api_key=" + apikey;
    let response = await fetch(url);
    let commits = await response.json();
    
    for(let i=0; i<5; i++) {
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
}closeSearchBar();


// Comportamiento de la barra de busqueda (abrir) - Cambia en darkmode
function openSearchBar(){
    let stylesheet = document.getElementById("style_main_page");
    let inputSearch = document.getElementById("input_busqueda");
    let searchBar = document.getElementById("sugerencias_container");
    let imgLupa = document.getElementById("lupa");
    let imgClose = document.getElementById("close");
    
    if (stylesheet.href.match("./styles/main_page.css")) {

        inputSearch.addEventListener("keydown", () => {
            searchBar.style.display = "block";
            imgLupa.src = "./images/icono_lupa-gris.svg";
            imgClose.src = "images/close.svg";
        });  
    }
    else {
        inputSearch.addEventListener("keydown", () => {
            searchBar.style.display = "block";
            imgLupa.src = "./images/icono_lupa-gris.svg";
            imgClose.src = "images/close-blanco.svg";
        }); 
    }  
}openSearchBar();



// Sugerencias de busqueda
function searchSuggestions(){
    let inputSearch = document.getElementById("input_busqueda");
    inputSearch.addEventListener("keydown", function(){giphySearchbar(inputSearch)});
}
async function giphySearchbar(inputSearch){
    let url = "https://api.giphy.com/v1/tags/related/" + inputSearch.value + "?api_key=0NZnU4ct8I0LcZ1Xd52YQ1kM5P7IMre8";
    let response = await fetch(url);
    let commits = await response.json();
    //console.log(commits);

    if(commits.data.length > 3) {
        for(let i=0; i<4; i++) {
            let searchSuggestions = commits.data[i].name;
            let suggestion = document.getElementById("sugerencia" + (i+1));
            suggestion.innerHTML = searchSuggestions;
        }
    } else {
        for(let i=0; i<4; i++) {
            let suggestion = document.getElementById("sugerencia" + (i+1));
            suggestion.innerHTML = "No hay resultado";
        }
    }
}


// Borrar resultados de busqueda y volver a vista inicial
function removeSearchResults() {
    let closeBtn = document.getElementById("btn_close");
    
    closeBtn.addEventListener("click", function() {removeChilds()});
}

function removeChilds(){
    let title = document.getElementById("search_title");
    title.innerHTML = " ";
    let trendingSection = document.getElementById("trending_principal");
    trendingSection.style.display = "block";
    let searchSection = document.getElementById("search_section_container");
    searchSection.style.display = "none";
    const grid = document.getElementById("search_grid");
    const hover = document.getElementById("hovers_grid");
    
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }

    while (hover.firstChild) {
        hover.removeChild(hover.lastChild);
    }

    console.log("remove childs");
}removeSearchResults();

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

// Abrir menu hamburguesa
function openMenu(){
    let viewPort = window.matchMedia("(max-width: 400px)");
    let menuHamburguesa = document.getElementById("boton_menu_hamburguesa");
    let menuComponentes = document.getElementById("menu_componentes");
    let menuHamburguesaImg = document.getElementById("menu_hamburguesa_img");
    if (viewPort.matches) {
        menuHamburguesa.addEventListener("click", ()=> {
            if (menuComponentes.style.display.match("none")) {
                menuComponentes.style.display = "flex";
                menuHamburguesaImg.src = "images/close.svg";
            } else {
                menuComponentes.style.display = "none";
                menuHamburguesaImg.src = "images/burger.svg";
            }
        });
    } else {
        menuComponentes.style.display = "grid";
    }
} openMenu();

trendingSearches();
searchSuggestions();
trendingSection();
searchResultDropDown();

console.log(window.localStorage.getItem("gifsIds"));
