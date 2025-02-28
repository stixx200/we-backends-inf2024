Wir haben anhand der Beispieldatei ein für uns Sinnhaftes Datenmodell erstellt.
Die Anwendung soll ein Habittracker werden.
Für anregungen und Kommentare sind wir erreichbar unter der E-Mail beckerm.tin24@student.dhbw-heidenheim.de

// Basistyp für alle Entitäten
interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

// Benutzer der Anwendung
interface User extends BaseEntity {
    username: string;
    email: string;
    passwordHash: string;
    role: 'admin' | 'user';
}

// Ein Habit (Gewohnheit)
interface Habit extends BaseEntity {
    title: string;
    description?: string;
    ownerId: string;  // Referenz auf User.id
    isPublic: boolean;
    streak: number;  // Aktuelle Serie von erfolgreichen Tagen
    bestStreak: number;  // Beste bisherige Serie
    frequency: 'daily' | 'weekly' | 'monthly';  // Häufigkeit der Gewohnheit
    reminders?: Date[];  // Optionale Erinnerungen
}

// Ein Eintrag für einen Habit (Tageseintrag)
interface HabitEntry extends BaseEntity {
    habitId: string;  // Referenz auf Habit.id
    date: Date;  // Datum des Eintrags
    completed: boolean;  // Ob der Habit an diesem Tag abgeschlossen wurde
    notes?: string;  // Optionale Notizen zum Eintrag
}

// Tags für Habits
interface Tag extends BaseEntity {
    name: string;
    color: string;
}

// Verknüpfungstabelle zwischen Tags und Habits
interface HabitTag {
    habitId: string;  // Referenz auf Habit.id
    tagId: string;    // Referenz auf Tag.id
}

// Berechtigungen für geteilte Habits
interface HabitAccess extends BaseEntity {
    habitId: string;  // Referenz auf Habit.id
    userId: string;   // Referenz auf User.id
    accessLevel: 'read' | 'write' | 'admin';
}