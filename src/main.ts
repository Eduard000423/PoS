import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PoS Api')
    .setDescription('Api para El consumo EnZona')
    .setVersion('1.0')
    .addTag('Usuarios')
    .addTag('Productos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

/*, {
    bodyParser: {
      enabled: true,
      json: {
        limit: '200kb',
      },
    },
  }*/
