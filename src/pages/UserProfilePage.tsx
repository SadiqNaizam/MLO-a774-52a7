import React, { useState, useEffect } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import OrderStatusIndicator, { OrderStatus } from '@/components/OrderStatusIndicator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, MapPin, CreditCard, ListOrdered, Edit3, PlusCircle } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

const addressSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['Home', 'Work', 'Other']).default('Home'),
  street: z.string().min(3),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().min(5),
});
type AddressFormValues = z.infer<typeof addressSchema>;

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  restaurantName: string;
  items: OrderItem[];
}

const placeholderOrders: Order[] = [
  { id: 'ORD123', date: '2024-07-20', total: 44.02, status: 'DELIVERED', restaurantName: 'Pizza Paradise', items: [{id: 'p1', name: 'Margherita Pizza', quantity: 1, price: 12.99}, {id: 'b1', name: 'Classic Cheeseburger', quantity: 2, price: 9.99}]},
  { id: 'ORD124', date: '2024-07-21', total: 25.50, status: 'OUT_FOR_DELIVERY', restaurantName: 'Sushi Central', items: [{id: 's1', name: 'Salmon Sashimi', quantity: 2, price: 8.00}, {id: 's2', name: 'Tuna Roll', quantity: 1, price: 6.50}]},
  { id: 'ORD125', date: '2024-07-22', total: 15.75, status: 'PREPARING', restaurantName: 'Taco Town', items: [{id: 't1', name: 'Chicken Tacos (3)', quantity: 1, price: 9.00}, {id: 't2', name: 'Guacamole & Chips', quantity: 1, price: 5.00}]},
];

