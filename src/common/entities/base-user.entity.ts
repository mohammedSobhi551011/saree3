import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { UserRole } from "../types";

export class BaseUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ type: "varchar", length: 255 })
  firstName: string;
  @Column({ type: "varchar", length: 255 })
  middleName: string;
  @Column({ type: "varchar", length: 255 })
  lastName: string;
  @Column({ type: "varchar", length: 255 })
  username: string;
  @Column("text")
  email: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column("text")
  password: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "decimal", default: 0 })
  balance: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(plainPassword: string) {
    return bcrypt.compare(plainPassword, this.password);
  }

  fullName: string;
  @AfterLoad()
  setFullName() {
    this.fullName = `${this.firstName} ${this.middleName} ${this.lastName}`;
  }
}
