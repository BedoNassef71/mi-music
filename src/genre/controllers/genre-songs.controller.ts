import { Controller, Get, Param, Query } from '@nestjs/common';
import { GenreSongsService } from '../services/genre-songs.service';
import { ParseMongoIdPipe } from '../../utils/pipes/is-mongo-id.pipe';
import { SongQueryFeature } from '../../song/dto/song-query.feature';
import { PaginationResponseFeature } from '../../utils/features/pagination-response.feature';

@Controller({ path: 'genre/:id/songs', version: '1' })
export class GenreSongsController {
  constructor(private readonly genreSongsService: GenreSongsService) {}
  @Get()
  findAll(
    @Query() query: SongQueryFeature,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<PaginationResponseFeature> {
    query.genre = id;
    return this.genreSongsService.findAll(query);
  }
}
