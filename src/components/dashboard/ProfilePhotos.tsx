
import { Image, GalleryHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfilePhoto {
  id: string;
  url: string;
  uploadDate: string;
  isProfilePicture: boolean;
}

interface ProfilePhotosProps {
  photos: ProfilePhoto[];
}

export const ProfilePhotos = ({ photos }: ProfilePhotosProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GalleryHorizontal className="h-5 w-5 text-linkup-purple" />
          Profile Photos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative aspect-square group">
              <img
                src={photo.url}
                alt={`Profile photo from ${new Date(photo.uploadDate).toLocaleDateString()}`}
                className="w-full h-full object-cover rounded-lg"
              />
              {photo.isProfilePicture && (
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  Current
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                <div className="text-white text-sm">
                  {new Date(photo.uploadDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
