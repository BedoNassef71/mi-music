import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Genre, GenreDocument } from './entities/genre.entity';
import { Model } from 'mongoose';
import { GenreQueryFeature } from './dto/genre-query.feature';

@Injectable()
export class GenreService {
  private readonly logger: Logger = new Logger(GenreService.name);
  constructor(
    @InjectModel(Genre.name) private readonly genreModel: Model<Genre>,
  ) {}

  create(createGenreDto: CreateGenreDto): Promise<GenreDocument> {
    try {
      return this.genreModel.create(createGenreDto);
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }

  findAll(query: GenreQueryFeature): Promise<GenreDocument[]> {
    return this.genreModel
      .find({ $or: query.searchQuery })
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort);
  }

  findOne(id: string): Promise<GenreDocument | undefined> {
    return this.genreModel.findById(id);
  }

  update(
    id: string,
    updateGenreDto: UpdateGenreDto,
  ): Promise<GenreDocument | undefined> {
    return this.genreModel.findByIdAndUpdate(id, updateGenreDto, { new: true });
  }

  async remove(id: string): Promise<void> {
    await this.genreModel.findByIdAndRemove(id);
  }
}
