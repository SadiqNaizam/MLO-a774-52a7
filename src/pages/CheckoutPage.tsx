import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from '@/components/ui/separator';
import { CreditCard, MapPin, Package, AlertCircle } from 'lucide-react';

const addressSchema = z.object({
  street: z.string().min(5, "Street address is too short"),
  city: z.string().min(2, "City name is too short"),
  state: z.string().min(2, "State is required"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
});

const paymentSchema = z.object({
  method: z.enum(["card", "paypal", "cod"], { required_error: "Please select a payment method." }),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
}).refine(data => {
    if (data.method === "card") {
        return data.cardNumber && data.cardNumber.length === 16 && data.expiryDate && data.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/) && data.cvv && data.cvv.length === 3;
    }
    return true;
}, {
    message: "Please provide valid card details for card payment.",
    path: ["cardNumber"], // you can specify which field this error refers to
});

const checkoutFormSchema = z.object({
  address: addressSchema,
  payment: paymentSchema,
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CheckoutPage = () => {
  const [orderSummary] = useState({ subtotal: 35.47, delivery: 5.00, tax: 3.55, total: 44.02 }); // Example data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      address: { street: '', city: '', state: '', zip: '', phone: '' },
      payment: { method: undefined },
    },
  });

  useEffect(() => {
    console.log('CheckoutPage loaded');
  }, []);

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    setIsSubmitting(true);
    setSubmissionError(null);
    console.log('Checkout form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    // For demo purposes, navigate to a success page or profile/orders
    // Assuming successful submission:
    // navigate('/order-confirmation/12345'); // Or
    alert("Order placed successfully! (Simulated)");
    navigate('/profile'); // Redirect to profile to see order history
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu cartItemCount={2} /> {/* Example cart count */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Label className="text-3xl font-bold text-gray-800 mb-8 block">Checkout</Label>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Address Section */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl"><MapPin className="mr-2 h-6 w-6 text-orange-500" />Delivery Address</CardTitle>
                  <CardDescription>Where should we send your order?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="address.street" render={({ field }) => (
                      <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="address.city" render={({ field }) => (
                        <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Anytown" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="address.state" render={({ field }) => (
                        <FormItem><FormLabel>State / Province</FormLabel><FormControl><Input placeholder="CA" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="address.zip" render={({ field }) => (
                        <FormItem><FormLabel>ZIP / Postal Code</FormLabel><FormControl><Input placeholder="90210" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="address.phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+1 555-123-4567" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Section */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl"><CreditCard className="mr-2 h-6 w-6 text-orange-500" />Payment Method</CardTitle>
                   <CardDescription>Choose how you'd like to pay.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormField
                        control={form.control}
                        name="payment.method"
                        render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="card" /></FormControl>
                                    <FormLabel className="font-normal">Credit/Debit Card</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="paypal" /></FormControl>
                                    <FormLabel className="font-normal">PayPal</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="cod" /></FormControl>
                                    <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                                </FormItem>
                            </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    {form.watch("payment.method") === "card" && (
                        <div className="mt-4 space-y-4 border-t pt-4">
                            <FormField control={form.control} name="payment.cardNumber" render={({ field }) => (
                                <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name="payment.expiryDate" render={({ field }) => (
                                    <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="payment.cvv" render={({ field }) => (
                                    <FormItem><FormLabel>CVV</FormLabel><FormControl><Input placeholder="•••" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                        </div>
                    )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-24"> {/* Sticky summary */}
                <CardHeader>
                  <CardTitle className="flex items-center text-xl"><Package className="mr-2 h-6 w-6 text-orange-500" />Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Accordion type="single" collapsible defaultValue="item-1">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>View Items ({2} items)</AccordionTrigger>
                            <AccordionContent className="space-y-2">
                                <p>Margherita Pizza x 1 - $12.99</p>
                                <p>Classic Cheeseburger x 2 - $19.98</p>
                                {/* Add more items here */}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Separator />
                    <div className="flex justify-between"><span>Subtotal</span><span>${orderSummary.subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Delivery</span><span>${orderSummary.delivery.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Tax (Est.)</span><span>${orderSummary.tax.toFixed(2)}</span></div>
                    <Separator />
                    <div className="flex justify-between font-bold text-xl"><span>Total</span><span>${orderSummary.total.toFixed(2)}</span></div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    {submissionError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{submissionError}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                        {isSubmitting ? 'Placing Order...' : 'Place Order'}
                    </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default CheckoutPage;