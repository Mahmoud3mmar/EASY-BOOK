import { ReservationEntity } from 'src/reservation/entities/reservation.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class BranchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;  // Ensure this is not nullable

  @Column()
  imageUrl: string;  // Store the URL of the image uploaded to Cloudinary

  @OneToMany(() => ReservationEntity, (ReservationEntity) => ReservationEntity.branch)  // Define the relationship
  reservations: ReservationEntity[];
  
}