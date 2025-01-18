import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { GpuStatusEnum } from '../enum/gpu.enum';

export class GpuCalendarDto {
  @AutoMap()
  @ApiProperty({
    description: 'The ID of the user associated with the calendar entry',
    type: String,
  })
  @IsString()
  userId: string;

  @AutoMap()
  @ApiProperty({ description: 'The reservation ID for the GPU', type: String })
  @IsString()
  reserveId: string;

  @AutoMap()
  @ApiProperty({
    description: 'Email of the user making the reservation',
    example: 'user@example.com',
  })
  @IsEmail()
  userEmail: string;

  @AutoMap()
  @ApiProperty({ description: 'The start date of the reservation', type: Date })
  @IsDate()
  reserveFrom: Date;

  @AutoMap()
  @ApiProperty({ description: 'The end date of the reservation', type: Date })
  @IsDate()
  reserveTo: Date;
}

export class GpuDto {
  @AutoMap()
  @ApiProperty({ description: 'The unique ID of the GPU', type: String })
  @IsString()
  @IsOptional()
  _id: string;

  @AutoMap()
  @ApiProperty({ description: 'The unique name of the GPU', example: 'GPU-1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @ApiProperty({
    description: 'The model name of the GPU',
    example: 'NVIDIA A100',
  })
  @IsString()
  @IsNotEmpty()
  modelName: string;

  @AutoMap()
  @ApiProperty({
    description: 'The status of the GPU',
    enum: GpuStatusEnum,
    default: GpuStatusEnum.AVAILABLE,
  })
  @IsEnum(GpuStatusEnum)
  @IsOptional()
  status: GpuStatusEnum;

  @AutoMap()
  @ApiProperty({
    description: 'The ID of the user currently using the GPU',
    type: String,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  inUsedBy: string | null;

  @AutoMap()
  @ApiProperty({
    description: 'The calendar entries associated with the GPU',
    type: [GpuCalendarDto],
    default: [],
  })
  calendar: GpuCalendarDto[];

  @AutoMap()
  @ApiProperty({
    description: 'The creation date of the GPU document',
    type: Date,
  })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @AutoMap()
  @ApiProperty({
    description: 'The last update date of the GPU document',
    type: Date,
  })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}

export class CreateGpuDto {
  @AutoMap()
  @ApiProperty({ description: 'The unique name of the GPU', example: 'GPU-1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @ApiProperty({
    description: 'The model name of the GPU',
    example: 'NVIDIA A100',
  })
  @IsString()
  @IsNotEmpty()
  modelName: string;
}
