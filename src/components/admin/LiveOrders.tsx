import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/menu";
import { formatCurrency } from "@/utils/currency";
import { Check, Clock } from "lucide-react";

interface LiveOrdersProps {
  orders: Order[];
  onCompleteOrder: (orderId: string) => void;
}

export const LiveOrders = ({ orders, onCompleteOrder }: LiveOrdersProps) => {
  const pendingOrders = orders.filter(order => order.status === 'pending');

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Live Orders</h2>
        <Badge variant="secondary" className="ml-2">{pendingOrders.length}</Badge>
      </div>

      {pendingOrders.length === 0 ? (
        <Card className="p-12 text-center">
          <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No pending orders</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pendingOrders.map((order) => (
            <Card key={order.id} className="p-4 shadow-card">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{order.customerName}</h3>
                  <p className="text-sm text-muted-foreground">{order.mobile}</p>
                </div>
                <Badge>Table {order.tableNumber}</Badge>
              </div>
              
              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 mb-4">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-primary">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>

              <Button 
                onClick={() => order.id && onCompleteOrder(order.id)}
                className="w-full bg-success hover:bg-success/90"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
