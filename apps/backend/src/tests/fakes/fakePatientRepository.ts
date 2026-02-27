import { Patient } from '@hdo-teste-tecnico/shared/data-access';
import { AppError } from '../../shared/errors/AppError';

export default class FakePatientRepository {
  patients: Patient[] = [
    {
      createdAt: new Date(),
      document: '123456789',
      id: 1,
      name: 'John Doe',
      phone: '71981551140',
      updatedAt: new Date(),
    },
  ];

  async create(data: any) {
    this.patients.push({
      ...data,
      id: this.patients.length + 1,
    });
    return { ...data, id: this.patients.length };
  }

  async delete(id: number) {
    this.patients = this.patients.filter(p => p.id !== id);
  }

  async update(id: number, data: Partial<Patient>) {
    const patientIndex = this.patients.findIndex(p => p.id === id);

    if (patientIndex === -1) {
      throw new AppError('Patient not found', 404);
    }

    this.patients[patientIndex] = { ...this.patients[patientIndex], ...data };
    return this.patients[patientIndex];
  }

  async list() {
    return this.patients;
  }

  async findById(id: number) {
    return this.patients.find(p => p.id === id) || null;
  }
}
