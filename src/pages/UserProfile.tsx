import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { DeleteUserDialog } from "@/components/dashboard/DeleteUserDialog";
import { UserProfileHeader } from "@/components/dashboard/UserProfileHeader";
import { ProfilePhotos } from "@/components/dashboard/ProfilePhotos";
import { UserActivity } from "@/components/dashboard/UserActivity";
import { ProfileImageCarousel } from "@/components/profile/ProfileImageCarousel";
import { getCountryEmoji } from "@/utils/countryUtils";
import { VerificationAttempt } from "@/types/user";
import { PayoutHistoryDialog } from "@/components/wallet/PayoutHistoryDialog";
import { EarningsBreakdownDialog } from "@/components/wallet/EarningsBreakdownDialog";
import { LinkupPlusHistoryDialog } from "@/components/wallet/LinkupPlusHistoryDialog";
import { AllReportsDialog } from "@/components/reports/AllReportsDialog";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Briefcase, 
  Languages, 
  Instagram, 
  Twitter, 
  Linkedin, 
  CheckCircle, 
  X, 
  Check, 
  Crown, 
  Flag, 
  AlertTriangle, 
  User as UserIcon, 
  ShieldOff,
  ArrowUpRight
} from "lucide-react";
import { SocialMediaIcons } from '@/components/profile/SocialMediaIcons';
import { toast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatJoinDate } from "@/utils/dateFormatting";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { UserLinkupsTable } from "@/components/dashboard/UserLinkupsTable";
import { UserLinkupActivity } from "@/components/dashboard/UserLinkupActivity";
import { UserLinkupChats } from "@/components/dashboard/UserLinkupChats";
import { UserReportsList } from "@/components/reports/UserReportsList";
import { UserFriendsList } from "@/components/friends/UserFriendsList";

interface UserData {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  dob: string;
  age: number;
  gender: string;
  nationality: string;
  joinDate: string;
  location: string;
  isLinkupPlus: boolean;
  isVerified: boolean;
  verificationDetails: {
    attempts: VerificationAttempt[];
    hasSubmitted: boolean;
  };
  occupation: string;
  bio: string;
  socials: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    tiktok?: string;
  };
  interests: string[];
  languages: string[];
  wallet: {
    lifetimeEarnings: number;
    availableBalance: number;
    inTransit: number;
    lastWithdrawal: string;
    payoutHistory: {
      amount: number;
      date: string;
      status: string;
      method: string;
    }[];
    linkupPlus: {
      startDate: string | null;
      cancelDate: string | null;
    };
  };
  linkupStats: {
    hosted: number;
    joined: number;
  };
  privacySettings: {
    hideAge: boolean;
    allowFemaleFriendRequests: boolean;
    allowMaleFriendRequests: boolean;
    socialsVisibleToFriendsOnly: boolean;
    friendsCanSeeUpcomingAttendance: boolean;
    showLocationOnMap: boolean;
    appearOnNearbyPeople: boolean;
    showLinkupsToEveryone: boolean;
    showLinkupsToFriendsOnly: boolean;
  };
  reports: any[];
  friends: any[];
  pendingFriendRequests: {
    received: any[];
    sent: any[];
  };
  hostingLinkups: number;
  lastKnownLocation: string;
  reportsReceived: {
    id: string;
    reporterId: string;
    reporterName: string;
    reporterUsername: string;
    reporterAvatar: string;
    description: string;
    timestamp: string;
    isRead: boolean;
  }[];
  reportsMade: {
    id: string;
    reportedUserId: string;
    reportedUserName: string;
    reportedUserUsername: string;
    reportedUserAvatar: string;
    description: string;
    timestamp: string;
  }[];
}

const linkupPlusTransactions = [
  {
    date: "2024-03-15",
    amount: 79.99,
    description: "Linkup Plus Annual Subscription"
  },
  {
    date: "2023-03-15",
    amount: 79.99,
    description: "Linkup Plus Annual Subscription"
  },
  {
    date: "2022-03-15",
    amount: 79.99,
    description: "Linkup Plus Annual Subscription"
  }
];

