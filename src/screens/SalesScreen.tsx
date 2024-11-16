import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { ItemEventData } from "@nativescript/core";
import { ListView } from "react-nativescript";
import { supabase } from "../services/supabase";

interface Sale {
    id?: number;
    amount: number;
    date: string;
}

export function SalesScreen() {
    const [amount, setAmount] = React.useState("");
    const [items, setItems] = React.useState<Sale[]>([]);

    React.useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        const { data: salesData, error: fetchError } = await supabase
            .from('sales')
            .select('*')
            .order('date', { ascending: false });

        if (fetchError) {
            console.error('Error fetching sales:', fetchError);
        } else {
            setItems(salesData || []);
        }
    };

    const recordSale = async () => {
        if (!amount) {
            console.error('Amount is required');
            return;
        }

        const saleData = {
            amount: parseFloat(amount),
            date: new Date().toISOString()
        };

        const { error } = await supabase
            .from('sales')
            .insert([saleData]);

        if (error) {
            console.error('Error recording sale:', error);
        } else {
            setAmount('');
            fetchSales();
        }
    };

    const cellFactory = (item: Sale) => {
        return (
            <stackLayout className="p-2 border-b">
                <label className="text-lg">${item.amount.toFixed(2)}</label>
                <label className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                </label>
            </stackLayout>
        );
    };

    return (
        <scrollView>
            <flexboxLayout className="container p-4">
                <label className="text-2xl font-bold mb-4">Sales Management</label>

                {/* New Sale Form */}
                <stackLayout className="bg-white p-4 rounded-lg mb-4">
                    <label className="text-lg mb-2">Record New Sale</label>
                    <textField
                        className="p-2 border-b-2 mb-2"
                        hint="Enter amount"
                        keyboardType="number"
                        text={amount}
                        onTextChange={(e) => setAmount(e.value)}
                    />
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onTap={recordSale}
                    >
                        Record Sale
                    </button>
                </stackLayout>

                {/* Recent Sales List */}
                <stackLayout className="bg-white p-4 rounded-lg">
                    <label className="text-lg mb-2">Recent Sales</label>
                    <ListView
                        items={items}
                        cellFactory={cellFactory}
                        onItemTap={(args: ItemEventData) => {
                            console.log('Selected sale:', items[args.index]);
                        }}
                    />
                </stackLayout>
            </flexboxLayout>
        </scrollView>
    );
}
