# Sistema de Gestión de Estudiantes

Un sistema completo de gestión académica que utiliza las 4 estructuras de datos fundamentales de Python para un manejo eficiente de la información estudiantil.

## 🔄 Diagrama de Flujo de las Estructuras de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                    GESTOR DE ESTUDIANTES                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─── LIST: estudiantes = []                                   │
│  │    ├─ Almacena todos los estudiantes                        │
│  │    ├─ Mantiene orden cronológico                            │
│  │    └─ Permite iteración secuencial                          │
│  │                                                             │
│  │     ┌─── DICT: estudiante = {}                             │
│  │     │    ├─ "nombre": str                                   │
│  │     │    ├─ "carne": str                                    │
│  │     │    ├─ "materias": tuple ←─────┐                      │
│  │     │    └─ "promedio": float       │                      │
│  │     │                               │                      │
│  │     │  ┌─── TUPLE: materias ────────┘                      │
│  │     │  │    ├─ ("Matemáticas",)                            │
│  │     │  │    ├─ ("Física",)                                 │
│  │     │  │    └─ ("Química",)                                │
│  │     │  │    └─ Inmutable = Integridad                      │
│  │     │  │                                                   │
│  │     └──┴─── Cada estudiante es un DICT                     │
│  │                                                             │
│  └─ SET: carnes = {"A001", "B002", ...}                       │
│       ├─ Validación única en O(1)                              │
│       ├─ Previene duplicados                                   │
│       └─ Búsqueda ultra-rápida                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

    🔽 FLUJO DE OPERACIONES 🔽

    📝 AGREGAR ESTUDIANTE:
    1. Verificar carne único en SET
    2. Crear DICT con datos
    3. Convertir materias a TUPLE
    4. Añadir DICT a LIST
    5. Agregar carne al SET

    🔍 BUSCAR ESTUDIANTE:
    1. Iterar LIST de estudiantes
    2. Comparar con DICT["nombre"] o DICT["carne"]
    3. Retornar coincidencias

    📊 CALCULAR PROMEDIO:
    1. Iterar LIST completa
    2. Sumar DICT["promedio"] de cada estudiante
    3. Dividir por cantidad total
```

## 📋 Estructuras de Datos Detalladas

### 1. 📋 **Lista Principal (`List`)**
```python
self.estudiantes: List[Dict] = []
```
**¿Qué almacena?**
- Colección completa de todos los estudiantes registrados
- Cada elemento es un diccionario que representa un estudiante

**¿Por qué una Lista?**
- ✅ Mantiene el **orden de inserción** (estudiantes más antiguos primero)
- ✅ Permite **acceso por índice** para operaciones específicas
- ✅ **Iteración eficiente** para búsquedas y cálculos
- ✅ **Fácil adición/eliminación** de estudiantes

**Ejemplo real:**
```python
estudiantes = [
    {"nombre": "Ana López", "carne": "A001", "materias": ("Math", "Física"), "promedio": 8.5},
    {"nombre": "Juan Pérez", "carne": "B002", "materias": ("Química",), "promedio": 9.2},
    {"nombre": "María García", "carne": "C003", "materias": ("Historia", "Arte"), "promedio": 7.8}
]
```

### 2. 🗂️ **Diccionario del Estudiante (`Dict`)**
```python
estudiante: Dict = {
    "nombre": str,
    "carne": str, 
    "materias": tuple,
    "promedio": float
}
```
**¿Qué almacena?**
- **Información completa** de un estudiante individual
- **Clave-valor** para acceso directo a atributos

**¿Por qué un Diccionario?**
- ✅ **Acceso O(1)** a cualquier atributo por nombre
- ✅ **Legibilidad** del código (`estudiante["nombre"]`)
- ✅ **Flexibilidad** para agregar nuevos campos
- ✅ **Estructura semántica** clara

**Ejemplo real:**
```python
estudiante = {
    "nombre": "Ana López Martínez",
    "carne": "2024-A-001", 
    "materias": ("Cálculo I", "Física Mecánica", "Programación"),
    "promedio": 8.75
}
```

### 3. 🔒 **Tupla de Materias (`Tuple`)**
```python
materias: Tuple[str, ...] = ("Materia1", "Materia2", ...)
```
**¿Qué almacena?**
- **Lista inmutable** de materias inscritas por el estudiante
- **Secuencia ordenada** de nombres de asignaturas

**¿Por qué una Tupla?**
- ✅ **Inmutabilidad** = No se pueden modificar accidentalmente
- ✅ **Integridad de datos** garantizada
- ✅ **Eficiencia de memoria** (menor que listas)
- ✅ **Hashable** = Puede usarse como clave en diccionarios

**Ejemplo real:**
```python
# Materias de un estudiante de ingeniería
materias = (
    "Cálculo Diferencial",
    "Álgebra Lineal", 
    "Física I",
    "Programación Básica",
    "Inglés Técnico"
)
```

### 4. 🎯 **Set de Carnés (`Set`)**
```python
self.carnes: Set[str] = {"carne1", "carne2", ...}
```
**¿Qué almacena?**
- **Conjunto único** de todos los carnés registrados
- **Índice rápido** para validación de duplicados

**¿Por qué un Set?**
- ✅ **Búsqueda O(1)** = Validación instantánea
- ✅ **Unicidad automática** = No permite duplicados
- ✅ **Eficiencia de memoria** para búsquedas
- ✅ **Operaciones de conjunto** (unión, intersección)

**Ejemplo real:**
```python
carnes = {
    "2024-A-001", "2024-A-002", "2024-B-001", 
    "2023-A-045", "2023-B-032", "2024-C-001"
}

