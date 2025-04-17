
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Image, WandSparkles, Box } from "lucide-react";

interface LinkupImageProps {
  url: string;
  source: "uploaded" | "ai-generated" | "stock";
  className?: string;
}

const sourceConfig = {
  uploaded: { icon: Image, label: "Uploaded" },
  "ai-generated": { icon: WandSparkles, label: "AI-Generated" },
  stock: { icon: Box, label: "Stock" },
};

export function LinkupImage({ url, source, className }: LinkupImageProps) {
  const { icon: Icon, label } = sourceConfig[source];
  
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <AspectRatio ratio={9/16}>
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
