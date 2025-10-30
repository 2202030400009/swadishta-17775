import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LiveOrders } from "@/components/admin/LiveOrders";
import { MenuManagement } from "@/components/admin/MenuManagement";
import { OrderHistory } from "@/components/admin/OrderHistory";
import { Analysis } from "@/components/admin/Analysis";
import { MenuItem, Order } from "@/types/menu";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import restaurantLogo from "@/assets/restaurant-logo.png";

const Admin = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load menu items
      const menuQuery = query(collection(db, "menuItems"), orderBy("createdAt", "desc"));
      const menuSnapshot = await getDocs(menuQuery);
      const items = menuSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      })) as MenuItem[];
      setMenuItems(items);

      // Load orders
      const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const ordersSnapshot = await getDocs(ordersQuery);
      const loadedOrders = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      })) as Order[];
      setOrders(loadedOrders);
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load data. Please check Firebase configuration.",
        variant: "destructive"
      });
    }
  };

  const handleAddMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      await addDoc(collection(db, "menuItems"), {
        ...item,
        createdAt: new Date()
      });
      await loadData();
      toast({ title: "Success", description: "Menu item added successfully" });
    } catch (error) {
      console.error("Error adding item:", error);
      toast({ title: "Error", description: "Failed to add menu item", variant: "destructive" });
    }
  };

  const handleUpdateMenuItem = async (id: string, item: Omit<MenuItem, 'id'>) => {
    try {
      await updateDoc(doc(db, "menuItems", id), item);
      await loadData();
      toast({ title: "Success", description: "Menu item updated successfully" });
    } catch (error) {
      console.error("Error updating item:", error);
      toast({ title: "Error", description: "Failed to update menu item", variant: "destructive" });
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "menuItems", id));
      await loadData();
      toast({ title: "Success", description: "Menu item deleted successfully" });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({ title: "Error", description: "Failed to delete menu item", variant: "destructive" });
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: 'completed' });
      await loadData();
      toast({ title: "Success", description: "Order marked as complete" });
    } catch (error) {
      console.error("Error completing order:", error);
      toast({ title: "Error", description: "Failed to complete order", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-card border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={restaurantLogo} alt="Swadishta" className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Swadishta Management</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="orders">Live Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <LiveOrders orders={orders} onCompleteOrder={handleCompleteOrder} />
          </TabsContent>

          <TabsContent value="menu">
            <MenuManagement
              menuItems={menuItems}
              onAddItem={handleAddMenuItem}
              onUpdateItem={handleUpdateMenuItem}
              onDeleteItem={handleDeleteMenuItem}
            />
          </TabsContent>

          <TabsContent value="history">
            <OrderHistory orders={orders} />
          </TabsContent>

          <TabsContent value="analysis">
            <Analysis orders={orders} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
