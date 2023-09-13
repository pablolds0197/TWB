// Variable global para rastrear la fila seleccionada para actualizar
let selectedRow = null;

// Función para calcular el total de las compras
function calculateTotal() {
  let total = 0;
  const table = document
    .getElementById("product-table")
    .getElementsByTagName("tbody")[0];
  for (let i = 0; i < table.rows.length; i++) {
    total += parseFloat(table.rows[i].cells[2].innerHTML);
  }
  document.getElementById("total-compras").textContent = total.toFixed(2);
}

// Función para registrar una compra o actualizar una compra existente
function registerOrUpdateProduct() {
  const nombrecompra = document.getElementById("nombrecompra").value;
  const fechacompra = document.getElementById("fechacompra").value;
  const subtotal = document.getElementById("subtotal").value;

  if (selectedRow === null) {
    if (nombrecompra === "" || fechacompra === "" || subtotal === "") {
      Swal.fire({
        icon: "error",
        title: "Ingrese Los Campos ",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    } else {
      // Registro de una nueva compra
      const table = document
        .getElementById("product-table")
        .getElementsByTagName("tbody")[0];
      const newRow = table.insertRow(table.rows.length);
      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);
      const cell4 = newRow.insertCell(3);

      cell1.innerHTML = nombrecompra;
      cell2.innerHTML = fechacompra;
      cell3.innerHTML = subtotal;
      cell4.innerHTML =
        '<button onclick="editProduct(this)">Editar</button> ' +
        '<button onclick="deleteProduct(this)">Eliminar</button>';

      // Calcular el total después de registrar la compra
      calculateTotal();

      // Limpiar el formulario después de registrar la compra
      document.getElementById("product-form").reset();
    }
  } else {
    if (nombrecompra === "" || fechacompra === "" || subtotal === "") {
      Swal.fire({
        icon: "error",
        title: "Ingrese Los Campos ",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    } else {
      // Actualización de una compra existente
      selectedRow.cells[0].innerHTML = nombrecompra;
      selectedRow.cells[1].innerHTML = fechacompra;
      selectedRow.cells[2].innerHTML = subtotal;

      // Calcular el total después de actualizar la compra
      calculateTotal();

      // Restaurar el botón de "Registrar Compra" después de actualizar
      document.getElementById("register-button").style.display = "block";
      document.getElementById("update-button").style.display = "none";
      document.getElementById("product-form").reset();
      selectedRow = null;
    }
  }
}

// Función para editar una compra
function editProduct(button) {
  selectedRow = button.parentNode.parentNode;
  document.getElementById("nombrecompra").value =
    selectedRow.cells[0].innerHTML;
  document.getElementById("fechacompra").value = selectedRow.cells[1].innerHTML;
  document.getElementById("subtotal").value = selectedRow.cells[2].innerHTML;

  // Cambiar el botón "Registrar Compra" a "Actualizar Compra"
  document.getElementById("register-button").style.display = "none";
  document.getElementById("update-button").style.display = "block";
}

// Función para eliminar una compra
function deleteProduct(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);

  // Calcular el total después de eliminar la compra
  calculateTotal();
}

// Agregar un evento de escucha al botón "Registrar Compra"
document
  .getElementById("register-button")
  .addEventListener("click", function () {
    registerOrUpdateProduct();
  });

// Agregar un evento de escucha al botón "Actualizar Compra"
document.getElementById("update-button").addEventListener("click", function () {
  registerOrUpdateProduct();
});
