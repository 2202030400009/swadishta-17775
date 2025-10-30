import { Card } from "@/components/ui/card";
import { Order } from "@/types/menu";
import { formatCurrency } from "@/utils/currency";
import { BarChart3, TrendingUp, Award, DollarSign } from "lucide-react";
import { format, isToday } from "date-fns";

interface AnalysisProps {
  orders: Order[];
}

export const Analysis = ({ orders }: AnalysisProps) => {
  const completedOrders = orders.filter(order => order.status === 'completed');
  
  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  const todayRevenue = completedOrders
    .filter(order => isToday(order.createdAt))
    .reduce((sum, order) => sum + order.totalAmount, 0);

  // Calculate item sales
  const itemSales = new Map<string, number>();
  completedOrders.forEach(order => {
    order.items.forEach(item => {
      const current = itemSales.get(item.name) || 0;
      itemSales.set(item.name, current + item.quantity);
    });
  });

  const sortedItems = Array.from(itemSales.entries())
    .sort((a, b) => b[1] - a[1]);
  
  const topSellingItem = sortedItems[0] || ['No sales yet', 0];

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Sales Analysis</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-muted-foreground">Total Revenue</h3>
          </div>
          <p className="text-3xl font-bold text-primary">{formatCurrency(totalRevenue)}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent/10">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-semibold text-muted-foreground">Today's Sales</h3>
          </div>
          <p className="text-3xl font-bold text-accent">{formatCurrency(todayRevenue)}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-success/10">
              <Award className="w-5 h-5 text-success" />
            </div>
            <h3 className="font-semibold text-muted-foreground">Top Selling Item</h3>
          </div>
          <p className="text-xl font-bold">{topSellingItem[0]}</p>
          <p className="text-sm text-muted-foreground">{topSellingItem[1]} sold</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Items Sales Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-3 font-semibold">Item Name</th>
                <th className="pb-3 font-semibold text-right">Total Quantity Sold</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedItems.length === 0 ? (
                <tr>
                  <td colSpan={2} className="py-8 text-center text-muted-foreground">
                    No sales data available
                  </td>
                </tr>
              ) : (
                sortedItems.map(([name, quantity]) => (
                  <tr key={name}>
                    <td className="py-3">{name}</td>
                    <td className="py-3 text-right font-semibold">{quantity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