const attendedLinkupPayments = [
  {
    description: "Cooking Class with Chef Maria",
    amount: 45.00,
    timestamp: "2024-04-18T15:00:00Z",
    linkupId: "cooking-123"
  },
  {
    description: "Wine Tasting Experience",
    amount: 35.00,
    timestamp: "2024-04-15T18:30:00Z",
    linkupId: "wine-456"
  },
  {
    description: "Spanish Language Exchange",
    amount: 15.00,
    timestamp: "2024-04-12T19:00:00Z",
    linkupId: "spanish-789"
  },
  {
    description: "Photography Workshop",
    amount: 65.00,
    timestamp: "2024-04-10T14:00:00Z",
    linkupId: "photo-101"
  },
  {
    description: "Salsa Dancing Night",
    amount: 25.00,
    timestamp: "2024-04-08T20:00:00Z",
    linkupId: "salsa-202"
  }
];

const user: UserData = {
  id: "2",
  avatar: "/lovable-uploads/03ae0b73-0e7e-42b1-a69b-8646589f09bf.png",
  firstName: "Jack",
  lastName: "Peagam",
  username: "jackpeagam",
  email: "jack@linkupapp.io",
  phone: "+44 784 139 2122",
  dob: "1995-02-21",
  age: 30,
  gender: "💁‍♂️ Male",
  nationality: "British",
  joinDate: "2022-11-15",
  location: "San Francisco, CA",
  isLinkupPlus: true,
  isVerified: true,
  verificationDetails: {
    attempts: [
      {
        selfie: "/lovable-uploads/0a1432b0-c905-4dd9-a32d-0d42660de0f6.png",
        submittedAt: "2024-04-19T14:30:00Z",
        status: 'pending' as 'pending' | 'approved' | 'denied'
      },
      {
        selfie: "/lovable-uploads/efe02853-0a89-411c-9ab1-35117eef0ff9.png",
        submittedAt: "2024-04-15T10:15:00Z",
        status: 'denied' as 'pending' | 'approved' | 'denied',
        statusChangeTime: "2024-04-15T11:30:00Z",
        notificationSent: true
      }
    ],
    hasSubmitted: true
  },
  occupation: "Co-Founder & CEO of this very app",
  bio: "Decided to make this app before I wanted to meet more like-minded people on my travels. Turns out it was kinda a good idea and lots of people used it and so I later sold it 5 years later for $5 billion.",
  socials: {
    instagram: "@jackpeagam",
    twitter: "@jackpeagam",
    linkedin: "/jackpeagam",
    tiktok: "@jackpeagam"
  },
  interests: ["🪂 Skydiving", "💻 Technology", "📚 Personal Growth", "💼 Startups", "🎉 Festivals"],
  languages: ["🇬🇧 English", "🇪🇸 Spanish", "🇨🇳 Mandarin"],
  wallet: {
    lifetimeEarnings: 350,
    availableBalance: 80,
    inTransit: 50,
    lastWithdrawal: "2023-11-15",
    payoutHistory: [
      { amount: 75, date: "2023-11-15", status: "Complete", method: "Ryft Pay" },
      { amount: 125, date: "2023-09-28", status: "Complete", method: "Ryft Pay" },
      { amount: 150, date: "2023-08-05", status: "Complete", method: "Ryft Pay" },
      { amount: 80, date: "2023-07-15", status: "Complete", method: "Ryft Pay" },
      { amount: 95, date: "2023-06-22", status: "Complete", method: "Ryft Pay" },
      { amount: 110, date: "2023-05-18", status: "Complete", method: "Ryft Pay" },
      { amount: 65, date: "2023-04-12", status: "Complete", method: "Ryft Pay" },
      { amount: 140, date: "2023-03-25", status: "Complete", method: "Ryft Pay" },
      { amount: 85, date: "2023-02-08", status: "Complete", method: "Ryft Pay" },
      { amount: 120, date: "2023-01-15", status: "Complete", method: "Ryft Pay" }
    ],
    linkupPlus: {
      startDate: "2022-03-15",
      cancelDate: null
    }
  },
  linkupStats: {
    hosted: 8,
    joined: 15
  },
  privacySettings: {
    hideAge: false,
    allowFemaleFriendRequests: true,
    allowMaleFriendRequests: true,
    socialsVisibleToFriendsOnly: false,
    friendsCanSeeUpcomingAttendance: true,
    showLocationOnMap: true,
    appearOnNearbyPeople: true,
    showLinkupsToEveryone: true,
    showLinkupsToFriendsOnly: false
  },
  reports: [],
  friends: [
    {
      id: "friend1",
      name: "Emma Thompson",
      username: "emmathompson",
      avatar: "/lovable-uploads/e40b12e8-d278-4b67-8505-d39052f56458.png",
      friendsSince: "2024-03-15T10:30:00Z"
    },
    {
      id: "friend2",
      name: "Alex Rodriguez",
      username: "alexr",
      avatar: "/lovable-uploads/2e089ec4-e032-49e1-af97-37742c6d61ea.png",
      friendsSince: "2024-02-20T15:45:00Z"
    },
    {
      id: "friend3",
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "/lovable-uploads/0a1432b0-c905-4dd9-a32d-0d42660de0f6.png",
      friendsSince: "2024-01-10T09:15:00Z"
    }
  ],
  pendingFriendRequests: {
    received: [
      {
        id: "req1",
        name: "Michael Brown",
        username: "mikebrown",
        avatar: "/lovable-uploads/efe02853-0a89-411c-9ab1-35117eef0ff9.png",
        requestDate: "2024-04-18T14:30:00Z"
      },
      {
        id: "req2",
        name: "Lisa Wang",
        username: "lisawang",
        avatar: "/lovable-uploads/e40b12e8-d278-4b67-8505-d39052f56458.png",
        requestDate: "2024-04-15T11:20:00Z"
      }
    ],
    sent: [
      {
        id: "sent1",
        name: "David Kim",
        username: "davidk",
        avatar: "/lovable-uploads/2e089ec4-e032-49e1-af97-37742c6d61ea.png",
        requestDate: "2024-04-19T16:45:00Z"
      },
      {
        id: "sent2",
        name: "Rachel Green",
        username: "rachelg",
        avatar: "/lovable-uploads/0a1432b0-c905-4dd9-a32d-0d42660de0f6.png",
        requestDate: "2024-04-17T13:10:00Z"
      }
    ]
  },
  hostingLinkups: 2,
  lastKnownLocation: "🇮🇩 Canggu, Indonesia",
  reportsReceived: [
    {
      id: "1",
      reporterId: "user123",
      reporterName: "Sarah Johnson",
      reporterUsername: "sarahjohnson",
      reporterAvatar: "/lovable-uploads/e40b12e8-d278-4b67-8505-d39052f56458.png",
      description: "Inappropriate behavior in chat",
      timestamp: "2025-04-22T10:30:00Z",
      isRead: false
    },
    {
      id: "2",
      reporterId: "user456",
      reporterName: "Mike Williams",
      reporterUsername: "mikewilliams",
      reporterAvatar: "/lovable-uploads/2e089ec4-e032-49e1-af97-37742c6d61ea.png",
      description: "Suspicious activity during linkup",
      timestamp: "2025-04-21T15:45:00Z",
      isRead: true
    },
    {
      id: "3",
      reporterId: "user789",
      reporterName: "Emily Brown",
      reporterUsername: "emilybrown",
      reporterAvatar: "/lovable-uploads/0a1432b0-c905-4dd9-a32d-0d42660de0f6.png",
      description: "Harassment in direct messages",
      timestamp: "2025-04-20T09:15:00Z",
      isRead: false
    }
  ],
  reportsMade: [
    {
      id: "4",
      reportedUserId: "user321",
      reportedUserName: "John Smith",
      reportedUserUsername: "johnsmith",
      reportedUserAvatar: "/lovable-uploads/efe02853-0a89-411c-9ab1-35117eef0ff9.png",
      description: "Spam messages in linkup chat",
      timestamp: "2025-04-19T16:20:00Z"
    },
    {
      id: "5",
      reportedUserId: "user654",
      reportedUserName: "Alice Cooper",
      reportedUserUsername: "alicecooper",
      reportedUserAvatar: "/lovable-uploads/2e089ec4-e032-49e1-af97-37742c6d61ea.png",
      description: "Inappropriate profile picture",
      timestamp: "2025-04-18T14:10:00Z"
    },
    {
      id: "6",
      reportedUserId: "user987",
      reportedUserName: "Bob Wilson",
      reportedUserUsername: "bobwilson",
      reportedUserAvatar: "/lovable-uploads/0a1432b0-c905-4dd9-a32d-0d42660de0f6.png",
      description: "Fake identity",
      timestamp: "2025-04-17T11:30:00Z"
    }
  ]
};

