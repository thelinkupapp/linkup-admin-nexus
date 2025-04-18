import { useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileHeader } from "@/components/dashboard/UserProfileHeader";

const user = {
  id: "1",
  avatar: "https://i.pravatar.cc/300?img=1",
  name: "Emma Thompson",
  username: "emma_t",
  email: "emma@example.com",
  phone: "+1 (555) 123-4567",
  dob: "1996-05-15",
  age: 28,
  gender: "Female",
  nationality: "United States",
  joinDate: "2023-03-15",
  location: "Los Angeles, CA",
  isLinkupPlus: true,
  isVerified: true,
  verificationDetails: {
    selfie: "https://i.pravatar.cc/300?img=1",
    verificationPhoto: "https://i.pravatar.cc/300?img=1",
    submittedAt: "2023-04-10T14:30:00Z"
  },
  occupation: "UX Designer",
  bio: "Travel enthusiast and coffee addict. Always looking for new adventures and connections.",
  socials: {
    instagram: "@emma_designs",
    twitter: "@emmathompson",
    linkedin: "emmathompson",
    tiktok: "@emma_t"
  },
  interests: ["Travel", "Photography", "Hiking", "Coffee", "Art", "Music"],
  languages: ["English", "Spanish"],
  wallet: {
    lifetimeEarnings: 450,
    availableBalance: 120,
    inTransit: 75,
    lastWithdrawal: "2023-12-15",
    payoutHistory: [
      { amount: 100, date: "2023-12-15", status: "Complete", method: "PayPal" },
      { amount: 150, date: "2023-10-28", status: "Complete", method: "Bank Transfer" },
      { amount: 200, date: "2023-09-05", status: "Complete", method: "PayPal" }
    ],
    linkupPlus: {
      startDate: "2023-05-20",
      cancelDate: null
    }
  },
  linkupStats: {
    hosted: 15,
    joined: 28
  },
  privacySettings: {
    hideAge: false,
    allowFemaleFriendRequests: true,
    allowMaleFriendRequests: true,
    socialsVisibleToFriendsOnly: true,
    friendsCanSeeUpcomingAttendance: true,
    showLocationOnMap: true,
    appearOnNearbyPeople: true,
    showLinkupsToEveryone: false,
    showLinkupsToFriendsOnly: true
  },
  reports: [
    {
      id: "r1",
      reporter: {
        name: "John Smith",
        username: "johnsmith"
      },
      reason: "Inappropriate behavior",
      timestamp: "2023-11-10T09:15:00Z",
      resolved: true
    },
    {
      id: "r2",
      reporter: {
        name: "Alice Brown",
        username: "alice_b"
      },
      reason: "Misleading profile information",
      timestamp: "2024-01-22T16:45:00Z",
      resolved: false
    }
  ],
  friends: [
    {
      id: "f1",
      name: "James Wilson",
      username: "james_w",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    {
      id: "f2",
      name: "Sophia Rodriguez",
      username: "sophia_r",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: "f3",
      name: "Michael Chen",
      username: "mike_chen",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  ],
  pendingFriendRequests: {
    received: [
      {
        id: "fr1",
        name: "Olivia Johnson",
        username: "olivia_j",
        avatar: "https://i.pravatar.cc/150?img=5"
      }
    ],
    sent: [
      {
        id: "fs1",
        name: "Daniel Brown",
        username: "daniel_b",
        avatar: "https://i.pravatar.cc/150?img=13"
      }
    ]
  }
};

const UserProfile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("profile-details");
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="User Profile" />
        <main className="p-6">
          <UserProfileHeader user={user} />

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="profile-details">Profile Details</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="wallet">Wallet & Billing</TabsTrigger>
              <TabsTrigger value="linkups">Linkups</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Settings</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile-details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Occupation</p>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <p>{user.occupation}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Bio</p>
                        <p>{user.bio}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Languages</p>
                        <div className="flex flex-wrap gap-2">
                          {user.languages.map((language) => (
                            <Badge key={language} variant="secondary">{language}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Interests</p>
                        <div className="flex flex-wrap gap-2">
                          {user.interests.map((interest) => (
                            <Badge key={interest} variant="outline">{interest}</Badge>
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
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-pink-500" />
                        <p>{user.socials.instagram}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Twitter className="h-5 w-5 text-blue-400" />
                        <p>{user.socials.twitter}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-5 w-5 text-blue-600" />
                        <p>{user.socials.linkedin}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-black"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                        <p>{user.socials.tiktok}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="verification" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                  <CardDescription>
                    {user.isVerified
                      ? "This user is verified."
                      : "This user has applied for verification."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-3">Verification Photos</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm mb-2">Selfie</p>
                          <img
                            src={user.verificationDetails.selfie}
                            alt="Verification Selfie"
                            className="w-full h-auto max-h-80 object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <p className="text-sm mb-2">Verification Photo</p>
                          <img
                            src={user.verificationDetails.verificationPhoto}
                            alt="Verification Photo"
                            className="w-full h-auto max-h-80 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Submitted</p>
                      <p>{new Date(user.verificationDetails.submittedAt).toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-3">Status</p>
                      {user.isVerified ? (
                        <Badge className="badge-verified">
                          <CheckCircle className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      ) : (
                        <Badge className="badge-pending">
                          Pending Review
                        </Badge>
                      )}
                    </div>

                    {!user.isVerified && (
                      <div className="flex gap-2">
                        <Button variant="outline" className="gap-1">
                          <X className="h-4 w-4" /> Deny
                        </Button>
                        <Button className="gap-1">
                          <Check className="h-4 w-4" /> Approve
                        </Button>
                      </div>
                    )}
                  </div>
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
                            Since {new Date(user.wallet.linkupPlus.startDate).toLocaleDateString()}
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
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>User Reports</CardTitle>
                    <CardDescription>
                      {user.reports.length} total reports, {user.reports.filter(r => r.resolved).length} resolved
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">Export Reports</Button>
                </CardHeader>
                <CardContent>
                  {user.reports.length === 0 ? (
                    <div className="text-center py-6">
                      <Flag className="mx-auto h-8 w-8 text-muted-foreground opacity-50 mb-2" />
                      <p className="text-muted-foreground">No reports against this user</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.reports.map((report) => (
                        <div key={report.id} className="p-4 border rounded-lg">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <p className="font-medium">Reported by @{report.reporter.username}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-muted-foreground">
                                {new Date(report.timestamp).toLocaleString()}
                              </p>
                              {report.resolved ? (
                                <Badge variant="outline" className="badge-active">Resolved</Badge>
                              ) : (
                                <Badge variant="outline" className="badge-pending">Open</Badge>
                              )}
                            </div>
                          </div>
                          <p className="mb-3">{report.reason}</p>
                          {!report.resolved && (
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">Dismiss</Button>
                              <Button size="sm">Mark Resolved</Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="friends" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Friends</CardTitle>
                    <CardDescription>{user.friends.length} total friends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.friends.map((friend) => (
                        <div key={friend.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={friend.avatar} alt={friend.name} />
                              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{friend.name}</p>
                              <p className="text-sm text-muted-foreground">@{friend.username}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">View Profile</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Friend Requests</CardTitle>
                      <CardDescription>Requests waiting for approval</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {user.pendingFriendRequests.received.length === 0 ? (
                        <p className="text-muted-foreground">No pending friend requests</p>
                      ) : (
                        <div className="space-y-4">
                          {user.pendingFriendRequests.received.map((request) => (
                            <div key={request.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={request.avatar} alt={request.name} />
                                  <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{request.name}</p>
                                  <p className="text-sm text-muted-foreground">@{request.username}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Deny</Button>
                                <Button size="sm">Accept</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Sent Friend Requests</CardTitle>
                      <CardDescription>Requests sent by this user</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {user.pendingFriendRequests.sent.length === 0 ? (
                        <p className="text-muted-foreground">No sent friend requests</p>
                      ) : (
                        <div className="space-y-4">
                          {user.pendingFriendRequests.sent.map((request) => (
                            <div key={request.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={request.avatar} alt={request.name} />
                                  <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{request.name}</p>
                                  <p className="text-sm text-muted-foreground">@{request.username}</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">Cancel</Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
