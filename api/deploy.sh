# exit when any command fails
# https://intoli.com/blog/exit-on-errors-in-bash-scripts/
set -e

PM2_PATH='/home/deploy/.config/yarn/global/node_modules/.bin/pm2'

# build project
yarn build

# rename src/ to dist/
mv dist/src dist/dist

# remove tsbuildinfo
rm dist/tsconfig.build.tsbuildinfo

# remove directories from prev deploy
# stop api first
ssh -i ${SSH_KEY_PATH} deploy@${DEPLOY_HOST} "
  . ~/.nvm/nvm.sh;
  cd /home/deploy/api/api;
  $PM2_PATH stop api;
  if [ -d dist ]; then rm -r dist; fi
  if [ -d configs ]; then rm -r configs; fi
  if [ -d deploy_script ]; then rm -r deploy_script; fi
  if [ -d locales ]; then rm -r locales; fi
  if [ -d report ]; then rm -r report; fi
  if [ -d uploads ]; then rm -r uploads; fi
  if [ -d patches ]; then rm -r patches; fi
  if [ -d views ]; then rm -r views; fi
"
# upload build code & other stuff to server
scp -i ${SSH_KEY_PATH} -r dist/* configs/ locales/ report/ uploads/ patches/ views/ yarn.lock deploy@${DEPLOY_HOST}:/home/deploy/api/api

# install packages
# restart api
ssh -i ${SSH_KEY_PATH} deploy@${DEPLOY_HOST} "
  . ~/.nvm/nvm.sh;
  cd ~/api/api;
  yarn install --frozen-lockfile --production=true
  $PM2_PATH restart api
"