import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { GpuStatusEnum } from '../enum/gpu.enum';

export type GpuDocument = HydratedDocument<Gpu>;

export class GpuCalendar {
    @AutoMap()
    @Prop()
    userId: Types.ObjectId;

    @AutoMap()
    @Prop()
    reserveId: Types.ObjectId;

    @AutoMap()
    @Prop()
    userEmail: string;

    @AutoMap()
    @Prop()
    reserveFrom: Date;

    @AutoMap()
    @Prop()
    reserveTo: Date;
}

@Schema({ collection: 'gpu', timestamps: true })
export class Gpu {
    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    @Prop({unique: true})
    name: string;

    @AutoMap()
    @Prop()
    modelName: string;

    @AutoMap()
    @Prop({ enum: GpuStatusEnum, default: GpuStatusEnum.AVAILABLE })
    status: GpuStatusEnum;

    @AutoMap()
    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    inUsedBy: Types.ObjectId | null;

    @AutoMap(()=>Array)
    @Prop({ type: [GpuCalendar], default: [] })
    calendar: GpuCalendar[]

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    updatedAt: Date;
}

export const GpuSchema = SchemaFactory.createForClass(Gpu);