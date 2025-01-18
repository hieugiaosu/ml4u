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
import { GpuActivityStatusEnum } from '../enum/gpu.enum';

export class GpuActivityDto {
  @AutoMap()
  @ApiProperty({
    description: 'The unique ID of the GPU activity',
    type: String,
  })
  @IsString()
  @IsOptional()
  _id: string;

  @AutoMap()
  @ApiProperty({
    description: 'The ID of the GPU associated with this activity',
    type: String,
  })
  @IsString()
  gpuId: string;

  @AutoMap()
  @ApiProperty({
    description: 'The name of the GPU associated with this activity',
    example: 'GPU-1',
  })
  @IsString()
  @IsNotEmpty()
  gpuName: string;

  @AutoMap()
  @ApiProperty({
    description: 'The email of the user performing the activity',
    example: 'user@example.com',
  })
  @IsEmail()
  userEmail: string;

  @AutoMap()
  @ApiProperty({
    description: 'The status of the GPU activity',
    enum: GpuActivityStatusEnum,
  })
  @IsEnum(GpuActivityStatusEnum)
  status: GpuActivityStatusEnum;

  @AutoMap()
  @ApiProperty({
    description: 'The ID of the user performing the activity',
    type: String,
  })
  @IsString()
  userId: string;

  @AutoMap()
  @ApiProperty({
    description: 'The start date of the GPU reservation',
    type: Date,
  })
  @IsDate()
  reserveFrom: Date;

  @AutoMap()
  @ApiProperty({
    description: 'The end date of the GPU reservation',
    type: Date,
  })
  @IsDate()
  reserveTo: Date;

  @AutoMap()
  @ApiProperty({
    description: 'The creation date of the GPU activity',
    type: Date,
  })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @AutoMap()
  @ApiProperty({
    description: 'The last update date of the GPU activity',
    type: Date,
  })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
