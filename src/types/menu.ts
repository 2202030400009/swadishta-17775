export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt?: Date;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id?: string;
  customerName: string;
  mobile: string;
  tableNumber: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'completed';
  createdAt: Date;
}
