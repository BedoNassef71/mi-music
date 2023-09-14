import { Expose, Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class QueryFeature {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public readonly page: number = 1;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public readonly limit: number = 1;
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/,/g, ' ') : value,
  )
  sort = '-createdAt';
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/,/g, ' ') : value,
  )
  fields = '-__v';

  @IsOptional()
  @IsString()
  search = '';
}
