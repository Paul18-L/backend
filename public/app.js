const api = '/api/productos';

async function fetchProducts() {
  const res = await fetch(api);
  return res.json();
}

async function renderProducts() {
  const list = document.getElementById('productosList');
  list.innerHTML = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';

  try {
    const products = await fetchProducts();

    if (!products.length) {
      list.innerHTML = '<div class="alert alert-info">No hay productos</div>';
      return;
    }

    list.innerHTML = '';

    products.forEach(p => {
      const item = document.createElement('div');
      item.className = 'list-group-item';

      item.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${p.imagen || 'https://via.placeholder.com/80'}"
               width="80" class="me-3 rounded border">
          <div>
            <h5 class="mb-1">${p.nombre}</h5>
            <p class="mb-1">${p.descripcion || ''}</p>
            <strong>$${p.precio}</strong>
          </div>

          <div class="ms-auto">
            <button class="btn btn-warning btn-sm" onclick="editProduct('${p._id}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p._id}')">Eliminar</button>
          </div>
        </div>
      `;

      list.appendChild(item);
    });

  } catch (err) {
    console.error(err);
    list.innerHTML = '<div class="alert alert-danger">Error cargando productos</div>';
  }
}

// ---------------- FORM -----------------

const form = document.getElementById('productForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('productId').value;

  const data = {
    nombre: document.getElementById('nombre').value.trim(),
    descripcion: document.getElementById('descripcion').value.trim(),
    precio: parseFloat(document.getElementById('precio').value),
    imagen: document.getElementById('imagen').value.trim(),
    disponible: document.getElementById('disponible').checked
  };

  if (!data.nombre || isNaN(data.precio)) {
    alert('Nombre y precio son obligatorios');
    return;
  }

  try {
    let res;

    if (id) {
      // UPDATE
      res = await fetch(`${api}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Error actualizando');
      alert('Producto actualizado');

    } else {
      // CREATE
      res = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.status !== 201) throw new Error('Error creando');
      alert('Producto creado');
    }

    resetForm();
    await renderProducts();

  } catch (err) {
    console.error(err);
    alert('Error: ' + err.message);
  }
});

document.getElementById('resetBtn').addEventListener('click', resetForm);

function resetForm() {
  document.getElementById('productId').value = '';
  form.reset();
  document.getElementById('disponible').checked = true;
  document.getElementById('saveBtn').textContent = 'Guardar';
}

// ---------------- EDIT -----------------

async function editProduct(id) {
  try {
    const res = await fetch(`${api}/${id}`);
    if (!res.ok) throw new Error('Producto no encontrado');

    const p = await res.json();

    document.getElementById('productId').value = p._id;
    document.getElementById('nombre').value = p.nombre;
    document.getElementById('descripcion').value = p.descripcion || '';
    document.getElementById('precio').value = p.precio;
    document.getElementById('imagen').value = p.imagen || '';
    document.getElementById('disponible').checked = p.disponible;

    document.getElementById('saveBtn').textContent = 'Actualizar';
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (err) {
    alert('Error cargando producto para editar');
  }
}

// ---------------- DELETE -----------------

async function deleteProduct(id) {
  if (!confirm('¿Eliminar este producto?')) return;

  try {
    const res = await fetch(`${api}/${id}`, { method: 'DELETE' });

    if (!res.ok) throw new Error('Error eliminando');

    alert('Producto eliminado');
    await renderProducts();

  } catch (err) {
    alert('No se pudo eliminar el producto');
  }
}

// inicio
renderProducts();
