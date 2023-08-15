import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { JobEntity } from './job.entity';

@Entity('job_applications')
export class JobApplicationEntity {
  @PrimaryColumn({ name: 'id_candidate', type: 'uuid' })
  idCandidate: string;

  @PrimaryColumn({ name: 'id_job', type: 'uuid' })
  idJob: string;

  @Column()
  date: Date;

  @Column()
  success: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (entity) => entity.jobApplication)
  @JoinColumn({ name: 'id_candidate', referencedColumnName: 'id' })
  candidate: UserEntity;

  @ManyToOne(() => JobEntity, (entity) => entity.jobApplication)
  @JoinColumn({ name: 'id_job', referencedColumnName: 'id' })
  job: JobEntity;
}
