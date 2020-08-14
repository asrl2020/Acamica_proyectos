// Trending gifs prueba
let i = 0;
async function trendingSection() {
    let url = "https://api.giphy.com/v1/gifs/trending?api_key=0NZnU4ct8I0LcZ1Xd52YQ1kM5P7IMre8&rating=g"
    let response = await fetch(url);
    let commits = await response.json();
    let containerGifs;
    let hoverContainer = document.getElementById("trending_hover");
    console.log(commits);
    
    // For para obtener imagenes, hovers, titulos y usernames
    for (let i=0; i<commits.data.length; i++){

        // Obtener imagenes y su estilo
        let image = commits.data[i].images.original.url;
        containerGifs = document.getElementById("trending_gifs");
        let trendingGif = document.createElement("img");
        trendingGif.classList.add("trending_gif_js");
        trendingGif.src = image;
        containerGifs.appendChild(trendingGif);
        //console.log(trendingGif);

        // Obtener hovers y su estilo
        let hover = document.createElement("div");
        hover.classList.add("hover_container_js");
        hoverContainer.appendChild(hover);


        // Insertar botones de like, download y expand
        // Like
        let divBtns = document.createElement("div");
        divBtns.classList.add("div_buttons");

        // Like button
        let likeBtn = document.createElement("button");
        likeBtn.classList.add("btnTrending");
        let likeBtnImg = document.createElement("img");
        likeBtnImg.src = "./images/icon-fav.svg";
        
        // Download button
        let downloadBtn = document.createElement("button");
        downloadBtn.classList.add("btnTrending");
        let downloadBtnImg = document.createElement("img");
        downloadBtnImg.src = "./images/icon-download.svg";
        
        // Expand Button
        let expandBtn = document.createElement("button");
        expandBtn.classList.add("btnTrending");
        let expandBtnImg = document.createElement("img");
        expandBtnImg.src = "./images/icon-max.svg";

        // Append child de botones
        hover.appendChild(divBtns);
    
        divBtns.appendChild(likeBtn);
        divBtns.appendChild(downloadBtn);
        divBtns.appendChild(expandBtn);

        likeBtn.appendChild(likeBtnImg);
        downloadBtn.appendChild(downloadBtnImg);
        expandBtn.appendChild(expandBtnImg);

        

        // Obtener usernames y su estilo
        let username = commits.data[i].username;
        let gifUsername = document.createElement("p");
        gifUsername.innerHTML = username;
        gifUsername.style.color = "white";
        gifUsername.style.fontSize = ".9rem";
        gifUsername.style.fontWeight = "100";
        gifUsername.style.marginLeft = "5%";
        gifUsername.style.marginTop = "50%";
        gifUsername.style.opacity = "0";
        gifUsername.style.lineHeight = "30px";
        gifUsername.style.fontFamily = "Montserrat,sans-serif";
        gifUsername.style.zIndex = "200";
        hover.appendChild(gifUsername);

        // Obtener titulos y su estilo
        let title = commits.data[i].title;
        let gifTitle = document.createElement("p");
        gifTitle.innerHTML = title;
        gifTitle.style.color = "white";
        gifTitle.style.opacity = "0";
        gifTitle.style.marginLeft = "5%";
        gifTitle.style.fontFamily = "Montserrat,sans-serif";
        gifTitle.style.zIndex = "200";
        hover.appendChild(gifTitle);

        // Hover gif mouse over
        hover.addEventListener("mouseover", () => {
            hover.style.backgroundColor = "rgba(86, 46, 229, 0.467)";
            gifTitle.style.opacity = "1";
            gifUsername.style.opacity = "1";
            likeBtn.style.display = "block";
            downloadBtn.style.display = "block";
            expandBtn.style.display = "block";
        });

        // Hover gif mouse out
        hover.addEventListener("mouseout", () => {
            hover.style.backgroundColor = "rgba(86, 46, 229, 0)";
            gifTitle.style.opacity = "0";
            gifUsername.style.opacity = "0";
            likeBtn.style.display = "none";
            downloadBtn.style.display = "none";
            expandBtn.style.display = "none";
        });
        
    }

    
    let fwrdBtn = document.getElementById("fwrd_btn");
        fwrdBtn.addEventListener("click", () => {
            i = i + 250;
            containerGifs.style.transform = `translateX(-${i}px)`;
            hoverContainer.style.transform = `translateX(-${i}px)`;
        });

    let prvBtn = document.getElementById("prev_btn")
    prvBtn.addEventListener("click", () => {
        i = i + 250;
        containerGifs.style.transform = `translateX(-${i}px)`;
        hoverContainer.style.transform = `translateX(-${i}px)`;
    });
}

export { trendingSection };

