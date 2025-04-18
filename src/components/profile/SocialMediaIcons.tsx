
import React from 'react';
import { SocialMediaLinks } from '@/types/user';

interface SocialMediaIconsProps {
  socials: SocialMediaLinks;
}

export const SocialMediaIcons = ({ socials }: SocialMediaIconsProps) => {
  return (
    <div className="space-y-3">
      {socials.instagram && (
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/81eb6c77-78d1-4884-be71-f521121a4d27.png"
            alt="Instagram"
            className="h-5 w-5"
          />
          <p>{socials.instagram}</p>
        </div>
      )}
      
      {socials.twitter && (
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/08c01a0c-b394-4d67-8875-445c855a8995.png"
            alt="X (Twitter)"
            className="h-5 w-5"
          />
          <p>{socials.twitter}</p>
        </div>
      )}
      
      {socials.linkedin && (
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/08a2567d-624d-4b60-b1cd-9db9f3cffe46.png"
            alt="LinkedIn"
            className="h-5 w-5"
          />
          <p>{socials.linkedin}</p>
        </div>
      )}
      
      {socials.tiktok && (
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/e417132e-9c00-4fc9-abd5-b657724d5e1b.png"
            alt="TikTok"
            className="h-5 w-5"
          />
          <p>{socials.tiktok}</p>
        </div>
      )}
    </div>
  );
};
