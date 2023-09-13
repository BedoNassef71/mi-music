import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './entities/song.entity';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { IsUserUpdatedMiddleware } from '../auth/middlewares/is-user-updated.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]),
  ],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .forRoutes(SongController);
  }
}
