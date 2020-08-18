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

export { fetchFavorites } ;