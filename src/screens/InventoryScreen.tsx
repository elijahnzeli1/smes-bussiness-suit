import * as React from "react";
import { StyleSheet, ListView } from "react-nativescript";
import { supabase } from "../services/supabase";

interface InventoryItem {
    id?: number;
    name: string;
    quantity: number;
    price: number;
    category: string;
}

export function InventoryScreen() {
    const [inventory, setInventory] = React.useState<InventoryItem[]>([]);
    const [newItem, setNewItem] = React.useState({
        name: "",
        quantity: "",
        price: "",
        category: ""
    });

    React.useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching inventory:', error);
        } else {
            setInventory(data || []);
        }
    };

    const addItem = async () => {
        const { data, error } = await supabase
            .from('inventory')
            .insert([{
                ...newItem,
                quantity: parseInt(newItem.quantity),
                price: parseFloat(newItem.price)
            }]);

        if (error) {
            console.error('Error adding item:', error);
        } else {
            fetchInventory();
            setNewItem({ name: "", quantity: "", price: "", category: "" });
        }
    };

    return (
        <scrollView>
            <flexboxLayout className="p-4">
                <label className="text-2xl font-bold mb-4">Inventory Management</label>

                {/* Add Item Form */}
                <stackLayout className="bg-white p-4 rounded-lg mb-4">
                    <label className="text-lg mb-2">Add New Item</label>
                    <textField
                        className="p-2 border-b-2 mb-2"
                        hint="Item Name"
                        text={newItem.name}
                        onTextChange={(e) => setNewItem({...newItem, name: e.value})}
                    />
                    <textField
                        className="p-2 border-b-2 mb-2"
                        hint="Quantity"
                        keyboardType="number"
                        text={newItem.quantity}
                        onTextChange={(e) => setNewItem({...newItem, quantity: e.value})}
                    />
                    <textField
                        className="p-2 border-b-2 mb-2"
                        hint="Price"
                        keyboardType="number"
                        text={newItem.price}
                        onTextChange={(e) => setNewItem({...newItem, price: e.value})}
                    />
                    <textField
                        className="p-2 border-b-2 mb-2"
                        hint="Category"
                        text={newItem.category}
                        onTextChange={(e) => setNewItem({...newItem, category: e.value})}
                    />
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onTap={addItem}
                    >
                        Add Item
                    </button>
                </stackLayout>

                {/* Inventory List */}
                <stackLayout className="bg-white p-4 rounded-lg">
                    <label className="text-lg mb-2">Current Inventory</label>
                    <ListView
    items={inventory}
    cellFactory={(item: InventoryItem) => {
        return (
            <stackLayout className="p-2 border-b">
                <label className="text-lg font-bold">{item.name}</label>
                <label className="text-md text-blue-500">Category: {item.category}</label>
                <label className="text-sm">Quantity: {item.quantity}</label>
                <label className="text-sm text-gray-500">Price: ${item.price}</label>
            </stackLayout>
        );
    }}
/>
                </stackLayout>
            </flexboxLayout>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
    }
});