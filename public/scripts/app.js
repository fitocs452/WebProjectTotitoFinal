var estadoActual = {
  jugador: 1,
  grid_matrix: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
}

function evaluar_empate() {
  // Se verifican todas las casillas y si no hay mas formas de moverse y no hay ganador
  // es empate, se retorna true
  for (var fila = 0; fila <= 2; fila++) {
    for (var columna = 0; columna <= 2; columna++) {
      if (estadoActual.grid_matrix[fila][columna] === 0) {
        return false;
      }
    }
  }

  return true;
}

function verificar_jugada(columna, fila) {
  if (evaluar_empate()){
    return -1;
  }

  // Verificamos que haya ganado de forma horizontal
  if (estadoActual.grid_matrix[columna][0] === estadoActual.grid_matrix[columna][1] && estadoActual.grid_matrix[columna][1] === estadoActual.grid_matrix[columna][2]) {
    return estadoActual.grid_matrix[columna][fila];
  }

  // Verificamos que haya ganado de forma vertical
  if (estadoActual.grid_matrix[0][fila] === estadoActual.grid_matrix[1][fila] && estadoActual.grid_matrix[1][fila] === estadoActual.grid_matrix[2][fila]) {
    return estadoActual.grid_matrix[columna][fila];
  }

  var center = estadoActual.grid_matrix[1][1];
  // // Verificamos que haya ganado en diagonal
  if (center !== 0) {
    /*
      [X, 0, 0]
      [0, X, 0]
      [0, 0, X]
    */
    if (estadoActual.grid_matrix[0][0] === center && center === estadoActual.grid_matrix[2][2]) {
      return estadoActual.grid_matrix[columna][fila];
    }
    /*
      [0, 0, X]
      [0, X, 0]
      [X, 0, 0]
    */
    if (estadoActual.grid_matrix[0][2] === center && center === estadoActual.grid_matrix[2][0]) {
      return estadoActual.grid_matrix[columna][fila];
    }
  }

  return null;
}

function finalizar_juego(resultado) {
  var fin_juego = document.getElementById("finished");
  fin_juego.innerHTML = "Empate!";

  if (resultado !== -1) {
    fin_juego.innerHTML = "Ganador:  Jugador-" + resultado;
  }

  return resultado;
}

function jugar() {
  var fila = this.id.split('_')[0] - 1;
  var columna = this.id.split('_')[1] - 1;

  // Evaluamos si la posición ya fue utilizada, de ser así ya no se puede cambiar
  if (estadoActual.grid_matrix[fila][columna] !== 0) {
    console.log(estadoActual.grid_matrix[fila][columna]);
    render(estadoActual);
    return;
  }

  estadoActual.grid_matrix[fila][columna] = estadoActual.jugador;

  if (estadoActual.jugador === 1) {
    estadoActual.jugador = 2;
  } else {
    estadoActual.jugador = 1;
  }

  var resultado = verificar_jugada(fila, columna);

  if (!resultado) {
    return;
  }

  finalizar_juego(resultado);

  var result = document.getElementById('result');
  var grid = document.getElementById('grid');
  grid.style.display = 'none';
  result.style.display = 'block';
}


function agregarListeners() {
  for (var columna = 1; columna <= 3; columna++) {
    for (var fila = 1; fila <= 3; fila++) {
      document.getElementById('' + columna + '_' + fila).onclick = jugar;
    }
  }
}

function restart() {
    location.reload();
}

function render(estadoActual) {
  var grid = document.getElementById("grid");

  var html = '';
  for (var columna = 1; columna <= 3; columna++) {
    for (var fila = 1; fila <= 3; fila++) {
      html += '<div class="grid-element grid-content-style" id="'+ columna + '_' + fila;
      switch (estadoActual.grid_matrix[columna - 1][fila - 1]) {
        case 1:
          html += '">X</div>';
          break;
        case 2:
          html += '">O</div>';
          break;
        default:
          html += '"></div>';
          break;
      }
    }
  }

  grid.innerHTML = html;
  agregarListeners();
}

render(estadoActual)
