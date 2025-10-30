import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Order } from "@/types/menu";
import { formatCurrency } from "@/utils/currency";
import { format } from "date-fns";
import { History, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Receipt } from "@/components/Receipt";

interface OrderHistoryProps {
  orders: Order[];
}

export const OrderHistory = ({ orders }: OrderHistoryProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const completedOrders = orders
    .filter(order => order.status === 'completed')
    .filter(order => {
      if (!selectedDate) return true;
      const orderDate = format(order.createdAt, 'yyyy-MM-dd');
      return orderDate === selectedDate;
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <History className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Order History</h2>
      </div>

      <Card className="p-4 mb-6">
        <Label htmlFor="date-filter">Filter by Date</Label>
        <Input
          id="date-filter"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="max-w-xs mt-2"
        />
      </Card>

      {completedOrders.length === 0 ? (
        <Card className="p-12 text-center">
          <History className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No completed orders</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {completedOrders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{order.customerName}</h3>
                    <Badge variant="outline">Table {order.tableNumber}</Badge>
                    <Badge className="bg-success">Completed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {format(order.createdAt, 'PPp')}
                  </p>
                  <p className="text-sm">
                    {order.items.length} items • {formatCurrency(order.totalAmount)}
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Receipt
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Order Receipt</DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                      <Receipt order={selectedOrder} onBack={() => {}} />
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
