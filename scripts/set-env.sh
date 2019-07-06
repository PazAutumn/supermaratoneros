#!/bin/sh

echo "Script de construcción de variables de entorno"
echo
if [ -z $APPENV ]; then
	echo "Ambiente no definido: saliendo"
	return 1;
fi


ENV=$APPENV
ISPROD=false

if [  "$ENV" = "prod" ]; then
	ISPROD=true
fi

TARGET_PATH="./src/environments/environment.ts"

# construyendo archivo environment.ts

echo "export const environment = {" > $TARGET_PATH

echo "ambiente: '${ENV}'," >> $TARGET_PATH
echo "production: ${ISPROD}," >> $TARGET_PATH
echo "urlApi: '${URL_API}'," >> $TARGET_PATH
echo "timeout : ${TIMEOUT}" >> $TARGET_PATH

echo "};" >> $TARGET_PATH

echo "Salida generada en $TARGET_PATH"
cat $TARGET_PATH


