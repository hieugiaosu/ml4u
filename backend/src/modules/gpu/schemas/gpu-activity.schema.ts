import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { GpuActivityStatusEnum } from '../enum/gpu.enum';

export type GpuActivityDocument = HydratedDocument<GpuActivity>;

@Schema({ collection: 'gpu-activity', timestamps: true })
export class GpuActivity {
    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    @Prop({ type: Types.ObjectId, ref: 'Gpu' })
    gpuId: Types.ObjectId;

    @AutoMap()
    @Prop()
    gpuName: string;

    @AutoMap()
    @Prop()
    userEmail: string;

    @AutoMap()
    @Prop({ enum: GpuActivityStatusEnum })
    status: GpuActivityStatusEnum;

    @AutoMap()
    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

    @AutoMap()
    @Prop()
    reserveFrom: Date;

    @AutoMap()
    @Prop()
    reserveTo: Date;

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    updatedAt: Date;
}

export const GpuActivitySchema = SchemaFactory.createForClass(GpuActivity);