
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ProfilePictureProps {
  currentImage: string;
  onImageChange: (newImage: string) => void;
}

export function ProfilePicture({ currentImage, onImageChange }: ProfilePictureProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onImageChange(reader.result);
        setIsUploading(false);
        toast.success('Profile picture updated');
      }
    };
    reader.onerror = () => {
      toast.error('Error uploading image');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-3 mb-4">
      <img 
        src={currentImage} 
        alt="Profile" 
        className="h-14 w-14 rounded-full object-cover border-2 border-primary/10"
      />
      <div>
        <Label htmlFor="profile-picture" className="cursor-pointer">
          <Button 
            size="sm" 
            variant="secondary" 
            disabled={isUploading}
            onClick={() => document.getElementById('profile-picture')?.click()}
          >
            {isUploading ? 'Uploading...' : 'Change Profile pic'}
          </Button>
        </Label>
        <input
          id="profile-picture"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}
