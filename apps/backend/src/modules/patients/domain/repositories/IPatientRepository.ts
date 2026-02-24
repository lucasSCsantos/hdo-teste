import { Patient } from '@hdo-teste-tecnico/shared/data-access';

export interface IPatientRepository {
  findById(id: number): Promise<Patient | null>;
  create(data: Partial<Patient>): Promise<Patient>;
  delete(id: number): Promise<Patient | null>;
  list(): Promise<Patient[]>;
}
