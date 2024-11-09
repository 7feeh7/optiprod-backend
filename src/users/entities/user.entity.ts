
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    completeName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    phoneNumber: string;

    @Prop({
        type: [String],
        enum: ['ADMIN', 'MONTAGEM', 'SUFARCAGEM', 'ANTI_REFLEXO'],
        default: [],
    })
    roles: string[];

    @Prop({ type: Boolean, default: true })
    isActive: boolean;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
