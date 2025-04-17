
export interface User {
  id: string;
  avatar: string;
  name: string;
  username: string;
  email: string;
  age: number;
  joinDate: string;
  location: string;
  isLinkupPlus: boolean;
  isVerified: boolean;
  interests: string[];
  languages: string[];
  gender: 'Male' | 'Female' | 'Non-binary' | 'Other';
  hostedLinkups: number;
  attendedLinkups: number;
  totalEarnings: number;
}
