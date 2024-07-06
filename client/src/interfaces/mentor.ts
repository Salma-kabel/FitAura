export interface Company {
  logo: string;
  name: string;
}

export interface Mentor {
  id: number;
  name: string;
  expertise: string;
  photo: string;
  category: string;
  description: string;
  company: Company;
  // Add other fields as required
}
  