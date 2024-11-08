import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/error-filter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: false,
      transform: true,
    }),
  );

  app.enableShutdownHooks();

  const configService = app.get(ConfigService);

  const port = Number(configService.get<string>('PORT'));

  if (isNaN(port)) {
    throw new Error('PORT must be a valid number');
  }

  if (configService.get<string>('application.NODE_ENV') !== 'production') {
    const docConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Test-Nest')
      .setDescription('The Test Task API doc')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, docConfig);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(port);
}
bootstrap();
