let botonIniciar = document.querySelector('#iniciando');
let letraPensada = document.querySelector('#letra-pensada');
let botonEnviarLetra = document.querySelector('#enviar-letra');
let mostrarPalabra = document.querySelector('#secreto');
let seccionJuego = document.querySelector('#juego');
let seccionIniciar = document.querySelector('#empezar');
let letraSinCoincidir = document.querySelector('#letra-errada');
let intentosTotal = document.getElementById('intentos');
let dibujando = document.querySelector('.dibujo');
let fondo = document.querySelector('.fondo');
let canvas = document.getElementById('pizarra');

let palabraSecreta = '';
let guionesPalabra = '';
let contador = 4;
let letrasErradas = [];
let letrasAcertadas = [];

let palabrasGuardadas = ['gato', 'perro', 'silla'];

botonIniciar.addEventListener('click', iniciarJuego);
botonEnviarLetra.addEventListener('click', enviarLetra);

function iniciarJuego() {
	nuevoJuego();
	letraPensada.focus();

	palabraSecreta =
		palabrasGuardadas[Math.floor(Math.random() * palabrasGuardadas.length)];
	console.log(palabraSecreta);
	for (const i in palabraSecreta) {
		guionesPalabra = guionesPalabra + '_ ';
	}
	mostrarPalabra.innerHTML = guionesPalabra;
}

function enviarLetra() {
	patron = /[A-Za-z]/;
	// comprobando "si" introduce caracteres especiales
	if (patron.test(letraPensada.value) == false) {
		alert('Estás agregando un caracter especial. Por favor introduce solo letras.');
		letraPensada.focus();
		return;
	}

	// comprobando "si" el campo letra esta vacio
	if (letraPensada.value == '') {
		alert('Olvidaste ingresar la Letra, por favor ingresa la Letra');
		letraPensada.focus();
		return false;
	}

	let letra = removerAcentos(letraPensada.value).toUpperCase();
	palabraSecreta = palabraSecreta.toUpperCase();
	let resultado = '';

	for (const i in palabraSecreta) {
		if (letra == palabraSecreta[i]) {
			resultado = resultado + letra + ' ';
			letrasAcertadas.push(letra);
		} else {
			resultado = resultado + guionesPalabra[i * 2] + ' ';
		}

		if (resultado == guionesPalabra) {
			if (letrasErradas.includes(letra) || letrasAcertadas.includes(letra)) {
				alert('La letra ingresada ya fue utilizada');
			} else {
				letrasErradas.push(letra);
				contador--;
			}

			if (!letrasAcertadas.includes(letra)) {
				letrasAcertadas.push(letra);
			}

			intentosTotal.innerHTML = 'Te quedan ( ' + contador + ' )intentos';
			letraSinCoincidir.innerHTML = 'Las letras erradas son: ' + letrasErradas.toString();
		}
	}
	guionesPalabra = resultado;
	mostrarPalabra.innerText = guionesPalabra;

	letraPensada.value = '';
	letraPensada.focus();

	trazar();

	if (contador == 0) {
		alert('lo siento, perdiste. Intentalo Nuevamente');
		resetearJuego();
	}
	if (guionesPalabra.search('_') == -1) {
		alert('U+1F44F' + ' Felicidades Adivinaste la Palabra Secreta');
		resetearJuego();
	}
}

function trazar() {
	if (canvas.getContext) {
		let puntoXY = canvas.getContext('2d');

		// linea base (poste)

		if (contador <= 4) {
			puntoXY.fillStyle = 'black	';
			puntoXY.fillRect(30, 10, 20, 150);
			puntoXY.fillStyle = 'black';
			puntoXY.fillRect(30, 13, 120, 5);
			puntoXY.fill();
		}

		if (contador <= 3) {
			// cabeza
			puntoXY.beginPath();
			puntoXY.fillStyle = '#eaccad';
			puntoXY.strokeStyle = '#804000';
			puntoXY.arc(150, 34, 15, 0, 2 * Math.PI, false);
			puntoXY.fill();
			puntoXY.stroke();
		}

		if (contador <= 2) {
			// cuerpo
			puntoXY.beginPath();
			puntoXY.moveTo(150, 50);
			puntoXY.lineTo(150, 100);
			puntoXY.stroke();
		}

		if (contador <= 1) {
			// brazo izquierdo
			puntoXY.beginPath();
			puntoXY.moveTo(150, 50);
			puntoXY.lineTo(130, 90);
			puntoXY.stroke();

			// brazo derecho
			puntoXY.beginPath();
			puntoXY.moveTo(150, 50);
			puntoXY.lineTo(170, 90);
			puntoXY.stroke();
		}

		if (contador <= 0) {
			// pierna izquierda
			puntoXY.beginPath();
			puntoXY.moveTo(150, 100);
			puntoXY.lineTo(130, 130);
			puntoXY.stroke();

			// pierna derecha
			puntoXY.beginPath();
			puntoXY.moveTo(150, 100);
			puntoXY.lineTo(170, 130);
			puntoXY.stroke();
		}
	}
	// function contar(contador, x, condicion) {
	// 	if (contador <= x) {
	// 		condicion;
	// 	}
	// }
}

const removerAcentos = (str) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const resetearJuego = () => {
	fondo.style.background =
		'url(imagenes/paisaje-bosque-niebla-embrujada-camino-fondo-oscuro-ficcion-halloween-concepto-aterrador-representacion-3d_200360-494.jpg)';
	fondo.style.backgroundRepeat = 'no-repeat';
	fondo.style.backgroundSize = 'cover';
	seccionIniciar.style.display = 'block';
	seccionJuego.style.display = 'none';
	dibujando.style.display = 'none';
	contador = 4;
	letrasErradas = [];
	letrasAcertadas = [];
};

const nuevoJuego = () => {
	guionesPalabra = '';
	canvas.width = canvas.width;
	mostrarPalabra.innerHTML = '';
	intentosTotal.innerHTML = '';
	letraSinCoincidir.innerHTML = '';
	fondo.style.background = '#D3E4E0';
	seccionIniciar.style.display = 'none';
	seccionJuego.style.display = 'flex';
	dibujando.style.display = 'block';
};
