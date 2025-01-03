import { Test } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { UserEntity } from "./entities/user.entity";

describe("AuthService", () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>

    beforeEach(async () => {
        const fakeUserService: Partial<UsersService> = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as UserEntity)
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ]
        }).compile()

        service = module.get(AuthService)
    })

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    })

    it('creates a new user with salted and hashed password', async () => {
        const user = await service.signUp('mN6iX@example.com', 'asdf')
        expect(user.password).not.toEqual('asdf')
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })

    it('throws an error if user signs up with email that is in use', async (done) => {
        fakeUsersService.find = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as UserEntity]);
        try {
            await service.signUp('mN6iX@example.com', 'asdf');
        } catch (error) {
            done();
        }
    })
});