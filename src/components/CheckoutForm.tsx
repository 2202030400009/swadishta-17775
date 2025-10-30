import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/types/menu";
import { formatCurrency } from "@/utils/currency";
import { ArrowLeft } from "lucide-react";

interface CheckoutFormProps {
  cart: CartItem[];
  onSubmit: (data: { customerName: string; mobile: string; tableNumber: string }) => void;
  onBack: () => void;
}

export const CheckoutForm = ({ cart, onSubmit, onBack }: CheckoutFormProps) => {
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ customerName, mobile, tableNumber });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Menu
      </Button>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        
        <div className="mb-6 space-y-3">
          <h3 className="font-semibold text-lg">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} x {item.quantity}</span>
              <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span className="text-primary">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              placeholder="Enter mobile number"
              pattern="[0-9]{10}"
            />
          </div>
          <div>
            <Label htmlFor="table">Table Number</Label>
            <Input
              id="table"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              required
              placeholder="Enter table number"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90"
            size="lg"
          >
            Place Order
          </Button>
        </form>
      </Card>
    </div>
  );
};
