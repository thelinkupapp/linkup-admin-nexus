
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Globe,
  AlertTriangle,
  MessageSquare,
  Image,
  Trash2,
  ExternalLink,
  Tag,
  Eye,
  EyeOff,
  DollarSign,
  User,
  CalendarClock,
  Timer,
  Map,
  Video,
  File,
  Pin,
  WandSparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LinkupImage } from "@/components/linkups/LinkupImage";
import { LinkupMap } from "@/components/linkups/LinkupMap";
import { LinkupAttendeeList } from "@/components/linkups/LinkupAttendeeList";
import { LinkupMediaGallery } from "@/components/linkups/LinkupMediaGallery";
import { LinkupChatView } from "@/components/linkups/LinkupChatView";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatLinkupDateTime } from "@/utils/dateFormatting";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface MessageMedia {
  url: string;
  type: string;
  thumbnail?: string;
}

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
  totalEarnings: 0,
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
      type: "text",
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
      type: "text",
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
      type: "image",
      user: {
        id: "ch1",
        name: "Michael Chen",
        username: "mike_chen",
        avatar: "https://i.pravatar.cc/150?img=2"
      },
      message: "Here's the volleyball court we'll be using",
      media: {
        url: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
        type: "image",
        thumbnail: undefined
      },
      timestamp: "2024-05-10T16:00:00Z"
    },
    {
      id: "m4",
      type: "text",
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
      url: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2007&q=80",
      timestamp: "2024-05-10T16:00:00Z",
      user: {
        id: "ch1",
        name: "Michael Chen",
        username: "mike_chen",
        avatar: "https://i.pravatar.cc/150?img=2"
      }
    },
    {
      id: "img2",
      type: "image",
      url: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      timestamp: "2024-05-11T12:30:00Z",
      user: {
        id: "a2",
        name: "Sophia Rodriguez",
        username: "sophia_r",
        avatar: "https://i.pravatar.cc/150?img=3"
      }
    },
    {
      id: "vid1",
      type: "video",
      url: "https://www.example.com/sample-video.mp4",
      timestamp: "2024-05-12T10:15:00Z",
      thumbnail: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3",
      user: {
        id: "a1",
        name: "James Wilson",
        username: "james_w",
        avatar: "https://i.pravatar.cc/150?img=4"
      }
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
    url: "/lovable-uploads/0ad4a69e-85bc-4de8-a0a6-91a7dab929b2.png",
    source: "ai-generated" as const
  }
};

const categoryEmojis: Record<string, string> = {
  Sports: "🏐",
  Music: "🎵",
  Food: "🍔",
  Art: "🎨",
  Tech: "💻",
  Outdoors: "🌳",
  Fitness: "💪",
  Reading: "📚",
  Travel: "✈️",
  Gaming: "🎮",
};

const statusStyles: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  upcoming: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300",
  },
  happening: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300",
  },
  happened: {
    bg: "bg-gray-200",
    text: "text-gray-800",
    border: "border-gray-300",
  },
  cancelled: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300",
  },
};

