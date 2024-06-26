const consolaIn = document.querySelector('#consolaIn'); // Reemplaza con tu selector
const consolaOut = document.querySelector('#consolaOut'); // Reemplaza con tu selector
const maxHeight = 600;
const idConsolaIn = "consolaIn";
const idConsolaOut = "consolaOut";
const idContenedorVacio = "contenedorVacio";
const idContenedorContenido = "contenedorContenido";
const conversiones = {
  'e': 'enter',
  'i': 'imes',
  'a': 'ai',
  'o': 'ober',
  'u': 'ufat',
};

const desconversiones = {
  'enter': 'e',
  'imes': 'i',
  'ai': 'a',
  'ober': 'o',
  'ufat': 'u',
};

function ajustarAlturaTextArea(textarea, maxHeight) {
  textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight + 2) + 'px';

    if (parseInt(this.style.height) > maxHeight) {
      this.style.height = maxHeight + 'px';
      this.scrollTop = this.scrollHeight;
    }
  });
}

ajustarAlturaTextArea(consolaIn, maxHeight);
ajustarAlturaTextArea(consolaOut, maxHeight);

function encriptarTexto(texto) {
  for (const letra in conversiones) {
    const expresionRegular = new RegExp(letra, 'g');
    texto = texto.replace(expresionRegular, conversiones[letra]);
  }

  return texto;
}

function desencriptarTexto(texto) {
  for (const palabra in desconversiones) {
    const expresionRegular = new RegExp(palabra, 'g');
    texto = texto.replace(expresionRegular, desconversiones[palabra]);
  }

  return texto;
}

function encriptar(texto) {
  return encriptarTexto(texto);
}

function desencriptar(texto) {
  return desencriptarTexto(texto);
}

function procesarTexto(funcionProcesamiento) {
  let texto = document.getElementById(idConsolaIn).value;
  if (texto.length > 0) {
    cambiarVisibilidad(true);
    let consolaOut = document.getElementById(idConsolaOut);
    consolaOut.value = (funcionProcesamiento === 'encriptar') ? encriptar(texto) : desencriptar(texto);
  } else {
    cambiarVisibilidad(false);
  }
}

function cambiarVisibilidad(isContenido) {
  if (isContenido) {
    document.getElementById(idContenedorContenido).style.display = 'block';
    document.getElementById(idContenedorVacio).style.display = 'none';
  } else {
    document.getElementById(idContenedorVacio).style.display = 'block';
    document.getElementById(idContenedorContenido).style.display = 'none';
  }

}

function validarTexto(event) {
  const input = document.getElementById('consolaIn');
  const pattern = /^[a-z\s]+$/; // Expresión regular para letras minúsculas
  if (!pattern.test(input.value)) {
    alert('Ingresa solo letras minúsculas y sin acentos.');
  } else {
    event.preventDefault();
  }
}

function copiar() {
  const campoEntrada = document.getElementById(idConsolaOut);
  campoEntrada.select();
  if (campoEntrada.selectionStart !== campoEntrada.selectionEnd) {
    // Selecciona el texto dentro del campo
    document.execCommand('copy'); // Copia el texto al portapapeles
    alert('Texto copiado!');
  }
}