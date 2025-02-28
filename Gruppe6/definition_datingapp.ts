//
// Basistyp für alle Entitäten
//
interface BaseEntity {
  id: string; // Eindeutige ID (z.B. UUID, generiert vom Backend)
  createdAt: Date; // Zeitstempel der Erstellung
  updatedAt: Date; // Zeitstempel der letzten Änderung
}

//
// Benutzer der Dating-Plattform
//
interface User extends BaseEntity {
  username: string; // Anzeigename oder Loginname
  email: string; // E-Mail des Nutzers
  passwordHash: string; // Gehashter Wert des Passworts
  isActive: boolean; // Zeigt, ob der Account aktiv/freigeschaltet ist
  role: "admin" | "user"; // Rolle des Nutzers (z.B. Administrator oder normaler User)
}

//
// Erweiterte Profildaten eines Nutzers
//
interface UserProfile extends BaseEntity {
  userId: string; // Referenz auf User.id
  displayName?: string; // Öffentlicher Anzeigename, falls abweichend vom username
  birthday?: Date; // Geburtsdatum
  gender?: "male" | "female" | "other"; // Geschlecht (als Union-Typ, optional)
  location?: string; // Wohnort oder Region
  aboutMe?: string; // Freitextbeschreibung
  profilePictureUrl?: string; // Link zum Profilbild
  // Optional: Interessen als einfacher String-Array
  // interests?: string[];
}

//
// Verbindung (Match) zwischen zwei Nutzern
//
interface Match extends BaseEntity {
  user1Id: string; // Referenz auf User.id (erster Nutzer)
  user2Id: string; // Referenz auf User.id (zweiter Nutzer)
  matchedAt: Date; // Zeitpunkt des Matches
  status: "pending" | "matched" | "blocked";
  // "pending"  => nur eine Seite hat geliked
  // "matched"  => beide Seiten haben zugestimmt
  // "blocked"  => einer hat den anderen gesperrt
}

//
// Einzelne Chat-Nachricht innerhalb eines Matches
//
interface Message extends BaseEntity {
  matchId: string; // Referenz auf Match.id
  senderId: string; // Referenz auf User.id (Absender)
  content: string; // Inhalt der Nachricht
  sentAt: Date; // Zeitpunkt des Versendens
  isRead: boolean; // Wurde die Nachricht vom Empfänger gelesen?
}

//
// Vordefinierte Interessen (optional)
//
interface Interest extends BaseEntity {
  name: string; // Name des Interesses, z.B. "Reisen", "Kochen" usw.
}

//
// Verknüpfungstabelle zwischen UserProfile und Interest (optional)
// Falls man mehrere Interessen pro Profil speichern will
//
interface UserProfileInterest {
  userProfileId: string; // Referenz auf UserProfile.id
  interestId: string; // Referenz auf Interest.id
}
