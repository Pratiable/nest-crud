import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'cats@cat.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  @ApiProperty({
    example: 'catty',
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'P@ssw0rd',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default: `https://github.com/amamov/teaching-nestjs-a-to-z/blob/main/images/1.jpeg?raw=true`,
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
