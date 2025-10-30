import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Trash2 } from "lucide-react";
import { CartItem } from "@/types/menu";
import { formatCurrency } from "@/utils/currency";
import { Badge } from "@/components/ui/badge";

interface CartDrawerProps {
  cart: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer = ({ cart, onRemoveItem, onCheckout }: CartDrawerProps) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          size="lg" 
          className="fixed bottom-6 right-6 rounded-full shadow-elevated z-50 bg-gradient-primary hover:opacity-90"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Cart
          {totalItems > 0 && (
            <Badge className="ml-2 bg-background text-primary">{totalItems}</Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-semibold text-primary">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">{formatCurrency(totalAmount)}</span>
                </div>
                <Button 
                  onClick={onCheckout}
                  className="w-full bg-gradient-primary hover:opacity-90"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
