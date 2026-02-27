import { CreateProcedureUseCase } from '../../modules/procedures/application/usecases/CreateProcedureUseCase';
import { PrismaProcedureRepository } from '../../modules/procedures/infra/repositories/PrismaProcedureRepository';
import { CreateProcedureController } from '../../modules/procedures/presentation/controllers/CreateProcedureController';
import { DeleteProcedureController } from '../../modules/procedures/presentation/controllers/DeleteProcedureController';
import { UpdateProcedureController } from '../../modules/procedures/presentation/controllers/UpdateProcedureController';
import { DeleteProcedureUseCase } from '../../modules/procedures/application/usecases/DeleteProcedureUseCase';
import { ListProceduresUseCase } from '../../modules/procedures/application/usecases/ListProceduresUseCase';
import { UpdateProcedureUseCase } from '../../modules/procedures/application/usecases/UpdateProcedureUseCase';
import { ListProceduresController } from '../../modules/procedures/presentation/controllers/ListProceduresController';

export function makeCreateProcedureController() {
  const repo = new PrismaProcedureRepository();
  const useCase = new CreateProcedureUseCase(repo as any);
  return new CreateProcedureController(useCase);
}

export function makeDeleteProcedureController() {
  const repo = new PrismaProcedureRepository();
  const useCase = new DeleteProcedureUseCase(repo as any);
  return new DeleteProcedureController(useCase);
}

export function makeListProceduresController() {
  const repo = new PrismaProcedureRepository();
  const useCase = new ListProceduresUseCase(repo as any);
  return new ListProceduresController(useCase);
}

export function makeUpdateProceduresController() {
  const repo = new PrismaProcedureRepository();
  const useCase = new UpdateProcedureUseCase(repo as any);
  return new UpdateProcedureController(useCase);
}
