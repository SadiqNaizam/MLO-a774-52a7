import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import FoodItemCard, { FoodItemCardProps } from '@/components/FoodItemCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Clock, ShoppingCart, Utensils } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // For customization dialog

interface MenuItem extends FoodItemCardProps {
  category: string;
}

const placeholderMenu: { [key: string]: MenuItem[] } = {
  '1': [ // Pizza Paradise
    { id: 'p1', name: 'Margherita Pizza', description: 'Classic cheese and tomato.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=500', category: 'Pizzas', onAddToCart: () => {}, onCustomize: () => {}, isPopular: true },
    { id: 'p2', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni.', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500', category: 'Pizzas', onAddToCart: () => {} },
    { id: 's1', name: 'Caesar Salad', description: 'Fresh greens, croutons, Parmesan.', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500', category: 'Salads', onAddToCart: () => {} },
  ],
  '2': [ // Burger Bliss
    { id: 'b1', name: 'Classic Cheeseburger', description: 'Beef patty, cheese, lettuce, tomato.', price: 9.99, imageUrl: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=500', category: 'Burgers', onAddToCart: () => {}, onCustomize: () => {}, isPopular: true },
    { id: 'b2', name: 'Bacon Burger', description: 'With crispy bacon strips.', price: 11.50, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500', category: 'Burgers', onAddToCart: () => {} },
    { id: 'f1', name: 'Fries', description: 'Crispy golden fries.', price: 3.99, imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500', category: 'Sides', onAddToCart: () => {} },
  ],
  // Add more restaurants if needed
};

const placeholderRestaurantDetails = {
  '1': { name: 'Pizza Paradise', logo: 'https://cdn-icons-png.flaticon.com/128/3595/3595458.png', cuisine: 'Italian, Pizza', rating: 4.5, deliveryTime: '25-35 min' },
  '2': { name: 'Burger Bliss', logo: 'https://cdn-icons-png.flaticon.com/128/877/877951.png', cuisine: 'American, Burgers', rating: 4.2, deliveryTime: '20-30 min' },
  'default': { name: 'Restaurant', logo: '', cuisine: 'Various', rating: 4.0, deliveryTime: '30 min'}
};

const RestaurantMenuPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurantDetails, setRestaurantDetails] = useState(placeholderRestaurantDetails.default);
  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] = useState(false);
  const [selectedItemForCustomization, setSelectedItemForCustomization] = useState<MenuItem | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0); // Example cart count

  useEffect(() => {
    console.log(`RestaurantMenuPage loaded for restaurant ID: ${restaurantId}`);
    setIsLoading(true);
    setTimeout(() => {
      if (restaurantId && placeholderMenu[restaurantId]) {
        const itemsWithHandlers = placeholderMenu[restaurantId].map(item => ({
            ...item,
            onAddToCart: (id) => handleAddToCart(id, item.name),
            onCustomize: item.onCustomize ? (id) => handleCustomize(id, item) : undefined,
        }));
        setMenuItems(itemsWithHandlers);
        setRestaurantDetails(placeholderRestaurantDetails[restaurantId] || placeholderRestaurantDetails.default);
      } else {
         // Fallback if restaurantId is not found
        setMenuItems([]);
        setRestaurantDetails(placeholderRestaurantDetails.default);
      }
      setIsLoading(false);
    }, 1000);
  }, [restaurantId]);

  const handleAddToCart = (itemId: string | number, itemName: string) => {
    console.log(`Added ${itemName} (ID: ${itemId}) to cart.`);
    setCartItemCount(prev => prev + 1); // Update cart count
    // In a real app, you'd dispatch an action to update the cart state
  };

  const handleCustomize = (itemId: string | number, item: MenuItem) => {
    console.log(`Opening customization for ${item.name} (ID: ${itemId})`);
    setSelectedItemForCustomization(item);
    setIsCustomizationDialogOpen(true);
  };

  const menuCategories = Array.from(new Set(menuItems.map(item => item.category)));

  if (!restaurantId) {
    return <div>Error: Restaurant ID not provided.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu cartItemCount={cartItemCount} />
      <Dialog open={isCustomizationDialogOpen} onOpenChange={setIsCustomizationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize {selectedItemForCustomization?.name}</DialogTitle>
            <DialogDescription>
              Make selections for your item.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <Label>Size:</Label>
            <RadioGroup defaultValue="medium">
              <div className="flex items-center space-x-2"><RadioGroupItem value="small" id="s" /><Label htmlFor="s">Small</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="medium" id="m" /><Label htmlFor="m">Medium</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="large" id="l" /><Label htmlFor="l">Large</Label></div>
            </RadioGroup>
            <Label>Extra Toppings (+$1.00 each):</Label>
            {/* Add Checkboxes for toppings here */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomizationDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { handleAddToCart(selectedItemForCustomization!.id, selectedItemForCustomization!.name); setIsCustomizationDialogOpen(false); }}>Add to Cart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink onClick={() => navigate('/')}>Restaurants</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{restaurantDetails.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {isLoading ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            <Skeleton className="h-10 w-full" /> {/* Tabs skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        ) : (
          <>
            <header className="mb-8 p-6 bg-white rounded-lg shadow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-24 w-24 border-2 border-orange-500">
                  <AvatarImage src={restaurantDetails.logo || `https://avatar.vercel.sh/${restaurantDetails.name}.png`} alt={restaurantDetails.name} />
                  <AvatarFallback><Utensils /></AvatarFallback>
                </Avatar>
                <div>
                  <Label className="text-3xl font-bold text-gray-800">{restaurantDetails.name}</Label>
                  <p className="text-md text-gray-600">{restaurantDetails.cuisine}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Star className="h-4 w-4 text-yellow-400" /> {restaurantDetails.rating.toFixed(1)}
                    <Clock className="h-4 w-4 ml-2" /> {restaurantDetails.deliveryTime}
                  </div>
                </div>
              </div>
            </header>

            <Tabs defaultValue={menuCategories[0] || 'all'} className="w-full">
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-dynamic gap-2 mb-6">
                {menuCategories.map(category => (
                  <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
              </TabsList>
              {menuCategories.map(category => (
                <TabsContent key={category} value={category}>
                  <ScrollArea className="h-[calc(100vh-450px)]" style={{ minHeight: '300px' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {menuItems.filter(item => item.category === category).map(item => (
                        <FoodItemCard key={item.id} {...item} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </>
        )}
      </main>
      
      {!isLoading && (
        <div className="sticky bottom-0 bg-white p-4 shadow-t-lg border-t border-gray-200">
          <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => navigate('/cart')}>
            <ShoppingCart className="mr-2 h-5 w-5" /> View Cart ({cartItemCount} items)
          </Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenuPage;