//Función para capturar el nombre de usuario
let inputTexto = document.getElementById("name");

function obtenerUsuario() {
    let usuario = inputTexto.value;
    fetch("https://api.github.com/users/" + usuario)
        .then(response => response.json())
        .then(json => {
            console.info(json);
        }).catch(error => {
            console.error("Este usuario no existe", error);
        });
}
