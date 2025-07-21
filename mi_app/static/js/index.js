const inputFile = document.getElementById("pdf-upload");
const btnEliminar = document.getElementById("btn-eliminar");
const fileName = document.getElementById("file-name");

inputFile.addEventListener("change", function () {
  const file = inputFile.files[0];
  if (!file) return;

  if (file.type !== "application/pdf") {
    Swal.fire({
      title: "Archivo no válido",
      text: "Por favor selecciona un archivo PDF.",
      icon: "error",
      showClass: {
        popup: `animate__animated animate__fadeInUp animate__faster`,
      },
      hideClass: {
        popup: `animate__animated animate__fadeOutDown animate__faster`,
      },
      timer: 3000,
      showConfirmButton: false,
    });
    inputFile.value = "";
    fileName.textContent = "";
    return;
  }

  if (file.size > 3 * 1024 * 1024) {
    Swal.fire({
      title: "Archivo demasiado grande",
      text: "El archivo no debe superar los 3MB.",
      icon: "error",
      showClass: {
        popup: `animate__animated animate__fadeInUp animate__faster`,
      },
      hideClass: {
        popup: `animate__animated animate__fadeOutDown animate__faster`,
      },
      timer: 3000,
      showConfirmButton: false,
    });
    inputFile.value = "";
    fileName.textContent = "";
    return;
  }

  Swal.fire({
    title: "Archivo subido exitosamente",
    icon: "success",
    showClass: {
      popup: `animate__animated animate__fadeInUp`,
    },
    hideClass: {
      popup: `animate__animated animate__fadeOutDown`,
    },
    timer: 3000,
    showConfirmButton: false,
  });

  fileName.textContent = `Archivo seleccionado: ${file.name}`;
});

btnEliminar.addEventListener("click", function () {
  inputFile.value = "";
  fileName.textContent = "";
  Swal.fire({
    title: "Archivo eliminado",
    icon: "error",
    showClass: {
      popup: `animate__animated animate__fadeInUp animate__faster`,
    },
    hideClass: {
      popup: `animate__animated animate__fadeOutDown animate__faster`,
    },
    timer: 3000,
    showConfirmButton: false,
  });
});

const inputNombre = document.getElementById("input-nombre");
const inputCargo = document.getElementById("input-cargo");
const btnGuardarCredenciales = document.getElementById(
  "btn-guardar-credenciales"
);
const btnEditarNombre = document.getElementById("btn-editar-nombre");
const btnEliminarNombre = document.getElementById("btn-eliminar-nombre");
const btnEditarCargo = document.getElementById("btn-editar-cargo");
const btnEliminarCargo = document.getElementById("btn-eliminar-cargo");

function soloLetrasYCapitalizar(e) {
  e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.,]/g, "");
  if (e.target.value.length === 1) {
    e.target.value = e.target.value.charAt(0).toUpperCase();
  }
}

inputNombre.addEventListener("input", soloLetrasYCapitalizar);
inputCargo.addEventListener("input", soloLetrasYCapitalizar);

function actualizarBotonesCredenciales() {
  btnEditarNombre.classList.toggle("hidden", !inputNombre.disabled);
  btnEliminarNombre.classList.toggle("hidden", !inputNombre.disabled);
  btnEditarCargo.classList.toggle("hidden", !inputCargo.disabled);
  btnEliminarCargo.classList.toggle("hidden", !inputCargo.disabled);
}

window.addEventListener("DOMContentLoaded", actualizarBotonesCredenciales);

btnGuardarCredenciales.addEventListener("click", () => {
  if (inputNombre.value.trim() === "" || inputCargo.value.trim() === "") {
    Swal.fire({
      title: "Campos vacíos",
      text: "Completa todos los campos.",
      icon: "warning",
      showClass: {
        popup: `animate__animated animate__fadeInUp animate__faster`,
      },
      hideClass: {
        popup: `animate__animated animate__fadeOutDown animate__faster`,
      },
      timer: 3000,
      showConfirmButton: false,
    });
    return;
  }
  Swal.fire({
    title: "¡Guardado!",
    text: "Credenciales guardadas.",
    icon: "success",
    showClass: {
      popup: `animate__animated animate__fadeInUp animate__faster`,
    },
    hideClass: {
      popup: `animate__animated animate__fadeOutDown animate__faster`,
    },
    timer: 3000,
    showConfirmButton: false,
  });
  inputNombre.disabled = true;
  inputCargo.disabled = true;
  btnGuardarCredenciales.classList.add("hidden");
  actualizarBotonesCredenciales();
});

