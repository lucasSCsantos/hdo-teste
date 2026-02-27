import { AppointmentStatus } from '../enums/appointments.enum';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  procedureId: string;
  procedureDescription: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  cancellationReason?: string | null;
  createdAt: string;
}
