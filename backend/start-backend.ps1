# Couple Game Backend Launcher
$ErrorActionPreference = "Stop"
$backendDir = "C:\Users\zexi\Documents\New project\backend"
$javaHome = "E:\WebStorm 2019.3.3\jbr"
$javaBin = "$javaHome\bin\java.exe"

Write-Host "=== Couple Game Backend Launcher ===" -ForegroundColor Cyan
Write-Host "Using Java: $javaBin"

# Download Maven if not present
$mavenDir = Join-Path $env:LOCALAPPDATA "maven\apache-maven-3.9.5"
$mvnCmd = Join-Path $mavenDir "bin\mvn.cmd"
if (!(Test-Path $mvnCmd)) {
    Write-Host "Downloading Maven 3.9.5..."
    $mavenZip = Join-Path $env:TEMP "maven.zip"
    Invoke-WebRequest -Uri "https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.5/apache-maven-3.9.5-bin.zip" -OutFile $mavenZip
    Expand-Archive -Path $mavenZip -DestinationPath (Split-Path $mavenDir) -Force
    Remove-Item $mavenZip
    Write-Host "Maven installed to $mavenDir"
}

# Set JAVA_HOME and PATH
$env:JAVA_HOME = $javaHome
$env:PATH = "$javaHome\bin;$($mavenDir)\bin;$env:PATH"

# Build
Write-Host "Building backend..." -ForegroundColor Yellow
Push-Location $backendDir
& $mvnCmd clean package -DskipTests -q
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    Pop-Location
    Read-Host "Press Enter to exit"
    exit 1
}

# Start
$jar = Get-ChildItem "target\*.jar" | Select-Object -First 1
Write-Host "Starting server on port 8080..." -ForegroundColor Green
& $javaBin -jar $jar.FullName

Pop-Location
