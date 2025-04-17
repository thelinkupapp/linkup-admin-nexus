
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Image, WandSparkles, Box } from "lucide-react";

interface LinkupImageProps {
  url: string;
  source: "uploaded" | "ai-generated" | "stock";
  className?: string;
  size?: "small" | "medium" | "large";
}

const sourceConfig = {
  uploaded: { icon: Image, label: "Uploaded" },
  "ai-generated": { icon: WandSparkles, label: "AI-Generated" },
  stock: { icon: Box, label: "Stock" },
};

const sizeConfig = {
  small: { 
    aspectRatio: 1/1, 
    containerClass: "h-32 w-32" 
  },
  medium: { 
    aspectRatio: 3/4, 
    containerClass: "h-48 w-36" 
  },
  large: { 
    aspectRatio: 9/16, 
    containerClass: "h-72 w-40" 
  }
};

export function LinkupImage({ 
  url, 
  source, 
  className = '', 
  size = 'medium' 
}: LinkupImageProps) {
  const { icon: Icon, label } = sourceConfig[source];
  const { aspectRatio, containerClass } = sizeConfig[size];
  
  return (
    <div className={`relative rounded-lg overflow-hidden ${containerClass} ${className}`}>
      <AspectRatio ratio={aspectRatio}>
        <img 
          src={url} 
          alt="Linkup cover" 
          className="w-full h-full object-cover"
        />
      </AspectRatio>
      <Badge 
        variant="secondary" 
        className="absolute top-3 right-3 gap-1.5 bg-black/60 text-white border-none"
      >
        <Icon className="h-3.5 w-3.5" />
        {label}
      </Badge>
    </div>
  );
}
