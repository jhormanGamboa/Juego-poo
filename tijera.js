class Juego {
    constructor() {
        this.opciones = ["piedra", "papel", "tijera", "lagarto", "spock"];
        this.jugador = document.getElementById("jugador");
        this.computadora = document.getElementById("computadora");
        this.resultado = document.getElementById("resultado");
        this.mensajeResultado = document.getElementById("mensaje-resultado");
        this.reiniciarBtn = document.getElementById("reiniciar");
        this.botones = document.querySelectorAll(".opciones");
        this.init();
    }

    init() {
        this.botones.forEach((boton) =>
            boton.addEventListener("click", (e) => this.jugar(e))
        );
        this.reiniciarBtn.addEventListener("click", () => this.reiniciar());
    }

    jugar(evento) {
        const boton = evento.target.closest("button");
        const eleccionJugador = boton.id;

        this.mostrarEleccion(this.jugador, eleccionJugador);

        const eleccionComputadora = this.eleccionComputadora();
        this.mostrarEleccion(this.computadora, eleccionComputadora);

        setTimeout(() => {
            this.jugador.classList.add("active");
            this.computadora.classList.add("active");
        }, 100);

        setTimeout(() => {
            this.mostrarResultado(this.compararElecciones(eleccionJugador, eleccionComputadora));
            this.jugador.classList.remove("active");
            this.computadora.classList.remove("active");
        }, 1000);
    }

    eleccionComputadora() {
        return this.opciones[Math.floor(Math.random() * this.opciones.length)];
    }

    mostrarEleccion(elemento, eleccion) {
        elemento.innerHTML = "";
        const img = document.createElement("img");
        img.src = `img/${eleccion}.png`;
        img.alt = eleccion;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";

        elemento.appendChild(img);

        elemento.classList.remove("active");
    }

    compararElecciones(jugador, computadora) {
        if (jugador === computadora) return "¡Es un empate!";
        const ganaSobre = {
            piedra: ["tijera", "lagarto"],
            papel: ["piedra", "spock"],
            tijera: ["papel", "lagarto"],
            lagarto: ["spock", "papel"],
            spock: ["tijera", "piedra"],
        };
        return ganaSobre[jugador].includes(computadora) ? "¡Ganaste!" : "¡Perdiste!";
    }

    mostrarResultado(resultado) {
        this.mensajeResultado.textContent = resultado;
        this.resultado.style.display = "flex";
    }

    reiniciar() {
        this.resultado.style.display = "none";
        this.jugador.innerHTML = "Jugador";
        this.computadora.innerHTML = "Computadora";
        this.jugador.classList.remove("active");
        this.computadora.classList.remove("active");
    }
}

class verificar {
    static registrarUsuario(nombre, correo, contraseña) {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
      if (usuarios.find((usuario) => usuario.correo === correo)) {
        alert("El correo ya está registrado.");
        return false;
      }
  
      usuarios.push({ nombre, correo, contraseña });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Registro exitoso.");
      return true;
    }
  
    static iniciarSesion(correo, contraseña) {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find(
        (usuario) => usuario.correo === correo && usuario.contraseña === contraseña
      );
  
      if (!usuario) {
        alert("Correo o contraseña incorrectos.");
        return false;
      }
  
      localStorage.setItem("usuarioActual", JSON.stringify(usuario));
      alert(`Bienvenido, ${usuario.nombre}`);
      return true;
    }
  
    static validarAcceso() {
      const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
      if (!usuarioActual) {
        alert("Debes iniciar sesión para acceder al juego.");
        window.location.href = "index.html";
      }
    }
  
    static cerrarSesion() {
      localStorage.removeItem("usuarioActual");
      alert("Sesión cerrada.");
      window.location.href = "index.html";
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.querySelector('form[action="registro"]');
    if (registroForm) {
      registroForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("contraseña").value.trim();
  
        if (verificar.registrarUsuario(nombre, correo, password)) {
          window.location.href = "index.html";
          window.close();
        }
      });
    }
  
    const loginForm = document.querySelector('form[action="inicio"]');
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const correo = document.getElementById("correo").value.trim();
        const contraseña = document.getElementById("contraseña").value.trim();
  
        if (verificar.iniciarSesion(correo, contraseña)) {
          window.location.href = "piedra.html";
        }
      });
    }
  
    if (document.body.id === "pagina-juego") {
      verificar.validarAcceso();
    }
  
    const cerrarSesionBtn = document.getElementById("cerrar-sesion");
    if (cerrarSesionBtn) {
      cerrarSesionBtn.addEventListener("click", () => verificar.cerrarSesion());
    }
  });
  
  new Juego();
  
