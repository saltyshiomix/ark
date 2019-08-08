/** @format */

// #region Imports NPM
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
// #endregion
// #region Imports Local
import { AuthenticationGuard } from './auth-guard.guard';
import { AuthService } from '../auth/auth.service';
// #endregion

GqlExecutionContext.create = jest.fn().mockReturnValue({
  getContext: jest.fn().mockReturnThis(),
  value: 'something',
  req: 'Request',
});

const mockContext = {
  switchToHttp: jest.fn().mockReturnThis(),
  getClass: jest.fn().mockReturnThis(),
  getHandler: jest.fn().mockReturnThis(),
  getArgs: jest.fn().mockReturnThis(),
  getArgByIndex: jest.fn().mockReturnThis(),
  switchToRpc: jest.fn().mockReturnThis(),
  switchToWs: jest.fn().mockReturnThis(),
  getResponse: jest.fn().mockReturnThis(),
};

AuthGuard('jwt').prototype.canActivate = jest.fn().mockImplementation(() => true);

describe('GqlAuthGuard', () => {
  let guard: AuthenticationGuard;

  beforeEach(() => {
    guard = new AuthenticationGuard((jest.fn().mockReturnThis() as unknown) as AuthService);
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
  // it('should run the functions', () => {
  //   expect(guard.getRequest({} as any)).toBeTruthy();
  // });
  it('should return true for canActivate', () => {
    expect(guard.canActivate(mockContext)).toBeTruthy();
  });
});
