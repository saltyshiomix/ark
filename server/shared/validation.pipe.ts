/** @format */

// #region Imports NPM
import { Injectable, ArgumentMetadata, PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
// #endregion

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException('Validation failed: No body submitted', HttpStatus.BAD_REQUEST);
    }
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(`Validation failed: ${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  private formatErrors(errors: any[]): any {
    return errors
      .map((err) => {
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const property in err.constraints) {
          return err.constraints[property];
        }
        return null;
      })
      .join(', ');
  }

  private isEmpty(value: any): boolean {
    if (Object.keys(value).length > 0) {
      return false;
    }
    return true;
  }
}
