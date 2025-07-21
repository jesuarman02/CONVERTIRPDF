document.addEventListener("DOMContentLoaded", function () {
  const uploadInput = document.getElementById("pdf-upload");
  const fileNameDisplay = document.getElementById("file-name");
  const btnEliminar = document.getElementById("btn-eliminar");
  const selectTipo = document.getElementById("tipo-pdf");
  const tipoHidden = document.getElementById("tipo_pdf_hidden");
  const descripcionDiv = document.getElementById("descripcion-tipo-pdf");
  const btnGuardarTipo = document.getElementById("btn-guardar-tipo");
  const btnLimpiarTipo = document.getElementById("btn-limpiar-tipo");
  const form = document.querySelector("form");
  const descargasCard = document.getElementById("descargas-card");
  const btnDescargar = document.getElementById("btn-descargar-simple");
  const btnReiniciar = document.getElementById("btn-reiniciar");
  const btnInicio = document.getElementById("btn-inicio");

  const descripciones = {
    escaneado:
      "📷 Este tipo de PDF es una representación digital de un documento físico. Se genera, por ejemplo, al escanear una hoja impresa o tomar una fotografía de un texto. Su contenido es tratado como una imagen completa, lo que significa que no es posible seleccionar ni copiar el texto directamente. Es similar a ver una fotografía de un documento.",
    digital:
      "🖥️ Un PDF digital es un documento cuyo contenido de texto fue generado directamente desde una aplicación informática, como un procesador de texto o un software de diseño. En este formato, el texto es completamente interactivo, permitiéndole seleccionar, copiar y pegar palabras o frases individuales. Es el formato común para la mayoría de los documentos creados y descargados digitalmente.",
    imagenes:
      "🖼️ Este formato combina las características de los dos tipos anteriores. Contiene texto que puede ser seleccionado y copiado, pero también incluye elementos visuales predominantes como fotografías, gráficos, diagramas o diapositivas de presentaciones. Aunque el texto es editable, los componentes visuales son fundamentales para la comprensión del documento y no se consideran texto interactivo.",
  };

  [
    btnEliminar,
    btnGuardarTipo,
    descripcionDiv,
    btnLimpiarTipo,
    descargasCard,
  ].forEach((el) => el.classList.add("d-none"));

  
    function resetFile() {
      uploadInput.value = "";
      fileNameDisplay.textContent = "";
      btnEliminar.classList.add("d-none");
    }

    function resetTipo() {
      tipoHidden.value = "";
      selectTipo.value = "0";
      selectTipo.disabled = false;
      descripcionDiv.classList.add("d-none");
      btnGuardarTipo.classList.add("d-none");
      btnLimpiarTipo.classList.add("d-none");
    }

    function resetAll() {
      resetFile();
      resetTipo();
      form.classList.remove("d-none");
      descargasCard.classList.add("d-none");
    }

  uploadInput.addEventListener("change", function () {
    const archivo = this.files[0];
    if (!archivo) return;

    fileNameDisplay.textContent = `Archivo seleccionado: ${archivo.name}`;
    btnEliminar.classList.remove("d-none");

    Swal.fire({
      title: "Archivo subido exitosamente",
      icon: "success",
      showClass: { popup: "animate__animated animate__fadeInUp" },
      hideClass: { popup: "animate__animated animate__fadeOutDown" },
      timer: 3000,
      showConfirmButton: false,
    });
  });

  btnEliminar.addEventListener("click", function (e) {
    e.preventDefault();
    resetFile();
  });

  selectTipo.addEventListener("change", function () {
    const tipo = this.value;
    if (tipo === "0") {
      descripcionDiv.classList.add("d-none");
      btnGuardarTipo.classList.add("d-none");
      Swal.fire({
        title: "Por favor selecciona una opción válida",
        icon: "warning",
        showClass: { popup: "animate__animated animate__shakeX" },
        hideClass: { popup: "animate__animated animate__fadeOutDown" },
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }
    descripcionDiv.innerHTML = `<strong>Descripción:</strong> ${descripciones[tipo]}`;
    descripcionDiv.classList.remove("d-none");
    btnGuardarTipo.classList.remove("d-none");
  });

  btnGuardarTipo.addEventListener("click", function () {
    const idx = selectTipo.selectedIndex;
    const texto = selectTipo.options[idx].text;

    tipoHidden.value = selectTipo.value;
    selectTipo.disabled = true;
    btnGuardarTipo.classList.add("d-none");
    btnLimpiarTipo.classList.remove("d-none");

    Swal.fire({
      title: "Tipo de archivo guardado correctamente",
      text: `Seleccionaste: ${texto}`,
      icon: "success",
      showClass: { popup: "animate__animated animate__fadeInUp" },
      hideClass: { popup: "animate__animated animate__fadeOutDown" },
      timer: 2000,
      showConfirmButton: false,
    });
  });

  btnLimpiarTipo.addEventListener("click", function (e) {
    e.preventDefault();
    resetTipo();
    Swal.fire({
      title: "Opción eliminada correctamente",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!uploadInput.files.length) {
      return Swal.fire({
        title: "Debes subir un archivo PDF",
        icon: "error",
        showClass: { popup: "animate__animated animate__bounceIn" },
        hideClass: { popup: "animate__animated animate__fadeOutDown" },
        timer: 3000,
        showConfirmButton: false,
      });
    }

    if (!tipoHidden.value) {
      return Swal.fire({
        title: "Debes guardar el tipo de archivo antes",
        icon: "warning",
        showClass: { popup: "animate__animated animate__shakeX" },
        hideClass: { popup: "animate__animated animate__fadeOutDown" },
        timer: 3000,
        showConfirmButton: false,
      });
    }

    const formData = new FormData(form);
    const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value;

    Swal.fire({
      title: "Generando Word...",
      html: "Esto puede tardar hasta 30 segundos.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading(),
    });

    fetch(form.action, {
      method: "POST",
      headers: { "X-CSRFToken": csrf },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        Swal.close();
        if (data.error) {
          return Swal.fire({
            title: "Error al generar",
            text: data.error,
            icon: "error",
          });
        }
        Swal.fire({
          title: "Archivo Word generado correctamente",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          form.classList.add("d-none");
          descargasCard.classList.remove("d-none");

          btnDescargar.onclick = function (e) {
            e.preventDefault();
            Swal.fire({
              title: "Descargando...",
              text: "Archivo Word descargado en la carpeta de descargas.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
              window.location.href = `/descargar/${data.archivo}/`;
            });
          };
        });
      })
      .catch((err) => {
        Swal.close();
        Swal.fire({
          title: "Error inesperado",
          text: err.message || err,
          icon: "error",
        });
      });

    btnReiniciar.addEventListener("click", function (e) {
      e.preventDefault();
      Swal.fire({
        title: "Limpiando valores...",
        icon: "info",
        timer: 1000,
        showConfirmButton: false,
      }).then(() => resetAll());
    });

    btnInicio.addEventListener("click", function (e) {
      e.preventDefault();
      Swal.fire({
        title: "Redirigiendo...",
        icon: "info",
        timer: 800,
        showConfirmButton: false,
      }).then(() => (window.location.href = "/"));
    });

  });
});
