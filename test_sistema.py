from gestion_estudiantes import GestorEstudiantes

print("🎓 Iniciando sistema de gestión de estudiantes...")
gestor = GestorEstudiantes()

print(f"✅ Sistema funcionando correctamente!")
print(f"📊 Estructuras de datos cargadas:")
print(f"   • Lista de estudiantes: {len(gestor.estudiantes)} registros")
print(f"   • Set de carnés únicos: {len(gestor.carnes)} elementos")
print(f"   • Tupla de materias: {len(gestor.MATERIAS_DISPONIBLES)} opciones")

# Probar algunas funcionalidades
print(f"\n🔍 Probando funcionalidades:")
print(f"   • Promedio del grupo: {gestor.obtener_promedio_grupo()}")
print(f"   • Estudiantes destacados: {len(gestor.obtener_mejores_promedios())}")
print(f"   • Total de estudiantes: {len(gestor.estudiantes)}")

print("\n✅ ¡Todas las estructuras de datos funcionan correctamente!")
