import { google } from 'googleapis';
import { IGoogleCalendarEventService } from '../../domain/services/IGoogleCalendarEventService';

export class GoogleCalendarEventService implements IGoogleCalendarEventService {
  private calendar = google.calendar('v3');

  constructor(private calendarId: string = 'primary') {}

  async createEvent(
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
  ): Promise<{ eventId: string }> {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({
      refresh_token: refreshToken,
    });

    const eventTitle = `Appointment - ${appointment.patient?.name || 'Patient'}`;
    const eventDescription = `Procedure: ${appointment.procedure?.description || 'N/A'}\nDuration: ${appointment.procedure?.durationMin || 0} minutes\nAppointment ID: ${appointment.id}`;

    const event = {
      summary: eventTitle,
      description: eventDescription,
      start: {
        dateTime: appointment.startTime.toISOString(),
        timeZone: userTimezone,
      },
      end: {
        dateTime: appointment.endTime.toISOString(),
        timeZone: userTimezone,
      },
      conferenceData: {
        createRequest: {
          requestId: `appointment-${appointment.id}-${Date.now()}`,
        },
      },
    };

    const response = await this.calendar.events.insert({
      auth,
      calendarId: this.calendarId,
      requestBody: event as any,
      conferenceDataVersion: 1,
    });

    if (!response.data.id) {
      throw new Error('Failed to create Google Calendar event');
    }

    return { eventId: response.data.id };
  }

  async updateEvent(
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
  ): Promise<void> {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({
      refresh_token: refreshToken,
    });

    const eventTitle = `Appointment - ${appointment.patient?.name || 'Patient'}`;
    const eventDescription = `Procedure: ${appointment.procedure?.description || 'N/A'}\nAppointment ID: ${appointment.id}`;

    const event = {
      summary: eventTitle,
      description: eventDescription,
      start: {
        dateTime: appointment.startTime.toISOString(),
        timeZone: userTimezone,
      },
      end: {
        dateTime: appointment.endTime.toISOString(),
        timeZone: userTimezone,
      },
    };

    await this.calendar.events.update({
      auth,
      calendarId: this.calendarId,
      eventId,
      requestBody: event as any,
    });
  }

  async deleteEvent(eventId: string, refreshToken: string): Promise<void> {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({
      refresh_token: refreshToken,
    });

    await this.calendar.events.delete({
      auth,
      calendarId: this.calendarId,
      eventId,
    });
  }
}
