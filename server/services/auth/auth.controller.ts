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
    req.session.save(() => res.json(req.user));
  }

  @Post('login')
  public async localLogin(@Req() req, @Res() res) {
    req.session.save(() => res.json(req.user));
  }

  @Get('logout')
  public async logout(@Req() req, @Res() res) {
    req.session.destroy(() => res.json(true));
  }
}
