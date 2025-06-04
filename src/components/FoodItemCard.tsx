import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlusCircle } from 'lucide-react'; // Icon for "Add to Cart"

interface FoodItemCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (id: string | number) => void;
  onCustomize?: (id: string | number) => void; // Optional: for opening customization dialog
  isPopular?: boolean; // Optional: to highlight popular items
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  onCustomize,
  isPopular,
}) => {
  console.log("Rendering FoodItemCard:", name);

  const handleAddToCart = () => {
    console.log("Adding to cart:", id, name);
    onAddToCart(id);
    // Potentially show toast notification
  };

  const handleCustomize = () => {
    if (onCustomize) {
      console.log("Customizing item:", id, name);
      onCustomize(id);
    }
  };

  return (
    <Card className="w-full flex flex-col md:flex-row overflow-hidden transition-shadow duration-300 hover:shadow-lg relative">
      {isPopular && (
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
          Popular
        </div>
      )}
      {imageUrl && (
        <div className="md:w-1/3 w-full">
          <AspectRatio ratio={4/3} className="md:h-full">
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
            />
          </AspectRatio>
        </div>
      )}
      <div className={`flex flex-col justify-between ${imageUrl ? 'md:w-2/3' : 'w-full'}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-semibold">{name}</CardTitle>
          {description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>}
        </CardHeader>
        <CardContent className="pt-0 pb-2">
          <p className="text-sm font-bold text-gray-800">${price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="pt-0 flex flex-col sm:flex-row sm:justify-end gap-2">
          {onCustomize && (
            <Button variant="outline" size="sm" onClick={handleCustomize} className="w-full sm:w-auto">
              Customize
            </Button>
          )}
          <Button size="sm" onClick={handleAddToCart} className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
export default FoodItemCard;