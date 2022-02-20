#!/bin/bash
# restart pm2
. ~/.nvm/nvm.sh;
PM2_PATH='/home/deploy/.config/yarn/global/node_modules/.bin/pm2'

cd
$PM2_PATH restart api