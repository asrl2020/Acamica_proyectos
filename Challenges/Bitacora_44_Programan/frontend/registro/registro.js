function registroNuevoUsuario() {
    let btnRegistrar = document.getElementById("btn_registrar");

    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let edad = document.getElementById("edad");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    btnRegistrar.addEventListener("click", ()=> {
        console.log(nombre.value);
    });

}registroNuevoUsuario();