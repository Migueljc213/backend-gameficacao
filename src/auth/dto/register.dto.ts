import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o nome.' })
  @MaxLength(255)
  name: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'Informe o e-mail.' })
  email: string;

  @IsString()
  @MinLength(4, { message: 'Senha deve ter pelo menos 4 caracteres.' })
  password: string;
}
