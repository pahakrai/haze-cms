#!/bin/bash
# stop api first and 
# remove directories from prev deploy
. ~/.nvm/nvm.sh;
PM2_PATH='/home/deploy/.config/yarn/global/node_modules/.bin/pm2'

$PM2_PATH stop api
# cd to api folder
cd /home/deploy/api/api
if [ -d dist ]; then rm -r dist; fi
if [ -d configs ]; then rm -r configs; fi
if [ -d deploy_script ]; then rm -r deploy_script; fi
if [ -d locales ]; then rm -r locales; fi
if [ -d report ]; then rm -r report; fi
if [ -d uploads ]; then rm -r uploads; fi
if [ -d patches ]; then rm -r patches; fi
if [ -d views ]; then rm -r views; fi