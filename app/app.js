class Apuesta {
  constructor(nombre, monto) {
    this.nombre = nombre;
    this.monto = monto;
    this.resultado = null;
  }
}

class Ruleta {
  constructor() {
    this.apuestas = [];
  }

  verApuestas() {
    let apuestasInfo = "";
    this.apuestas.forEach((apuesta) => {
      apuestasInfo += `${apuesta.nombre} apostó $${apuesta.monto}. Resultado: ${
        apuesta.resultado === null ? "Pendiente" : apuesta.resultado ? "Ganó" : "Perdió"
      }\n`;
    });
    return apuestasInfo;
  }

  agregarApuesta(apuesta) {
    this.apuestas.push(apuesta);
  }

  generarNumeroRandom() {
    return Math.floor(Math.random() * 10) + 1;
  }

  determinarResultadoApuestas() {
    this.apuestas.forEach((apuesta) => {
      const numeroApostado = this.generarNumeroRandom();
      const numeroRandom = this.generarNumeroRandom();
      apuesta.resultado = numeroApostado === numeroRandom;
    });
  }
}

const ruleta = new Ruleta();

function realizarApuesta() {
  const nombre = document.getElementById("nombre").value;
  const monto = parseInt(document.getElementById("monto").value);

  if (!nombre || isNaN(monto) || monto <= 0) {
    alert("Ingrese un nombre válido y un monto mayor a cero.");
    return;
  }

  const apuesta = new Apuesta(nombre, monto);
  ruleta.agregarApuesta(apuesta);
  ruleta.determinarResultadoApuestas();
  actualizarResumen();
  alert(`¡Apuesta realizada! ${nombre} apostó $${monto}.`);
}

function actualizarResumen() {
  const resumenApuestasTextarea = document.getElementById("resumenApuestas");
  if (ruleta.apuestas.length > 0) {
    const totalApuestas = ruleta.apuestas.reduce((acc, apuesta) => acc + apuesta.monto, 0);
    const resumen = `Resumen de Apuestas:\n${ruleta.verApuestas()}\nTotal de Apuestas: $${totalApuestas}`;
    resumenApuestasTextarea.value = resumen;
  } else {
    resumenApuestasTextarea.value = "No se realizaron apuestas en la ruleta.";
  }
}
function mostrarGanancias() {
  const totalGanado = ruleta.apuestas.reduce((total, apuesta) => {
    if (apuesta.resultado) {
      return total + apuesta.monto;
    } else {
      return total;
    }
  }, 0);
  alert(`Total Ganado: $${totalGanado}`);
}

function mostrarPerdidas() {
  const totalPerdido = ruleta.apuestas.reduce((total, apuesta) => {
    if (!apuesta.resultado) {
      return total + apuesta.monto;
    } else {
      return total;
    }
  }, 0);
  alert(`Total Perdido: $${totalPerdido}`);
}
