import { Procedure } from '@hdo-teste-tecnico/shared/data-access';

export default class FakeProcedureRepository {
  procedures: Procedure[] = [
    {
      id: 1,
      description: 'Consulta',
      durationMin: 30,
      createdAt: new Date(),
    },
  ];

  async findById(id: number) {
    return this.procedures.find(p => p.id === id) || null;
  }

  async create(data: any) {
    this.procedures.push(data);
    return data;
  }

  async delete(id: number) {
    this.procedures = this.procedures.filter(p => p.id !== id);
  }

  async update(id: number, data: Partial<Procedure>) {
    const procedureIndex = this.procedures.findIndex(p => p.id === id);

    if (procedureIndex === -1) {
      throw new Error('Procedure not found');
    }

    this.procedures[procedureIndex] = { ...this.procedures[procedureIndex], ...data };
    return this.procedures[procedureIndex];
  }

  async list() {
    return this.procedures;
  }
}
