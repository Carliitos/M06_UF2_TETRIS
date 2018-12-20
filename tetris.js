var Tetris = { //Objecte amb tots els atributs del joc
	mapa: [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	],
	puntuacio: 0, //10p per daca peça, 20p per cada nivell 1p per baixar
	maxPoints: 0, //Punts màxims guanyats a la sessió actual
	pieza: null, //Peça actual
	piezas: 0, //Comptador de peces, torna a 0 en arribar a 10
	nivell: 0, 
	nextPieza: null, //Següent peça
	comptador: [0, 0, 0, 0, 0, 0, 0],
	interval: 500, //Temps d'actualització
	tecla: null, //Tecla pulsada
	inicialitzar: function () { //Inicialitza la partida definint la peça actual i altres atributs
		var primeraPieza = randomPieza();
		Tetris.pieza = new Pieza(primeraPieza[0], 3, 0);
		var siguientePieza = randomPieza();
		Tetris.nextPieza = new Pieza(siguientePieza[0], 3, 0);
		puntuacio = 0;
		comptador = [0, 0, 0, 0, 0, 0, 0];
		interval = 500;

	},
	moviment: function () {
		//Si pot baixar augmenta la "y"
		if (Tetris.comprovarBaixar(1)) {
			this.pieza.y++;
		} else { //Si no pot baixar més canvia les lletres per "1"
			for (var i = 0; i < this.mapa.length; i++) {
				for (var j = 0; j < this.mapa[0].length; j++) {
					if (this.mapa[i][j] != 0 && this.mapa[i][j] != 1) {
						this.mapa[i][j] = 1;
					}
				}
			}
			//Augmenta  la puntuació en 10
			this.puntuacio = this.puntuacio + 10;
			//Si ja han baixat 10 peçes, augmenta el nivell, la puntuació i l'interval en 10%
			if (this.piezas == 10) {
				this.puntuacio = this.puntuacio + 20;
				this.nivell++;
				this.piezas = 0;
				this.interval = this.interval * 0.9;
				clearInterval(tetris);
				tetris = setInterval(Tetris.controlador, Tetris.interval);
			}
			//Si la puntuació es més gran a la puntuació màxima, actualitza la puntuació màxima
			if (this.puntuacio > sessionStorage.getItem("MaxPoints")) {
				sessionStorage.setItem("MaxPoints", this.puntuacio);
			}
			//Mostra el nivell i puntuacions a l'HTML
			document.getElementById("nivell").innerHTML = "Nivell: " + this.nivell;
			document.getElementById("puntuacio").innerHTML = "Puntuació: " + this.puntuacio;
			document.getElementById("max").innerHTML = "Puntuació Màxima: " + sessionStorage.getItem("MaxPoints");
			//Truca al mètode següent peça
			Tetris.siguiente();
		}
		if (this.tecla == 1) { //Si la tecla és 1 (dreta) comprova que pot anar a la dreta
			this.pieza.x++;
			if (!Tetris.comprovarBaixar(2)) {
				this.pieza.x--;
			}

		} else {
			if (this.tecla == 3) { //Si la tecla és 3 (esquerra) comprova que pot anar a la esquerra
				this.pieza.x--;
				if (!Tetris.comprovarBaixar(3)) {
					this.pieza.x++;
				}
			}
			if (this.tecla == 2) { //La tecla és 2 (abaix) comprova que pot baixar, suma 1p i mostra la puntuació
				if (Tetris.comprovarBaixar(1)) {
					this.pieza.y++;
					this.puntuacio++;
					document.getElementById("puntuacio").innerHTML = "Puntuació: " + this.puntuacio;
				}

			}//Si la tecla és 0 (amunt) comprova que pugui rotar i la rota
			if (this.tecla == 0) {
				rotarDreta();
				if (Tetris.comprovarBaixar(4)) {
					rotarEsquerra()
				}
			}
		}

	},
	siguiente: function () {//Estableix la següent peça a la principal i calcula una nova següent peça random
		this.pieza = this.nextPieza;
		var siguientePieza = randomPieza();
		this.nextPieza = new Pieza(siguientePieza[0], 3, 0);
		peque(Tetris.pieza, "pieza"); //Mostra les dues peces de nou
		peque(Tetris.nextPieza, "nextPieza");
		this.piezas++; //Augmenta el comptador de peces
	},
	comprovarBaixar: function (opcio) {

		switch (opcio) {
			case 1: //Comprova si pot baixar (false sí, true no), si la peça amb una posició més abaix no xoca amb res, retornarà true. 
				for (var i = 0; i < this.pieza.forma.length; i++) {
					for (var j = 0; j < this.pieza.forma[i].length; j++) {
						if (this.pieza.forma[i][j] != 0) {
							if ((this.pieza.y + i < 0) || (this.pieza.y + i) > 24) {
								return false;
							}
							if ((this.mapa[this.pieza.y + i + 1][this.pieza.x + j] == 1)) {
								return false;
							}
						}
					}
				}
				return true;
			case 2: //Comprova si es pot moure a la dreta, el funcionament és igual al de baixar
				for (var i = 0; i < this.pieza.forma.length; i++) {
					for (var j = 0; j < this.pieza.forma[i].length; j++) {
						if (this.pieza.forma[i][j] != 0) {
							if ((this.pieza.x + j) < 0 || (this.pieza.x + j) > 9) {
								return false;
							}
							if (this.mapa[this.pieza.y + i][this.pieza.x + j] == 1) {
								return false;
							}
						}
					}
				}
				return true;
			case 3: //Comprova si es pot moure a l'esquerra
				for (var i = 0; i < this.pieza.forma.length; i++) {
					for (var j = 0; j < this.pieza.forma[i].length; j++) {
						if (this.pieza.forma[i][j] != 0) {
							if ((this.pieza.x + j) < 0 || (this.pieza.x + j) > 9) {
								return false;
							}
							if (this.mapa[this.pieza.y + i][this.pieza.x + j] == 1) {
								return false;
							}
						}
					}
				}
				return true;
			case 4: //Comprova si pot rotar, quan rota, comprova que rotant i baixant una posició no colisiona amb cap peça
				for (var i = 0; i < 4; i++) {
					for (var j = 0; j < 4; j++) {
						if ((this.pieza.x + j) < 0 || (this.pieza.x + j) > 9) {
							return false;
						}
						if (this.mapa[i + this.pieza.y + 1][j + this.pieza.x] == 1) {

							return true;
						}
					}
				}
				return false;
		}
	},
	controlador: function () { //S'executa a cada interval, truca a les principals funcions
		document.onkeydown = teclat;
		Tetris.complert();
		Tetris.moviment();
		Tetris.insert();
		Tetris.tecla = 4; //La tecla "4" és un "default" per deixar la tecla com per defecte
		mostrarMapa();
	},
	complert: function () {//Comprova si hi ha alguna filera completa
		for (var i = 0; i < this.mapa.length; i++) {
			var complet = true;
			for (var j = 0; j < this.mapa[0].length; j++) {
				if (this.mapa[i][j] != 1) { //Si a cap posició hi ha altra cosa que no sigui un "1", vol dir que la filera no està completa
					complet = false;
				}
				if (this.mapa[0][j] == 1) {//Comprova si a la primera filera hi ha algun "1", si es dona el cas, vol dir que s'ha perdut el joc
					var loading = document.getElementById("lost"); //Marca com a visible la pantalla de perdut i para el joc
					loading.style.visibility = "visible";
					clearInterval(tetris);
				}
			}
			if (complet) { //Si una filera és completa, es baixen totes les fileres una posició
				var pos = i;
				for (var n = i - 1; n >= 0; n--) {

					aux = this.mapa[n];
					this.mapa[pos] = aux;
					pos--;
				}
				this.mapa[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			} 
		}
	},
	insert: function () { //Neteja tot allò que no siguin 1 i 0
		for (var i = 0; i < this.mapa.length; i++) {
			for (var j = 0; j < this.mapa[0].length; j++) {
				if (this.mapa[i][j] != 0 && this.mapa[i][j] != 1) {
					this.mapa[i][j] = 0;
				}
			}
		}
		//Pinta al mapa la peça
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (this.mapa[i + this.pieza.y][j + this.pieza.x] != 1) {
					this.mapa[i + this.pieza.y][j + this.pieza.x] = this.pieza.forma[i][j];
				}
			}
		}
	}
}

