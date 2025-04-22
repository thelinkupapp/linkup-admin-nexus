
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
  ArrowUpRight,
  Bell
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
  pushNotificationSettings: {
    enableAll: boolean;
    newLinkupMessages: boolean;
    newFriendMessages: boolean;
    friendRequests: boolean;
    linkupActivity: boolean;
    walletActivity: boolean;
    promotions: boolean;
    announcements: boolean;
  };
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
  ],
  pushNotificationSettings: {
    enableAll: true,
    newLinkupMessages: true,
    newFriendMessages: true,
    friendRequests: true,
    linkupActivity: true,
    walletActivity: true,
    promotions: true,
    announcements: true
  }
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
    const updatedReports = userWithVerification.reportsReceived.map(report => 
      report.id === reportId ? { ...report, isRead: true } : report
    );
    
    setUserWithVerification(prev => ({
      ...prev,
      reportsReceived: updatedReports
    }));
    
    toast({
      title: "Report marked as read",
      description: "The report has been marked as read successfully.",
    });
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
              <TabsTrigger value="push-notifications">Push Notifications</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
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
                            <Badge key={index} variant="outline" className="bg-accent/50">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Languages</p>
                        <div className="flex flex-wrap gap-2">
                          {user.languages.map((language, index) => (
                            <Badge key={index} variant="outline" className="bg-accent/50">
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
                    <CardTitle className="text-lg">Social Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.socials.instagram && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Instagram className="h-4 w-4 text-linkup-purple" />
                            <span className="text-sm">Instagram</span>
                          </div>
                          <a href={`https://instagram.com/${user.socials.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" 
                             className="text-sm text-linkup-purple hover:underline flex items-center">
                            {user.socials.instagram}
                            <ArrowUpRight className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      )}
                      
                      {user.socials.twitter && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Twitter className="h-4 w-4 text-linkup-purple" />
                            <span className="text-sm">Twitter</span>
                          </div>
                          <a href={`https://twitter.com/${user.socials.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                             className="text-sm text-linkup-purple hover:underline flex items-center">
                            {user.socials.twitter}
                            <ArrowUpRight className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      )}
                      
                      {user.socials.linkedin && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4 text-linkup-purple" />
                            <span className="text-sm">LinkedIn</span>
                          </div>
                          <a href={`https://linkedin.com/in${user.socials.linkedin}`} target="_blank" rel="noopener noreferrer"
                             className="text-sm text-linkup-purple hover:underline flex items-center">
                            {user.socials.linkedin}
                            <ArrowUpRight className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      )}
                      
                      {user.socials.tiktok && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-linkup-purple">
                              <path d="M16.8504 5.54113C16.8504 5.21947 16.5898 4.95898 16.2681 4.95898H15.1039C14.7823 4.95898 14.5217 5.21947 14.5217 5.54113V7.6777H16.8504V5.54113Z" fill="currentColor"/>
                              <path d="M8.16412 14.0234C7.52204 14.0234 7 14.5455 7 15.1875C7 15.8296 7.52204 16.3516 8.16412 16.3516C8.80621 16.3516 9.32825 15.8296 9.32825 15.1875C9.32825 14.5455 8.80621 14.0234 8.16412 14.0234Z" fill="currentColor"/>
                              <path d="M10.4923 14.0234C9.85025 14.0234 9.32822 14.5455 9.32822 15.1875C9.32822 15.8296 9.85025 16.3516 10.4923 16.3516C11.1344 16.3516 11.6565 15.8296 11.6565 15.1875C11.6565 14.5455 11.1344 14.0234 10.4923 14.0234Z" fill="currentColor"/>
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.8504 9.12406C16.8504 9.12406 16.8504 9.12405 16.8504 9.12406V10.5703C16.8504 10.5703 16.8504 10.5703 16.8504 10.5703C16.8504 10.892 16.5899 11.1525 16.2682 11.1525H14.5217V16.9338C14.5217 16.9338 14.5217 16.9338 14.5217 16.9338C14.5217 17.2555 14.2612 17.516 13.9396 17.516H12.1931V11.7346H10.4466V17.516H8.70001V13.3823C8.27229 13.2351 7.81534 13.1934 7.36329 13.2612C6.24321 13.4245 5.38637 14.3838 5.34499 15.5199C5.30057 16.7365 6.2649 17.7444 7.46847 17.8232C8.2431 17.8726 8.94445 17.5664 9.45037 17.0605C9.45037 17.0605 9.45037 17.516 9.45037 17.516H13.9396C14.2612 17.516 14.5217 17.2555 14.5217 16.9338V11.7346V11.1525H16.2682C16.5899 11.1525 16.8504 10.892 16.8504 10.5703C16.8504 10.5703 16.8504 10.5703 16.8504 10.5703V9.12406C16.8504 9.12405 16.8504 9.12406 16.8504 9.12406C16.8504 9.12406 16.8504 9.12405 16.8504 9.12406C16.8504 9.12406 16.8504 9.12406 16.8504 9.12406L16.8504 9.12406Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">TikTok</span>
                          </div>
                          <a href={`https://tiktok.com/@${user.socials.tiktok.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                             className="text-sm text-linkup-purple hover:underline flex items-center">
                            {user.socials.tiktok}
                            <ArrowUpRight className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="verification" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-linkup-purple" />
                      Verification Status
                    </CardTitle>
                    <CardDescription>
                      Manage the user's verification status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Verification Status:</p>
                          {isVerified ? (
                            <Badge className="bg-green-500 text-white">Verified</Badge>
                          ) : (
                            verificationAttempts[0]?.status === 'pending' ? (
                              <Badge className="bg-yellow-500 text-white">Pending</Badge>
                            ) : (
                              <Badge className="bg-red-500 text-white">Not Verified</Badge>
                            )
                          )}
                        </div>
                        {isVerified && (
                          <Button 
                            variant="destructive"
                            size="sm"
                            onClick={() => handleVerificationAction('remove')}
                          >
                            <ShieldOff className="h-4 w-4 mr-1" />
                            Remove Verification
                          </Button>
                        )}
                      </div>
                      
                      {verificationAttempts.length > 0 && verificationAttempts[0].status === 'pending' && (
                        <div className="space-y-4">
                          <p className="text-sm font-medium">Latest Verification Submission:</p>
                          <div className="relative aspect-w-4 aspect-h-3 rounded-md overflow-hidden border">
                            <img 
                              src={verificationAttempts[0].selfie} 
                              alt="Verification selfie" 
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Submitted {new Date(verificationAttempts[0].submittedAt).toLocaleString()}
                          </p>
                          
                          <div className="flex gap-2 mt-4">
                            <Button 
                              className="flex-1"
                              onClick={() => handleVerificationAction('approve')}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="destructive"
                              className="flex-1"
                              onClick={() => handleVerificationAction('deny')}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Deny
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {verificationAttempts.length > 0 && verificationAttempts[0].status === 'denied' && (
                        <div>
                          <p className="text-sm font-medium mb-2">Previous Attempt:</p>
                          <div className="relative aspect-w-4 aspect-h-3 rounded-md overflow-hidden border opacity-60">
                            <img 
                              src={verificationAttempts[0].selfie} 
                              alt="Denied verification selfie" 
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
                              <Badge className="bg-red-500 text-white">Denied</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Denied {verificationAttempts[0].statusChangeTime ? new Date(verificationAttempts[0].statusChangeTime).toLocaleString() : 'N/A'}
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <p className="text-sm font-medium mb-2">Verification History:</p>
                        {verificationAttempts.length > 0 ? (
                          <div className="space-y-3">
                            {verificationAttempts.map((attempt, index) => (
                              <div key={index} className="flex justify-between items-center p-3 rounded-md bg-accent/50">
                                <div>
                                  <p className="text-sm">Attempt #{verificationAttempts.length - index}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(attempt.submittedAt).toLocaleString()}
                                  </p>
                                </div>
                                <Badge 
                                  className={
                                    attempt.status === 'approved' ? 'bg-green-500 text-white' :
                                    attempt.status === 'pending' ? 'bg-yellow-500 text-white' :
                                    'bg-red-500 text-white'
                                  }
                                >
                                  {attempt.status.charAt(0).toUpperCase() + attempt.status.slice(1)}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No verification attempts yet.</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-linkup-purple" />
                      Verification Guidelines
                    </CardTitle>
                    <CardDescription>
                      Guidelines for approving user verification
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">To approve a user's verification, ensure the following criteria are met:</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <p className="text-sm">Clear, well-lit selfie showing the user's full face</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <p className="text-sm">Photo matches the profile picture and other photos</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <p className="text-sm">No filters, face manipulation, or heavy editing</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <p className="text-sm">Person in photo appears to match the age stated in the profile</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <p className="text-sm">Photo does not contain inappropriate content</p>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-yellow-50 rounded-md border border-yellow-200 mt-4">
                        <p className="text-sm font-medium text-yellow-800 mb-1">Remember:</p>
                        <p className="text-sm text-yellow-700">Verification is an important trust signal for other users. Only approve verifications that clearly show the real person behind the account.</p>
                      </div>
                      
                      <div className="p-3 bg-red-50 rounded-md border border-red-200 mt-2">
                        <p className="text-sm font-medium text-red-800 mb-1">Deny if you see:</p>
                        <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                          <li>Celebrity photos or obvious impersonation</li>
                          <li>AI-generated or heavily filtered images</li>
                          <li>Group photos where the person isn't clearly identifiable</li>
                          <li>Blurry or poor quality images that cannot be verified</li>
                          <li>Inappropriate content</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="wallet" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Wallet Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-accent/50 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground">Lifetime Earnings</p>
                          <p className="text-2xl font-bold">${user.wallet.lifetimeEarnings.toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-accent/50 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground">Available Balance</p>
                          <p className="text-2xl font-bold">${user.wallet.availableBalance.toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-accent/50 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground">In Transit</p>
                          <p className="text-2xl font-bold">${user.wallet.inTransit.toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-accent/50 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground">Last Withdrawal</p>
                          <p className="text-lg font-bold">{new Date(user.wallet.lastWithdrawal).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">Payment History</h3>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setIsPayoutHistoryOpen(true)}
                          >
                            View All
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {user.wallet.payoutHistory.slice(0, 3).map((payout, index) => (
                            <div key={index} className="flex justify-between p-3 bg-accent/30 rounded-md">
                              <div>
                                <p className="text-sm font-medium">${payout.amount.toFixed(2)}</p>
                                <p className="text-xs text-muted-foreground">{new Date(payout.date).toLocaleDateString()}</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                  {payout.status}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1">{payout.method}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Earnings Breakdown</h3>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setIsEarningsBreakdownOpen(true)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <PayoutHistoryDialog 
                        open={isPayoutHistoryOpen} 
                        onOpenChange={setIsPayoutHistoryOpen}
                        payoutHistory={user.wallet.payoutHistory}
                      />
                      
                      <EarningsBreakdownDialog
                        open={isEarningsBreakdownOpen}
                        onOpenChange={setIsEarningsBreakdownOpen}
                        earningsBreakdown={earningsBreakdown}
                        attendedLinkupPayments={attendedLinkupPayments}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      Linkup Plus Subscription
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.isLinkupPlus ? (
                        <>
                          <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                            <Crown className="h-5 w-5 text-yellow-500" />
                            <div>
                              <p className="font-medium">Active Subscription</p>
                              <p className="text-sm text-muted-foreground">This user has an active Linkup Plus subscription</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                              <p className="font-medium">{user.wallet.linkupPlus.startDate ? new Date(user.wallet.linkupPlus.startDate).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Subscription Type</p>
                              <p className="font-medium">Annual ($79.99/year)</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Next Renewal</p>
                              <p className="font-medium">March 15, 2025</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Auto-Renewal</p>
                              <p className="font-medium">Enabled</p>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="font-medium">Transaction History</h3>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setIsLinkupPlusHistoryOpen(true)}
                              >
                                View All
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              {linkupPlusTransactions.slice(0, 3).map((transaction, index) => (
                                <div key={index} className="flex justify-between p-3 bg-accent/30 rounded-md">
                                  <div>
                                    <p className="text-sm font-medium">${transaction.amount.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm">{transaction.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <Button variant="destructive" className="w-full">
                              Cancel Subscription
                            </Button>
                            <p className="text-xs text-muted-foreground text-center mt-2">
                              The user will have access until the end of their current billing period
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 space-y-4">
                          <div className="bg-muted rounded-full p-4">
                            <Crown className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <p className="font-medium">No Linkup Plus Subscription</p>
                          <p className="text-sm text-muted-foreground text-center max-w-xs">
                            This user does not have an active Linkup Plus subscription. They are on the free plan.
                          </p>
                          <Button className="mt-4">
                            Upgrade to Linkup Plus
                          </Button>
                        </div>
                      )}
                      
                      <LinkupPlusHistoryDialog
                        open={isLinkupPlusHistoryOpen}
                        onOpenChange={setIsLinkupPlusHistoryOpen}
                        transactions={linkupPlusTransactions}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="linkups" className="space-y-6">
              <UserLinkupsTable user={user} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-3 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Linkup Activity</CardTitle>
                    <CardDescription>Recent activity in linkups</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserLinkupActivity activity={userLinkupActivity} />
                  </CardContent>
                </Card>
                <Card className="col-span-3 md:col-span-1">
                  <CardHeader>
                    <CardTitle>Chat Activity</CardTitle>
                    <CardDescription>Recent conversations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserLinkupChats chats={userChatActivity} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-linkup-purple" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>
                    Manage the user's privacy preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Profile Privacy</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="hide-age">Hide Age</Label>
                            <p className="text-sm text-muted-foreground">Prevent other users from seeing this user's age</p>
                          </div>
                          <Switch 
                            id="hide-age" 
                            checked={user.privacySettings.hideAge}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                privacySettings: {
                                  ...prev.privacySettings,
                                  hideAge: checked
                                }
                              }));
                            }}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="socials-friends-only">Socials Visible to Friends Only</Label>
                            <p className="text-sm text-muted-foreground">Only show social media profiles to friends</p>
                          </div>
                          <Switch 
                            id="socials-friends-only" 
                            checked={user.privacySettings.socialsVisibleToFriendsOnly}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                privacySettings: {
                                  ...prev.privacySettings,
                                  socialsVisibleToFriendsOnly: checked
                                }
                              }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Friend Requests</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="allow-female-requests">Allow Female Friend Requests</Label>
                            <p className="text-sm text-muted-foreground">Allow friend requests from female users</p>
                          </div>
                          <Switch 
                            id="allow-female-requests" 
                            checked={user.privacySettings.allowFemaleFriendRequests}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                privacySettings: {
                                  ...prev.privacySettings,
                                  allowFemaleFriendRequests: checked
                                }
                              }));
                            }}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="allow-male-requests">Allow Male Friend Requests</Label>
                            <p className="text-sm text-muted-foreground">Allow friend requests from male users</p>
                          </div>
                          <Switch 
                            id="allow-male-requests" 
                            checked={user.privacySettings.allowMaleFriendRequests}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                privacySettings: {
                                  ...prev.privacySettings,
                                  allowMaleFriendRequests: checked
                                }
                              }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Location & Visibility</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="show-location">Show Location on Map</Label>
                            <p className="text-sm text-muted-foreground">Allow user's location to be shown on the map</p>
                          </div>
                          <Switch 
                            id="show-location" 
                            checked={user.privacySettings.showLocationOnMap}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                privacySettings: {
                                  ...prev.privacySettings,
                                  showLocationOnMap: checked
                                }
                              }));
                            }}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="appear-nearby">Appear on Nearby People</Label>
                            <p className="text-sm text-muted-foreground">Show user in the nearby people discovery feature</p>
                          </div>
                          <Switch 
                            id="appear-nearby" 
                            checked={user.privacySettings.appearOnNearbyPeople}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                privacySettings: {
                                  ...prev.privacySettings,
                                  appearOnNearbyPeople: checked
                                }
                              }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Linkup Privacy</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="friends-see-attendance">Friends Can See Upcoming Attendance</Label>
                            <p className="text-sm text-muted-foreground">Let friends see which linkups the user plans to attend</p>
                          </div>
                          <Switch 
                            id="friends-see-attendance" 
                            checked={user.privacySettings.friendsCanSeeUpcomingAttendance}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                privacySettings: {
                                  ...prev.privacySettings,
                                  friendsCanSeeUpcomingAttendance: checked
                                }
                              }));
                            }}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="show-linkups-everyone">Show Linkups to Everyone</Label>
                            <p className="text-sm text-muted-foreground">Make user's created linkups visible to all users</p>
                          </div>
                          <Switch 
                            id="show-linkups-everyone" 
                            checked={user.privacySettings.showLinkupsToEveryone}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                privacySettings: {
                                  ...prev.privacySettings,
                                  showLinkupsToEveryone: checked
                                }
                              }));
                            }}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="show-linkups-friends">Show Linkups to Friends Only</Label>
                            <p className="text-sm text-muted-foreground">Only show user's created linkups to their friends</p>
                          </div>
                          <Switch 
                            id="show-linkups-friends" 
                            checked={user.privacySettings.showLinkupsToFriendsOnly}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                privacySettings: {
                                  ...prev.privacySettings,
                                  showLinkupsToFriendsOnly: checked
                                }
                              }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline">Reset to Default</Button>
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="push-notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-linkup-purple" />
                    Push Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Manage the user's push notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">General Settings</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="enable-all">Enable All Notifications</Label>
                            <p className="text-sm text-muted-foreground">Turn on/off all push notifications</p>
                          </div>
                          <Switch 
                            id="enable-all" 
                            checked={user.pushNotificationSettings.enableAll}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                pushNotificationSettings: {
                                  ...prev.pushNotificationSettings,
                                  enableAll: checked
                                }
                              }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Message Notifications</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="linkup-messages">Linkup Messages</Label>
                            <p className="text-sm text-muted-foreground">Notifications for new messages in linkup chats</p>
                          </div>
                          <Switch 
                            id="linkup-messages" 
                            checked={user.pushNotificationSettings.newLinkupMessages}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                pushNotificationSettings: {
                                  ...prev.pushNotificationSettings,
                                  newLinkupMessages: checked
                                }
                              }));
                            }}
                            disabled={!user.pushNotificationSettings.enableAll}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="friend-messages">Friend Messages</Label>
                            <p className="text-sm text-muted-foreground">Notifications for direct messages from friends</p>
                          </div>
                          <Switch 
                            id="friend-messages" 
                            checked={user.pushNotificationSettings.newFriendMessages}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                pushNotificationSettings: {
                                  ...prev.pushNotificationSettings,
                                  newFriendMessages: checked
                                }
                              }));
                            }}
                            disabled={!user.pushNotificationSettings.enableAll}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Social Notifications</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="friend-requests">Friend Requests</Label>
                            <p className="text-sm text-muted-foreground">Notifications for new friend requests</p>
                          </div>
                          <Switch 
                            id="friend-requests" 
                            checked={user.pushNotificationSettings.friendRequests}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                pushNotificationSettings: {
                                  ...prev.pushNotificationSettings,
                                  friendRequests: checked
                                }
                              }));
                            }}
                            disabled={!user.pushNotificationSettings.enableAll}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="linkup-activity">Linkup Activity</Label>
                            <p className="text-sm text-muted-foreground">Notifications for linkup invites, updates, and reminders</p>
                          </div>
                          <Switch 
                            id="linkup-activity" 
                            checked={user.pushNotificationSettings.linkupActivity}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                pushNotificationSettings: {
                                  ...prev.pushNotificationSettings,
                                  linkupActivity: checked
                                }
                              }));
                            }}
                            disabled={!user.pushNotificationSettings.enableAll}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">System Notifications</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="wallet-activity">Wallet Activity</Label>
                            <p className="text-sm text-muted-foreground">Notifications for payments, earnings, and withdrawals</p>
                          </div>
                          <Switch 
                            id="wallet-activity" 
                            checked={user.pushNotificationSettings.walletActivity}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                pushNotificationSettings: {
                                  ...prev.pushNotificationSettings,
                                  walletActivity: checked
                                }
                              }));
                            }}
                            disabled={!user.pushNotificationSettings.enableAll}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="promotions">Promotions & Offers</Label>
                            <p className="text-sm text-muted-foreground">Marketing notifications for discounts and special offers</p>
                          </div>
                          <Switch 
                            id="promotions" 
                            checked={user.pushNotificationSettings.promotions}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                pushNotificationSettings: {
                                  ...prev.pushNotificationSettings,
                                  promotions: checked
                                }
                              }));
                            }}
                            disabled={!user.pushNotificationSettings.enableAll}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="announcements">Announcements</Label>
                            <p className="text-sm text-muted-foreground">Important app updates and news</p>
                          </div>
                          <Switch 
                            id="announcements" 
                            checked={user.pushNotificationSettings.announcements}
                            onCheckedChange={(checked) => {
                              setUserWithVerification(prev => ({
                                ...prev,
                                pushNotificationSettings: {
                                  ...prev.pushNotificationSettings,
                                  announcements: checked
                                }
                              }));
                            }}
                            disabled={!user.pushNotificationSettings.enableAll}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline">Reset to Default</Button>
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flag className="h-5 w-5 text-linkup-purple" />
                      Reports Received
                    </CardTitle>
                    <CardDescription>
                      Reports submitted against this user
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userWithVerification.reportsReceived.length > 0 ? (
                        <div className="space-y-4">
                          {userWithVerification.reportsReceived.map((report, index) => (
                            <div 
                              key={index} 
                              className={`p-4 rounded-md border ${report.isRead ? 'bg-white' : 'bg-yellow-50 border-yellow-200'}`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={report.reporterAvatar} alt={report.reporterName} />
                                    <AvatarFallback>{report.reporterName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-sm">{report.reporterName}</p>
                                    <p className="text-xs text-muted-foreground">@{report.reporterUsername}</p>
                                  </div>
                                </div>
                                {!report.isRead && (
                                  <Badge className="bg-yellow-500">Unread</Badge>
                                )}
                              </div>
                              <p className="text-sm mb-2">{report.description}</p>
                              <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <p>{new Date(report.timestamp).toLocaleString()}</p>
                                {!report.isRead && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 text-xs"
                                    onClick={() => handleMarkAsRead(report.id)}
                                  >
                                    Mark as Read
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          <div className="text-center mt-4">
                            <Button variant="outline" onClick={() => setIsAllReportsReceivedOpen(true)}>
                              View All Reports
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No reports have been filed against this user.</p>
                        </div>
                      )}
                      
                      <AllReportsDialog 
                        open={isAllReportsReceivedOpen}
                        onOpenChange={setIsAllReportsReceivedOpen}
                        title="Reports Received"
                        reports={userWithVerification.reportsReceived}
                        type="received"
                        onMarkAsRead={handleMarkAsRead}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flag className="h-5 w-5 text-linkup-purple" />
                      Reports Made
                    </CardTitle>
                    <CardDescription>
                      Reports filed by this user
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userWithVerification.reportsMade.length > 0 ? (
                        <div className="space-y-4">
                          {userWithVerification.reportsMade.map((report, index) => (
                            <div 
                              key={index} 
                              className="p-4 rounded-md border bg-white"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={report.reportedUserAvatar} alt={report.reportedUserName} />
                                  <AvatarFallback>{report.reportedUserName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{report.reportedUserName}</p>
                                  <p className="text-xs text-muted-foreground">@{report.reportedUserUsername}</p>
                                </div>
                              </div>
                              <p className="text-sm mb-2">{report.description}</p>
                              <p className="text-xs text-muted-foreground">{new Date(report.timestamp).toLocaleString()}</p>
                            </div>
                          ))}
                          
                          <div className="text-center mt-4">
                            <Button variant="outline" onClick={() => setIsAllReportsMadeOpen(true)}>
                              View All Reports
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">This user hasn't filed any reports.</p>
                        </div>
                      )}
                      
                      <AllReportsDialog 
                        open={isAllReportsMadeOpen}
                        onOpenChange={setIsAllReportsMadeOpen}
                        title="Reports Made"
                        reports={userWithVerification.reportsMade}
                        type="made"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Account Actions
                    </CardTitle>
                    <CardDescription>
                      Take actions based on user behavior and reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-md">
                          <h3 className="font-medium mb-2">Issue Warning</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Send a formal warning to the user about policy violations
                          </p>
                          <Button variant="outline" className="w-full">Issue Warning</Button>
                        </div>
                        
                        <div className="p-4 border rounded-md">
                          <h3 className="font-medium mb-2">Temporarily Suspend</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Temporarily suspend the user's account for 7 days
                          </p>
                          <Button variant="outline" className="w-full">Suspend Account</Button>
                        </div>
                        
                        <div className="p-4 border rounded-md bg-red-50">
                          <h3 className="font-medium mb-2 text-red-700">Permanently Ban</h3>
                          <p className="text-sm text-red-600 mb-4">
                            Permanently ban this user from using the platform
                          </p>
                          <Button 
                            variant="destructive" 
                            className="w-full"
                            onClick={() => setIsDeleteDialogOpen(true)}
                          >
                            Ban User
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-700" />
                          <span className="text-yellow-700">Important Note</span>
                        </h3>
                        <p className="text-sm text-yellow-700">
                          Account actions should be taken only after careful review of reports and user behavior. 
                          Make sure to follow the company guidelines when taking actions against users.
                        </p>
                      </div>
                    </div>
                    
                    <DeleteUserDialog
                      open={isDeleteDialogOpen}
                      onOpenChange={setIsDeleteDialogOpen}
                      userId={userWithVerification.id}
                      username={userWithVerification.username}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="friends" className="space-y-6">
              <UserFriendsList
                friends={user.friends}
                pendingReceived={user.pendingFriendRequests.received}
                pendingSent={user.pendingFriendRequests.sent}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;

