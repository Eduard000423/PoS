import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { privilegioDto } from 'src/Dto/privilegio.dto';

export type usersDocument = HydratedDocument<persona>;
@Schema()
export class persona {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  edad: number;
  @Prop({ required: true })
  gender: string;
  @Prop({ required: true, unique: true })
  user: string;
  @Prop({ required: true })
  pass: string;
  @Prop({ required: true })
  privilegios: privilegioDto;
  @Prop({ required: true })
  rol: string;
}
export const UsersSchema = SchemaFactory.createForClass(persona);
