import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MenuCard } from "@/components/MenuCard";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Receipt } from "@/components/Receipt";
import { LogoIntro } from "@/components/LogoIntro";
import { MenuItem, CartItem, Order } from "@/types/menu";
import { useToast } from "@/hooks/use-toast";
import restaurantLogo from "@/assets/restaurant-logo.png";

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const q = query(collection(db, "menuItems"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      setMenuItems(items);
    } catch (error) {
      console.error("Error loading menu:", error);
      toast({
        title: "Error",
        description: "Failed to load menu. Please check Firebase configuration.",
        variant: "destructive"
      });
    }
  };

  const getItemQuantity = (itemId: string) => {
    return cart.find(item => item.id === itemId)?.quantity || 0;
  };

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
      setCart(cart.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const incrementItem = (itemId: string) => {
    setCart(cart.map(item => 
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementItem = (itemId: string) => {
    const item = cart.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      setCart(cart.map(i => 
        i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      ));
    } else {
      setCart(cart.filter(i => i.id !== itemId));
    }
  };

  const removeItem = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleCheckout = async (customerData: { customerName: string; mobile: string; tableNumber: string }) => {
    try {
      const order: Omit<Order, 'id'> = {
        ...customerData,
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'pending',
        createdAt: new Date()
      };

      const docRef = await addDoc(collection(db, "orders"), order);
      setCurrentOrder({ ...order, id: docRef.id });
      setCart([]);
      setIsCheckout(false);
      
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been received."
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (showIntro) {
    return <LogoIntro onComplete={() => setShowIntro(false)} />;
  }

  if (currentOrder) {
    return <Receipt order={currentOrder} onBack={() => setCurrentOrder(null)} />;
  }

  if (isCheckout) {
    return (
      <CheckoutForm
        cart={cart}
        onSubmit={handleCheckout}
        onBack={() => setIsCheckout(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <header className="bg-card shadow-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={restaurantLogo} alt="Swadishta" className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold text-primary">Swadishta</h1>
                <p className="text-sm text-muted-foreground">Premium Indian Cuisine</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              quantity={getItemQuantity(item.id)}
              onAddToCart={() => addToCart(item)}
              onIncrement={() => incrementItem(item.id)}
              onDecrement={() => decrementItem(item.id)}
            />
          ))}
        </div>

        {menuItems.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No menu items available. Please contact admin to add items.</p>
          </div>
        )}
      </main>

      <CartDrawer
        cart={cart}
        onRemoveItem={removeItem}
        onCheckout={() => setIsCheckout(true)}
      />
    </div>
  );
};

export default Menu;
