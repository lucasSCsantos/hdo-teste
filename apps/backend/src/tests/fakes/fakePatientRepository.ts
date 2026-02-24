import { Patient } from '@hdo-teste-tecnico/shared/data-access';

export default class FakePatientRepository {
  patients: Patient[] = [];

  async create(data: any) {
    this.patients.push(data);
    return data;
  }

  async remove(id: number) {
    this.patients = this.patients.filter(p => p.id !== id);
  }

  async update(id: number, data: Partial<Patient>) {
    const patientIndex = this.patients.findIndex(p => p.id === id);

    if (patientIndex === -1) {
      throw new Error('Patient not found');
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
