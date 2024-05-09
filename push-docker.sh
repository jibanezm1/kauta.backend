#!/bin/bash

# Solicitar la versión
read -p "Ingrese la versión (por ejemplo, 1.1.0): " version

# Mostrar la versión actual

echo "La versión actual es: $version"

# Construir la imagen Docker
docker build -t registry.digitalocean.com/kautabackend/kauta.backend:$version .

# Subir la imagen Docker
docker push registry.digitalocean.com/kautabackend/kauta.backend:$version
