import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { DashboardScreen } from "../screens/DashboardScreen";
import { SalesScreen } from "../screens/SalesScreen";
import { InventoryScreen } from "../screens/InventoryScreen";
import { AnalyticsScreen } from "../screens/AnalyticsScreen";
import { CRMScreen } from "../screens/CRMScreen.tsx";
import { EmployeesScreen } from "../screens/EmployeesScreen";
import { ScreenOne } from "../screens/ScreenOne";
import { ScreenTwo } from "../screens/ScreenTwo";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#f8f9fa",
                },
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Dashboard"
                component={DashboardScreen}
            />
            <StackNavigator.Screen
                name="Sales"
                component={SalesScreen}
            />
            <StackNavigator.Screen
                name="Inventory"
                component={InventoryScreen}
            />
            <StackNavigator.Screen
                name="Analytics"
                component={AnalyticsScreen}
            />
            <StackNavigator.Screen
                name="CRM"
                component={CRMScreen}
            />
            <StackNavigator.Screen
                name="Employees"
                component={EmployeesScreen}
            />
            <StackNavigator.Screen
                name="ScreenOne"
                component={ScreenOne}
            />
            <StackNavigator.Screen
                name="ScreenTwo"
                component={ScreenTwo}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);