const UserProfilePage = () => {
  const [userData] = useState({ name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890', avatarUrl: 'https://avatar.vercel.sh/johndoe.png' });
  const [orders, setOrders] = useState<Order[]>(placeholderOrders);
  const [addresses, setAddresses] = useState<AddressFormValues[]>([
    {id: 'addr1', type: 'Home', street: '123 Main St', city: 'Anytown', state: 'CA', zip: '90210'},
    {id: 'addr2', type: 'Work', street: '456 Business Rd', city: 'Metropolis', state: 'NY', zip: '10001'},
  ]);
  const [paymentMethods, setPaymentMethods] = useState([
    {id: 'pay1', type: 'Visa', last4: '•••• 1234', expiry: '12/25'},
  ]);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: userData.name, email: userData.email, phone: userData.phone },
  });
  
  const addressForm = useForm<AddressFormValues>({ // For adding/editing addresses
    resolver: zodResolver(addressSchema),
    defaultValues: { type: 'Home', street: '', city: '', state: '', zip: '' },
  });


  useEffect(() => {
    console.log('UserProfilePage loaded');
  }, []);

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log('Profile updated:', data);
    // Update user data state or call API
    alert("Profile updated successfully!");
  };

  const onAddressSubmit = (data: AddressFormValues) => {
    console.log('Address submitted:', data);
    const newAddress = {...data, id: `addr${Date.now()}`};
    setAddresses(prev => [...prev, newAddress]);
    addressForm.reset(); // Reset form after submission
    alert("Address added successfully!");
  };

  const onPaymentSubmit = () => {
      console.log('Adding new payment method');
      alert("Functionality to add payment method not fully implemented in this mock.");
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu cartItemCount={0} /> {/* Assuming cart is empty or handled elsewhere */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8 flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userData.avatarUrl} alt={userData.name} />
            <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{profileForm.watch('name')}</h1>
            <p className="text-md text-gray-600">{profileForm.watch('email')}</p>
          </div>
        </header>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="profile"><User className="mr-2 h-4 w-4 inline-block"/>Profile</TabsTrigger>
            <TabsTrigger value="addresses"><MapPin className="mr-2 h-4 w-4 inline-block"/>Addresses</TabsTrigger>
            <TabsTrigger value="payment"><CreditCard className="mr-2 h-4 w-4 inline-block"/>Payment</TabsTrigger>
            <TabsTrigger value="orders"><ListOrdered className="mr-2 h-4 w-4 inline-block"/>Order History</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Edit Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <FormField control={profileForm.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={profileForm.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={profileForm.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600"><Edit3 className="mr-2 h-4 w-4"/>Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
             <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">Manage Addresses</CardTitle>
                        <CardDescription>Add, edit, or remove your delivery addresses.</CardDescription>
                    </div>
                     {/* Placeholder for "Add New Address" dialog trigger */}
                </CardHeader>
                <CardContent className="space-y-4">
                    {addresses.map(addr => (
                        <Card key={addr.id} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{addr.type} - {addr.street}, {addr.city}</p>
                                <p className="text-sm text-gray-500">{addr.state}, {addr.zip}</p>
                            </div>
                            <Button variant="outline" size="sm"><Edit3 className="h-4 w-4 mr-1"/>Edit</Button>
                        </Card>
                    ))}
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="add-address">
                            <AccordionTrigger className="text-orange-600 hover:text-orange-700">
                                <PlusCircle className="h-5 w-5 mr-2"/> Add New Address
                            </AccordionTrigger>
                            <AccordionContent>
                                <Form {...addressForm}>
                                <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-4 pt-4">
                                    <FormField control={addressForm.control} name="type" render={({ field }) => (
                                        <FormItem><FormLabel>Address Type</FormLabel><FormControl><Input placeholder="Home, Work, etc." {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={addressForm.control} name="street" render={({ field }) => (
                                        <FormItem><FormLabel>Street</FormLabel><FormControl><Input placeholder="123 Example Ln" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                     <div className="grid grid-cols-3 gap-4">
                                        <FormField control={addressForm.control} name="city" render={({ field }) => (
                                            <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <FormField control={addressForm.control} name="state" render={({ field }) => (
                                            <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <FormField control={addressForm.control} name="zip" render={({ field }) => (
                                            <FormItem><FormLabel>ZIP</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                     </div>
                                    <Button type="submit">Save Address</Button>
                                </form>
                                </Form>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">Manage Payment Methods</CardTitle>
                        <CardDescription>Add or update your payment options.</CardDescription>
                    </div>
                     {/* Placeholder for "Add New Payment" dialog trigger */}
                </CardHeader>
                <CardContent className="space-y-4">
                    {paymentMethods.map(pm => (
                        <Card key={pm.id} className="p-4 flex justify-between items-center">
                           <div>
                                <p className="font-semibold">{pm.type} ending in {pm.last4}</p>
                                <p className="text-sm text-gray-500">Expires: {pm.expiry}</p>
                           </div>
                           <Button variant="outline" size="sm"><Edit3 className="h-4 w-4 mr-1"/>Edit</Button>
                        </Card>
                    ))}
                    <Button onClick={onPaymentSubmit} variant="outline" className="w-full text-orange-600 border-orange-600 hover:bg-orange-50 hover:text-orange-700">
                        <PlusCircle className="h-5 w-5 mr-2"/> Add New Payment Method
                    </Button>
                </CardContent>
            </Card>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Order History</CardTitle>
                <CardDescription>Review your past and current orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  {orders.length > 0 ? (
                    <Accordion type="multiple" className="w-full space-y-3">
                      {orders.map(order => (
                        <AccordionItem key={order.id} value={order.id} className="border rounded-md px-1">
                          <AccordionTrigger className="hover:no-underline p-4">
                            <div className="flex justify-between w-full items-center">
                                <div>
                                    <p className="font-semibold">Order ID: {order.id} <span className="text-sm text-gray-500 font-normal">- {order.restaurantName}</span></p>
                                    <p className="text-sm text-gray-500">Date: {order.date} - Total: ${order.total.toFixed(2)}</p>
                                </div>
                                <OrderStatusIndicator status={order.status} />
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="p-4 bg-slate-50 rounded-b-md">
                            <h4 className="font-semibold mb-2">Items:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              {order.items.map(item => (
                                <li key={item.id}>{item.name} (x{item.quantity}) - ${ (item.price * item.quantity).toFixed(2)}</li>
                              ))}
                            </ul>
                            <Button size="sm" variant="outline" className="mt-3">Reorder</Button>
                            <Button size="sm" variant="ghost" className="mt-3 ml-2">View Invoice</Button>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-center text-gray-500 py-8">You have no order history yet.</p>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserProfilePage;