
import { Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        </div>
      ))}
    </div>
  );
}
