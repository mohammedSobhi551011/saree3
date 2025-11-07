import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Government } from './government.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  name: string;

  @ManyToOne(() => Government, (government) => government.cities, {
    onDelete: 'CASCADE',
  })
  government: Government;
}
