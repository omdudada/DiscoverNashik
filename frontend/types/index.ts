export interface Place {
  id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  description?: string;
  priceRange?: string;
  timings?: string;
  photos?: string[];
}

export interface BusinessApplication {
  id: string;
  businessName: string;
  category: string;
  status: "pending" | "approved" | "rejected";
}

export interface LostFoundReport {
  id: string;
  type: "lost" | "found";
  description: string;
  location: string;
  dateTime: string;
  contactInfo: string;
  status: "open" | "matched" | "resolved";
}