# Validación ultra-rápida
if nuevo_carne in carnes:  # O(1) - Instantáneo
    print("Carné ya existe")
```

## 🔄 Flujo de Operaciones Principales

### 🔄 **1. Agregar Estudiante**
```
📥 ENTRADA: nombre, carné, materias[], promedio
    ↓
🔍 PASO 1: Validar carné único
    if carné in self.carnes:  ← SET (O(1))
        return "Error: Carné duplicado"
    ↓
📋 PASO 2: Crear diccionario del estudiante
    estudiante = {
        "nombre": nombre,           ← STRING
        "carne": carné,            ← STRING  
        "materias": tuple(materias), ← TUPLE (inmutable)
        "promedio": promedio       ← FLOAT
    }
    ↓
➕ PASO 3: Agregar a estructuras
    self.estudiantes.append(estudiante)  ← LIST
    self.carnes.add(carné)              ← SET
    ↓
✅ RESULTADO: Estudiante registrado exitosamente
```

### 🔍 **2. Buscar Estudiante**
```
📥 ENTRADA: término_búsqueda
    ↓
🔄 ITERACIÓN: Por cada estudiante en self.estudiantes  ← LIST
    ↓
🔍 COMPARACIÓN: 
    if término in estudiante["nombre"]:     ← DICT access
       OR término == estudiante["carne"]:   ← DICT access
        ↓
        📋 Agregar a resultados[]
    ↓
📤 SALIDA: Lista de estudiantes encontrados
```

### 🗑️ **3. Eliminar Estudiante**
```
📥 ENTRADA: carné_a_eliminar
    ↓
🔍 BUSCAR: índice en self.estudiantes        ← LIST
    for i, estudiante in enumerate(estudiantes):
        if estudiante["carne"] == carné:     ← DICT access
    ↓
🗑️ ELIMINAR:
    del self.estudiantes[índice]             ← LIST removal
    self.carnes.remove(carné)                ← SET removal  
    ↓
✅ RESULTADO: Estudiante eliminado
```

### 📊 **4. Calcular Promedio General**
```
📥 ENTRADA: (ninguna)
    ↓
🔄 ITERACIÓN: Por cada estudiante en self.estudiantes  ← LIST
    ↓
➕ SUMA: total += estudiante["promedio"]              ← DICT access
    ↓
➗ DIVISIÓN: promedio = total / len(estudiantes)      ← LIST length
    ↓
📤 SALIDA: Promedio general del grupo
```

## 🎯 Ventajas de Cada Estructura

| Estructura | Operación | Complejidad | Ventaja Principal |
|------------|-----------|-------------|-------------------|
| **LIST** | Acceso por índice | O(1) | Orden mantenido |
| **LIST** | Búsqueda | O(n) | Iteración completa |
| **DICT** | Acceso por clave | O(1) | Legibilidad |
| **TUPLE** | Acceso por índice | O(1) | Inmutabilidad |
| **SET** | Verificar existencia | O(1) | Unicidad garantizada |

## 💾 Ejemplo de Datos en Memoria

```python
# Así se ve el sistema en memoria:

gestor = GestorEstudiantes()

# LIST principal
gestor.estudiantes = [
    {  # DICT estudiante 1
        "nombre": "Ana López",
        "carne": "2024-A-001", 
        "materias": ("Cálculo", "Física"),  # TUPLE
        "promedio": 8.5
    },
    {  # DICT estudiante 2
        "nombre": "Juan Pérez",
        "carne": "2024-B-002",
        "materias": ("Química", "Biología", "Inglés"),  # TUPLE
        "promedio": 9.2
    }
]

# SET de validación
gestor.carnes = {"2024-A-001", "2024-B-002"}

