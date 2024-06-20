import { 
    Controller,
    Post,
    Body,
    Get,
    Patch,
    Param,
    Query,
    Delete,
    NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(
        private userService: UsersService
    ) { }

    @Post('/signup')
    createUser(
        @Body() body: CreateUserDto
    ) {
        const { email, password } = body
        this.userService.create(email, password)
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
