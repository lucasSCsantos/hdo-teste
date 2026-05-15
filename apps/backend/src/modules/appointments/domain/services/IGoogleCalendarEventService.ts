export interface IGoogleCalendarEventService {
  createEvent(
    appointment: {
      id: number;
      patientId: number;
      procedureId: number;
      startTime: Date;
      endTime: Date;
      patient?: { name: string };
      procedure?: { description: string; durationMin: number };
    },
    userTimezone: string,
    refreshToken: string
  ): Promise<{ eventId: string }>;

  updateEvent(
    eventId: string,
    appointment: {
      id: number;
      patientId: number;
      procedureId: number;
      startTime: Date;
      endTime: Date;
      patient?: { name: string };
      procedure?: { description: string };
    },
    userTimezone: string,
    refreshToken: string
  ): Promise<void>;

  deleteEvent(eventId: string, refreshToken: string): Promise<void>;
}
