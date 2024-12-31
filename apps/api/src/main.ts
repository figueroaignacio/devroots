import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PasswordRemovalInterceptor } from './user/interceptors/password-removal.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes();
  app.useGlobalFilters();
  app.useGlobalInterceptors(new PasswordRemovalInterceptor());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
