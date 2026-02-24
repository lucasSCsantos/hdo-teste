// shared/http/routes.ts
import { Router } from 'express';
import { makeCancelAppointmentController, makeCreateAppointmentController, makeListAppointmentsController } from '../container/makeAppointments';

const routes = Router();

routes.post('/appointments', (req, res) => makeCreateAppointmentController().handle(req, res));
routes.get('/appointments', (req, res) => makeListAppointmentsController().handle(req, res));
routes.patch('/appointments/{id}/cancel', (req, res) => makeCancelAppointmentController().handle(req, res));

export default routes;
