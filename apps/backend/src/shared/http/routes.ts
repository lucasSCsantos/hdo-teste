import { Router } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated';

import { makeCancelAppointmentController, makeCreateAppointmentController, makeListAppointmentsController } from '../container/makeAppointments';

import { makeCreatePatientController, makeDeletePatientController, makeListPatientsController, makeUpdatePatientsController } from '../container/makePatients';

import { makeCreateProcedureController, makeDeleteProcedureController, makeListProceduresController, makeUpdateProceduresController } from '../container/makeProcedures';

import { makeGetUserController, makeLoginController, makeRefreshController } from '../container/makeAuth';
import { makeListAuditController } from '../container/makeAudit';

const routes = Router();

const loginController = makeLoginController();
const refreshController = makeRefreshController();
const getUserController = makeGetUserController();

routes.post('/login', loginController.handle);
routes.post('/refresh', refreshController.handle);

routes.get('/me', isAuthenticated, getUserController.handle);

const createAppointmentController = makeCreateAppointmentController();
const listAppointmentsController = makeListAppointmentsController();
const cancelAppointmentController = makeCancelAppointmentController();

routes.post('/appointments', isAuthenticated, createAppointmentController.handle);
routes.get('/appointments', isAuthenticated, listAppointmentsController.handle);
routes.post('/appointments/:id/cancel', isAuthenticated, cancelAppointmentController.handle);

const createPatientController = makeCreatePatientController();
const listPatientsController = makeListPatientsController();
const deletePatientController = makeDeletePatientController();
const updatePatientController = makeUpdatePatientsController();

routes.post('/patients', isAuthenticated, createPatientController.handle);
routes.get('/patients', isAuthenticated, listPatientsController.handle);
routes.delete('/patients/:id', isAuthenticated, deletePatientController.handle);
routes.put('/patients/:id', isAuthenticated, updatePatientController.handle);

const createProcedureController = makeCreateProcedureController();
const listProceduresController = makeListProceduresController();
const deleteProcedureController = makeDeleteProcedureController();
const updateProcedureController = makeUpdateProceduresController();

routes.post('/procedures', isAuthenticated, createProcedureController.handle);
routes.get('/procedures', isAuthenticated, listProceduresController.handle);
routes.delete('/procedures/:id', isAuthenticated, deleteProcedureController.handle);
routes.put('/procedures/:id', isAuthenticated, updateProcedureController.handle);

const listAuditController = makeListAuditController();

routes.get('/audit-logs', isAuthenticated, listAuditController.handle);

export default routes;
