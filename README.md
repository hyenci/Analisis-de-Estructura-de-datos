# Sistema de Gestión de Estudiantes

## Estructuras de Datos Utilizadas

### 1. Listas (`List`)
- **Uso**: Almacenamiento principal de todos los estudiantes
- **Ventaja**: Permite mantener el orden de inserción y acceder por índice
- **Ejemplo**: `estudiantes = [estudiante1, estudiante2, ...]`

### 2. Diccionarios (`Dict`)
- **Uso**: Representación de cada estudiante individual
- **Ventaja**: Acceso rápido a atributos por nombre de clave
- **Ejemplo**: 
```python
estudiante = {
    "nombre": "Ana López",
    "carne": "A12345",
    "materias": ("Matemáticas", "Física"),
    "promedio": 8.5
}
```

### 3. Tuplas (`Tuple`)
- **Uso**: Lista de materias inscritas
- **Ventaja**: Inmutabilidad que garantiza integridad de datos
- **Ejemplo**: `materias = ("Matemáticas", "Física", "Química")`

### 4. Sets (`Set`)
- **Uso**: Validación de carnés únicos
- **Ventaja**: Búsqueda O(1) y garantía de unicidad
- **Ejemplo**: `carnes_existentes = {"A12345", "B67890"}`

## Ejemplo de Uso

1. **Agregar estudiante**:
```python
gestor.agregar_estudiante("Ana López", "A12345", 
    ["Matemáticas", "Física"], 8.5)
```

2. **Buscar estudiante**:
```python
estudiantes = gestor.buscar_estudiante("Ana")
```

3. **Ver materias**:
```python
materias = gestor.obtener_materias_estudiante("A12345")
```

4. **Ver promedio general**:
```python
promedio = gestor.obtener_promedio_grupo()
```

## Requisitos
- Python 3.10 o superior
- Ver requirements.txt
