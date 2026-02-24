import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.userService.create(dto);
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { access_token: token, user: { name: user.name, email: user.email } };
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('E-mail não encontrado.');
    }
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Senha incorreta.');
    }
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return {
      access_token: token,
      user: { name: user.name, email: user.email },
    };
  }

  async validateUserById(userId: string) {
    return this.userService.findById(userId);
  }
}
