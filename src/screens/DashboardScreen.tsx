import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { format } from "date-fns";

type DashboardScreenProps = {
    navigation: FrameNavigationProp<any, "Dashboard">,
};

export function DashboardScreen({ navigation }: DashboardScreenProps) {
    console.log('DashboardScreen rendering');
    const today = format(new Date(), 'MMM dd, yyyy');


    React.useEffect(() => {
        console.log('DashboardScreen mounted');
    }, []);

    return (
        <scrollView>
            <flexboxLayout className="dashboard-container p-4">
                <label className="text-2xl font-bold mb-4">Dashboard</label>
                <label className="text-lg mb-4">{today}</label>
                
                {/* Quick Stats */}
                <gridLayout columns="*, *" rows="auto, auto, auto" className="mb-4">
                    <stackLayout col={0} row={0} className="stat-card">
                        <label className="text-lg">Today's Sales</label>
                        <label className="text-2xl font-bold">$1,234</label>
                    </stackLayout>
                    <stackLayout col={1} row={0} className="stat-card">
                        <label className="text-lg">Items Sold</label>
                        <label className="text-2xl font-bold">45</label>
                    </stackLayout>
                    <stackLayout col={0} row={1} className="stat-card">
                        <label className="text-lg">Active Customers</label>
                        <label className="text-2xl font-bold text-blue-500">28</label>
                    </stackLayout>
                    <stackLayout col={1} row={1} className="stat-card">
                        <label className="text-lg">Employees</label>
                        <label className="text-2xl font-bold text-green-500">15</label>
                    </stackLayout>
                    <stackLayout col={0} row={2} className="stat-card">
                        <label className="text-lg">Low Stock</label>
                        <label className="text-2xl font-bold text-red-500">3</label>
                    </stackLayout>
                    <stackLayout col={1} row={2} className="stat-card">
                        <label className="text-lg">Active Orders</label>
                        <label className="text-2xl font-bold">12</label>
                    </stackLayout>
                </gridLayout>

                {/* Navigation Buttons */}
                <button 
                    className="nav-button nav-button-sales"
                    onTap={() => navigation.navigate("Sales")}
                >
                    Sales Management
                </button>
                <button 
                    className="nav-button nav-button-inventory"
                    onTap={() => navigation.navigate("Inventory")}
                >
                    Inventory Control
                </button>
                <button 
                    className="nav-button nav-button-analytics"
                    onTap={() => navigation.navigate("Analytics")}
                >
                    Business Analytics
                </button>
                <button 
                    className="nav-button nav-button-crm"
                    onTap={() => navigation.navigate("CRM")}
                >
                    Customer Management
                </button>
                <button 
                    className="nav-button nav-button-employees"
                    onTap={() => navigation.navigate("Employees")}
                >
                    Employee Management
                </button>
            </flexboxLayout>
        </scrollView>
    );
}
