import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type productsDocument = HydratedDocument<product>;
@Schema()
export class product {
  @Prop({ required: true })
  productName: string;
  @Prop({ required: true })
  prize: number;
  @Prop({ required: true })
  category: string;
}
export const ProductSchema = SchemaFactory.createForClass(product);
