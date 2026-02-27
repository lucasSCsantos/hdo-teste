import { CreateAppointmentUseCase } from '../../modules/appointments/application/usecases/CreateAppointmentUseCase';
import { PrismaProcedureRepository } from '../../modules/procedures/infra/repositories/PrismaProcedureRepository';
import { PrismaAppointmentRepository } from '../../modules/appointments/infra/repositories/PrismaAppointmentRepository';
import { CreateAppointmentController } from '../../modules/appointments/presentation/controllers/CreateAppointmentController';
import { CancelAppointmentUseCase } from '../../modules/appointments/application/usecases/CancelAppointmentUseCase';
import { CancelAppointmentController } from '../../modules/appointments/presentation/controllers/CancelAppointmentController';
import { ListAppointmentsController } from '../../modules/appointments/presentation/controllers/ListAppointmentsController';
import { ListAppointmentsUseCase } from '../../modules/appointments/application/usecases/ListAppointmentsUseCase';
import { MongoAuditLogRepository } from '../../modules/audit/infra/repositories/MongooseAuditLogRepository';
import { PrismaPatientRepository } from '../../modules/patients/infra/repositories/PrismaPatientRepository';

export function makeCreateAppointmentController() {
  const repo = new PrismaAppointmentRepository();
  const procedureRepo = new PrismaProcedureRepository();
  const patientRepo = new PrismaPatientRepository();
  const auditRepo = new MongoAuditLogRepository();
  const useCase = new CreateAppointmentUseCase(repo as any, procedureRepo as any, patientRepo as any, auditRepo as any);
  return new CreateAppointmentController(useCase);
}

export function makeCancelAppointmentController() {
  const repo = new PrismaAppointmentRepository();
  const auditRepo = new MongoAuditLogRepository();
  const useCase = new CancelAppointmentUseCase(repo as any, auditRepo as any);
  return new CancelAppointmentController(useCase);
}

export function makeListAppointmentsController() {
  const repo = new PrismaAppointmentRepository();
  const useCase = new ListAppointmentsUseCase(repo as any);
  return new ListAppointmentsController(useCase);
}
