import { Position } from 'src/auth/role/position.enum';
import { Role } from 'src/auth/role/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: string;

  @Column({
    nullable: true,
  })
  profilePicture: string;

  @Column({type: 'enum', enum: Position, default: Position.Worker})
  position: string
}
