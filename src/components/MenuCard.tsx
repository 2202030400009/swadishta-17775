import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { formatCurrency } from "@/utils/currency";

interface MenuCardProps {
  item: MenuItem;
  quantity: number;
  onAddToCart: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const MenuCard = ({ 
  item, 
  quantity, 
  onAddToCart, 
  onIncrement, 
  onDecrement 
}: MenuCardProps) => {
  return (
    <Card className="overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300">
      <div className="aspect-video overflow-hidden bg-muted">
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-foreground">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{formatCurrency(item.price)}</span>
          {quantity === 0 ? (
            <Button 
              onClick={onAddToCart}
              size="sm"
              className="bg-gradient-primary hover:opacity-90"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={onDecrement}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="font-semibold min-w-[2rem] text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={onIncrement}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
