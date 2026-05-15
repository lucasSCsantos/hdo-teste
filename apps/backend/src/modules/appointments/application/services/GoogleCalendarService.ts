import { google } from 'googleapis';
import { PrismaAuthRepository } from '../../../../modules/auth/infra/repositories/PrismaAuthRepository';

export class GoogleCalendarService {
  private oauth2Client: any;
  private authRepo: PrismaAuthRepository;
  private calendarId: string;

  constructor() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    this.calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    this.oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    this.authRepo = new PrismaAuthRepository();
  }

  /**
   * Syncs an appointment to the user's Google Calendar.
   * Returns the created event id on success, or null.
   */
  async syncAppointment(appointment: any, userId: number): Promise<string | null> {
    const user = await this.authRepo.findById(+userId);
    if (!user || !user.refreshToken) {
      console.warn('User has no refresh token for Google Calendar');
      return null;
    }

    // attach refresh token and let googleapis refresh access token automatically
    this.oauth2Client.setCredentials({ refresh_token: user.refreshToken });

    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    const event = {
      summary: `Appointment - ${appointment.id}`,
      description: `Appointment for patient ${appointment.patientId} - procedure ${appointment.procedureId}`,
      start: { dateTime: new Date(appointment.startTime).toISOString() },
      end: { dateTime: new Date(appointment.endTime).toISOString() },
      attendees: [],
    };

    try {
      const res = await calendar.events.insert({
        calendarId: this.calendarId,
        requestBody: event,
      });

      // return event id
      return (res && (res as any).data && (res as any).data.id) || null;
    } catch (err) {
      console.error('Google Calendar API error:', err);
      throw err;
    }
  }
}
