# Script PowerShell para configurar y subir el repositorio Git
Write-Host "=== Configurando repositorio Git ===" -ForegroundColor Green

# Cambiar al directorio del proyecto
Set-Location "C:\Users\yenci\OneDrive\Escritorio\ULTIMO EJERCICIO"
Write-Host "Directorio actual: $(Get-Location)" -ForegroundColor Yellow

# Verificar estado del repositorio
Write-Host "`nVerificando estado del repositorio..." -ForegroundColor Cyan
git status

# Agregar todos los archivos
Write-Host "`nAgregando archivos al staging..." -ForegroundColor Cyan
git add .

# Verificar si hay cambios para commit
$hasChanges = git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
    Write-Host "Haciendo commit de los cambios..." -ForegroundColor Cyan
    git commit -m "Sistema de Gestion de Estudiantes con 4 estructuras de datos - Actualizacion"
} else {
    Write-Host "No hay cambios nuevos para commit." -ForegroundColor Yellow
}

# Configurar usuario de Git si no está configurado
$gitUser = git config user.name
if ([string]::IsNullOrEmpty($gitUser)) {
    Write-Host "Configurando usuario Git..." -ForegroundColor Cyan
    git config user.name "hyenci"
    git config user.email "heryenci@gmail.com"
}

# Verificar si existe el remoto origin
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Agregando repositorio remoto..." -ForegroundColor Cyan
    git remote add origin https://github.com/hyenci/Analisis-de-Estructura-de-datos.git
} else {
    Write-Host "Actualizando URL del repositorio remoto..." -ForegroundColor Cyan
    git remote set-url origin https://github.com/hyenci/Analisis-de-Estructura-de-datos.git
}

# Cambiar rama a main
Write-Host "Configurando rama principal como 'main'..." -ForegroundColor Cyan
git branch -M main

# Mostrar información del repositorio
Write-Host "`n=== Información del repositorio ===" -ForegroundColor Green
Write-Host "Repositorio remoto:"
git remote -v
Write-Host "`nRama actual:"
git branch

# Intentar hacer push
Write-Host "`n=== Subiendo a GitHub ===" -ForegroundColor Green
Write-Host "IMPORTANTE: Cuando se te pida autenticacion, usa:" -ForegroundColor Red
Write-Host "Usuario: hyenci" -ForegroundColor Yellow
Write-Host "Password: [tu token de acceso personal de GitHub]" -ForegroundColor Yellow
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ ¡Repositorio subido exitosamente a GitHub!" -ForegroundColor Green
    Write-Host "URL: https://github.com/hyenci/Analisis-de-Estructura-de-datos" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Hubo un problema al subir el repositorio." -ForegroundColor Red
    Write-Host "Verifica tus credenciales y token de acceso." -ForegroundColor Yellow
}

Write-Host "`nPresiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
