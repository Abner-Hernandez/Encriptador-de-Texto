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
  let consolaOut = document.getElementById(idConsolaOut);
  consolaOut.value = (funcionProcesamiento === 'encriptar') ? encriptar(texto) : desencriptar(texto);
  cambiarVisibilidad(document.getElementById(idConsolaOut).value.length > 0);
}

function cambiarVisibilidad(isContenido) {
  if (isContenido) {
    document.getElementById(idContenedorContenido).style.display = 'flex';
    document.getElementById(idContenedorVacio).style.display = 'none';
  } else {
    document.getElementById(idContenedorVacio).style.display = 'inline';
    document.getElementById(idContenedorContenido).style.display = 'none';
  }

}

function validarTexto(event) {
  const texto = document.getElementById(idConsolaIn).value;
  const patron = /^[a-z0-9\s!@#$%^&*()_+\=[\]{}|;':".,\/<>?`~¡¿\n-]*$/;
  if (!patron.test(texto)) {
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