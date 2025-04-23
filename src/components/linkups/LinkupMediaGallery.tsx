
import { Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EnlargeableMedia } from "./EnlargeableMedia";

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  timestamp: string;
  thumbnail?: string;
  user?: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
}

interface LinkupMediaGalleryProps {
  media: MediaItem[];
}

export function LinkupMediaGallery({ media }: LinkupMediaGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {media.map((item) => (
        <div key={item.id} className="relative">
          <EnlargeableMedia
            type={item.type}
            src={item.url}
            alt={`Media by ${item.user?.name || 'Unknown user'}`}
            thumbnail={item.thumbnail}
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
            {item.user && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={item.user.avatar} alt={item.user.name} />
                  <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-white">{item.user.name}</span>
              </div>
            )}
            <p className="text-xs text-white/80 mt-1">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