const UserProfile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(
    user.verificationDetails?.attempts[0]?.status === 'approved'
  );
  const [verificationAttempts, setVerificationAttempts] = useState<VerificationAttempt[]>(
    user.verificationDetails.attempts
  );

  const userPhotos = [
    {
      id: "1",
      url: user.avatar,
      uploadDate: "2024-01-15T10:30:00Z",
      isProfilePicture: true
    },
    {
      id: "2",
      url: "/lovable-uploads/e40b12e8-d278-4b67-8505-d39052f56458.png",
      uploadDate: "2024-04-18T10:00:00Z",
      isProfilePicture: false
    },
    {
      id: "3",
      url: "/lovable-uploads/2e089ec4-e032-49e1-af97-37742c6d61ea.png",
      uploadDate: "2024-04-18T10:00:00Z",
      isProfilePicture: false
    }
  ];

  const userChatActivity = [
    {
      id: "1",
      type: "linkup" as const,
      with: "Beach Volleyball Group",
      lastMessage: "See you all tomorrow at 3PM!",
      timestamp: "2024-04-17T14:30:00Z"
    },
    {
      id: "2",
      type: "friend" as const,
      with: "John Smith",
      lastMessage: "Thanks for the invite!",
      timestamp: "2024-04-17T10:15:00Z"
    }
  ];

  const userLinkupActivity = [
    {
      id: "1",
      type: "joined" as const,
      linkupName: "Weekend Hiking Adventure",
      timestamp: "2024-04-16T09:00:00Z"
    },
    {
      id: "2",
      type: "sent" as const,
      linkupName: "Board Game Night",
      timestamp: "2024-04-15T20:30:00Z"
    },
    {
      id: "3",
      type: "accepted" as const,
      linkupName: "Yoga in the Park",
      timestamp: "2024-04-14T11:45:00Z"
    }
  ];

  const userHeaderData = {
    id: user.id,
    avatar: user.avatar,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    location: user.location,
    joinDate: user.joinDate,
    isVerified: user.isVerified,
    isLinkupPlus: user.isLinkupPlus,
    hostingLinkups: user.hostingLinkups
  };

  const [userWithVerification, setUserWithVerification] = useState<UserData>({
    ...user,
    isVerified: isVerified
  });

  useEffect(() => {
    setUserWithVerification(prev => ({
      ...prev,
      isVerified: isVerified,
      verificationDetails: {
        attempts: verificationAttempts,
        hasSubmitted: user.verificationDetails.hasSubmitted
      }
    }));
    console.log("UserProfile - Verification status updated:", isVerified);
  }, [isVerified, verificationAttempts]);

  const handleVerificationAction = (action: 'approve' | 'deny' | 'remove') => {
    const newAttempts = [...verificationAttempts];
    const currentTime = new Date().toISOString();
    
    if (action === 'remove') {
      const newAttempt = {
        ...newAttempts[0],
        status: 'denied' as 'denied',
        notificationSent: true,
        statusChangeTime: currentTime
      };
      newAttempts[0] = newAttempt;
      setVerificationAttempts(newAttempts);
      setIsVerified(false);
      toast({
        title: "Verification Removed",
        description: "The user has been notified to resubmit their verification",
        variant: "destructive",
      });
      return;
    }

    if (action === 'approve') {
      newAttempts[0] = {
        ...newAttempts[0],
        status: 'approved',
        statusChangeTime: currentTime
      };
      setVerificationAttempts(newAttempts);
      setIsVerified(true);
      toast({
        title: "Verification Approved",
        description: "The user has been successfully verified",
      });
    } else {
      newAttempts[0] = {
        ...newAttempts[0],
        status: 'denied',
        notificationSent: true,
        statusChangeTime: currentTime
      };
      setVerificationAttempts(newAttempts);
      setIsVerified(false);
      toast({
        title: "Verification Denied",
        description: "The user has been notified to resubmit their verification",
        variant: "destructive",
      });
    }
  };

  const [isPayoutHistoryOpen, setIsPayoutHistoryOpen] = useState(false);
  const [isEarningsBreakdownOpen, setIsEarningsBreakdownOpen] = useState(false);
  const [isLinkupPlusHistoryOpen, setIsLinkupPlusHistoryOpen] = useState(false);
  const [isAllReportsReceivedOpen, setIsAllReportsReceivedOpen] = useState(false);
  const [isAllReportsMadeOpen, setIsAllReportsMadeOpen] = useState(false);

  const earningsBreakdown = [
    {
      description: "Sunset Beach Yoga Session",
      amount: 35.00,
      timestamp: "2024-04-19T18:31:00Z",
      status: "earned" as const,
      linkupId: "yoga-123"
    },
    {
      description: "City Walking Tour",
      amount: 45.00,
      timestamp: "2024-04-18T14:30:00Z",
      status: "earned" as const,
      linkupId: "walk-456"
    },
    {
      description: "Tennis Coaching",
      amount: 50.00,
      timestamp: "2024-04-17T10:00:00Z",
      status: "earned" as const,
      linkupId: "tennis-789"
    },
    {
      description: "Pottery Workshop",
      amount: 60.00,
      timestamp: "2024-04-16T15:30:00Z",
      status: "earned" as const,
      linkupId: "pottery-101"
    },
    {
      description: "Dance Class",
      amount: 40.00,
      timestamp: "2024-04-15T19:00:00Z",
      status: "earned" as const,
      linkupId: "dance-202"
    },
    {
      description: "Photography Walk",
      amount: 30.00,
      timestamp: "2024-04-14T11:00:00Z",
      status: "earned" as const,
      linkupId: "photo-303"
    },
    {
      description: "Cooking Workshop",
      amount: 55.00,
      timestamp: "2024-04-13T17:30:00Z",
      status: "earned" as const,
      linkupId: "cook-404"
    },
    {
      description: "Surfing Lesson",
      amount: 70.00,
      timestamp: "2024-04-12T09:00:00Z",
      status: "earned" as const,
      linkupId: "surf-505"
    },
    {
      description: "Meditation Session",
      amount: 25.00,
      timestamp: "2024-04-11T08:00:00Z",
      status: "earned" as const,
      linkupId: "meditation-606"
    },
    {
      description: "Rock Climbing Class",
      amount: 65.00,
      timestamp: "2024-04-10T16:00:00Z",
      status: "earned" as const,
      linkupId: "climb-707"
    }
  ];

  const handleMarkAsRead = (reportId: string) => {
    const updatedReports = user.reportsReceived.map(report => 
      report.id === reportId ? { ...report, isRead: true } : report
    );
    setUserWithVerification(prev => ({
      ...prev,
      reportsReceived: updatedReports
    }));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="User Profile" />
        <main className="p-6">
          <UserProfileHeader user={userWithVerification} />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="mb-6">
              <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
              <TabsTrigger value="profile-info">Profile Info</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="wallet">Wallet & Billing</TabsTrigger>
              <TabsTrigger value="linkups">Linkups</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Settings</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic-info" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-linkup-purple" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">First Name</p>
                        <p>{user.firstName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Last Name</p>
                        <p>{user.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Username</p>
                        <p>@{user.username}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Email Address</p>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Phone Number</p>
                        <p>{user.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Date of Birth</p>
                        <p>{new Date(user.dob).toLocaleDateString('en-GB')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Age</p>
                        <p>{user.age} years old</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Gender</p>
                        <p>{user.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Nationality</p>
                        <p>
                          <span className="mr-1">🇬🇧</span>
                          {user.nationality}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Last Known Location</p>
                        <p>{user.lastKnownLocation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile-info" className="space-y-6">
              <ProfileImageCarousel photos={userPhotos} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-linkup-purple" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Bio</p>
                        <p className="text-sm">{user.bio}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Occupation</p>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{user.occupation}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Interests</p>
                        <div className="flex flex-wrap gap-2">
                          {user.interests.map((interest, index) => (
                            <Badge key={index} variant="outline" className="bg-muted/50">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Languages Spoken</p>
                        <div className="flex flex-wrap gap-2">
                          {user.languages.map((language, index) => (
                            <Badge key={index} variant="outline" className="bg-muted/50">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SocialMediaIcons socials={user.socials} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="verification" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {!user.verificationDetails.hasSubmitted ? (
                    <div className="text-center py-8">
                      <UserIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground">No verification photo submitted</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {verificationAttempts.map((attempt, index) => (
                        <div key={attempt.submittedAt} className="space-y-4">
                          {index > 0 && <Separator className="my-6" />}
                          <p className="text-sm font-medium text-muted-foreground">
                            {index === 0 ? "Latest Submission" : `Previous Attempt (${formatJoinDate(attempt.submittedAt)})`}
                          </p>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <div className="w-[180px] cursor-pointer group">
                                <AspectRatio ratio={9/16}>
                                  <img
                                    src={attempt.selfie}
                                    alt={`Verification selfie from ${new Date(attempt.submittedAt).toLocaleString()}`}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                    <span className="text-white text-sm">Click to enlarge</span>
                                  </div>
                                </AspectRatio>
                              </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <img
                                src={attempt.selfie}
                                alt={`Verification selfie from ${new Date(attempt.submittedAt).toLocaleString()}`}
                                className="w-full h-auto max-h-[80vh] object-contain"
                              />
                            </DialogContent>
                          </Dialog>

                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Submitted</p>
                            <p>{formatJoinDate(attempt.submittedAt)}</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-3">Status</p>
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                              attempt.status === 'approved' 
                                ? "bg-green-100 text-green-800"
                                : attempt.status === 'denied'
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {attempt.status.charAt(0).toUpperCase() + attempt.status.slice(1)}
                            </span>
                            {(attempt.status === 'approved' || attempt.status === 'denied') && (
                              <div className="mt-1 text-xs text-muted-foreground">
                                {attempt.statusChangeTime ? formatJoinDate(attempt.statusChangeTime) : formatJoinDate(attempt.submittedAt)}
                              </div>
                            )}
                            {attempt.status === 'denied' && attempt.notificationSent && (
                              <p className="mt-2 text-sm text-muted-foreground">
                                User has been notified to resubmit their verification photo
                              </p>
                            )}
                          </div>

                          {index === 0 && attempt.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => handleVerificationAction('deny')}
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="mr-1 h-4 w-4" />
                                Deny
                              </Button>
                              <Button 
                                onClick={() => handleVerificationAction('approve')}
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <Check className="mr-1 h-4 w-4" />
                                Approve
                              </Button>
                            </div>
                          )}
                          {index === 0 && attempt.status === 'denied' && (
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => handleVerificationAction('approve')}
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <Check className="mr-1 h-4 w-4" />
                                Approve Now
                              </Button>
                            </div>
                          )}
                          {index === 0 && attempt.status === 'approved' && (
                            <Button 
                              onClick={() => handleVerificationAction('remove')}
                              variant="outline"
                              size="sm"
                              className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                            >
                              <ShieldOff className="mr-1 h-4 w-4" />
                              Remove Verification
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                        <p className="text-2xl font-bold">£{user.wallet.lifetimeEarnings.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Ready for Payout</p>
                        <p className="text-xl font-bold text-green-600">£{user.wallet.availableBalance.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">In Transit to Bank</p>
                        <p className="text-lg font-semibold">£{user.wallet.inTransit.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Last Withdrawal</p>
                        <p>{new Date(user.wallet.lastWithdrawal).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Payout History</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setIsPayoutHistoryOpen(true)}>
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.wallet.payoutHistory.slice(0, 3).map((payout, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium">£{payout.amount.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">Ryft Pay</p>
                          </div>
                          <p>{new Date(payout.date).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1 md:col-span-3">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Payments Breakdown</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setIsEarningsBreakdownOpen(true)}>
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {earningsBreakdown.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <div className="flex items-center gap-2">
                              <Link 
                                to={`/linkups/${item.linkupId}`} 
                                className="font-medium hover:underline"
                              >
                                {item.description}
                              </Link>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {formatJoinDate(item.timestamp)}
                            </p>
                          </div>
                          <p className="font-medium text-green-600">+£{item.amount.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1 md:col-span-3">
                  <CardHeader>
                    <CardTitle>Linkup Plus Subscription</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-linkup-purple/10 text-linkup-purple border-linkup-purple/20">
                            <Crown className="h-3 w-3 mr-1" /> Active
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            Since {new Date(user.wallet.linkupPlus.startDate || new Date()).toLocaleDateString()}
                          </p>
                        </div>
                        <p>User is currently subscribed to Linkup Plus and receives all premium features.</p>
                      </div>
                      <Button variant="outline" onClick={() => setIsLinkupPlusHistoryOpen(true)}>
                        View Payment History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="linkups" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Linkups</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserLinkupsTable />
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UserLinkupActivity />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Chats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UserLinkupChats />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-4">Advanced</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Hide my age on my profile</Label>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="cursor-not-allowed">
                              <Switch checked={user.privacySettings.hideAge} disabled />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-fit px-4 py-2 flex items-center" side="left">
                            Setting is {user.privacySettings.hideAge ? 'enabled' : 'disabled'}
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Don't allow male friend requests</Label>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="cursor-not-allowed">
                              <Switch checked={!user.privacySettings.allowMaleFriendRequests} disabled />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-fit px-4 py-2 flex items-center" side="left">
                            Setting is {!user.privacySettings.allowMaleFriendRequests ? 'enabled' : 'disabled'}
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Don't allow female friend requests</Label>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="cursor-not-allowed">
                              <Switch checked={!user.privacySettings.allowFemaleFriendRequests} disabled />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-fit px-4 py-2 flex items-center" side="left">
                            Setting is {!user.privacySettings.allowFemaleFriendRequests ? 'enabled' : 'disabled'}
                          </HoverCardContent>
                        </HoverCard>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Socials visible to friends only</Label>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="cursor-not-allowed">
                              <Switch checked={user.privacySettings.socialsVisibleToFriendsOnly} disabled />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-fit px-4 py-2 flex items-center" side="left">
                            Setting is {user.privacySettings.socialsVisibleToFriendsOnly ? 'enabled' : 'disabled'}
                          </HoverCardContent>
                        </HoverCard>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Allow friends to see which linkups I'm attending</Label>
                          <p className="text-sm text-muted-foreground">
                            Friends can see which upcoming linkups I'm attending
                          </p>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="cursor-not-allowed">
                              <Switch checked={user.privacySettings.friendsCanSeeUpcomingAttendance} disabled />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-fit px-4 py-2 flex items-center" side="left">
                            Setting is {user.privacySettings.friendsCanSeeUpcomingAttendance ? 'enabled' : 'disabled'}
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-4">Show my location on...</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">The map</Label>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="cursor-not-allowed">
                              <Switch checked={user.privacySettings.showLocationOnMap} disabled />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-fit px-4 py-2 flex items-center" side="left">
                            Setting is {user.privacySettings.showLocationOnMap ? 'enabled' : 'disabled'}
                          </HoverCardContent>
                        </HoverCard>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Nearby people</Label>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="cursor-not-allowed">
                              <Switch checked={user.privacySettings.appearOnNearbyPeople} disabled />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-fit px-4 py-2 flex items-center" side="left">
                            Setting is {user.privacySettings.appearOnNearbyPeople ? 'enabled' : 'disabled'}
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-4">Show linkups on my profile to...</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">All users</Label>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="cursor-not-allowed">
                              <Switch checked={user.privacySettings.showLinkupsToEveryone} disabled />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-fit px-4 py-2 flex items-center" side="left">
                            Setting is {user.privacySettings.showLinkupsToEveryone ? 'enabled' : 'disabled'}
                          </HoverCardContent>
                        </HoverCard>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Friends only</Label>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="cursor-not-allowed">
                              <Switch checked={user.privacySettings.showLinkupsToFriendsOnly} disabled />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-fit px-4 py-2 flex items-center" side="left">
                            Setting is {user.privacySettings.showLinkupsToFriendsOnly ? 'enabled' : 'disabled'}
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Reports Received</CardTitle>
                      <CardDescription>Reports submitted by other users</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsAllReportsReceivedOpen(true)}>
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.reportsReceived.slice(0, 3).map((report) => (
                        <div key={report.id} className="flex items-start justify-between py-2 border-b last:border-0">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={report.reporterAvatar} />
                              <AvatarFallback>{report.reporterName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <Link 
                                  to={`/users/${report.reporterId}`} 
                                  className="font-medium hover:underline"
                                >
                                  {report.reporterName}
                                </Link>
                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                                  report.isRead 
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {report.isRead ? "Read" : "Unread"}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">@{report.reporterUsername}</p>
                              <p className="mt-1">{report.description}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {new Date(report.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          {!report.isRead && (
                            <button 
                              className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                              onClick={() => handleMarkAsRead(report.id)}
                            >
                              Mark as Read
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Reports Made</CardTitle>
                      <CardDescription>Reports you've submitted about other users</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsAllReportsMadeOpen(true)}>
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.reportsMade.slice(0, 3).map((report) => (
                        <div key={report.id} className="flex items-start justify-between py-2 border-b last:border-0">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={report.reportedUserAvatar} />
                              <AvatarFallback>{report.reportedUserName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Link 
                                to={`/users/${report.reportedUserId}`} 
                                className="font-medium hover:underline"
                              >
                                {report.reportedUserName}
                              </Link>
                              <p className="text-sm text-muted-foreground">@{report.reportedUserUsername}</p>
                              <p className="mt-1">{report.description}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {new Date(report.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <AllReportsDialog
                open={isAllReportsReceivedOpen}
                onOpenChange={setIsAllReportsReceivedOpen}
                reports={user.reportsReceived}
                title="Reports Received"
                showMarkAsRead={true}
                onMarkAsRead={handleMarkAsRead}
              />

              <AllReportsDialog
                open={isAllReportsMadeOpen}
                onOpenChange={setIsAllReportsMadeOpen}
                reports={user.reportsMade}
                title="Reports Made"
              />
            </TabsContent>

            <TabsContent value="friends" className="space-y-6">
              <UserFriendsList 
                friends={user.friends}
                receivedRequests={user.pendingFriendRequests.received}
                sentRequests={user.pendingFriendRequests.sent}
              />
            </TabsContent>

            <TabsContent value="photos" className="space-y-6">
              <ProfilePhotos photos={userPhotos} />
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <UserActivity 
                chatActivity={userChatActivity}
                linkupActivity={userLinkupActivity}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <PayoutHistoryDialog 
        open={isPayoutHistoryOpen} 
        onOpenChange={setIsPayoutHistoryOpen}
        payoutHistory={user.wallet.payoutHistory}
      />
      
      <EarningsBreakdownDialog 
        open={isEarningsBreakdownOpen} 
        onOpenChange={setIsEarningsBreakdownOpen}
        earnings={earningsBreakdown}
        attendancePayments={attendedLinkupPayments}
      />
      
      <LinkupPlusHistoryDialog 
        open={isLinkupPlusHistoryOpen} 
        onOpenChange={setIsLinkupPlusHistoryOpen}
        startDate={user.wallet.linkupPlus.startDate ?? "2023-12-15"}
        plan="annual"
        transactions={linkupPlusTransactions}
      />
      
      <DeleteUserDialog 
        isOpen={isDeleteDialogOpen} 
        onClose={() => setIsDeleteDialogOpen(false)} 
        userId={user.id} 
        username={user.username}
        userAvatar={user.avatar}
        userName={`${user.firstName} ${user.lastName}`}
      />
    </div>
  );
};

export default UserProfile;
