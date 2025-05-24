@echo off
echo Configurando repositorio Git...

REM Verificar si es un repositorio Git
if not exist .git (
    echo Inicializando repositorio Git...
    git init
)

REM Agregar todos los archivos
echo Agregando archivos...
git add .

REM Hacer commit si hay cambios
git diff --cached --quiet || (
    echo Haciendo commit...
    git commit -m "Sistema de Gestion de Estudiantes con 4 estructuras de datos"
)

REM Configurar usuario si no está configurado
git config user.name || git config user.name "hyenci"
git config user.email || git config user.email "heryenci@gmail.com"

REM Verificar si el remoto existe
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Agregando repositorio remoto...
    git remote add origin https://github.com/hyenci/Analisis-de-Estructura-de-datos.git
) else (
    echo Actualizando URL del repositorio remoto...
    git remote set-url origin https://github.com/hyenci/Analisis-de-Estructura-de-datos.git
)

REM Cambiar rama a main
echo Configurando rama main...
git branch -M main

REM Hacer push
echo Subiendo a GitHub...
echo IMPORTANTE: Cuando te pida credenciales usa:
echo Usuario: hyenci
echo Password: [tu token de acceso personal de GitHub]
echo.
git push -u origin main

echo.
echo Proceso completado!
pause
