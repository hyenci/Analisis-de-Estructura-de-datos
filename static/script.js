/**
 * Sistema de Gestión de Estudiantes - JavaScript
 * Funcionalidad para la interfaz web moderna
 */

// Estado global de la aplicación
const app = {
    estudiantes: [],
    seccionActual: 'dashboard'
};

// API Base URL
const API_BASE = 'http://localhost:5000/api';

/**
 * Inicialización de la aplicación
 */
document.addEventListener('DOMContentLoaded', function() {
    inicializarNavegacion();
    cargarDashboard();
    configurarFormulario();
});

/**
 * Configuración de la navegación
 */
function inicializarNavegacion() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const seccion = this.dataset.section;
            cambiarSeccion(seccion);
        });
    });
}

/**
 * Cambiar entre secciones
 */
function cambiarSeccion(seccion) {
    // Actualizar navegación
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${seccion}"]`).classList.add('active');
    
    // Mostrar sección correspondiente
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(seccion).classList.add('active');
    
    app.seccionActual = seccion;
    
    // Cargar datos específicos de la sección
    switch(seccion) {
        case 'dashboard':
            cargarDashboard();
            break;
        case 'estudiantes':
            cargarEstudiantes();
            break;
        case 'destacados':
            cargarDestacados();
            break;
    }
}

/**
 * Cargar datos del dashboard
 */
async function cargarDashboard() {
    try {
        const response = await fetch(`${API_BASE}/estudiantes`);
        const data = await response.json();
        
        const promedioResponse = await fetch(`${API_BASE}/promedio-grupo`);
        const promedioData = await promedioResponse.json();
        
        const destacadosResponse = await fetch(`${API_BASE}/destacados`);
        const destacadosData = await destacadosResponse.json();
        
        // Actualizar estadísticas del header
        document.getElementById('total-estudiantes').textContent = data.total;
        document.getElementById('promedio-general').textContent = promedioData.promedio;
        
        // Actualizar cards del dashboard
        document.getElementById('total-card').textContent = data.total;
        document.getElementById('destacados-card').textContent = destacadosData.estudiantes.length;
        document.getElementById('promedio-card').textContent = promedioData.promedio;
        
        app.estudiantes = data.estudiantes;
        
    } catch (error) {
        console.error('Error cargando dashboard:', error);
        mostrarNotificacion('Error cargando datos del dashboard', 'error');
    }
}

/**
 * Cargar lista de estudiantes
 */
async function cargarEstudiantes() {
    try {
        const response = await fetch(`${API_BASE}/estudiantes`);
        const data = await response.json();
        
        const tbody = document.getElementById('estudiantes-table');
        tbody.innerHTML = '';
        
        data.estudiantes.forEach(estudiante => {
            const row = crearFilaEstudiante(estudiante);
            tbody.appendChild(row);
        });
        
    } catch (error) {
        console.error('Error cargando estudiantes:', error);
        mostrarNotificacion('Error cargando estudiantes', 'error');
    }
}

/**
 * Crear fila de tabla para estudiante
 */
function crearFilaEstudiante(estudiante) {
    const tr = document.createElement('tr');
    
    const badgeClass = estudiante.promedio >= 8.0 ? 'badge-success' : 
                      estudiante.promedio >= 7.0 ? 'badge-warning' : 'badge-danger';
    
    tr.innerHTML = `
        <td>
            <div style="font-weight: 600;">${estudiante.nombre}</div>
        </td>
        <td>
            <code style="background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: 4px;">
                ${estudiante.carne}
            </code>
        </td>
        <td>
            <span class="badge ${badgeClass}">${estudiante.promedio}</span>
        </td>
        <td>
            <button class="btn btn-secondary" onclick="mostrarMaterias('${estudiante.carne}', '${estudiante.nombre}')">
                <i class="fas fa-eye"></i>
                Ver Materias
            </button>
        </td>
        <td>
            <button class="btn btn-danger" onclick="eliminarEstudiante('${estudiante.carne}')">
                <i class="fas fa-trash"></i>
                Eliminar
            </button>
        </td>
    `;
    
    return tr;
}

/**
 * Cargar estudiantes destacados
 */