const LinkupDetails = () => {
  const { linkupId } = useParams();
  const [activeTab, setActiveTab] = useState("details");

  const now = new Date();
  const startDate = new Date(linkup.startDate);
  const endDate = new Date(linkup.endDate);

  let status: "upcoming" | "happening" | "happened" | "cancelled" = "upcoming";
  if (linkup.status === "cancelled") {
    status = "cancelled";
  } else if (now < startDate) {
    status = "upcoming";
  } else if (now >= startDate && now <= endDate) {
    status = "happening";
  } else if (now > endDate) {
    status = "happened";
  }

  // Define isHappening based on the status value
  const isHappening = status === "happening";

  const statusStyle = statusStyles[status];

  const timeLeftMs = endDate.getTime() - now.getTime();
  const hoursLeft = Math.floor(timeLeftMs / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
  
  const timeLeftDisplay = isHappening 
    ? `Ends in ${hoursLeft}h ${minutesLeft}m`
    : linkup.duration;

  const formattedDate = formatLinkupDateTime(linkup.startDate, linkup.endDate);
  
  const capacityPercentage = Math.round((linkup.attendees.length / linkup.capacity) * 100);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Linkup Details" />
        <main className="p-6">
          <div className="mb-6">
            <Button variant="ghost" className="gap-1 text-muted-foreground" asChild>
              <Link to="/linkups/management">
                <ArrowLeft className="h-4 w-4" />
                Back to Linkups
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg p-6 mb-8 border shadow-sm">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="relative rounded-lg overflow-hidden" style={{ width: 180, height: 320, minWidth: 120 }}>
                  <img 
                    src="/lovable-uploads/5380c1eb-3914-42ad-8234-c9d0a4442b4f.png"
                    alt={linkup.title}
                    className="object-cover w-full h-full"
                    style={{ aspectRatio: "9/16" }}
                  />
                  <Badge 
                    variant="secondary"
                    className="absolute top-3 left-3 gap-1.5 bg-black/70 text-white border-none"
                  >
                    <WandSparkles className="h-3.5 w-3.5" />
                    AI-Generated
                  </Badge>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-2">
                <div
                  className={`
                    mb-4 w-fit px-5 py-2 rounded-full border-2 font-bold text-lg uppercase tracking-wide
                    ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}
                  `}
                  style={{ letterSpacing: "0.08em" }}
                  data-testid="linkup-status-pill"
                >
                  {status}
                </div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold flex items-center gap-2">
                    {linkup.title}
                  </h1>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="bg-linkup-soft-purple text-linkup-dark-purple px-2 py-1 rounded text-base font-medium flex items-center gap-2">
                    <span className="text-lg" aria-label="category-emoji">{categoryEmojis[linkup.category] ?? "❓"}</span>
                    {linkup.category}
                  </span>
                </div>
                <p className="mt-4 text-gray-700 text-base">{linkup.description}</p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <File className="h-5 w-5 text-linkup-purple" />
                        Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{linkup.description}</p>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CalendarClock className="h-5 w-5 text-linkup-purple" />
                          Date & Time
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-linkup-soft-purple p-2 rounded-md">
                            <Calendar className="h-5 w-5 text-linkup-purple" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Date</p>
                            <p>{new Date(linkup.startDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="bg-linkup-soft-purple p-2 rounded-md">
                            <Clock className="h-5 w-5 text-linkup-purple" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Time</p>
                            <p>
                              {new Date(linkup.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                              {new Date(linkup.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="bg-linkup-soft-purple p-2 rounded-md">
                            <Timer className="h-5 w-5 text-linkup-purple" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Duration</p>
                            <p>{isHappening ? timeLeftDisplay : linkup.duration}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-linkup-purple" />
                          Location
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-linkup-soft-purple p-2 rounded-md">
                            <Globe className="h-5 w-5 text-linkup-purple" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">General Area</p>
                            <p>{linkup.generalLocation}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="bg-linkup-soft-purple p-2 rounded-md">
                            <MapPin className="h-5 w-5 text-linkup-purple" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Specific Location</p>
                            <p>{linkup.specificLocation}</p>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="gap-1 w-full" onClick={() => setActiveTab("map")}>
                          <Map className="h-3.5 w-3.5" />
                          View on Map
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-linkup-purple" />
                        Host & Co-Hosts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                        <Button variant="outline" size="sm">View Profile</Button>
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
                          <Button variant="outline" size="sm">View Profile</Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-linkup-purple" />
                        Linkup Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Visibility</p>
                          <p className="flex items-center gap-2 mt-1">
                            {linkup.visibility === "Public" ? (
                              <>
                                <Eye className="h-4 w-4 text-linkup-purple" />
                                Public
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-4 w-4 text-linkup-purple" />
                                Private
                              </>
                            )}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Join Method</p>
                          <p className="flex items-center gap-2 mt-1">
                            {linkup.joinMethod}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Gender Restriction</p>
                          <p className="flex items-center gap-2 mt-1">
                            <User className="h-4 w-4 text-linkup-purple" />
                            {linkup.genderRestriction}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Price</p>
                          <p className="flex items-center gap-2 mt-1">
                            <DollarSign className="h-4 w-4 text-linkup-purple" />
                            {linkup.price === 0 ? "Free" : `$${linkup.price}`}
                          </p>
                        </div>
                      </div>
                      
                      {linkup.price > 0 && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                          <p className="flex items-center gap-2 mt-1 text-lg font-semibold text-green-600">
                            <DollarSign className="h-4 w-4" />
                            ${linkup.totalEarnings || (linkup.price * linkup.attendees.length)}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-linkup-purple" />
                        Attendee Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
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
                          style={{ width: `${capacityPercentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-right text-muted-foreground">
                        {capacityPercentage}% full
                      </p>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4"
                        onClick={() => setActiveTab("attendees")}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        View Attendee List
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Pin className="h-5 w-5 text-linkup-purple" />
                        Pinned Message
                      </CardTitle>
                    </CardHeader>
                    {linkup.pinnedMessage ? (
                      <CardContent className="border-l-4 border-linkup-purple pl-4 ml-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={linkup.pinnedMessage.user.avatar} alt={linkup.pinnedMessage.user.name} />
                            <AvatarFallback>{linkup.pinnedMessage.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{linkup.pinnedMessage.user.name}</span>
                        </div>
                        <p className="text-sm">{linkup.pinnedMessage.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(linkup.pinnedMessage.timestamp).toLocaleString()}
                        </p>
                      </CardContent>
                    ) : (
                      <CardContent>
                        <p className="text-sm text-muted-foreground">No pinned message</p>
                      </CardContent>
                    )}
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-linkup-purple" />
                        Reports
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span>Total Reports</span>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                          {linkup.reports.length}
                        </Badge>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setActiveTab("reports")}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        View Reports
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="attendees">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Linkup Attendees</CardTitle>
                    <CardDescription className="mt-1.5">{linkup.attendees.length} people attending</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">Export List</Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {linkup.attendees.map((attendee) => (
                      <div key={attendee.id} className="flex items-center justify-between p-3 border rounded-lg">
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
            
            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle>Linkup Chat</CardTitle>
                  <CardDescription>Read-only view of the chat thread</CardDescription>
                </CardHeader>
                {linkup.pinnedMessage && (
                  <div className="mx-6 mt-2 p-3 bg-linkup-soft-purple rounded-md border border-linkup-purple/30 flex items-start gap-3">
                    <Pin className="h-4 w-4 text-linkup-purple mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">Pinned Message</p>
                      <p className="text-sm">{linkup.pinnedMessage.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={linkup.pinnedMessage.user.avatar} alt={linkup.pinnedMessage.user.name} />
                          <AvatarFallback>{linkup.pinnedMessage.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{linkup.pinnedMessage.user.name}</span>
                      </div>
                    </div>
                  </div>
                )}
                <CardContent className="pt-4">
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
                          
                          {message.type === "text" && <p className="mt-1">{message.message}</p>}
                          
                          {message.type === "image" && message.media && (
                            <div className="mt-2">
                              <p className="mb-2">{message.message}</p>
                              <div className="rounded-md overflow-hidden border w-full max-w-xs">
                                <img 
                                  src={message.media.url} 
                                  alt="Shared media"
                                  className="w-full h-auto" 
                                />
                              </div>
                            </div>
                          )}
                          
                          {message.type === "video" && message.media && (
                            <div className="mt-2">
                              <p className="mb-2">{message.message}</p>
                              <div className="rounded-md overflow-hidden border w-full max-w-xs">
                                <video 
                                  src={message.media.url} 
                                  controls
                                  poster={message.media.thumbnail}
                                  className="w-full h-auto"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Linkup Media</CardTitle>
                  <CardDescription>Images and videos shared for this linkup</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {linkup.media.map((item) => (
                      <div key={item.id} className="relative aspect-square rounded-md overflow-hidden border group">
                        {item.type === "image" ? (
                          <img 
                            src={item.url} 
                            alt="Linkup media" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-full relative">
                            <img 
                              src={item.thumbnail || item.url} 
                              alt="Video thumbnail"
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black/60 rounded-full p-3">
                                <Video className="h-8 w-8 text-white" />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200">
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={item.user?.avatar} alt={item.user?.name} />
                                <AvatarFallback>{item.user?.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-white">{item.user?.name}</span>
                            </div>
                            <p className="text-xs text-white/80 mt-1">
                              {new Date(item.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
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
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                              <p className="text-sm text-muted-foreground">
                                {new Date(report.timestamp).toLocaleString()}
                              </p>
                              {report.resolved ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                  Resolved
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                                  Open
                                </Badge>
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
            
            <TabsContent value="map">
              <Card>
                <CardHeader>
                  <CardTitle>Linkup Location</CardTitle>
                  <CardDescription>
                    {linkup.specificLocation}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-96 w-full rounded-b-lg overflow-hidden">
                    <iframe 
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src={`https://maps.google.com/maps?q=${linkup.coordinates.lat},${linkup.coordinates.lng}&z=15&output=embed`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      window.open(`https://www.google.com/maps/search/?api=1&query=${linkup.coordinates.lat},${linkup.coordinates.lng}`, '_blank');
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Google Maps
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default LinkupDetails;
