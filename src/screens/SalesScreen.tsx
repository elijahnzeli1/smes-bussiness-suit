import * as React from "react";
import { StyleSheet } from "react-nativescript";

export function SalesScreen() {
    const [amount, setAmount] = React.useState("");
    const [items, setItems] = React.useState([]);

    const recordSale = () => {
        // TODO: Implement sale recording logic with Supabase
        console.log("Recording sale:", amount);
    };

    return (
        <scrollView>
            <flexboxLayout className="p-4" style={styles.container}>
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
                    <listView items={items}>
                        <listView.itemTemplate>
                            <stackLayout className="p-2 border-b">
                                <label className="text-lg">{{ item.amount }}</label>
                                <label className="text-sm text-gray-500">{{ item.date }}</label>
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