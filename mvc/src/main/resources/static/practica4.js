// URL base de la API
const apiUrl = 'http://localhost:8080/api/plants';

// Función para cargar todas las plantas
async function loadPlants() {
    const response = await fetch(apiUrl);
    const plants = await response.json();

    const plantsList = document.getElementById('plantsList');
    plantsList.innerHTML = '';  // Limpiar lista antes de actualizar
    plants.forEach(plant => {
        const li = document.createElement('li');
        li.innerHTML = `${plant.name} - ${plant.description} 
            <button onclick="editPlant(${plant.id})">Editar</button>
            <button onclick="deletePlant(${plant.id})">Eliminar</button>`;
        plantsList.appendChild(li);
    });
}

// Función para agregar una planta
async function addPlant(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    const plant = { name, description };

    // Enviar la nueva planta a la API
    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plant)
    });

    // Recargar las plantas
    loadPlants();
}

// Función para editar una planta
let selectedPlantId = null;

async function editPlant(id) {
    selectedPlantId = id;  // Guardar el id de la planta seleccionada

    // Mostrar el formulario de edición
    document.getElementById('editPlantForm').style.display = 'block';

    // Obtener los datos de la planta seleccionada
    const response = await fetch(`${apiUrl}/${id}`);
    const plant = await response.json();

    // Llenar los campos del formulario con los datos de la planta
    document.getElementById('editName').value = plant.name;
    document.getElementById('editDescription').value = plant.description;
}

// Función para actualizar una planta
document.getElementById('editPlantForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('editName').value;
    const description = document.getElementById('editDescription').value;

    const updatedPlant = { name, description };

    // Enviar la actualización a la API solo para la planta seleccionada
    await fetch(`${apiUrl}/${selectedPlantId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPlant)
    });

    // Recargar las plantas después de la actualización
    loadPlants();

    // Ocultar el formulario de edición después de actualizar
    document.getElementById('editPlantForm').style.display = 'none';
});

// Función para eliminar una planta
async function deletePlant(id) {
    // Enviar la solicitud DELETE para eliminar la planta
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    const message = await response.text();
    alert(message);  // Mostramos un mensaje de confirmación

    // Recargar la lista de plantas después de eliminar
    loadPlants();
}

// Asociar la función al formulario de agregar planta
document.getElementById('addPlantForm').addEventListener('submit', addPlant);

// Cargar las plantas al iniciar
loadPlants();