async function cargarDestacados() {
    try {
        const response = await fetch(`${API_BASE}/destacados`);
        const data = await response.json();
        
        const container = document.getElementById('destacados-grid');
        container.innerHTML = '';
        
        data.estudiantes.forEach(estudiante => {
            const card = crearTarjetaEstudiante(estudiante);
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error cargando destacados:', error);
        mostrarNotificacion('Error cargando estudiantes destacados', 'error');
    }
}

/**
 * Crear tarjeta de estudiante destacado
 */
function crearTarjetaEstudiante(estudiante) {
    const div = document.createElement('div');
    div.className = 'student-card';
    
    div.innerHTML = `
        <div class="student-header">
            <div>
                <div class="student-name">${estudiante.nombre}</div>
                <div class="student-id">Carné: ${estudiante.carne}</div>
            </div>
            <div class="student-grade">${estudiante.promedio}</div>
        </div>
        <div style="margin-bottom: 1rem;">
            <strong>Materias inscritas:</strong> ${estudiante.materias.length}
        </div>
        <button class="btn btn-primary" onclick="mostrarMaterias('${estudiante.carne}', '${estudiante.nombre}')">
            <i class="fas fa-book"></i>
            Ver Materias
        </button>
    `;
    
    return div;
}

/**
 * Buscar estudiantes
 */
async function buscarEstudiante() {
    const query = document.getElementById('search-input').value.trim();
    const resultsContainer = document.getElementById('search-results');
    
    if (query.length < 2) {
        resultsContainer.innerHTML = '';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/buscar/${encodeURIComponent(query)}`);
        const data = await response.json();
        
        resultsContainer.innerHTML = '';
        
        if (data.estudiantes.length === 0) {
            resultsContainer.innerHTML = `
                <div class="card" style="text-align: center; padding: 2rem;">
                    <i class="fas fa-search" style="font-size: 3rem; color: #cbd5e0; margin-bottom: 1rem;"></i>
                    <p style="color: #64748b;">No se encontraron estudiantes</p>
                </div>
            `;
            return;
        }
        
        data.estudiantes.forEach(estudiante => {
            const card = crearTarjetaEstudiante(estudiante);
            resultsContainer.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error en búsqueda:', error);
        mostrarNotificacion('Error en la búsqueda', 'error');
    }
}

/**
 * Configurar formulario de agregar estudiante
 */
function configurarFormulario() {
    const form = document.getElementById('student-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const carne = document.getElementById('carne').value.trim();
        const promedio = parseFloat(document.getElementById('promedio').value);
        const materiasStr = document.getElementById('materias').value.trim();
        
        // Validaciones
        if (!nombre || !carne || !promedio || !materiasStr) {
            mostrarNotificacion('Todos los campos son obligatorios', 'error');
            return;
        }
        
        if (promedio < 0 || promedio > 10) {
            mostrarNotificacion('El promedio debe estar entre 0 y 10', 'error');
            return;
        }
        
        const materias = materiasStr.split(',').map(m => m.trim()).filter(m => m);
        
        if (materias.length === 0) {
            mostrarNotificacion('Debe ingresar al menos una materia', 'error');
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE}/estudiantes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    carne: carne,
                    promedio: promedio,
                    materias: materias
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                mostrarNotificacion('Estudiante agregado correctamente', 'success');
                form.reset();
                cargarDashboard(); // Actualizar estadísticas
            } else {
                mostrarNotificacion(data.message, 'error');
            }
            
        } catch (error) {
            console.error('Error agregando estudiante:', error);
            mostrarNotificacion('Error agregando estudiante', 'error');
        }
    });
}

/**
 * Eliminar estudiante
 */
async function eliminarEstudiante(carne) {
    if (!confirm('¿Está seguro de que desea eliminar este estudiante?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/estudiantes/${carne}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarNotificacion('Estudiante eliminado correctamente', 'success');
            cargarEstudiantes();
            cargarDashboard();
        } else {
            mostrarNotificacion(data.message, 'error');
        }
        
    } catch (error) {
        console.error('Error eliminando estudiante:', error);
        mostrarNotificacion('Error eliminando estudiante', 'error');
    }
}

/**
 * Mostrar materias de un estudiante en modal
 */
async function mostrarMaterias(carne, nombre) {
    try {
        const response = await fetch(`${API_BASE}/materias/${carne}`);
        const data = await response.json();
        
        document.getElementById('modal-title').textContent = `Materias de ${nombre}`;
        
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = '';
        
        if (data.materias.length === 0) {
            modalBody.innerHTML = '<p>No hay materias registradas</p>';
        } else {
            const ul = document.createElement('ul');
            ul.style.listStyle = 'none';
            ul.style.padding = '0';
            
            data.materias.forEach(materia => {
                const li = document.createElement('li');
                li.style.padding = '0.5rem 0';
                li.style.borderBottom = '1px solid #f1f5f9';
                li.innerHTML = `
                    <i class="fas fa-book" style="color: var(--primary-color); margin-right: 0.5rem;"></i>
                    ${materia}
                `;
                ul.appendChild(li);
            });
            
            modalBody.appendChild(ul);
        }
        
        document.getElementById('modal').style.display = 'block';
        
    } catch (error) {
        console.error('Error cargando materias:', error);
        mostrarNotificacion('Error cargando materias', 'error');
    }
}

/**
 * Cerrar modal
 */
function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}

/**
 * Generar datos de ejemplo
 */
async function generarDatos() {
    try {
        const response = await fetch(`${API_BASE}/generar-datos`);
        const data = await response.json();
        
        if (data.success) {
            mostrarNotificacion('Datos generados correctamente', 'success');
            cargarDashboard();
            if (app.seccionActual === 'estudiantes') {
                cargarEstudiantes();
            }
        }
        
    } catch (error) {
        console.error('Error generando datos:', error);
        mostrarNotificacion('Error generando datos', 'error');
    }
}

/**
 * Mostrar notificación
 */
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = mensaje;
    notification.className = `notification ${tipo === 'error' ? 'error' : ''}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

/**
 * Cerrar modal al hacer clic fuera
 */
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        cerrarModal();
    }
}

/**
 * Búsqueda en tiempo real con debounce
 */
let searchTimeout;
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(buscarEstudiante, 300);
        });
    }
});
