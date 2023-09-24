#!/bin/bash

start http://localhost:1234
cp -r ./app/card_images ./dist/card_images
parcel ./app/index.html