import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PasswordRemovalInterceptor } from './user/interceptors/password-removal.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes();
  app.useGlobalFilters();
  app.useGlobalInterceptors(new PasswordRemovalInterceptor());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
