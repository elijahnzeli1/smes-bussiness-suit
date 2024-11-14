import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { format } from "date-fns";

type DashboardScreenProps = {
    navigation: FrameNavigationProp<any, "Dashboard">,
};

export function DashboardScreen({ navigation }: DashboardScreenProps) {
    const today = format(new Date(), 'MMM dd, yyyy');

    return (
        <scrollView>
            <flexboxLayout className="p-4" style={styles.container}>
                <label className="text-2xl font-bold mb-4">Dashboard</label>
                <label className="text-lg mb-4">{today}</label>
                
                {/* Quick Stats */}
                <gridLayout columns="*, *" rows="auto, auto, auto" className="mb-4">
                    <stackLayout col="0" row="0" className="p-2 m-1 bg-white rounded-lg">
                        <label className="text-lg">Today's Sales</label>
                        <label className="text-2xl font-bold">$1,234</label>
                    </stackLayout>
                    <stackLayout col="1" row="0" className="p-2 m-1 bg-white rounded-lg">
                        <label className="text-lg">Items Sold</label>
                        <label className="text-2xl font-bold">45</label>
                    </stackLayout>
                    <stackLayout col="0" row="1" className="p-2 m-1 bg-white rounded-lg">
                        <label className="text-lg">Active Customers</label>
                        <label className="text-2xl font-bold text-blue-500">28</label>
                    </stackLayout>
                    <stackLayout col="1" row="1" className="p-2 m-1 bg-white rounded-lg">
                        <label className="text-lg">Employees</label>
                        <label className="text-2xl font-bold text-green-500">15</label>
                    </stackLayout>
                    <stackLayout col="0" row="2" className="p-2 m-1 bg-white rounded-lg">
                        <label className="text-lg">Low Stock</label>
                        <label className="text-2xl font-bold text-red-500">3</label>
                    </stackLayout>
                    <stackLayout col="1" row="2" className="p-2 m-1 bg-white rounded-lg">
                        <label className="text-lg">Active Orders</label>
                        <label className="text-2xl font-bold">12</label>
                    </stackLayout>
                </gridLayout>

                {/* Navigation Buttons */}
                <button 
                    className="bg-blue-500 text-white p-4 rounded-lg mb-2"
                    onTap={() => navigation.navigate("Sales")}
                >
                    Sales Management
                </button>
                <button 
                    className="bg-green-500 text-white p-4 rounded-lg mb-2"
                    onTap={() => navigation.navigate("Inventory")}
                >
                    Inventory Control
                </button>
                <button 
                    className="bg-purple-500 text-white p-4 rounded-lg mb-2"
                    onTap={() => navigation.navigate("Analytics")}
                >
                    Business Analytics
                </button>
                <button 
                    className="bg-orange-500 text-white p-4 rounded-lg mb-2"
                    onTap={() => navigation.navigate("CRM")}
                >
                    Customer Management
                </button>
                <button 
                    className="bg-teal-500 text-white p-4 rounded-lg"
                    onTap={() => navigation.navigate("Employees")}
                >
                    Employee Management
                </button>
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