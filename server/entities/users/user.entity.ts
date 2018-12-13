import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  token: string;

  @Column('varchar')
  name: string;

  @Column('varchar', {
    unique: true
  })
  username: string;

  @Column('varchar', {
    nullable: true
  })
  photo: string;

  @Column('varchar', {
    nullable: true
  })
  email: string;
}
