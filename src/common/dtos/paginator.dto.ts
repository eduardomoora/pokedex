import { IsInt, IsOptional, IsPositive } from 'class-validator';
export class PaginatorDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  limit?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  offset?: number;
}
