// shared/http/routes.ts
import { Router } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated';

import { makeCancelAppointmentController, makeCreateAppointmentController, makeListAppointmentsController } from '../container/makeAppointments';

import { makeCreatePatientController, makeDeletePatientController, makeListPatientsController, makeUpdatePatientsController } from '../container/makePatients';

import { makeCreateProcedureController, makeDeleteProcedureController, makeListProceduresController, makeUpdateProceduresController } from '../container/makeProcedures';

import { makeGetUserController, makeLoginController } from '../container/makeAuth';

const routes = Router();

const loginController = makeLoginController();
const getUserController = makeGetUserController();

routes.post('/login', loginController.handle);

routes.get('/me', isAuthenticated, getUserController.handle);

const createAppointmentController = makeCreateAppointmentController();
const listAppointmentsController = makeListAppointmentsController();
const cancelAppointmentController = makeCancelAppointmentController();

routes.post('/appointments', isAuthenticated, createAppointmentController.handle);
routes.get('/appointments', isAuthenticated, listAppointmentsController.handle);
routes.patch('/appointments/:id/cancel', isAuthenticated, cancelAppointmentController.handle);

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

export default routes;
