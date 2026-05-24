@echo off
set "NODE_HOME=%~dp0.tools\node"
set "PATH=%NODE_HOME%;%PATH%"
set "ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/"
"%NODE_HOME%\npm.cmd" run dev
