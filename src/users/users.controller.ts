import {
    Controller,
    Post,
    Body,
    Get,
    Patch,
    Param,
    Query,
    Delete,
    NotFoundException,
    Session,
    UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth-guard.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserEntity } from './entities/user.entity';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) { }

    @UseGuards(AuthGuard)
    @Get('/whoami')
    whoAmI(@CurrentUser() user: UserEntity) {
        return user;
    }

    @Post('/signup')
    async createUser(
        @Body() body: CreateUserDto,
        @Session() session: any
    ) {
        const { email, password } = body;
        const user = await this.authService.signUp(email, password);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    signOut(
        @Session() session: any
    ) {
        session.userId = null;
    }

    @Post('/signin')
    async login(
        @Body() body: CreateUserDto,
        @Session() session: any
    ) {
        const { email, password } = body;
        const user = await this.authService.signIn(email, password);
        session.userId = user.id;
        return user;
    }

    @Get('/:id')
    async findUser(
        @Param('id') id: string
    ) {
        const data = await this.userService.findOne(parseInt(id))
        if (!data) throw new NotFoundException('User not found')
        return data
    }

    @Get()
    findAllUser(
        @Query('email') email: string
    ) {
        return this.userService.find(email)
    }

    @Delete('/:id')
    removeUser(
        @Param('id') id: string
    ) {
        return this.userService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(
        @Param('id') id: string,
        @Body() body: UpdateUserDto
    ) {
        return this.userService.update(parseInt(id), body)
    }
}
