
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
            src="/lovable-uploads/f1d4c5aa-9fa0-4b94-9bbe-d21d2febc373.png"
            alt="Instagram"
            className="h-6 w-6 object-contain"
          />
          <p>{socials.instagram}</p>
        </div>
      )}
      
      {socials.tiktok && (
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/e417132e-9c00-4fc9-abd5-b657724d5e1b.png"
            alt="TikTok"
            className="h-6 w-6 object-contain"
          />
          <p>{socials.tiktok}</p>
        </div>
      )}
      
      {socials.linkedin && (
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/08a2567d-624d-4b60-b1cd-9db9f3cffe46.png"
            alt="LinkedIn"
            className="h-6 w-6 object-contain"
          />
          <p>{socials.linkedin}</p>
        </div>
      )}
      
      {socials.twitter && (
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/1ca0cfbb-d37f-4f7a-b2a3-319791d8be1a.png"
            alt="X (Twitter)"
            className="h-6 w-6 object-contain"
          />
          <p>{socials.twitter}</p>
        </div>
      )}
    </div>
  );
};
