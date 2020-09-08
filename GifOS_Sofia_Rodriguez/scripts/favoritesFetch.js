import { trendingSection } from "./trendingSectionScripts.js";
import { fetchFavorites } from "./searchResults.js";

trendingSection();


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

// Check if local storage is empty
function checkLocalStorage() {
    let btnFavoritos = document.getElementById("btn_favoritos");
    let circleFavoritos = document.getElementById("circle");
    let iconFavoritesEmpty = document.getElementById("icon_favorite");
    let favoriteGridEmpty = document.getElementsByClassName("favorite_grid_empty");
    let favoriteGridContainer = document.getElementById("favorite_grid_container");
    if (localStorage === 0) {
        btnFavoritos.style.display = "none";
        circleFavoritos.style.display = "block";
        iconFavoritesEmpty.style.display = "block";
        favoriteGridEmpty.display = "block";
        favoriteGridContainer.display = "none";
    } else {
        btnFavoritos.style.display = "block";
        circleFavoritos.style.display = "none";
        iconFavoritesEmpty.style.display = "none";
        favoriteGridEmpty.display = "none";
        favoriteGridContainer.display = "grid";
    }
}checkLocalStorage();

//Obtain favorite icons from local storage
console.log(window.localStorage.getItem("gifsIds"));
