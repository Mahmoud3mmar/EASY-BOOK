
// import { Roles } from "src/users/utility/user.enum";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "../utility/user.enum";


@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    @Column({ default: false })
    isEmailVerified: boolean;

    @Column({ nullable: true })
    otp: string;

    @Column({ nullable: true })
    otpExpiration: Date;

    @Column({ nullable: true })
    resetToken: string;
  
    @Column({ type: 'timestamp', nullable: true })
    resetTokenExpiration: Date;


    @Column({ nullable: true })
    refreshToken: string;
    @Column({
        type: 'enum',
        enum: Roles,
        default: Roles.ADMIN
    })
    role: Roles;

    // @Column()
    // resetCode?: string; 

    // @OneToMany(() => OrderEntity, order => order.user)
    // orders: OrderEntity[];

    // @OneToMany(() => CartEntity, cart => cart.user)
    // carts: CartEntity[];

    // @ManyToMany(() => ProductEntity, product => product.users)
    // @JoinTable()
    // products: ProductEntity[];

    


}