# TUPLE de materias disponibles (constante)
gestor.MATERIAS_DISPONIBLES = (
    "Matemáticas", "Física", "Química", "Biología",
    "Historia", "Geografía", "Inglés", "Programación"
)
```

## 🚀 Ejemplo de Uso Práctico

```python
# Crear el gestor
gestor = GestorEstudiantes()

# 1. AGREGAR estudiantes (utiliza las 4 estructuras)
gestor.agregar_estudiante(
    "Ana López", 
    "2024-A-001", 
    ["Cálculo", "Física"],  # Se convierte a TUPLE
    8.5
)

# 2. BUSCAR estudiante (itera LIST, accede DICT)
resultado = gestor.buscar_estudiante("Ana")
print(f"Encontrado: {resultado[0]['nombre']}")

# 3. VER materias (accede TUPLE desde DICT)
materias = gestor.obtener_materias_estudiante("2024-A-001")
print(f"Materias: {materias}")  # Output: ('Cálculo', 'Física')

# 4. PROMEDIO general (itera LIST, suma DICT values)
promedio = gestor.obtener_promedio_grupo()
print(f"Promedio del grupo: {promedio}")

# 5. ESTUDIANTES destacados (filtra LIST por DICT['promedio'])
destacados = gestor.obtener_mejores_promedios()
print(f"Estudiantes con >8.0: {len(destacados)}")
```

## 🔧 Instalación y Ejecución

### Requisitos del Sistema
- **Python 3.10** o superior
- **Flask** para la interfaz web
- **Werkzeug** para utilidades web

### Pasos de Instalación

1. **Clonar/Descargar** el proyecto:
```bash
cd "C:\ruta\a\tu\proyecto"
```

2. **Instalar dependencias**:
```bash
pip install -r requirements.txt
```

3. **Ejecutar la aplicación**:
```bash
python app.py
```

4. **Abrir en navegador**:
```
http://localhost:5000
```

## 📁 Estructura del Proyecto

```
ULTIMO EJERCICIO/
├── 📄 app.py                    # Servidor Flask (API Web)
├── 📄 gestion_estudiantes.py    # Lógica principal (4 estructuras)
├── 📄 requirements.txt          # Dependencias Python
├── 📄 test_sistema.py           # Pruebas unitarias
├── 📄 README.md                 # Esta documentación
├── 📁 templates/
│   └── 📄 index.html            # Interfaz web principal
├── 📁 static/
│   ├── 📄 styles.css            # Estilos CSS
│   └── 📄 script.js             # JavaScript frontend
└── 📁 __pycache__/              # Archivos compilados Python
```

## 🧪 Pruebas del Sistema

```bash
# Ejecutar todas las pruebas
python test_sistema.py

# Verificar estructuras de datos
python -c "from gestion_estudiantes import GestorEstudiantes; g=GestorEstudiantes(); print('✅ Sistema OK')"
```

## 📈 Rendimiento y Eficiencia

| Operación | Estructura Usada | Complejidad | Tiempo Estimado |
|-----------|------------------|-------------|-----------------|
| Agregar estudiante | LIST + SET + DICT | O(1) | ~0.001ms |
| Validar carné único | SET | O(1) | ~0.0001ms |
| Buscar por nombre | LIST + DICT | O(n) | ~0.1ms por 100 estudiantes |
| Acceder materias | DICT + TUPLE | O(1) | ~0.0001ms |
| Calcular promedio | LIST + DICT | O(n) | ~0.05ms por 100 estudiantes |

## 🎓 Objetivos Académicos Cumplidos

### ✅ Uso de 4 Estructuras de Datos
- **LIST**: ✅ Almacenamiento principal y iteración
- **DICT**: ✅ Representación de entidades complejas  
- **TUPLE**: ✅ Datos inmutables para integridad
- **SET**: ✅ Validación única y búsqueda rápida

### ✅ Requisitos Funcionales
- **RF-1**: ✅ Agregar estudiantes con validación
- **RF-2**: ✅ Eliminar estudiantes por carné
- **RF-3**: ✅ Buscar por nombre/carné
- **RF-4**: ✅ Filtrar estudiantes destacados (>8.0)
- **RF-5**: ✅ Mostrar materias por estudiante
- **RF-6**: ✅ Calcular promedio general del grupo

### ✅ Características Técnicas
- **35 estudiantes** pre-cargados automáticamente
- **Interfaz web moderna** con Flask
- **Sin base de datos** (solo estructuras Python nativas)
- **Validación robusta** de datos
- **Código documentado** y estructurado

---

*Desarrollado como proyecto académico para demostrar el uso práctico de las estructuras de datos fundamentales de Python en un sistema real de gestión estudiantil.*
