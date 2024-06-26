const textarea = document.querySelector('textarea');
const maxHeight = 600; // Establece la altura máxima deseada en píxeles

textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // Restablece la altura
  this.style.height = (this.scrollHeight + 2) + 'px'; // Ajusta la altura

  // Verifica si la altura supera la altura máxima
  if (parseInt(this.style.height) > maxHeight) {
    this.style.height = maxHeight + 'px'; // Limita la altura al máximo
    this.scrollTop = this.scrollHeight; // Desplaza el contenido hacia arriba
  }
});
