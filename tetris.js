var Tetris = {
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
	puntuacio: 0,
	maxPoints: 0,
	pieza: null,
	nivell: 0,
	nextPieza: null,
	comptador: [0, 0, 0, 0, 0, 0, 0],
	interval: 300,
	tecla: null,
	inicialitzar: function () {
		var primeraPieza = randomPieza();
		Tetris.pieza = new Pieza(primeraPieza[0], primeraPieza[1], 0, 0);
		var siguientePieza = randomPieza();
		Tetris.nextPieza = new Pieza(siguientePieza[0], siguientePieza[1], 0, 0);
		puntuacio = 0;
		comptador = [0, 0, 0, 0, 0, 0, 0];
		interval = 500;

	},
	moviment: function () {

		var bajar = Tetris.comprovarBaixar(1);
		if (bajar == true) {
			this.pieza.y++;
		} else {
			for (var i = 0; i < this.mapa.length; i++) {
				for (var j = 0; j < this.mapa[0].length; j++) {
					if (this.mapa[i][j] != 0 && this.mapa[i][j] != 1) {
						this.mapa[i][j] = 1;
					}
				}
			}
			this.puntuacio= this.puntuacio+10;
			if(this.puntuacio%100==0){
			this.puntuacio=this.puntuacio+20;
			this.nivell++;
			this.interval=this.interval-this.interval*10/100;
			}
			document.getElementById("puntuacio").innerHTML = "Puntuació: " + this.puntuacio;
			document.getElementById("nivell").innerHTML = "Nivell: " + this.nivell;
			if(this.puntuacio>sessionStorage.getItem("MaxPoints")){
				sessionStorage.setItem("MaxPoints", this.puntuacio);
			}
			document.getElementById("max").innerHTML = "Puntuació Màxima: " + sessionStorage.getItem("MaxPoints");
			console.log(this.interval);
			Tetris.siguiente();
		}
		if (this.tecla == 1) {
			this.pieza.x++;
			if (!Tetris.comprovarBaixar(2)) {
				this.pieza.x--;
			}

		} else {
			if (this.tecla == 3) {
				this.pieza.x--;
				if (!Tetris.comprovarBaixar(3)) {
					this.pieza.x++;
				}
			}if (this.tecla == 2) {
			if (Tetris.comprovarBaixar(1)) {
				this.pieza.y++;
			}

		}
			if (this.tecla == 0) {
				rotarDreta();
				if (Tetris.comprovarBaixar(4)) {
					rotarEsquerra()
				}
			}
		}

	},
	siguiente: function () {
		this.pieza = this.nextPieza;
		var siguientePieza = randomPieza();
		this.nextPieza = new Pieza(siguientePieza[0], siguientePieza[1], 0, 0);
		peque(Tetris.pieza, "pieza");
		peque(Tetris.nextPieza, "nextPieza");
	},

	comprovarBaixar: function (opcio) {

		switch (opcio) {
			case 1: //Comprova si pot baixar
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
			case 2: //Comprova si es pot moure horitzontalment
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
			case 3:
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
			case 4:
				for (var i = 0; i < 4; i++) {
					for (var j = 0; j < 4; j++) {
						if (this.mapa[i + this.pieza.y + 1][j + this.pieza.x] == 1) {

							return true;
						}
					}
				}
				return false;
		}

	},

	controlador: function () {
		document.onkeydown = teclat;
		Tetris.moviment();
		Tetris.insert();
		Tetris.tecla = 4;
		Tetris.complert();
		mostrarMapa();


	},
	complert: function(){
		for (var i = 0; i < this.mapa.length; i++) {
			var complet = true;
			for (var j = 0; j < this.mapa[0].length; j++) {
				if (this.mapa[i][j] != 1) {
					complet = false;
				}
				if(this.mapa[0][j]==1){
					var loading = document.getElementById ( "lost" ) ;
					loading.style.visibility = "visible" ;
					clearInterval(tetris);
				}
			}
			if(complet){
				console.log("AAAA");

				var pos = i;
				for(var n = i-1;n>=0;n--){
					
					aux=this.mapa[n];
					this.mapa[pos]=aux;
					pos--;
				}
				this.mapa[0]=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				

			}
				
				else{
				console.log("ninguno");
			}
		}
	},
	insert: function () {
		for (var i = 0; i < this.mapa.length; i++) {
			for (var j = 0; j < this.mapa[0].length; j++) {
				if (this.mapa[i][j] != 0 && this.mapa[i][j] != 1) {
					this.mapa[i][j] = 0;
				}
			}
		}

		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (this.mapa[i + this.pieza.y][j + this.pieza.x] != 1) {
					this.mapa[i + this.pieza.y][j + this.pieza.x] = this.pieza.forma[i][j];
				}
			}
		}
	}


}

function randomPieza() {
	var peces = [
		[
			[
				[0, 0, 0, 0],
				[0, "r", "r", 0],
				[0, "r", "r", 0],
				[0, 0, 0, 0]
			], "r"
		],
		[
			[
				[0, "a", 0, 0],
				[0, "a", 0, 0],
				[0, "a", 0, 0],
				[0, "a", 0, 0]
			], "a"
		],
		[
			[
				[0, 0, 0, 0],
				[0, "g", "g", 0],
				["g", "g", 0, 0],
				[0, 0, 0, 0]
			], "g"
		],
		[
			[
				[0, 0, 0, 0],
				[0, "l", "l", 0],
				[0, 0, "l", "l"],
				[0, 0, 0, 0]
			], "l"
		],
		[
			[
				[0, "n", 0, 0],
				[0, "n", 0, 0],
				[0, "n", "n", 0],
				[0, 0, 0, 0]
			], "n"
		],
		[
			[
				[0, "s", "s", 0],
				[0, "s", 0, 0],
				[0, "s", 0, 0],
				[0, 0, 0, 0]
			], "s"
		],
		[
			[
				[0, 0, 0, 0],
				["v", "v", "v", 0],
				[0, "v", 0, 0],
				[0, 0, 0, 0]
			], "v"
		]
	]
	var numeroAleatori = Math.round(Math.random() * 6);
	Tetris.letra = peces[numeroAleatori][1]
	return peces[numeroAleatori];
}

function teclat(e) {
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
var Pieza = function (forma, color, x, y) {
	this.forma = forma;
	this.color = color;
	this.x = x;
	this.y = y;
};


function mostrarMapa() {
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

function peque(pieza, tablero) {
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

rotarDreta = function () {
	var formaNova = new Array();
	for (var i = 0; i < Tetris.pieza.forma.length; i++) {
		formaNova[i] = new Array();
		for (var j = 0; j < Tetris.pieza.forma[i].length; j++) {
			formaNova[i][j] = Tetris.pieza.forma[Tetris.pieza.forma[i].length - 1 - j][i];
		}
	}
	Tetris.pieza.forma = formaNova;
}
rotarEsquerra = function () {
	rotarDreta();
	rotarDreta();
	rotarDreta();
}

if(sessionStorage.getItem("MaxPoints")==null){
sessionStorage.setItem("MaxPoints", 1);
};
document.getElementById("max").innerHTML = "Puntuació Màxima: " + sessionStorage.getItem("MaxPoints");



Tetris.inicialitzar();
Tetris.insert();
mostrarMapa();

peque(Tetris.pieza, "pieza");
peque(Tetris.nextPieza, "nextPieza");

var tetris = setInterval(Tetris.controlador, Tetris.interval);