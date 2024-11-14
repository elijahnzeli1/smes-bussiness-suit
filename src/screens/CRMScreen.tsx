import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { supabase } from "../services/supabase";

export function CRMScreen() {
    const [customers, setCustomers] = React.useState([]);
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
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching customers:', error);
        } else {
            setCustomers(data || []);
        }
    };

    const addCustomer = async () => {
        const { data, error } = await supabase
            .from('customers')
            .insert([newCustomer]);

        if (error) {
            console.error('Error adding customer:', error);
        } else {
            fetchCustomers();
            setNewCustomer({ name: "", email: "", phone: "" });
        }
    };

    return (
        <scrollView>
            <flexboxLayout className="p-4" style={styles.container}>
                <label className="text-2xl font-bold mb-4">Customer Management</label>

                {/* Add Customer Form */}
                <stackLayout className="bg-white p-4 rounded-lg mb-4">
                    <label className="text-lg mb-2">Add New Customer</label>
                    <textField
                        className="p-2 border-b-2 mb-2"
                        hint="Name"
                        text={newCustomer.name}
                        onTextChange={(e) => setNewCustomer({...newCustomer, name: e.value})}
                    />
                    <textField
                        className="p-2 border-b-2 mb-2"
                        hint="Email"
                        keyboardType="email"
                        text={newCustomer.email}
                        onTextChange={(e) => setNewCustomer({...newCustomer, email: e.value})}
                    />
                    <textField
                        className="p-2 border-b-2 mb-2"
                        hint="Phone"
                        keyboardType="phone"
                        text={newCustomer.phone}
                        onTextChange={(e) => setNewCustomer({...newCustomer, phone: e.value})}
                    />
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onTap={addCustomer}
                    >
                        Add Customer
                    </button>
                </stackLayout>

                {/* Customer List */}
                <stackLayout className="bg-white p-4 rounded-lg">
                    <label className="text-lg mb-2">Customer List</label>
                    <listView items={customers}>
                        <listView.itemTemplate>
                            <stackLayout className="p-2 border-b">
                                <label className="text-lg font-bold">{{ item.name }}</label>
                                <label className="text-sm">{{ item.email }}</label>
                                <label className="text-sm text-gray-500">{{ item.phone }}</label>
                            </stackLayout>
                        </listView.itemTemplate>
                    </listView>
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