function randomPieza() { //Tria una peça aleatoria i la retorna
	var peces = [
		[[[0, 0, 0, 0],[0, "r", "r", 0],[0, "r", "r", 0],[0, 0, 0, 0]]],
		[[[0, "a", 0, 0],[0, "a", 0, 0],[0, "a", 0, 0],[0, "a", 0, 0]]],
		[[[0, 0, 0, 0],[0, "g", "g", 0],["g", "g", 0, 0],[0, 0, 0, 0]]],
		[[[0, 0, 0, 0],[0, "l", "l", 0],[0, 0, "l", "l"],[0, 0, 0, 0]]],
		[[[0, "n", 0, 0],[0, "n", 0, 0],[0, "n", "n", 0],[0, 0, 0, 0]]],
		[[[0, "s", "s", 0],[0, "s", 0, 0],[0, "s", 0, 0],[0, 0, 0, 0]]],
		[[[0, 0, 0, 0],["v", "v", "v", 0],[0, "v", 0, 0],[0, 0, 0, 0]]]
	]
	var numeroAleatori = Math.round(Math.random() * 6);
	Tetris.letra = peces[numeroAleatori][1]
	return peces[numeroAleatori];
}

function teclat(e) { //Funció reciclada de l'anterior pràctica per saber la tecla premuda
	this.tecla = 4;
	var key = document.all ? e.which : e.key;
	if (key == "ArrowUp") {
		Tetris.tecla = 0; //arriba
	} else if (key == "ArrowRight") {
		Tetris.tecla = 1; //derecha
	} else if (key == "ArrowDown") {
		Tetris.tecla = 2; //abajo
	} else if (key == "ArrowLeft") {
		Tetris.tecla = 3; //izquierda
	} else Tetris.tecla = 4;
	key = null;
	e = null;
}
var Pieza = function (forma, x, y) { //Constructor de l'objecte peça
	this.forma = forma;
	this.x = x;
	this.y = y;
};

