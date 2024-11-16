import * as React from "react";
import { ListView } from "react-nativescript";
import { supabase } from "../services/supabase";

interface Customer {
    id?: number;
    name: string;
    email: string;
    phone: string;
}

export function CRMScreen() {
    const [customers, setCustomers] = React.useState<Customer[]>([]);
    const [newCustomer, setNewCustomer] = React.useState({
        name: "",
        email: "",
        phone: ""
    });

    React.useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching customers:', error);
        } else {
            setCustomers(data || []);
        }
    };

    const cellFactory = (item: Customer) => {
        return (
            <stackLayout className="p-2 border-b">
                <label className="text-lg font-bold">{item.name}</label>
                <label className="text-sm">{item.email}</label>
                <label className="text-sm text-gray-500">{item.phone}</label>
            </stackLayout>
        );
    };

    return (
        <scrollView>
            <flexboxLayout className="container p-4">
                <label className="text-2xl font-bold mb-4">Customer Management</label>

                {/* Customer List */}
                <stackLayout className="bg-white p-4 rounded-lg">
                    <label className="text-lg mb-2">Customer List</label>
                    <ListView
                        items={customers}
                        cellFactory={cellFactory}
                    />
                </stackLayout>
            </flexboxLayout>
        </scrollView>
    );
}