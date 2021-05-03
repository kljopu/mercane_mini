import * as bcryptjs from 'bcryptjs';
import { BaseModel } from 'src/share/base.model';
import {
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { IsEmail, IsEmpty } from 'class-validator';
import { Column, BeforeInsert } from 'typeorm';

class User extends BaseModel {
  @IsEmail()
  @Column(() => String)
  email: string;

  @Column(() => String)
  name: string;

  @IsEmpty()
  @Column(() => String)
  phone: string;

  @IsEmpty()
  @Column({ type: 'varchar' })
  password!: string;

  @BeforeInsert()
  async savePassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcryptjs.hash(this.password, 10);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException('Password Hassing Faild');
      }
    }
  }
  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcryptjs.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log('err:', error);
      throw new InternalServerErrorException();
    }
  }

  @BeforeInsert()
  async checkReg(): Promise<void> {
    var regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!regex.test(this.password)) {
      throw new BadRequestException('Invalid Password RegExp');
    }
  }

  @BeforeInsert()
  async checkPhoneNumber(): Promise<void> {
    var regEx = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!regEx.test(this.phone)) {
      throw new BadRequestException('Invalid Phone RegExp');
    }
  }
}
