import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashSync } from 'bcrypt'

@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
    
    @Column({ default: false })
    deleted: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updadted_at' })
    updatedAt: string;

    @BeforeInsert()
    HashPassword() {
        this.password = hashSync(this.password, 10)
    }
}