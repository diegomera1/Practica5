import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  name: string;

  @Column('varchar')
  identificacion: string;
}
