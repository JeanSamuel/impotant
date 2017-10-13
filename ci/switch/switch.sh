#!/bin/bash

cd ../../src
declare name=$1


if [ -z "$name" ];
then
    echo 'Error : add an argument for switching (client or marchand)'
else
    echo Launcher/index.$name.js
    rm -f App.js
    rm -f app.json
    cp Launcher/index.$name.js App.js
    cp Launcher/app.json/app.$name.json app.json
fi

