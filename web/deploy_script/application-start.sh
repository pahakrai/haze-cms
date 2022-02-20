#!/bin/bash
. ~/.nvm/nvm.sh;
PM2_PATH='/home/deploy/.config/yarn/global/node_modules/.bin/pm2'

# restart pm2
cd
$PM2_PATH restart ecomm-cart