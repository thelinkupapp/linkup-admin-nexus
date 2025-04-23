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
import { EnlargeableImage } from "@/components/linkups/EnlargeableImage";
import RemoveLinkupDialog from "@/components/dashboard/RemoveLinkupDialog";
import { useToast } from "@/components/ui/use-toast";

const linkup = {
  id: "1",
  title: "Sunset Beach Volleyball",
  emoji: "🏐",
  description: "Join us for a fun beach volleyball session as the sun sets. All skill levels welcome! We'll have extra volleyballs and refreshments.",
  category: "Sports",
  visibility: "Public",
  joinMethod: "Open",
  genderRestriction: "All",
  price: 25,
  totalEarnings: 125,
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
    url: "/lovable-uploads/c0487dbf-7b28-4238-92ac-8129cd4992c7.png",
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

const statusConfig = {
  upcoming: {
    bg: "bg-[#ede9fe]",
    text: "text-[#7c3aed]",
    border: "border-[#cfc3ed]",
    icon: "⏰",
    label: "UPCOMING"
  }
};

const genderJoinOptions: Record<string, { label: string; emoji: string }> = {
  "All": { label: "Anyone", emoji: "💖" },
  "Male": { label: "Only guys", emoji: "💁‍♂️" },
  "Female": { label: "Only girls", emoji: "💁‍♀️" },
};

const LinkupDetails = () => {
  const { linkupId } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const { toast } = useToast();

  const status = "upcoming";
  const statusStyle = statusConfig[status];

  const showEarnings = !!linkup.price && linkup.price > 0;
  const earnings = linkup.totalEarnings || (linkup.price * linkup.attendees.length);

  const capacityPercentage = Math.round((linkup.attendees.length / linkup.capacity) * 100);

  const linkupImgSrc = "/lovable-uploads/c0487dbf-7b28-4238-92ac-8129cd4992c7.png";

  const handleRemove = () => {
    setRemoveDialogOpen(false);
    toast({
      title: "Linkup removed",
      description: `The linkup "${linkup.title}" has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Linkup Details" />
        <main className="p-6">
          <div className="mb-6 flex flex-row items-center justify-between">
            <Button variant="ghost" className="gap-1 text-muted-foreground" asChild>
              <Link to="/linkups/management">
                <ArrowLeft className="h-4 w-4" />
                Back to Linkups
              </Link>
            </Button>
            <Button
              variant="destructive"
              className="gap-1 px-5 py-2 font-semibold rounded-lg bg-[#ea384c] text-white hover:bg-[#cb2d3e] transition-colors"
              onClick={() => setRemoveDialogOpen(true)}
            >
              Remove linkup
            </Button>
          </div>
          <RemoveLinkupDialog
            open={removeDialogOpen}
            linkupTitle={linkup.title}
            onConfirm={handleRemove}
            onCancel={() => setRemoveDialogOpen(false)}
          />
          <div
            className="bg-white rounded-2xl px-6 py-6 mb-8 border shadow-sm flex flex-col md:flex-row md:items-center gap-6 md:gap-8 items-center"
            style={{ borderColor: "#f0ecfc", minHeight: 0, paddingBottom: 32 }}
          >
            <div className="w-full max-w-[380px] md:max-w-[380px] flex-shrink-0">
              <EnlargeableImage
                src={linkupImgSrc}
                alt="Linkup"
                showAiLabel
                className="aspect-[4/5] h-[420px] rounded-2xl hover:shadow-xl hover:scale-[1.015] transition-all group"
                imageClassName="bg-gray-100 object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col items-start gap-1 md:gap-3 max-w-2xl pt-1">
              <div
                className={`
                  mb-2 md:mb-3 inline-flex items-center gap-2 px-7 py-2 rounded-full border-2 text-lg font-bold uppercase tracking-wide
                  ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}
                  shadow-sm transition-all
                `}
                style={{
                  borderWidth: 2,
                  minHeight: 42,
                  fontSize: 20,
                  letterSpacing: "0.07em"
                }}
                data-testid="linkup-status-pill"
              >
                <span className="text-xl">{statusStyle.icon}</span>
                <span>{statusStyle.label}</span>
              </div>
              <span className="flex items-center gap-2 text-linkup-purple font-medium text-base md:text-lg pb-0">
                <span className="text-xl md:text-2xl">{categoryEmojis[linkup.category] || "❓"}</span>
                {linkup.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-black leading-tight py-2">{linkup.title}</h1>
              <p className="text-base md:text-lg text-gray-700 mt-0.5 mb-1.5">
                {linkup.description}
              </p>
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
                            <p>{ linkup.duration}</p>
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
                          <p className="text-sm font-medium text-muted-foreground">Join Price</p>
                          <p className="flex items-center gap-2 mt-1 font-semibold">
                            <DollarSign className="h-4 w-4 text-linkup-purple" />
                            {linkup.price}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                          <p className="flex items-center gap-2 mt-1 font-semibold">
                            <DollarSign className="h-4 w-4 text-linkup-purple" />
                            {earnings}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Who can join</p>
                          <p className="flex items-center gap-2 mt-1">
                            <span className="text-lg">
                              {genderJoinOptions[linkup.genderRestriction]?.emoji || "💖"}
                            </span>
                            {genderJoinOptions[linkup.genderRestriction]?.label || "Anyone"}
                          </p>
                        </div>
                      </div>
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
                              src={item.thumbnail || ""} 
                              alt="Video thumbnail" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Video className="h-12 w-12 text-white" />
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={item.user.avatar} alt={item.user.name} />
                              <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-white">{item.user.name}</span>
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
                <CardHeader>
                  <CardTitle>Linkup Reports</CardTitle>
                  <CardDescription>{linkup.reports.length} reports for this linkup</CardDescription>
                </CardHeader>
                <CardContent>
                  {linkup.reports.length > 0 ? (
                    <div className="space-y-4">
                      {linkup.reports.map((report) => (
                        <div key={report.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">Report from {report.reporter.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(report.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                report.resolved
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-amber-100 text-amber-800 border-amber-200"
                              }
                            >
                              {report.resolved ? "Resolved" : "Pending"}
                            </Badge>
                          </div>
                          <div className="mt-3 p-3 bg-muted rounded-md">
                            <p>{report.reason}</p>
                          </div>
                          <div className="mt-4 flex items-center justify-end gap-2">
                            <Button variant="outline" size="sm">Dismiss</Button>
                            <Button variant="destructive" size="sm">Take Action</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertTriangle className="h-12 w-12 text-muted-foreground opacity-30 mx-auto mb-3" />
                      <p className="text-muted-foreground">No reports for this linkup</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="map">
              <Card>
                <CardHeader>
                  <CardTitle>Linkup Location</CardTitle>
                  <CardDescription>{linkup.specificLocation}</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] overflow-hidden rounded-md">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-muted-foreground">Map goes here (using coordinates {linkup.coordinates.lat}, {linkup.coordinates.lng})</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default LinkupDetails;
