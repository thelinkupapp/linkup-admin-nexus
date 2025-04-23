
import React from 'react';
import { EnlargeableMedia } from "@/components/linkups/EnlargeableMedia";
import { Gift, Mic } from "lucide-react";

interface ChatMediaContentProps {
  mediaType: 'text' | 'image' | 'video' | 'gif' | 'voice';
  mediaUrl?: string;
  message: string;
}

export function ChatMediaContent({ mediaType, mediaUrl, message }: ChatMediaContentProps) {
  if (mediaType === 'text') return null;

  switch (mediaType) {
    case 'image':
      return (
        <div className="mt-2">
          <EnlargeableMedia
            type="image"
            src={mediaUrl || ''}
            alt={message}
            className="max-w-[300px]"
          />
        </div>
      );
    case 'video':
      return (
        <div className="mt-2">
          <EnlargeableMedia
            type="video"
            src={mediaUrl || ''}
            alt={message}
            className="max-w-[300px]"
          />
        </div>
      );
    case 'gif':
      return (
        <div className="mt-2 max-w-[300px] rounded-lg overflow-hidden">
          <img src={mediaUrl} alt={message} className="w-full h-auto" />
          <div className="bg-muted/20 backdrop-blur-sm px-2 py-1 absolute top-2 right-2 rounded flex items-center gap-1">
            <Gift className="h-3.5 w-3.5" />
            <span className="text-xs">GIF</span>
          </div>
        </div>
      );
    case 'voice':
      return (
        <div className="mt-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center gap-2">
          <Mic className="h-4 w-4" />
          <div className="h-1 w-32 bg-primary/20 rounded-full" />
          <span className="text-xs text-muted-foreground">0:12</span>
        </div>
      );
    default:
      return null;
  }
}