btnEditarNombre.addEventListener("click", () => {
  inputNombre.disabled = false;
  btnGuardarCredenciales.classList.remove("hidden");
  actualizarBotonesCredenciales();
});
btnEliminarNombre.addEventListener("click", () => {
  inputNombre.value = "";
  inputNombre.disabled = false;
  btnGuardarCredenciales.classList.remove("hidden");
  actualizarBotonesCredenciales();
});
btnEditarCargo.addEventListener("click", () => {
  inputCargo.disabled = false;
  btnGuardarCredenciales.classList.remove("hidden");
  actualizarBotonesCredenciales();
});
btnEliminarCargo.addEventListener("click", () => {
  inputCargo.value = "";
  inputCargo.disabled = false;
  btnGuardarCredenciales.classList.remove("hidden");
  actualizarBotonesCredenciales();
});

const opcionesDescripcion = {
  1: "A este respecto, después de realizada una búsqueda exhaustiva y razonable en los archivos físicos y electrónicos que obran en la Dirección Adjunta de Innovación y Conocimiento, así como de la consulta al personal adscrito a la misma, se informa lo siguiente:",
  2: "Sobre el particular, después de realizada una búsqueda exhaustiva y razonable en los archivos físicos y electrónicos que obran en la Dirección Adjunta de Innovación y Conocimiento, así como de la consulta al personal adscrito a la misma, se comunica lo siguiente:",
};

const opcionElegidaDiv = document.getElementById("opcion-elegida");
const opcionElegidaModal = document.getElementById("opcion-elegida-modal");
const selectOpciones = document.getElementById("select-opciones");
const inputOtro = document.getElementById("input-otro");
const inputOtroGroup = document.getElementById("input-otro-group");
const btnGuardarModal = document.getElementById("btn-guardar-modal");
const btnAbrirModal = document.getElementById("btn-abrir-modal");
const btnEliminarSeleccion = document.getElementById("btn-eliminar-seleccion");

opcionElegidaDiv.textContent = `1) ${opcionesDescripcion[1]}`;
if (opcionElegidaModal) {
  opcionElegidaModal.textContent = `1) ${opcionesDescripcion[1]}`;
}

selectOpciones.addEventListener("change", () => {
  const val = selectOpciones.value;
  if (val === "otro") {
    inputOtroGroup.classList.remove("hidden");
    opcionElegidaModal.classList.add("hidden");
  } else {
    inputOtroGroup.classList.add("hidden");
    opcionElegidaModal.textContent = `${val}) ${opcionesDescripcion[val]}`;
    opcionElegidaModal.classList.remove("hidden");
  }
});

inputOtro.addEventListener("input", () => {
  if (inputOtro.value.trim()) {
    opcionElegidaModal.textContent = `Otra opción: ${inputOtro.value.trim()}`;
    opcionElegidaModal.classList.remove("hidden");
  } else {
    opcionElegidaModal.classList.add("hidden");
  }
});

btnGuardarModal.addEventListener("click", () => {
  opcionElegidaDiv.textContent = opcionElegidaModal.textContent;
  const textoSinPrefijo = opcionElegidaModal.textContent
    .replace(/^\s*(\d+\)|Otra opción:)\s*/, "")
    .trim();
  document.getElementById("cuerpo_respuesta_hidden").value = textoSinPrefijo;

  Swal.fire({
    title: "¡Guardado!",
    text: "Opción guardada correctamente.",
    icon: "success",
    showClass: { popup: `animate__animated animate__fadeInUp animate__faster` },
    hideClass: {
      popup: `animate__animated animate__fadeOutDown animate__faster`,
    },
    timer: 3000,
    showConfirmButton: false,
  });

  btnAbrirModal.classList.add("hidden");
  btnEliminarSeleccion.classList.remove("hidden");
});

