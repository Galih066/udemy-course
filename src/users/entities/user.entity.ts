import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterRemove,
    AfterUpdate
} from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with ID', this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with ID', this.id)
    }

    @AfterRemove()
    logDelete() {
        console.log('Deleted User with ID', this.id)
    }
}