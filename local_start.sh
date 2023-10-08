#!/bin/bash

start http://localhost:1234
mkdir ./dist/
mkdir ./dist/assets/
cp -r ./app/assets/card_images ./dist/assets/card_images
parcel ./app/index.html