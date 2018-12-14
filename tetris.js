var Tetris = {
	mapa: [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1]
	],
	puntuacio: 0,
	maxPoints: 0,
	pieza: null,
	letra: 0,
	nextPieza: null,
	comptador: [0, 0, 0, 0, 0, 0, 0],
	interval: 200,
	inicialitzar: function() {
		var primeraPieza = randomPieza(); 
		Tetris.pieza = new Pieza(primeraPieza[0],primeraPieza[1],0,0);
		var siguientePieza = randomPieza();
		Tetris.nextPieza= new Pieza(siguientePieza[0],siguientePieza[1],0,0);
					//i, j, l, o, s, t, z
		puntuacio=0;
		comptador = [0, 0, 0, 0, 0, 0, 0];
		interval = 1000;

	},
	nextPiece: function() {
		return Math.floor(Math.random() * 7) + 0;
	},
	tecles: function() {

	},
	moviment: function() {
		var bajar = Tetris.comprovarBaixar();
		console.log("Se puede bajar? "+bajar)
		console.log(this.pieza.y);
	 	if(bajar==true){
	 	this.pieza.y++;
	 }else{

	 }

	},
	siguiente: function(){
		this.pieza=this.nextPieza;
		var siguientePieza = randomPieza();
		this.nextPieza= new Pieza(siguientePieza[0],siguientePieza[1],0,0);
		peque(Tetris.pieza, "pieza");
		peque(Tetris.nextPieza, "nextPieza");
	},

	comprovarBaixar: function(){
		var letra;

		for(var n = 0; n<this.pieza.forma.length;n++){
			for(var m = 0; m<this.pieza.forma[0].length;m++){
			if(this.pieza.forma[n][m]!=0){
				letra = this.pieza.forma[n][m];
			}
		}
		}

		var comprovar = true;
		for(var i = this.pieza.y; i<=this.pieza.y+4;i++){
			for(var j=this.pieza.x;j<=this.pieza.x+4;j++){

				//if(this.mapa[j][i+1]!=0&&this.mapa[j][i]==this.pieza.forma[2][1]&&this.mapa[j][i+1]!=this.pieza.forma[2][1]){
				if(this.mapa[i][j]!=="undefined"){
				if(this.mapa[i][j]==letra&&this.mapa[i+1][j]!=letra&&this.mapa[i+1][j]!=0){
					comprovar = false;

						for(var i = 0; i <this.mapa.length;i++){
						for(var j = 0; j<this.mapa[0].length;j++){
							if(this.mapa[i][j]==letra){
								this.mapa[i][j]=1;
							}
						}
					}
				
					
				}
			}
			}
		}
		if(comprovar==false){
			Tetris.siguiente();
		}
		return comprovar;
	},
	controlador: function(){
		Tetris.moviment();
		Tetris.insert();

		mostrarMapa();

	},

	insert: function(){
		console.log("La forma es: "+this.pieza.forma[1][0]);
		for(var i = 0; i <this.mapa.length;i++){
			for(var j = 0; j<this.mapa[0].length;j++){
				if(this.mapa[i][j]==this.pieza.forma[2][1]){
					this.mapa[i][j]=0;
				}
			}
		}

		for(var i = 0; i <4;i++){
			for(var j = 0; j<4;j++){
				if(this.mapa[i+this.pieza.y][j+this.pieza.x]!=1){
				this.mapa[i+this.pieza.y][j+this.pieza.x]=this.pieza.forma[i][j];
			}
			}
		}
	}


}

function randomPieza()
         { var peces = [
                 [[[0,0,0,0],[0,"r","r",0],[0,"r","r",0],[0,0,0,0]],"r"],
                 [[[0,"a",0,0],[0,"a",0,0],[0,"a",0,0],[0,"a",0,0]],"a"],
                 [[[0,0,0,0],[0,"g","g",0],["g","g",0,0],[0,0,0,0]],"g"],
                 [[[0,0,0,0],[0,"l","l",0],[0,0,"l","l"],[0,0,0,0]],"l"],
                 [[[0,"n",0,0],[0,"n",0,0],[0,"n","n",0],[0,0,0,0]],"n"],
                 [[[0,"s","s",0],[0,"s",0,0],[0,"s",0,0],[0,0,0,0]],"s"],
                 [[[0,0,0,0],["v","v","v",0],[0,"v",0,0],[0,0,0,0]],"v"] ]
           var numeroAleatori = Math.round(Math.random()*6); 
           Tetris.letra = peces[numeroAleatori][1]                     
           return peces[numeroAleatori];     
       }

var Pieza = function (forma, color, x, y)
            {
                this.forma = forma;
                this.color = color;
                this.x = x;
                this.y = y;
            };


		function mostrarMapa(){
		var map = "";
		var canvas = document.getElementById("mapa")
		for(var i = 0; i<Tetris.mapa.length; i++){
			for(var j = 0; j < Tetris.mapa[0].length;j++){
				switch(Tetris.mapa[i][j]){
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
				
				

				var ctx = canvas.getContext("2d").drawImage(img, j*30, i*30, 30, 30 );
			}
		}
		}

		Pieza.prototype.moureDreta = function()
         { if ((this.x-1)>0) { x--;
                          return true;
                          }
           else { return false; }
           };
           
        Pieza.prototype.moureEsquerra = function()
         { if ((x+1)<14) { x++;
                           return true;
                           }
           else { return false; }
          };   




//         Pieza.prototype.pintar = function()
//          { var resultat = "<table border='1'>";
//            for (var i = 0; i < this.forma.length;i++)
//             { resultat = resultat + "<tr>"
//                 for (var j = 0; j<this.forma[i].length;j++) 
//                  { resultat = resultat + "<td>";
//                    if (this.forma[i][j]==1) { resultat=resultat+"X" }
//                     else { resultat = resultat + "-" };
//                    resultat = resultat + "</td>";
//                    }
//               resultat = resultat + "</tr>";
//               }
//             resultat = resultat + "</table>";
//             return resultat
//            }; 
//            var pa = GeneraPecaAleatoria();
//          var p = new Pieza(pa[0],pa[1]);
        
        function peque(pieza, tablero){
		var map = "";
		console.log(pieza);
		var canvas = document.getElementById(tablero)
		for(var i = 0; i<pieza.forma.length; i++){
			for(var j = 0; j < pieza.forma[0].length;j++){
				switch(pieza.forma[i][j]){
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
				
				

				var ctx = canvas.getContext("2d").drawImage(img, j*25, i*25, 25, 25 );
			}
		}
		}

         Pieza.prototype.rotarDreta = function () {
            var formaNova = new Array();
            for (var i=0;i<this.forma.length;i++) {
                formaNova[i]=new Array();
                for (var j=0;j<this.forma[i].length;j++) {
                    formaNova[i][j]=this.forma[this.forma[i].length-1-j][i];
                }
            }
            this.forma = formaNova;
            }  
            Pieza.prototype.rotarEsquerra = function () {
            	Pieza.rotarEsquerra();
            	Pieza.rotarEsquerra();
            	Pieza.rotarEsquerra();
            }  

              	Tetris.inicialitzar();
				Tetris.insert();
				mostrarMapa();

				peque(Tetris.pieza, "pieza");
				peque(Tetris.nextPieza, "nextPieza");

				var tetris = setInterval(Tetris.controlador, Tetris.interval);

				

// console.log(Pieza);
