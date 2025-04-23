
import { useRef, useEffect } from 'react';

interface LinkupMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  specificLocation: string;
}

export function LinkupMap({ coordinates, specificLocation }: LinkupMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a production app, we would use a proper map library like Mapbox or Google Maps API
    // For this demo, we'll use an iframe with Google Maps
    console.log("Map component mounted with coordinates:", coordinates);
    console.log("Location:", specificLocation);
  }, [coordinates, specificLocation]);

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border">
      <iframe 
        width="100%"
        height="100%"
        frameBorder="0"
        src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`}
        allowFullScreen
        title={specificLocation}
      ></iframe>
    </div>
  );
}
