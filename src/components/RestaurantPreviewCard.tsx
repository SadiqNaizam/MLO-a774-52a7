import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from 'lucide-react'; // Icons for rating and location (optional)
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface RestaurantPreviewCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisineTypes: string[]; // e.g., ["Italian", "Pizza"]
  rating: number; // e.g., 4.5
  deliveryTime?: string; // e.g., "25-35 min"
  distance?: string; // e.g. "2.5km away"
  onClick?: (id: string | number) => void;
}

const RestaurantPreviewCard: React.FC<RestaurantPreviewCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  distance,
  onClick,
}) => {
  console.log("Rendering RestaurantPreviewCard:", name);

  const handleClick = () => {
    if (onClick) {
      console.log("RestaurantPreviewCard clicked:", id);
      onClick(id);
    }
  };

  return (
    <Card
      className="w-full overflow-hidden transition-shadow duration-300 hover:shadow-xl cursor-pointer"
      onClick={handleClick}
      tabIndex={0} // Make it focusable
      onKeyPress={(e) => e.key === 'Enter' && handleClick()} // Allow Enter key press
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold line-clamp-1">{name}</CardTitle>
        <div className="flex flex-wrap gap-1">
          {cuisineTypes.slice(0, 3).map((cuisine) => (
            <Badge key={cuisine} variant="secondary" className="text-xs">
              {cuisine}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span>{rating.toFixed(1)}</span>
          </div>
          {deliveryTime && <span>{deliveryTime}</span>}
        </div>
        {distance && (
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{distance}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default RestaurantPreviewCard;