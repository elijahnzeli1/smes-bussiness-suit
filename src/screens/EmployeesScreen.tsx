import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { supabase } from "../services/supabase";

export function EmployeesScreen() {
    const [employees, setEmployees] = React.useState([]);
    const [newEmployee, setNewEmployee] = React.useState({
        name: "",
        position: "",
        email: "",
        phone: ""
    });

    React.useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching employees:', error);
        } else {
            setEmployees(data || []);
        }
    };

    const addEmployee = async () => {
        const { data, error } = await supabase
            .from('employees')
            .insert([newEmployee]);

        if (error) {
            console.error('Error adding employee:', error);
        } else {
            fetchEmployees();
            setNewEmployee({ name: "", position: "", email: "", phone: "" });
        }
    };

    return (
        <scrollView>
            <flexboxLayout className="p-4" style={styles.container}>
                <label className="text-2xl font-bold mb-4">Employee Management</label>

                {/* Add Employee Form */}
                <stackLayout className="bg-white p-4 rounded-lg mb-4">
                    <label className="text-lg mb-2">Add New Employee</label>
                    <textField
                        className="p-2 border-b-2 mb-2"
                        hint="Name"
                        text={newEmployee.name}
                        onTextChange={(e) => setNewEmployee({...newEmployee, name: e.value})}
                    />
                    <textField
                        className="p-2 border-b-2 mb-2"
                        hint="Position"
                        text={newEmployee.position}
                        onTextChange={(e) => setNewEmployee({...newEmployee, position: e.value})}
                    />
                    <textField
                        className="p-2 border-b-2 mb-2"
                        hint="Email"
                        keyboardType="email"
                        text={newEmployee.email}
                        onTextChange={(e) => setNewEmployee({...newEmployee, email: e.value})}
                    />
                    <textField
                        className="p-2 border-b-2 mb-2"
                        hint="Phone"
                        keyboardType="phone"
                        text={newEmployee.phone}
                        onTextChange={(e) => setNewEmployee({...newEmployee, phone: e.value})}
                    />
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onTap={addEmployee}
                    >
                        Add Employee
                    </button>
                </stackLayout>

                {/* Employee List */}
                <stackLayout className="bg-white p-4 rounded-lg">
                    <label className="text-lg mb-2">Employee List</label>
                    <listView items={employees}>
                        <listView.itemTemplate>
                            <stackLayout className="p-2 border-b">
                                <label className="text-lg font-bold">{{ item.name }}</label>
                                <label className="text-md text-blue-500">{{ item.position }}</label>
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