btnEliminarSeleccion.addEventListener("click", () => {
  opcionElegidaDiv.textContent = `1) ${opcionesDescripcion[1]}`;
  opcionElegidaModal.textContent = `1) ${opcionesDescripcion[1]}`;
  document.getElementById("cuerpo_respuesta_hidden").value =
    opcionesDescripcion[1];

  selectOpciones.value = "1";
  inputOtro.value = "";
  inputOtroGroup.classList.add("hidden");
  opcionElegidaModal.classList.remove("hidden");

  Swal.fire({
    title: "¡Reiniciado!",
    text: "Se restauró la opción predeterminada.",
    icon: "info",
    showClass: { popup: `animate__animated animate__fadeInUp animate__faster` },
    hideClass: {
      popup: `animate__animated animate__fadeOutDown animate__faster`,
    },
    timer: 3000,
    showConfirmButton: false,
  });

  btnAbrirModal.classList.remove("hidden");
  btnEliminarSeleccion.classList.add("hidden");
});

const checkbox = document.getElementById("copy-checkbox");
const copyInput = document.getElementById("copy-input");
const guardarCopy = document.getElementById("guardar-copy");

checkbox.addEventListener("change", () => {
  guardarCopy.classList.toggle("hidden", !checkbox.checked);
});
copyInput.addEventListener("input", soloLetrasYCapitalizar);

guardarCopy.addEventListener("click", () => {
  if (!checkbox.checked) return;
  if (copyInput.value.trim() === "") {
    Swal.fire({
      title: "Campo vacío",
      text: "No puedes dejar este campo vacío.",
      icon: "warning",
      showClass: {
        popup: `animate__animated animate__fadeInUp animate__faster`,
      },
      hideClass: {
        popup: `animate__animated animate__fadeOutDown animate__faster`,
      },
      timer: 3000,
      showConfirmButton: false,
    });
    return;
  }
  document.getElementById("ccp_adicional_hidden").value =
    copyInput.value.trim();
  const ul = document.querySelector(".list-group.mb-3");
  const nuevoLi = document.createElement("li");
  nuevoLi.className = "list-group-item";
  nuevoLi.innerText = copyInput.value.trim();
  ul.appendChild(nuevoLi);
  Swal.fire({
    title: "Guardado",
    text: "Nombre agregado correctamente.",
    icon: "success",
    showClass: {
      popup: `animate__animated animate__fadeInUp animate__faster`,
    },
    hideClass: {
      popup: `animate__animated animate__fadeOutDown animate__faster`,
    },
    timer: 3000,
    showConfirmButton: false,
  });
  copyInput.value = "";
  checkbox.checked = false;
  guardarCopy.classList.add("hidden");
});

const btnProcesar = document.getElementById("btn-generar-word");
const generarCard = document.getElementById("generar-card");
const descargasCard = document.getElementById("descargas-card");
let archivoGenerado = "";

