import { CreatePatientUseCase } from '../../modules/patients/application/usecases/CreatePatientUseCase';
import { PrismaPatientRepository } from '../../modules/patients/infra/repositories/PrismaPatientRepository';
import { CreatePatientController } from '../../modules/patients/presentation/controllers/CreatePatientController';
import { ListPatientsController } from '../../modules/patients/presentation/controllers/ListPatientsController';
import { DeletePatientController } from '../../modules/patients/presentation/controllers/DeletePatientController';
import { UpdatePatientController } from '../../modules/patients/presentation/controllers/UpdatePatientController';
import { DeletePatientUseCase } from '../../modules/patients/application/usecases/DeletePatientUseCase';
import { ListPatientsUseCase } from '../../modules/patients/application/usecases/ListPatientsUseCase';
import { UpdatePatientUseCase } from '../../modules/patients/application/usecases/UpdatePatientUseCase';

export function makeCreatePatientController() {
  const repo = new PrismaPatientRepository();
  const useCase = new CreatePatientUseCase(repo as any);
  return new CreatePatientController(useCase);
}

export function makeDeletePatientController() {
  const repo = new PrismaPatientRepository();
  const useCase = new DeletePatientUseCase(repo as any);
  return new DeletePatientController(useCase);
}

export function makeListPatientsController() {
  const repo = new PrismaPatientRepository();
  const useCase = new ListPatientsUseCase(repo as any);
  return new ListPatientsController(useCase);
}

export function makeUpdatePatientsController() {
  const repo = new PrismaPatientRepository();
  const useCase = new UpdatePatientUseCase(repo as any);
  return new UpdatePatientController(useCase);
}
