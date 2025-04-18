
export interface User {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
  joinDate: string;
  location: string;
  isLinkupPlus: boolean;
  isVerified: boolean;
  nationality: string;
  gender: 'Male' | 'Female' | 'Non-binary' | '💁‍♂️ Male' | '💁‍♀️ Female';
  hostedLinkups: number;
  attendedLinkups: number;
  totalEarnings: number;
}
