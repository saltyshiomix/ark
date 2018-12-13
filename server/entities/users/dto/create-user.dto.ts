export class CreateUserDto {
  readonly token: string;
  readonly name: string;
  readonly username: string;
  readonly photo?: string;
  readonly email?: string;
}
