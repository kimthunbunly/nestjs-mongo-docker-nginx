import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      delete ret.token;
    },
  },
})
export class User extends Document {
  @ApiProperty({ example: 'mx-user' })
  @Prop({ unique: true, required: true })
  user_name: string;

  @ApiProperty({ example: '' })
  @Prop()
  avatar: string;

  @ApiProperty({ example: 'mx-user' })
  @Prop()
  nickname: string;

  @ApiProperty({ example: 'keep-secret' })
  @Prop({ default: 'keep-secret' })
  gender: string;

  @ApiProperty({ example: 'your-mail@marksix.com' })
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  token: string;

  @Prop()
  last_login: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
