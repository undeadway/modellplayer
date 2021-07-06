#!/bin/bash

rm -rf dist/

npm run pkg:linux

cd dist
mv ModellPlayer-linux-x64/ bin
mkdir ModellPlayer-linux-x64
mv bin ModellPlayer-linux-x64/
cp -r ../appimage/* ModellPlayer-linux-x64/

appimagetool ModellPlayer-linux-x64

chmod +x ModellPlayer-x86_64.AppImage
./ModellPlayer-x86_64.AppImage