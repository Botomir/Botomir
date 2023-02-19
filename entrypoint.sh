#!/bin/bash


DIR_NAME=$(dirname "$DICTIONARY_FILE")

if [ ! -d "$DIR_NAME" ]; then
    mkdir -p "$DIR_NAME"
fi

if [ ! -f "$DICTIONARY_FILE" ]; then
    # wget 'https://github.com/dwyl/english-words/raw/master/words_alpha.txt' -O "$DICTIONARY_FILE"
    wget "http://www.gwicks.net/textlists/english3.zip" -P "$DIR_NAME"
    unzip "$DIR_NAME/english3.zip" -d "$DIR_NAME"
    mv "$DIR_NAME/english3.txt" "$DICTIONARY_FILE"
fi

node app.js
