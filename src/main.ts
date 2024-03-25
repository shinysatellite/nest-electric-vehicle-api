import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Company-Station API')
      .setDescription(
        'This is the electric vechile charging station management sytem api.',
      )
      .setVersion('1.0')
      .build(),
  );
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
