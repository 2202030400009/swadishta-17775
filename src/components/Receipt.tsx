import { QRCodeSVG } from 'qrcode.react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/menu";
import { formatCurrency } from "@/utils/currency";
import { format } from "date-fns";
import restaurantLogo from "@/assets/restaurant-logo.png";
import { Printer, Home } from "lucide-react";

interface ReceiptProps {
  order: Order;
  onBack: () => void;
}

export const Receipt = ({ order, onBack }: ReceiptProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="print:hidden mb-6 flex gap-3">
        <Button variant="outline" onClick={onBack}>
          <Home className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>
        <Button onClick={handlePrint} className="bg-gradient-primary">
          <Printer className="w-4 h-4 mr-2" />
          Print Receipt
        </Button>
      </div>

      <Card className="p-8 shadow-elevated" id="receipt">
        <div className="text-center mb-6">
          <img 
            src={restaurantLogo} 
            alt="Swadishta Logo" 
            className="w-24 h-24 mx-auto mb-3"
          />
          <h1 className="text-3xl font-bold text-primary">Swadishta</h1>
          <p className="text-muted-foreground">Premium Indian Cuisine</p>
        </div>

        <div className="border-y py-4 mb-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order ID:</span>
            <span className="font-mono font-semibold">#{order.id?.slice(-8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span>{format(order.createdAt, 'PPp')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Customer:</span>
            <span className="font-medium">{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Mobile:</span>
            <span>{order.mobile}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Table:</span>
            <span className="font-medium">{order.tableNumber}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-lg">Order Items</h3>
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left text-sm text-muted-foreground">
                <th className="pb-2">Item</th>
                <th className="pb-2 text-center">Qty</th>
                <th className="pb-2 text-right">Price</th>
                <th className="pb-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {order.items.map((item, index) => (
                <tr key={index} className="text-sm">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                  <td className="py-2 text-right font-medium">{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between text-xl font-bold">
            <span>Total Payable:</span>
            <span className="text-primary">{formatCurrency(order.totalAmount)}</span>
          </div>
        </div>

        <div className="text-center pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-4">Scan QR Code for Order Details</p>
          <div className="flex justify-center">
            <QRCodeSVG 
              value={JSON.stringify({
                orderId: order.id,
                total: order.totalAmount,
                date: order.createdAt.toISOString()
              })}
              size={150}
              level="H"
            />
          </div>
        </div>

        <div className="text-center mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground">Thank you for dining with us!</p>
          <p className="text-xs text-muted-foreground mt-1">Visit again soon</p>
        </div>
      </Card>
    </div>
  );
};
