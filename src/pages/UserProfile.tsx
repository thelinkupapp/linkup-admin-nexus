
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
  ShieldOff
} from "lucide-react";
import { SocialMediaIcons } from '@/components/profile/SocialMediaIcons';
import { toast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatJoinDate } from "@/utils/dateFormatting";

interface VerificationAttempt {
  selfie: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'denied';
  notificationSent?: boolean;
  statusChangeTime?: string;
}

const user = {
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
      { amount: 75, date: "2023-11-15", status: "Complete", method: "PayPal" },
      { amount: 125, date: "2023-09-28", status: "Complete", method: "Bank Transfer" },
      { amount: 150, date: "2023-08-05", status: "Complete", method: "PayPal" }
    ],
    linkupPlus: {
      startDate: null,
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
  friends: [],
  pendingFriendRequests: {
    received: [],
    sent: []
  },
  hostingLinkups: 2,
  lastKnownLocation: "🇮🇩 Canggu, Indonesia"
};

const UserProfile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(
    user.verificationDetails?.attempts[0]?.status === 'approved'
  );
  const [verificationAttempts, setVerificationAttempts] = useState<VerificationAttempt[]>(
    user.verificationDetails.attempts as VerificationAttempt[]
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

  const [userWithVerification, setUserWithVerification] = useState({
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
        notificationSent: undefined,
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
                  <CardDescription>
                    {!user.verificationDetails.hasSubmitted && "User has not submitted any verification photos yet."}
                    {user.verificationDetails.hasSubmitted && verificationAttempts[0].status === 'pending' && 
                      "This user has applied for verification."}
                    {user.verificationDetails.hasSubmitted && verificationAttempts[0].status === 'approved' && 
                      "This user is verified."}
                    {user.verificationDetails.hasSubmitted && verificationAttempts[0].status === 'denied' && 
                      "This user's verification was denied. They have been notified to resubmit."}
                  </CardDescription>
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
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Lifetime Earnings</p>
                        <p className="text-2xl font-bold">${user.wallet.lifetimeEarnings.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Available Balance</p>
                        <p className="text-2xl font-bold">${user.wallet.availableBalance.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">In-Transit Funds</p>
                        <p className="text-lg font-semibold">${user.wallet.inTransit.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Last Withdrawal</p>
                        <p>{new Date(user.wallet.lastWithdrawal).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Payout History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.wallet.payoutHistory.map((payout, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium">${payout.amount.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">{payout.method}</p>
                          </div>
                          <div className="text-right">
                            <p>{new Date(payout.date).toLocaleDateString()}</p>
                            <Badge variant="outline" className="badge-active">
                              {payout.status}
                            </Badge>
                          </div>
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
                      <div className="flex gap-2">
                        <Button variant="outline">View Payment History</Button>
                        <Button variant="destructive">Cancel Subscription</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="linkups" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Linkup Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-linkup-light-purple flex flex-col items-center justify-center">
                        <p className="text-3xl font-bold text-linkup-purple">{user.linkupStats.hosted}</p>
                        <p className="text-sm text-linkup-dark-purple">Linkups Hosted</p>
                      </div>
                      <div className="p-4 rounded-lg bg-linkup-soft-blue flex flex-col items-center justify-center">
                        <p className="text-3xl font-bold text-blue-500">{user.linkupStats.joined}</p>
                        <p className="text-sm text-blue-700">Linkups Joined</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Activity</CardTitle>
                    <Button variant="outline" size="sm">View All</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-linkup-light-purple flex items-center justify-center text-lg">
                          🏐
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Joined "Sunset Beach Volleyball"</p>
                          <p className="text-sm text-muted-foreground">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-linkup-light-purple flex items-center justify-center text-lg">
                          🎨
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Hosted "Downtown Art Gallery Opening"</p>
                          <p className="text-sm text-muted-foreground">1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-linkup-light-purple flex items-center justify-center text-lg">
                          🧘
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Joined "Rooftop Yoga Session"</p>
                          <p className="text-sm text-muted-foreground">2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Manage how user information is displayed and shared</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="hide-age" className="flex flex-col">
                        <span>Hide age from profile</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Age will not be visible to other users
                        </span>
                      </Label>
                      <Switch
                        id="hide-age"
                        checked={user.privacySettings.hideAge}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="female-requests" className="flex flex-col">
                        <span>Allow female friend requests</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          User can receive friend requests from females
                        </span>
                      </Label>
                      <Switch
                        id="female-requests"
                        checked={user.privacySettings.allowFemaleFriendRequests}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="male-requests" className="flex flex-col">
                        <span>Allow male friend requests</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          User can receive friend requests from males
                        </span>
                      </Label>
                      <Switch
                        id="male-requests"
                        checked={user.privacySettings.allowMaleFriendRequests}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="socials-friends-only" className="flex flex-col">
                        <span>Socials visible to friends only</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Social media links are only visible to friends
                        </span>
                      </Label>
                      <Switch
                        id="socials-friends-only"
                        checked={user.privacySettings.socialsVisibleToFriendsOnly}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="friends-see-attendance" className="flex flex-col">
                        <span>Friends can see upcoming attendance</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Friends can see which linkups user plans to attend
                        </span>
                      </Label>
                      <Switch
                        id="friends-see-attendance"
                        checked={user.privacySettings.friendsCanSeeUpcomingAttendance}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="show-location" className="flex flex-col">
                        <span>Show location on map</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          User's location will be visible on the map
                        </span>
                      </Label>
                      <Switch
                        id="show-location"
                        checked={user.privacySettings.showLocationOnMap}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="appear-nearby" className="flex flex-col">
                        <span>Appear on nearby people</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          User will appear in the nearby people feature
                        </span>
                      </Label>
                      <Switch
                        id="appear-nearby"
                        checked={user.privacySettings.appearOnNearbyPeople}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="linkups-everyone" className="flex flex-col">
                        <span>Show linkups on profile to everyone</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          All users can see linkups on profile
                        </span>
                      </Label>
                      <Switch
                        id="linkups-everyone"
                        checked={user.privacySettings.showLinkupsToEveryone}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="linkups-friends" className="flex flex-col">
                        <span>Show linkups to friends only</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Only friends can see linkups on profile
                        </span>
                      </Label>
                      <Switch
                        id="linkups-friends"
                        checked={user.privacySettings.showLinkupsToFriendsOnly}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Reports</CardTitle>
                  <CardDescription>Reports filed against this user</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No reports filed against this user</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="friends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Friends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <UserIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">User has no friends yet</p>
                  </div>
                </CardContent>
              </Card>
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
    </div>
  );
};

export default UserProfile;
