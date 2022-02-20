# exit when any command fails
# https://intoli.com/blog/exit-on-errors-in-bash-scripts/
set -e

PM2_PATH='/home/deploy/.config/yarn/global/node_modules/.bin/pm2'

# build project
yarn build

# remove directories from prev deploy
ssh -i ${SSH_KEY_PATH} deploy@${DEPLOY_HOST} "
  cd /home/deploy/sites/ecomm-cart;
  $PM2_PATH stop ecomm-cart;
  if [ -d .next ]; then rm -r .next; fi
  if [ -d config ]; then rm -r config; fi
  if [ -d public ]; then rm -r public; fi
  if [ -d lib ]; then rm -r lib; fi
  if [ -d pages ]; then rm -r pages; fi
  if [ -d styles ]; then rm -r styles; fi
"

# upload build code & other stuff to server
scp -i ${SSH_KEY_PATH} -r .next/ config/ images/ lib/ locales/ pages/ public/ next.config.js package.json server.js yarn.lock deploy@${DEPLOY_HOST}:/home/deploy/sites/ecomm-cart

# install packages
# restart
ssh -i ${SSH_KEY_PATH} deploy@${DEPLOY_HOST} "
  . ~/.nvm/nvm.sh;
  cd ~/sites/ecomm-cart;
  yarn install --frozen-lockfile --production=true
  $PM2_PATH restart ecomm-cart
"