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
import { LinkupChatView, ChatMessage } from "@/components/linkups/LinkupChatView";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

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
  createdAt: "2024-04-10T09:30:00Z",
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
    avatar: "https://i.pravatar.cc/150?img=1",
    joinedAt: "2024-04-15T10:00:00Z",
    role: "host" as const
  },
  coHosts: [
    {
      id: "ch1",
      name: "Michael Chen",
      username: "mike_chen",
      avatar: "https://i.pravatar.cc/150?img=2",
      joinedAt: "2024-04-15T10:30:00Z",
      role: "co-host" as const
    }
  ],
  attendees: [
    {
      id: "a1",
      name: "James Wilson",
      username: "james_w",
      avatar: "https://i.pravatar.cc/150?img=4",
      joinedAt: "2024-04-16T14:30:00Z"
    },
    {
      id: "a2",
      name: "Sophia Rodriguez",
      username: "sophia_r",
      avatar: "https://i.pravatar.cc/150?img=3",
      joinedAt: "2024-04-16T15:45:00Z"
    },
    {
      id: "a3",
      name: "Olivia Johnson",
      username: "olivia_j",
      avatar: "https://i.pravatar.cc/150?img=5",
      joinedAt: "2024-04-17T09:15:00Z"
    },
    {
      id: "a4",
      name: "Daniel Brown",
      username: "daniel_b",
      avatar: "https://i.pravatar.cc/150?img=13",
      joinedAt: "2024-04-17T10:20:00Z"
    },
    {
      id: "a5",
      name: "Emily Davis",
      username: "emily_d",
      avatar: "https://i.pravatar.cc/150?img=6",
      joinedAt: "2024-04-17T11:30:00Z"
    },
    {
      id: "a6",
      name: "Lucas Martinez",
      username: "lucas_m",
      avatar: "https://i.pravatar.cc/150?img=7",
      joinedAt: "2024-04-17T13:45:00Z"
    },
    {
      id: "a7",
      name: "Isabella Taylor",
      username: "bella_t",
      avatar: "https://i.pravatar.cc/150?img=8",
      joinedAt: "2024-04-17T14:20:00Z"
    },
    {
      id: "a8",
      name: "William Lee",
      username: "will_lee",
      avatar: "https://i.pravatar.cc/150?img=9",
      joinedAt: "2024-04-17T15:10:00Z"
    },
    {
      id: "a9",
      name: "Sofia White",
      username: "sofia_w",
      avatar: "https://i.pravatar.cc/150?img=10",
      joinedAt: "2024-04-17T16:05:00Z"
    },
    {
      id: "a10",
      name: "Alexander Kim",
      username: "alex_k",
      avatar: "https://i.pravatar.cc/150?img=11",
      joinedAt: "2024-04-17T17:30:00Z"
    },
    {
      id: "a11",
      name: "Victoria Clark",
      username: "vicky_c",
      avatar: "https://i.pravatar.cc/150?img=12",
      joinedAt: "2024-04-18T09:15:00Z"
    },
    {
      id: "a12",
      name: "Nathan Wright",
      username: "nathan_w",
      avatar: "https://i.pravatar.cc/150?img=14",
      joinedAt: "2024-04-18T10:45:00Z"
    },
    {
      id: "a13",
      name: "Emma Garcia",
      username: "emma_g",
      avatar: "https://i.pravatar.cc/150?img=15",
      joinedAt: "2024-04-18T11:20:00Z"
    },
    {
      id: "a14",
      name: "Benjamin Ross",
      username: "ben_r",
      avatar: "https://i.pravatar.cc/150?img=16",
      joinedAt: "2024-04-18T13:10:00Z"
    },
    {
      id: "a15",
      name: "Mia Anderson",
      username: "mia_a",
      avatar: "https://i.pravatar.cc/150?img=17",
      joinedAt: "2024-04-18T14:30:00Z"
    },
    {
      id: "a16",
      name: "Henry Wilson",
      username: "henry_w",
      avatar: "https://i.pravatar.cc/150?img=18",
      joinedAt: "2024-04-18T15:45:00Z"
    },
    {
      id: "a17",
      name: "Ava Thompson",
      username: "ava_t",
      avatar: "https://i.pravatar.cc/150?img=19",
      joinedAt: "2024-04-18T16:20:00Z"
    },
    {
      id: "a18",
      name: "Sebastian Cox",
      username: "seb_c",
      avatar: "https://i.pravatar.cc/150?img=20",
      joinedAt: "2024-04-19T09:30:00Z"
    },
    {
      id: "a19",
      name: "Luna Parker",
      username: "luna_p",
      avatar: "https://i.pravatar.cc/150?img=21",
      joinedAt: "2024-04-19T10:15:00Z"
    },
    {
      id: "a20",
      name: "Leo Mitchell",
      username: "leo_m",
      avatar: "https://i.pravatar.cc/150?img=22",
      joinedAt: "2024-04-19T11:45:00Z"
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
    },
    {
      id: "m5",
      type: "gif",
      user: {
        id: "a2",
        name: "Sophia Rodriguez",
        username: "sophia_r",
        avatar: "https://i.pravatar.cc/150?img=3"
      },
      message: "Can't wait to see everyone's volleyball skills!",
      media: {
        url: "https://media.giphy.com/media/xT9DPBMumxHJIgK4ak/giphy.gif",
        type: "gif"
      },
      timestamp: "2024-05-10T16:45:00Z"
    },
    {
      id: "m6",
      type: "voice",
      user: {
        id: "a3",
        name: "Olivia Johnson",
        username: "olivia_j",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      message: "Hey team, just a quick voice message to say I'm excited!",
      media: {
        url: "https://example.com/sample-voice-message.mp3",
        type: "voice",
        duration: "0:12"
      },
      timestamp: "2024-05-10T17:00:00Z"
    },
    {
      id: "m7",
      type: "video",
      user: {
        id: "a4",
        name: "Daniel Brown",
        username: "daniel_b",
        avatar: "https://i.pravatar.cc/150?img=13"
      },
      message: "Check out my volleyball practice from last week!",
      media: {
        url: "https://example.com/volleyball-practice.mp4",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b"
      },
      timestamp: "2024-05-10T17:30:00Z"
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
      thumbnail: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b",
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

  const visibilityTooltip = linkup.visibility === "Public" 
    ? "Linkup open to anyone" 
    : "Linkup viewable by link only";

  const joinMethodTooltip = linkup.joinMethod === "Open" 
    ? "No approval needed" 
    : "Approval needed";

  const handleHostSectionClick = () => {
    setActiveTab("attendees");
  };

  // Fix the type issue by ensuring correct chat message types
  const typedChatMessages: ChatMessage[] = linkup.chat.map(msg => ({
    ...msg,
    // Ensure type is one of the allowed literal types
    type: msg.type as "text" | "image" | "video" | "voice" | "gif"
  }));

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Linkup Details" />
        <main className="p-6">
          <div className="mb-6 flex flex-row items-center justify-between">
            <Button variant="ghost" className="gap-1.5 text-muted-foreground hover:text-foreground transition-colors" asChild>
              <Link to="/linkups/management">
                <ArrowLeft className="h-4 w-4" />
                Back to Linkups
              </Link>
            </Button>
            <Button
              variant="destructive"
              className="gap-2 px-6 py-2.5 font-semibold rounded-full bg-[#ea384c] text-white hover:bg-[#cb2d3e] transition-all shadow-sm hover:shadow-md"
              onClick={() => setRemoveDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              Remove linkup
            </Button>
          </div>
          <RemoveLinkupDialog
            open={removeDialogOpen}
            linkupTitle={linkup.title}
            onConfirm={handleRemove}
            onCancel={() => setRemoveDialogOpen(false)}
          />
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl px-8 py-8 mb-8 border shadow-lg hover:shadow-xl transition-all">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="w-full max-w-[420px] md:max-w-[380px] flex-shrink-0">
                <EnlargeableImage
                  src={linkupImgSrc}
                  alt="Linkup"
                  showAiLabel
                  className="aspect-[4/5] h-[420px] rounded-2xl shadow-2xl hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] hover:scale-[1.02] transition-all duration-300"
                  imageClassName="bg-gray-100 object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col items-start gap-4 max-w-2xl pt-2">
                <div
                  className={`
                    inline-flex items-center gap-2.5 px-6 py-2 rounded-full border-2 text-lg font-bold uppercase tracking-wider
                    ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}
                    shadow-sm transition-all hover:shadow-md cursor-default
                  `}
                  style={{
                    borderWidth: 2,
                    minHeight: 40,
                    fontSize: 16,
                    letterSpacing: "0.1em"
                  }}
                  data-testid="linkup-status-pill"
                >
                  <span className="text-xl">{statusStyle.icon}</span>
                  <span>{statusStyle.label}</span>
                </div>
                
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-3 px-4 py-2 bg-linkup-soft-purple/30 rounded-full text-linkup-purple font-medium text-base">
                    <span className="text-xl">{categoryEmojis[linkup.category] || "❓"}</span>
                    {linkup.category}
                  </span>
                  
                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">{linkup.title}</h1>
                  
                  <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                    {linkup.description}
                  </p>

                  <div className="flex items-center justify-between mt-2 p-4 bg-linkup-soft-purple/10 rounded-xl cursor-pointer hover:bg-linkup-soft-purple/20 transition-all" onClick={handleHostSectionClick}>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-linkup-purple ring-offset-2">
                        <AvatarImage src={linkup.host.avatar} alt={linkup.host.name} />
                        <AvatarFallback>{linkup.host.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 font-medium mb-1">Hosted by</span>
                        <span className="font-semibold text-lg text-gray-900 hover:underline decoration-linkup-purple">
                          {linkup.host.name}
                        </span>
                        <span className="text-sm text-gray-500">@{linkup.host.username}</span>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <span className="text-sm text-gray-500">Created on</span>
                          <span className="text-sm text-gray-500">{format(new Date(linkup.createdAt), 'MMM d, yyyy')}</span>
                          <span className="text-sm text-gray-500">at</span>
                          <span className="text-sm text-gray-500">{format(new Date(linkup.createdAt), 'h:mm a')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
                      <Users className="h-5 w-5 text-linkup-purple" />
                      <span className="font-medium text-linkup-purple">{linkup.attendees.length + linkup.coHosts.length + 1} Attendees</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 p-1 bg-gray-100/50 rounded-full border shadow-sm">
              <TabsTrigger value="details" className="rounded-full transition-all">Details</TabsTrigger>
              <TabsTrigger value="attendees" className="rounded-full transition-all">Attendees</TabsTrigger>
              <TabsTrigger value="chat" className="rounded-full transition-all">Chat</TabsTrigger>
              <TabsTrigger value="media" className="rounded-full transition-all">Media</TabsTrigger>
              <TabsTrigger value="reports" className="rounded-full transition-all">Reports</TabsTrigger>
              <TabsTrigger value="map" className="rounded-full transition-all">Map</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-linkup-soft-purple hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="bg-linkup-soft-purple p-2.5 rounded-lg">
                        <CalendarClock className="h-6 w-6 text-linkup-purple" />
                      </div>
                      Date & Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-linkup-soft-purple/50 p-3 rounded-lg">
                        <Calendar className="h-5 w-5 text-linkup-purple" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                        <p className="text-base font-semibold">{new Date(linkup.startDate).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-linkup-soft-purple/50 p-3 rounded-lg">
                        <Clock className="h-5 w-5 text-linkup-purple" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Time</p>
                        <p className="text-base font-semibold">
                          {new Date(linkup.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {new Date(linkup.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-linkup-soft-purple/50 p-3 rounded-lg">
                        <Timer className="h-5 w-5 text-linkup-purple" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Duration</p>
                        <p className="text-base font-semibold">{linkup.duration}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-linkup-soft-purple hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="bg-linkup-soft-purple p-2.5 rounded-lg">
                        <MapPin className="h-6 w-6 text-linkup-purple" />
                      </div>
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-linkup-soft-purple/50 p-3 rounded-lg">
                        <Globe className="h-5 w-5 text-linkup-purple" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">General Area</p>
                        <p className="text-base font-semibold">{linkup.generalLocation}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-linkup-soft-purple/50 p-3 rounded-lg">
                        <MapPin className="h-5 w-5 text-linkup-purple" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Specific Location</p>
                        <p className="text-base font-semibold">{linkup.specificLocation}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full mt-2 bg-linkup-soft-purple hover:bg-linkup-soft-purple/70 border-linkup-purple text-linkup-purple hover:text-linkup-purple font-medium gap-2"
                      onClick={() => setActiveTab("map")}
                    >
                      <Map className="h-4 w-4" />
                      View on Map
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-linkup-soft-purple hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="bg-linkup-soft-purple p-2.5 rounded-lg">
                        <Tag className="h-6 w-6 text-linkup-purple" />
                      </div>
                      Linkup Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Visibility</p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2 p-2 bg-linkup-soft-purple/20 rounded-lg cursor-help">
                                {linkup.visibility === "Public" ? (
                                  <>
                                    <Eye className="h-5 w-5 text-linkup-purple" />
                                    <span className="font-medium">Public</span>
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="h-5 w-5 text-linkup-purple" />
                                    <span className="font-medium">Private</span>
                                  </>
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{visibilityTooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Join Method</p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2 p-2 bg-linkup-soft-purple/20 rounded-lg cursor-help">
                                <Users className="h-5 w-5 text-linkup-purple" />
                                <span className="font-medium">{linkup.joinMethod}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{joinMethodTooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Join Price</p>
                        <div className="flex items-center gap-2 p-2 bg-linkup-soft-purple/20 rounded-lg">
                          <DollarSign className="h-5 w-5 text-linkup-purple" />
                          <span className="font-semibold">{linkup.price}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Total Earnings</p>
                        <div className="flex items-center gap-2 p-2 bg-linkup-soft-purple/20 rounded-lg">
                          <DollarSign className="h-5 w-5 text-linkup-purple" />
                          <span className="font-semibold">{earnings}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Who can join</p>
                      <div className="flex items-center gap-2 p-3 bg-linkup-soft-purple/20 rounded-lg">
                        <span className="text-xl">
                          {genderJoinOptions[linkup.genderRestriction]?.emoji || "💖"}
                        </span>
                        <span className="font-medium">
                          {genderJoinOptions[linkup.genderRestriction]?.label || "Anyone"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="attendees">
              <Card>
                <CardHeader>
                  <CardTitle>Linkup Attendees</CardTitle>
                  <CardDescription className="mt-1.5">{linkup.attendees.length + linkup.coHosts.length + 1} people attending</CardDescription>
                </CardHeader>
                <CardContent>
                  <LinkupAttendeeList 
                    host={linkup.host}
                    coHosts={linkup.coHosts}
                    attendees={linkup.attendees}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle>Linkup Chat</CardTitle>
                  <CardDescription>Read-only view of the chat thread</CardDescription>
                </CardHeader>
                <CardContent>
                  <LinkupChatView 
                    messages={typedChatMessages}
                    pinnedMessage={linkup.pinnedMessage}
                  />
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
                        ) : item.type === "video" ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={item.thumbnail || ""} 
                              alt="Video thumbnail" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                              <Video className="h-12 w-12 text-white" />
                            </div>
                          </div>
                        ) : null}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={item.user.avatar} alt={item.user.name} />
                              <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{item.user.name}</span>
                          </div>
                          <span className="text-xs opacity-75">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
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
                  <CardDescription>User reports for this linkup</CardDescription>
                </CardHeader>
                <CardContent>
                  {linkup.reports.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">No reports for this linkup</p>
                  ) : (
                    <div className="space-y-4">
                      {linkup.reports.map((report) => (
                        <div key={report.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-amber-500" />
                              <h4 className="font-medium">Report by {report.reporter.name}</h4>
                            </div>
                            <Badge variant={report.resolved ? "outline" : "destructive"}>
                              {report.resolved ? "Resolved" : "Active"}
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm">{report.reason}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {new Date(report.timestamp).toLocaleString()}
                          </p>
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm">View Details</Button>
                            {!report.resolved && (
                              <Button variant="default" size="sm">Mark as Resolved</Button>
                            )}
                          </div>
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
                  <CardDescription>{linkup.specificLocation}</CardDescription>
                </CardHeader>
                <CardContent>
                  <LinkupMap 
                    coordinates={linkup.coordinates} 
                    specificLocation={linkup.specificLocation}
                  />
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
