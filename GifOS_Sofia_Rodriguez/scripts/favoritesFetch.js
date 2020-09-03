import { trendingSection } from "./trendingSectionScripts.js";

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