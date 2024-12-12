import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService
    ) { }

    async signUp(email: string, password: string) {
        const users = await this.userService.find(email);
        if (users.length) throw new BadRequestException('Email in use');
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');
        const user = await this.userService.create(email, result);
        return user;
    }

    signIn() {

    }
}
