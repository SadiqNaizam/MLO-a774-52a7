import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import RestaurantPreviewCard, { RestaurantPreviewCardProps } from '@/components/RestaurantPreviewCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Filter, Search, MapPin, Star } from 'lucide-react';

const placeholderRestaurants: RestaurantPreviewCardProps[] = [
  { id: '1', name: 'Pizza Paradise', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Pizza', 'Italian'], rating: 4.5, deliveryTime: '25-35 min', distance: '1.2km' },
  { id: '2', name: 'Burger Bliss', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Burgers', 'American'], rating: 4.2, deliveryTime: '20-30 min', distance: '0.8km' },
  { id: '3', name: 'Sushi Central', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Sushi', 'Japanese'], rating: 4.8, deliveryTime: '30-40 min', distance: '2.5km' },
  { id: '4', name: 'Taco Town', imageUrl: 'https://images.unsplash.com/photo-1565299715199-866c917206bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFjb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Mexican', 'Tacos'], rating: 4.3, deliveryTime: '20-25 min', distance: '1.0km' },
];

const RestaurantDiscoveryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<RestaurantPreviewCardProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('RestaurantDiscoveryPage loaded');
    // Simulate API call
    setTimeout(() => {
      setRestaurants(placeholderRestaurants);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleRestaurantClick = (id: string | number) => {
    console.log(`Navigating to menu for restaurant ID: ${id}`);
    navigate(`/restaurant-menu/${id}`);
  };

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.cuisineTypes.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu cartItemCount={0} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Find Your Next Meal</h1>
          <p className="text-lg text-gray-600">Discover local restaurants and delicious cuisines near you.</p>
        </header>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search restaurants or cuisines..."
              className="w-full pl-10 pr-4 py-2 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>
        
        {/* Placeholder for filter toggles (e.g., cuisine types, sort by) */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['Italian', 'Mexican', 'Chinese', 'Popular', 'Newest'].map(filter => (
            <Button key={filter} variant="ghost" size="sm" className="bg-white border border-gray-200 hover:bg-orange-50">
              {filter}
            </Button>
          ))}
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]" style={{ minHeight: '400px' }}> {/* Adjust height as needed */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-[180px] w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantPreviewCard
                  key={restaurant.id}
                  {...restaurant}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
          )}
          {!isLoading && filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No restaurants found matching your criteria.</p>
            </div>
          )}
        </ScrollArea>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDiscoveryPage;