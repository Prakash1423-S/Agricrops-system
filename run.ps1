# =====================================================================
# AgriCrops Pro - PowerShell Runner & Launcher
# =====================================================================

Write-Host ""
Write-Host "=========================================================" -ForegroundColor Green
Write-Host "          🌾 AgriCrops Pro Agricultural System 🌾        " -ForegroundColor Yellow
Write-Host "=========================================================" -ForegroundColor Green
Write-Host ""

$CurrentDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path $CurrentDir

# Check if Python is available
$hasPython = Get-Command python -ErrorAction SilentlyContinue
# Check if Node is available
$hasNode = Get-Command node -ErrorAction SilentlyContinue

Write-Host "System Check:" -ForegroundColor Cyan
if ($hasPython) {
    Write-Host "  [+] Python detected: $($hasPython.Source)" -ForegroundColor Green
}
if ($hasNode) {
    Write-Host "  [+] Node.js detected: $($hasNode.Source)" -ForegroundColor Green
}
if (-not $hasPython -and -not $hasNode) {
    Write-Host "  [i] Standalone mode (zero-install browser execution)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Select how you would like to run the application:" -ForegroundColor Cyan
Write-Host "  [1] Open directly in default web browser (Recommended, instant)" -ForegroundColor White
Write-Host "  [2] Run with Python Backend Server (http://localhost:8000)" -ForegroundColor White
Write-Host "  [3] Run with Node.js Backend Server (http://localhost:8000)" -ForegroundColor White
Write-Host "  [4] Exit" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "Enter your choice (1-4) [Default: 1]"

if ([string]::IsNullOrWhiteSpace($choice)) {
    $choice = "1"
}

switch ($choice) {
    "1" {
        Write-Host "Launching AgriCrops Pro in your default browser..." -ForegroundColor Green
        Start-Process (Join-Path $CurrentDir "index.html")
    }
    "2" {
        if ($hasPython) {
            Write-Host "Starting Python server at http://localhost:8000 ..." -ForegroundColor Green
            Start-Process "http://localhost:8000"
            python "$CurrentDir\backend\server.py"
        } else {
            Write-Host "Python was not found in your PATH. Opening index.html directly instead..." -ForegroundColor Yellow
            Start-Process (Join-Path $CurrentDir "index.html")
        }
    }
    "3" {
        if ($hasNode) {
            Write-Host "Starting Node.js server at http://localhost:8000 ..." -ForegroundColor Green
            Start-Process "http://localhost:8000"
            node "$CurrentDir\backend\server.js"
        } else {
            Write-Host "Node.js was not found in your PATH. Opening index.html directly instead..." -ForegroundColor Yellow
            Start-Process (Join-Path $CurrentDir "index.html")
        }
    }
    "4" {
        Write-Host "Exiting." -ForegroundColor Gray
        exit
    }
    Default {
        Write-Host "Opening index.html in your default browser..." -ForegroundColor Green
        Start-Process (Join-Path $CurrentDir "index.html")
    }
}
