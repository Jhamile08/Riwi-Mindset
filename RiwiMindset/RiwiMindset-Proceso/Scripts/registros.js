function abrirModal() {
    // Mostrar el modal
    document.getElementById('miModal').style.display = 'block';
  }

  function abrirModal1() {
    // Mostrar el modal
    document.getElementById('miModal1').style.display = 'block';
  }

  function cerrarModal() {
    // Ocultar el modal
    document.getElementById('miModal').style.display = 'none';
  }

  function guardarContenido() {
    // Obtener el contenido del textarea
    var contenidoTextarea = document.getElementById('contenidoTextarea').value;

    // Mostrar el contenido en el párrafo fuera del modal
    document.getElementById('pResultadoRegistro').textContent = 'Contenido guardado: ' + contenidoTextarea;

    // Cerrar el modal después de guardar
    cerrarModal();
  }

  function guardarContenido1() {
    // Obtener el contenido del textarea
    var contenidoTextarea = document.getElementById('contenidoTextarea1').value;

    // Mostrar el contenido en el párrafo fuera del modal
    document.getElementById('pResultadoRecomendacion').textContent = 'Contenido guardado: ' + contenidoTextarea;

    // Cerrar el modal después de guardar
    cerrarModal();
  }