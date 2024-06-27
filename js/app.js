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

const textareas = document.querySelectorAll('.auto-grow');

function ajustarAltura(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = (textarea.scrollHeight + 2) + 'px';

  if (parseInt(textarea.style.height) > maxHeight) {
    textarea.style.height = maxHeight + 'px';
    textarea.scrollTop = textarea.scrollHeight;
  }
}

textareas.forEach(textarea => {
  textarea.addEventListener('input', () => {
    ajustarAltura(textarea);
    // Ajusta la altura de todos los textareas
    textareas.forEach(otherTextarea => {
      if (otherTextarea !== textarea) {
        otherTextarea.style.height = textarea.style.height;
      }
    });
    //ajustar el alto de los paneles
    const contenedor = document.querySelector(".app__desencriptador");
    const altura = document.querySelector(".app__encriptador").scrollHeight;
    const altura2 = document.querySelector(".app__desencriptador").scrollHeight;
    contenedor.style.height = `${altura}px`;;
  });
});

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
  let contenido = document.getElementById(idContenedorContenido);
  if (isContenido) {
    contenido.style.display = 'flex';
    contenido.style.flexDirection = 'column';
    document.getElementById(idContenedorVacio).style.display = 'none';
  } else {
    document.getElementById(idContenedorVacio).style.display = 'inline';
    contenido.style.display = 'none';
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