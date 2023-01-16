import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const globalPrefix = process.env.APP_GLOBAL_PREFIX || 'api';
  const swaggerPrefix = process.env.APP_SWAGGER_PREFIX || 'documentation';
  const port = process.env.APP_PORT || 3333;

  const app = await NestFactory.create(AppModule, { cors: true });

  // Set api prefix
  app.setGlobalPrefix(globalPrefix);

  // Swagger configuration build
  const config = new DocumentBuilder()
    .setTitle('FruitPanda API')
    .setDescription('Fruit Panda API Documentation')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPrefix, app, document);

  await app.listen(port, () => {
    Logger.log(`Listening: http://localhost:${port}/${globalPrefix}`);
    Logger.log(`API Documentation: http://localhost:${port}/${swaggerPrefix}`);
  });
}
bootstrap();
