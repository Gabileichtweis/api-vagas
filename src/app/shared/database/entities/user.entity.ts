import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { UserType } from '../../../models/user-type.model';
import { JobApplicationEntity } from './job-application.entity';
import { JobEntity } from './job.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 1, enum: UserType })
  type: UserType;

  @Column({ name: 'enterprise_name', nullable: true })
  enterpriseName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => JobApplicationEntity, (entity) => entity.candidate)
  jobApplication: JobApplicationEntity[];

  @OneToMany(() => JobEntity, (entity) => entity.recruiter)
  job: JobEntity[];
}
