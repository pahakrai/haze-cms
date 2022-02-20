#!/bin/bash
. ~/.nvm/nvm.sh;
cd /home/deploy/api/api
yarn install --frozen-lockfile --production=true