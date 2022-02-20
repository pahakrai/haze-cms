// inject env variable first
require('dotenv').config({
  path:
    './configs/env/.env-' +
    (process.env.NODE_ENV ? process.env.NODE_ENV : 'development')
});

import {NestFactory} from '@nestjs/core';
import * as bodyParser from 'body-parser';
import {ValidationPipe} from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {NestExpressApplication} from '@nestjs/platform-express';
import {GlobalExceptionFilter, MongoDBTransactionInterceptor} from 'src/core';

import {AppModule} from './app.module';
import packageJson from '../package.json';
import {ValidationExceptionFactory} from './lib/validation.exception.factory';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // cors
  app.enableCors();

  // view engine for email template
  app.setViewEngine('ejs');
  app.useStaticAssets('./public');
  app.setBaseViewsDir('./views');

  // payload size limit
  app.use(bodyParser.json({limit: '10mb'}));
  app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

  // class validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // enable class type conversion
      transformOptions: {enableImplicitConversion: true},
      // transfrom validation exception
      exceptionFactory: ValidationExceptionFactory
    })
  );
  app.useGlobalFilters(new GlobalExceptionFilter());

  // MongoDB Transaction
  app.useGlobalInterceptors(new MongoDBTransactionInterceptor());

  // swagger, not applicable in production
  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle(packageJson.name)
      .setDescription(packageJson.description)
      .setVersion(packageJson.version)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(process.env.PORT);
  console.info(
    '%s run in [ %s ] environment successfully at port %s',
    packageJson.name,
    process.env.NODE_ENV || 'development',
    process.env.PORT
  );
}
bootstrap();
