@echo off
title AgriCrops Pro - Launching Agricultural Intelligence System
echo ===================================================================
echo               🌾 AgriCrops Pro System Launcher 🌾
echo ===================================================================
echo Opening AgriCrops Pro in your default browser...
start "" "%~dp0index.html"
echo.
echo Application opened successfully!
echo (You can close this window at any time)
timeout /t 3 >nul
exit
