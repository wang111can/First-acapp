#! /bin/bash

PATH=/home/wcdj/acapp/game_1/static/js/
PATH_DIST=${PATH}dist/
PATH_SRC=${PATH}src/

find $PATH_SRC -type f -name '*.js' | sort | xargs cat > ${PATH_DIST}doc.js





