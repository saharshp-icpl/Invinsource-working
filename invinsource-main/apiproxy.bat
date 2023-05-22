@echo off

set CONTAINER_NAME=apiproxy
set CONFIG_FILE=proxy/nginx.conf

REM Check if the container is already running
docker ps -a --filter "name=%CONTAINER_NAME%" --format "{{.Status}}" | findstr "Up" >nul
if %errorlevel%==0 (
  echo %CONTAINER_NAME% is already running. Removing the container...
  docker rm -f %CONTAINER_NAME%
)

echo Starting %CONTAINER_NAME%...
docker run -d -p 80:80 --name %CONTAINER_NAME% -v %cd%/%CONFIG_FILE%:/etc/nginx/nginx.conf nginx

echo Done.