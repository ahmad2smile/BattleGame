import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PlayerRole } from './models/PlayerRole';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PlayerRole,
    default: PlayerRole.Attacker,
  })
  playerRole: PlayerRole;
}
