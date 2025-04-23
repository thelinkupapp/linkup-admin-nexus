
export interface ChatMessage {
  id: string;
  type: "text" | "image" | "video" | "voice" | "gif";
  content: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
}

export interface Report {
  id: string;
  reason: string;
  timestamp: string;
  resolved: boolean;
  reporter: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
}

export interface Attendee {
  id: string;
  name: string;
  username: string;
  avatar: string;
  joinedAt: string;
}

export interface Host extends Attendee {
  // Additional host properties if needed
}

export interface CoHost extends Attendee {
  // Additional co-host properties if needed
}

export interface PinnedMessage {
  id: string;
  content: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
}

export interface Linkup {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  duration: string;
  generalLocation: string;
  specificLocation: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  host: Host;
  coHosts: CoHost[];
  attendees: Attendee[];
  capacity: number;
  price: number;
  totalEarnings?: number;
  visibility: "Public" | "Private";
  joinMethod: "Open" | "Approval";
  genderRestriction: string;
  chat: ChatMessage[];
  pinnedMessage?: PinnedMessage;
  media: MediaItem[];
  reports: Report[];
}