function mostrarMapa() { //Funció reciclada de la pràctica anterior per printar el canvas amb els diferents colors
	var map = "";
	var canvas = document.getElementById("mapa")
	for (var i = 0; i < Tetris.mapa.length; i++) {
		for (var j = 0; j < Tetris.mapa[0].length; j++) {
			switch (Tetris.mapa[i][j]) {
				case "r":
					img = document.getElementById("rojo");
					break;
				case "a":
					img = document.getElementById("azul");
					break;
				case "g":
					img = document.getElementById("amarillo");
					break;
				case "l":
					img = document.getElementById("lila");
					break;
				case "n":
					img = document.getElementById("naranja");
					break;
				case "s":
					img = document.getElementById("rosa");
					break;
				case "v":
					img = document.getElementById("verde");
					break;
				case 1:
					img = document.getElementById("gris");
					break;
				default:
					img = document.getElementById("azulMarino");
			}
			var ctx = canvas.getContext("2d").drawImage(img, j * 30, i * 30, 30, 30);
		}
	}
}

function peque(pieza, tablero) { //Pinta el canvas de les caixes petites que mostren les peçes, la variable pieza rep la peça i la variable tablero el canvas on el pintarà
	var map = "";
	var canvas = document.getElementById(tablero)
	for (var i = 0; i < pieza.forma.length; i++) {
		for (var j = 0; j < pieza.forma[0].length; j++) {
			switch (pieza.forma[i][j]) {
				case "r":
					img = document.getElementById("rojo");
					break;
				case "a":
					img = document.getElementById("azul");
					break;
				case "g":
					img = document.getElementById("amarillo");
					break;
				case "l":
					img = document.getElementById("lila");
					break;
				case "n":
					img = document.getElementById("naranja");
					break;
				case "s":
					img = document.getElementById("rosa");
					break;
				case "v":
					img = document.getElementById("verde");
					break;
				case 1:
					img = document.getElementById("gris");
					break;
				default:
					img = document.getElementById("azulMarino");
			}
			var ctx = canvas.getContext("2d").drawImage(img, j * 25, i * 25, 25, 25);
		}
	}
}

rotarDreta = function () { //Funció que rota la peça a la dreta
	var formaNova = new Array();
	for (var i = 0; i < Tetris.pieza.forma.length; i++) {
		formaNova[i] = new Array();
		for (var j = 0; j < Tetris.pieza.forma[i].length; j++) {
			formaNova[i][j] = Tetris.pieza.forma[Tetris.pieza.forma[i].length - 1 - j][i];
		}
	}
	Tetris.pieza.forma = formaNova;
}
rotarEsquerra = function () { //Funció que rota la peça a l'esquerra (tres vegades la funció rotarDreta)
	rotarDreta();
	rotarDreta();
	rotarDreta();
}

if (sessionStorage.getItem("MaxPoints") == null) {//Si la variable de sessió "MaxPoints" no existeix la deixa per defecte a 0
	sessionStorage.setItem("MaxPoints", 0);
};
document.getElementById("max").innerHTML = "Puntuació Màxima: " + sessionStorage.getItem("MaxPoints"); //Mostra els punts màxims
//Inicialitza el joc
Tetris.inicialitzar();
Tetris.insert();
mostrarMapa();
peque(Tetris.pieza, "pieza");
peque(Tetris.nextPieza, "nextPieza");

var tetris = setInterval(Tetris.controlador, Tetris.interval);