import { AuthModule } from './../auth/auth.module';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './cats.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
