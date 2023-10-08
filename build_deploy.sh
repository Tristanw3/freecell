#!/bin/bash

rm -r ./deploy
cp -r ./app/ ./deploy 
push-dir --dir=deploy --branch=gh-pages --cleanup --verbose