btnProcesar.addEventListener("click", () => {
  const pdfInput = document.getElementById("pdf-upload");
  const nombre = inputNombre.value.trim();
  const cargo = inputCargo.value.trim();
  const file = pdfInput.files[0];
  const cuerpoRespuesta = document
    .getElementById("cuerpo_respuesta_hidden")
    .value.trim();
  const ccpAdicional = document
    .getElementById("ccp_adicional_hidden")
    .value.trim();

  if (!file || !nombre || !cargo || !cuerpoRespuesta) {
    Swal.fire({
      title: "Error",
      text: "Completa todos los campos correctamente.",
      icon: "warning",
      showClass: {
        popup: "animate__animated animate__bounceInUp animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOutDown animate__faster",
      },
      timer: 3000,
      showConfirmButton: false,
    });
    return;
  }

  let timerInterval;
  Swal.fire({
    title: "Generando tu archivo WORD",
    html: "Ya falta poco... <b></b> segundos",
    timer: 40000,
    timerProgressBar: true,
    allowOutsideClick: false,
    showClass: {
      popup: "animate__animated animate__bounceInUp animate__faster",
    },
    hideClass: {
      popup: "animate__animated animate__bounceOutDown animate__faster",
    },
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
      }, 1000);
    },
    willClose: () => clearInterval(timerInterval),
  });

  const formData = new FormData();
  formData.append("pdf", file);
  formData.append("nombre", nombre);
  formData.append("cargo", cargo);
  formData.append("cuerpo_respuesta", cuerpoRespuesta);
  formData.append("ccp_adicional", ccpAdicional);

  fetch("/procesar_pdf/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) throw new Error(data.error);

      archivoGenerado = data.archivo;

      Swal.close();
      Swal.fire({
        title: "Archivo Word generado correctamente",
        icon: "success",
        showClass: {
          popup: "animate__animated animate__bounceInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__bounceOutDown animate__faster",
        },
        timer: 3000,
        showConfirmButton: false,
      });

      generarCard.classList.add("hidden");
      descargasCard.classList.remove("hidden");
    })
    .catch((err) => {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "No se pudo procesar el archivo.",
        icon: "error",
        showClass: {
          popup: "animate__animated animate__bounceInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__bounceOutDown animate__faster",
        },
        timer: 3000,
        showConfirmButton: false,
      });
    });
});

document.getElementById("btn-descargar").addEventListener("click", () => {
  if (!archivoGenerado) return;
  const enlace = document.createElement("a");
  enlace.href = `/media/${archivoGenerado}`;
  enlace.download = archivoGenerado;
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
  Swal.fire({
    title: "Archivo Word Descargado Correctamente",
    icon: "success",
    showClass: {
      popup: "animate__animated animate__bounceInUp animate__faster",
    },
    hideClass: {
      popup: "animate__animated animate__bounceOutDown animate__faster",
    },
    timer: 3000,
    showConfirmButton: false,
  });
});
document.getElementById("btn-descargar-txt").addEventListener("click", () => {
  const enlace = document.createElement("a");
  enlace.href = `/media/pdf_limpio.txt`;
  enlace.download = "pdf_limpio.txt";
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);

  Swal.fire({
    title: "Archivo TXT descargado Correctamente",
    icon: "success",
    showClass: {
      popup: "animate__animated animate__bounceInUp animate__faster",
    },
    hideClass: {
      popup: "animate__animated animate__bounceOutDown animate__faster",
    },
    timer: 3000,
    showConfirmButton: false,
  });
});

document.getElementById("btn-reiniciar").addEventListener("click", () => {
  inputFile.value = "";
  fileName.textContent = "";

  inputNombre.value = "";
  inputCargo.value = "";
  inputNombre.disabled = false;
  inputCargo.disabled = false;
  btnGuardarCredenciales.classList.remove("hidden");
  actualizarBotonesCredenciales();

  document.getElementById("cuerpo_respuesta_hidden").value = "";
  opcionElegidaDiv.textContent = `1) ${opcionesDescripcion[1]}`;
  btnAbrirModal.classList.remove("hidden");
  btnEliminarSeleccion.classList.add("hidden");
  selectOpciones.value = "1";
  inputOtro.value = "";
  inputOtroGroup.classList.add("hidden");
  opcionElegidaModal.textContent = `1) ${opcionesDescripcion[1]}`;
  opcionElegidaModal.classList.remove("hidden");

  document.getElementById("ccp_adicional_hidden").value = "";
  const ul = document.querySelector(".list-group.mb-3");
  ul.querySelectorAll("li").forEach((li, i) => {
    if (i >= 2) li.remove();
  });

  generarCard.classList.remove("hidden");
  descargasCard.classList.add("hidden");

  Swal.fire({
    title: "Formulario reiniciado",
    icon: "info",
    showClass: {
      popup: "animate__animated animate__bounceInUp animate__faster",
    },
    hideClass: {
      popup: "animate__animated animate__bounceOutDown animate__faster",
    },
    timer: 2000,
    showConfirmButton: false,
  });
});

document.getElementById("btn-inicio").addEventListener("click", () => {
  window.location.href = "/";
});
