// ACID compliance ein bisschen
// jedes Interface ist eine Tabelle in der Datenbank

// Basisentität für alle Modelle
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Benutzerkonto (normaler user / admin für die platform)
interface User extends BaseEntity {
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
}

// Ein Event, erstellt von einem Organisator
interface Event extends BaseEntity {
  title: string;
  description: string;
  creatorId: string; // Referenz auf User.id
  visibility: 'public' | 'private' | 'unlisted';
  category: 'music' | 'sports' | 'culture' | 'other';
  coverImageUrl?: string;
  maxParticipants?: number;
}

// falls mehrere Admins für ein Event die Verwaltung übernehmen
interface EventManager extends BaseEntity {
  eventId: string; // Referenz auf Event.id
  user: string; // Referenz auf User.id
}

// Bei privaten Events: Liste der eingeladenen User
interface InvitedUsers extends BaseEntity {
  id: string;
  userId: string; // Referenz auf User.id
  eventId: string; // Referenz auf Event.id
  invitedAt: Date;
  status: 'accepted' | 'declined' | 'pending';
  respondedAt?: Date;
}

// Einzelner Termin/Standort eines Events
interface EventOccurrence extends BaseEntity {
  eventId: string; // Referenz auf Event.id
  startDate: Date;
  endDate?: Date;
  location: EventLocation;
}

// Standortinformationen (z.B. Adresse, Stadt, Bundesland etc.)
interface EventLocation extends BaseEntity {
  address: string;
  city: string;
  state: string; // Bundesland
  country: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

type RegistrationStatus = 'registered' | 'cancelled' | 'pending';

// Anmeldung zu einem Event-Termin
interface Registration extends BaseEntity {
  eventOccurrenceId: string; // Referenz auf EventOccurrence.id
  userId: string; // Referenz auf User.id
  status: RegistrationStatus;
  registrationDate: Date;
}

// Ticket, das mit einer Registrierung verknüpft wird
interface Ticket extends BaseEntity {
  registrationId: string; // Referenz auf Registration.id
  ticketNumber: string;
  seatInfo?: string;
  // Zahlungsdetails werden hier bewusst weggelassen
}

// Benachrichtigungen/Messages für Nutzer
interface Notification extends BaseEntity {
  userId: string;
  message: string;
  type: 'registration' | 'event_update' | 'reminder' | 'general';
  isRead: boolean;
}

// Einladung zu einem Event per E-Mail (Einzelne Einladung)
interface Invitation extends BaseEntity {
  eventId: string; // Referenz auf Event.id
  email: string; // E-Mail-Adresse des eingeladenen Nutzers
  invitedAt: Date; // Zeitpunkt der Einladung
  message?: string; // Optionale Nachricht an den Empfänger
}
