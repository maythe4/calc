#!/usr/bin/env bash
ng build --prod --base-href="https://maythe4.github.io/calc/"
cp -v dist/calc/index.html dist/calc/404.html
git add --all
git commit -m "$1"
git push -u origin master

# github pages
cd ../maythe4.github.io/
rm -rvf calc
cp -rv ../calc/dist/calc .
git add --all
git commit -m "$1"
git push -u origin master