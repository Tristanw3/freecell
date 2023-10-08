#!/bin/bash

cp -r ./app ./deploy 
push-dir --dir=deploy --branch=gh-pages --cleanup --verbose
