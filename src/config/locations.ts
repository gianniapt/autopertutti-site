export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: { days: string; time: string }[];
  mapSrc: string;
  primary: boolean;
}

export const LOCATIONS: Record<string, Location> = {
  agnano: {
    id: "agnano",
    name: "Agnano (Sede Principale)",
    address: "Via Circumflegrea, 80078 Pozzuoli (NA)",
    phone: "+39 081 576 3372",
    whatsapp: "+39 379 113 7917",
    email: "info@autopertutti.it",
    hours: [
      { days: "Lun – Ven", time: "9:00 – 19:00" },
      { days: "Sabato", time: "9:00 – 17:00" },
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3034.5047502604!2d14.10!3d40.8299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0b0b0b0b0b0b%3A0x0!2sAuto%20Per%20Tutti!5e0!3m2!1sit!2sit!4v1234567890",
    primary: true,
  },
  napoli: {
    id: "napoli",
    name: "Napoli",
    address: "Via Nuova Agnano, Napoli (NA)",
    phone: "+39 081 576 3372",
    whatsapp: "+39 379 113 7917",
    email: "info@autopertutti.it",
    hours: [
      { days: "Lun – Sab", time: "9:00 – 19:00" },
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.5047502604!2d14.27!3d40.8599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0c0c0c0c0c0c%3A0x0!2sAuto%20Per%20Tutti%20Napoli!5e0!3m2!1sit!2sit!4v1234567890",
    primary: false,
  },
  carrara: {
    id: "carrara",
    name: "Carrara",
    address: "Via Carriona, 54033 Carrara (MS)",
    phone: "+39 081 576 3372",
    whatsapp: "+39 379 113 7917",
    email: "info@autopertutti.it",
    hours: [
      { days: "Lun – Sab", time: "9:00 – 18:00" },
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2859.5047502604!2d10.1!3d44.0199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b5b0b0b0b0b0b%3A0x0!2sAuto%20Per%20Tutti%20Carrara!5e0!3m2!1sit!2sit!4v1234567890",
    primary: false,
  },
};

export const LOCATIONS_ARRAY = Object.values(LOCATIONS);
export const DEFAULT_LOCATION = "agnano";

export function getLocation(id: string): Location | undefined {
  return LOCATIONS[id];
}
