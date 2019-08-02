/** @format */

// #region Imports NPM
import { Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';
// #endregion

@Scalar('Date')
export class DateScalar {
  description = 'Date custom scalar type';

  parseValue(value: any): {} {
    return new Date(value);
  }

  serialize(value: Date): {} {
    return value.toISOString();
  }

  parseLiteral(ast: any): any {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  }
}
