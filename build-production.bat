@echo off

echo starting...
:: Run vite build
CALL echo building...
CALL npm run build-manual

:: Copy files using xcopy

CALL echo done!!!