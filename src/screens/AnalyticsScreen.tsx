import * as React from "react";
import { supabase } from "../services/supabase";
import { format } from "date-fns";

export function AnalyticsScreen() {
    const [metrics, setMetrics] = React.useState({
        totalSales: 0,
        averageOrderValue: 0,
        totalCustomers: 0,
        totalInventoryValue: 0
    });

    React.useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            // Fetch total sales
            const { data: salesData, error: salesError } = await supabase
                .from('sales')
                .select('amount');
            
            // Fetch total customers
            const { count: customerCount, error: customerError } = await supabase
                .from('customers')
                .select('*', { count: 'exact' });

            // Fetch inventory value
            const { data: inventoryData, error: inventoryError } = await supabase
                .from('inventory')
                .select('quantity, price');

            if (salesError || customerError || inventoryError) {
                console.error('Error fetching analytics:', { salesError, customerError, inventoryError });
                return;
            }

            // Calculate metrics
            const totalSales = salesData?.reduce((sum, sale) => sum + sale.amount, 0) || 0;
            const averageOrderValue = salesData?.length ? totalSales / salesData.length : 0;
            const totalInventoryValue = inventoryData?.reduce((sum, item) => sum + (item.quantity * item.price), 0) || 0;

            setMetrics({
                totalSales,
                averageOrderValue,
                totalCustomers: customerCount || 0,
                totalInventoryValue
            });

        } catch (error) {
            console.error('Error in analytics calculation:', error);
        }
    };

    return (
        <scrollView>
            <flexboxLayout className="analytics-container p-4">
                <label className="text-2xl font-bold mb-4">Business Analytics</label>

                {/* Key Metrics */}
                <gridLayout columns="*, *" rows="auto, auto" className="mb-4">
                    <stackLayout col={0} row={0} className="metric-card">
                        <label className="metric-title">Total Sales</label>
                        <label className="metric-value metric-value-sales">
                            ${metrics.totalSales.toFixed(2)}
                        </label>
                    </stackLayout>
                    <stackLayout col={1} row={0} className="metric-card">
                        <label className="metric-title">Avg Order Value</label>
                        <label className="metric-value metric-value-order">
                            ${metrics.averageOrderValue.toFixed(2)}
                        </label>
                    </stackLayout>
                    <stackLayout col={0} row={1} className="metric-card">
                        <label className="metric-title">Total Customers</label>
                        <label className="metric-value metric-value-customers">
                            {metrics.totalCustomers}
                        </label>
                    </stackLayout>
                    <stackLayout col={1} row={1} className="metric-card">
                        <label className="metric-title">Inventory Value</label>
                        <label className="metric-value metric-value-inventory">
                            ${metrics.totalInventoryValue.toFixed(2)}
                        </label>
                    </stackLayout>
                </gridLayout>

                <button
                    className="refresh-button"
                    onTap={fetchAnalytics}
                >
                    Refresh Analytics
                </button>
            </flexboxLayout>
        </scrollView>
    );
}