import {
  Controller,
  Get,
  Post,
  Req,
  Res
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('signup')
  public async localSignUp(@Req() req, @Res() res) {
    res.redirect('/');
  }

  @Post('login')
  public async localLogin(@Req() req, @Res() res) {
    res.redirect('/');
  }

  @Get('logout')
  public async logout(@Req() req, @Res() res) {
    req.logout();
    res.redirect('/auth/login');
  }
}
