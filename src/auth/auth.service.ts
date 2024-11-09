import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async login(user) {
        const payload = { sub: user._id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async validateUser(email: string, password: string) {
        let user;
        try {
            user = await this.userService.findOne({ email });
        } catch (err) {
            return null;
        }

        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) return null;

        return user;

    }
}
