#!/bin/bash
. ~/.nvm/nvm.sh;
PM2_PATH='/home/deploy/.config/yarn/global/node_modules/.bin/pm2'

# stop web first and 
# remove directories from prev deploy
pm2 stop ecomm-cart
## cd to sites folder
cd /home/deploy/sites/ecomm-cart
shopt -s extglob
if [ -d src ]; then rm -r !(node_modules); fi
rm -rf .next