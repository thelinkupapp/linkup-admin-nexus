import { useParams } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users as UsersIcon,
  Globe,
  AlertTriangle,
  MessageSquare,
  Image,
  Trash2,
  ExternalLink,
  Tag,
  Pin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LinkupImage } from "@/components/linkups/LinkupImage";

const linkup = {
  id: "1",
  title: "Sunset Beach Volleyball",
  emoji: "🏐",
  description: "Join us for a fun beach volleyball session as the sun sets. All skill levels welcome! We'll have extra volleyballs and refreshments.",
  category: "Sports",
  visibility: "Public",
  joinMethod: "Open",
  genderRestriction: "All",
  price: 0,
  capacity: 20,
  isFlexibleDate: false,
  startDate: "2024-05-15T18:00:00Z",
  endDate: "2024-05-15T20:00:00Z",
  duration: "2 hours",
  generalLocation: "Santa Monica",
  specificLocation: "Santa Monica Beach Volleyball Courts, CA",
  coordinates: { lat: 34.008, lng: -118.5 },
  status: "upcoming",
  host: {
    id: "h1",
    name: "Emma Thompson",
    username: "emma_t",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  coHosts: [
    {
      id: "ch1",
      name: "Michael Chen",
      username: "mike_chen",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  ],
  attendees: [
    {
      id: "a1",
      name: "James Wilson",
      username: "james_w",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    {
      id: "a2",
      name: "Sophia Rodriguez",
      username: "sophia_r",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: "a3",
      name: "Olivia Johnson",
      username: "olivia_j",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: "a4",
      name: "Daniel Brown",
      username: "daniel_b",
      avatar: "https://i.pravatar.cc/150?img=13"
    }
  ],
  reports: [
    {
      id: "r1",
      reporter: {
        id: "rp1",
        name: "Anonymous User",
        username: "anonymous"
      },
      reason: "Inappropriate content in description",
      timestamp: "2024-04-28T15:30:00Z",
      resolved: false
    }
  ],
  chat: [
    {
      id: "m1",
      user: {
        id: "h1",
        name: "Emma Thompson",
        username: "emma_t",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      message: "Hey everyone! Looking forward to playing volleyball with you all!",
      timestamp: "2024-05-10T14:30:00Z"
    },
    {
      id: "m2",
      user: {
        id: "a1",
        name: "James Wilson",
        username: "james_w",
        avatar: "https://i.pravatar.cc/150?img=4"
      },
      message: "Can't wait! Should I bring any extra equipment?",
      timestamp: "2024-05-10T15:45:00Z"
    },
    {
      id: "m3",
      user: {
        id: "h1",
        name: "Emma Thompson",
        username: "emma_t",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      message: "I'll have volleyballs, but feel free to bring water and sunscreen!",
      timestamp: "2024-05-10T16:20:00Z"
    }
  ],
  media: [
    {
      id: "img1",
      type: "image",
      url: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2007&q=80"
    },
    {
      id: "img2",
      type: "image",
      url: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    }
  ],
  pinnedMessage: {
    id: "pin1",
    user: {
      id: "h1",
      name: "Emma Thompson",
      username: "emma_t",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    message: "Important: Please bring your own water bottles! We're trying to reduce plastic waste.",
    timestamp: "2024-05-10T15:00:00Z"
  },
  officialImage: {
    url: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
    source: "uploaded" as const
  }
};

const LinkupDetails = () => {
  const { linkupId } = useParams();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="Linkup Details" />
        <main className="p-6">
          <div className="mb-6">
            <Button variant="ghost" className="gap-1 text-muted-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Linkups
            </Button>
          </div>

          <div className="bg-white rounded-lg p-6 mb-6 border shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-linkup-light-purple flex items-center justify-center text-3xl">
                  {linkup.emoji}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{linkup.title}</h1>
                  <Badge variant="outline" className="mt-1">
                    {linkup.category}
                  </Badge>
                </div>
              </div>
              
              <div className="ml-auto flex flex-wrap gap-3 items-start">
                <Badge
                  variant="outline"
                  className={cn(
                    linkup.status === "upcoming" && "badge-upcoming",
                    linkup.status === "happened" && "badge-active",
                    linkup.status === "cancelled" && "badge-cancelled"
                  )}
                >
                  {linkup.status.charAt(0).toUpperCase() + linkup.status.slice(1)}
                </Badge>
                {linkup.price === 0 ? (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    Free
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Paid
                  </Badge>
                )}
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                  {linkup.visibility}
                </Badge>
                <Button variant="destructive" size="sm" className="gap-1">
                  <Trash2 className="h-4 w-4" />
                  Remove Linkup
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-0">
                  <LinkupImage 
                    url={linkup.officialImage.url} 
                    source={linkup.officialImage.source}
                    size="small"
                    className="rounded-none"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Linkup Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                      <p>{linkup.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Date & Time</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(linkup.startDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(linkup.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                              {new Date(linkup.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Duration: {linkup.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Location</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span>{linkup.generalLocation}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{linkup.specificLocation}</span>
                          </div>
                          <Button variant="outline" size="sm" className="gap-1 mt-2">
                            <ExternalLink className="h-3.5 w-3.5" />
                            View on Map
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Visibility</h3>
                        <p>{linkup.visibility}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Join Method</h3>
                        <p>{linkup.joinMethod}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Gender Restriction</h3>
                        <p>{linkup.genderRestriction}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Capacity</h3>
                        <p>{linkup.capacity} people</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="people">
                <TabsList>
                  <TabsTrigger value="people">People</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                </TabsList>
                
                <TabsContent value="people" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Host & Co-Hosts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={linkup.host.avatar} alt={linkup.host.name} />
                              <AvatarFallback>{linkup.host.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{linkup.host.name} <Badge variant="secondary">Host</Badge></p>
                              <p className="text-sm text-muted-foreground">@{linkup.host.username}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">View Profile</Button>
                        </div>
                        
                        {linkup.coHosts.map((coHost) => (
                          <div key={coHost.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={coHost.avatar} alt={coHost.name} />
                                <AvatarFallback>{coHost.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{coHost.name} <Badge variant="outline">Co-Host</Badge></p>
                                <p className="text-sm text-muted-foreground">@{coHost.username}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">View Profile</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Attendees</CardTitle>
                        <CardDescription>{linkup.attendees.length} people attending</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">Export List</Button>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {linkup.attendees.map((attendee) => (
                          <div key={attendee.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={attendee.avatar} alt={attendee.name} />
                                <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{attendee.name}</p>
                                <p className="text-sm text-muted-foreground">@{attendee.username}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reports" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Linkup Reports</CardTitle>
                        <CardDescription>
                          {linkup.reports.length} total reports, {linkup.reports.filter(r => r.resolved).length} resolved
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {linkup.reports.length === 0 ? (
                        <div className="text-center py-6">
                          <AlertTriangle className="mx-auto h-8 w-8 text-muted-foreground opacity-50 mb-2" />
                          <p className="text-muted-foreground">No reports for this linkup</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {linkup.reports.map((report) => (
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
                
                <TabsContent value="chat" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Linkup Chat</CardTitle>
                      <CardDescription>Read-only view of the chat thread</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {linkup.chat.map((message) => (
                          <div key={message.id} className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src={message.user.avatar} alt={message.user.name} />
                              <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <p className="font-medium">{message.user.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(message.timestamp).toLocaleString()}
                                </p>
                              </div>
                              <p className="mt-1">{message.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="media" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Linkup Media</CardTitle>
                      <CardDescription>Images and videos shared for this linkup</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {linkup.media.map((item) => (
                          <div key={item.id} className="relative aspect-square rounded-md overflow-hidden border">
                            {item.type === "image" && (
                              <img 
                                src={item.url} 
                                alt="Linkup media" 
                                className="w-full h-full object-cover"
                              />
                            )}
                            {item.type === "video" && (
                              <video 
                                src={item.url}
                                controls
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Host Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={linkup.host.avatar} alt={linkup.host.name} />
                      <AvatarFallback>{linkup.host.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{linkup.host.name}</p>
                      <p className="text-sm text-muted-foreground">@{linkup.host.username}</p>
                    </div>
                  </div>
                  <Button className="w-full">View Host Profile</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Attendee Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-5 w-5 text-muted-foreground" />
                      <span>Total Attendees</span>
                    </div>
                    <span className="font-semibold">{linkup.attendees.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      <span>Capacity</span>
                    </div>
                    <span className="font-semibold">{linkup.capacity}</span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2.5 mb-1">
                    <div 
                      className="bg-linkup-purple h-2.5 rounded-full" 
                      style={{ width: `${(linkup.attendees.length / linkup.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right text-muted-foreground">
                    {Math.round((linkup.attendees.length / linkup.capacity) * 100)}% full
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Host
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Review Reports
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Linkup
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LinkupDetails;
