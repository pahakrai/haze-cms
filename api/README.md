### CUSTOM MODULES

## @golpasal/core

The original `src/core`

- Application layers (base controller/service)
- Base database schemas
- Base models
- Decorators
- Exceptions & Filters
- GraphQL
- Guards
- Interceptors
- Locale
- Pipes
- Utils & helper functions

## @golpasal/lib

The original `src/lib`

- Create thumbnail
- Is valid ObjectId
- Sleep

## @golpasal/crypto

provide data encryption features, can access through CLI (see below)

## @golpasal/nest-module-template (DEV dependency)

CLI to generate new NestJS module, need to install plop globally
`yarn global add plop`

### CLI usage

## How to encrypt text

yarn crypto-helper --encrypt [plainText][cryptokey]

## How to decrypt text

yarn crypto-helper --decrypt [cipherText][cryptokey]

## How to generate new module

yarn generate-module

## How to do seeding

# Clear all data and seed

yarn seed:ts --env testing --clear

# Clear specific module(s) and seed

yarn seed:ts --env testing --module Users --clear
yarn seed:ts --env testing --module Users,Auths --clear

# Upsert to existing data

yarn seed:ts --env testing --upsert (not recommended because of performance)
yarn seed:ts --env testing --module Regions --upsert

# Seed data with specific workspace

yarn seed:ts --env testing --clear --workspace 5e9fcae14fc78a87a9bc4c11
yarn seed:ts --env testing --module Regions --clear --workspace 5e9fcae14fc78a87a9bc4c11
yarn seed:ts --env testing --module Regions --upsert --workspace 5e9fcae14fc78a87a9bc4c11

# Seed data for new workspace

yarn seed:ts --env testing --workspace NEW_WORKSPACE_ID

or it's in pre-launch script of VSCode (press F5) / `prestart` hook for `yarn start`

### AUTH Decorator

# @BypassSecretGuard()

will skip header safe-key verification, mainly used for GQL subscription

# Nothing

Nothing mean it is public API, but still protected by workspace, workspace secret, timestamp and satety-key in header

# @AllowActions(...actions: string[])

HTTP 403 will be thrown if user missing the mentioned policy/action

# @RequireLogin()

HTTP 401 will be thrown if request missing JWT token

# @UserStatuses(...statuses: number[])

HTTP 403 will be thrown if user.status not match

# @UserTypes(...userTypes: string[])

HTTP 403 will be thrown if user.userTypes not include any value in userTypes

# Why use virtual populate on Schema

virtual populate makes it easier on graphql field resolve just using populate rather than making a repository call (still requires batching for n + 1 problem)
