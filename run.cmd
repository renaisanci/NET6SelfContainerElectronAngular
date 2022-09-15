/ run.cmd
@echo off

:: publish netcore project
cd src/SmartSim.API
dotnet restore
dotnet build
dotnet publish -r win10-x64 --self-contained --output ../../dist/SmartSim.API

 

:: publish angular project
cd ../smartsim-ui
:: npm install

cmd /c ng build --base-href ./

 
:: publish electron project
cd ../electron-js
::npm install
cmd /c npm install

cmd /c npm start


cmd /c electron-builder --win


 