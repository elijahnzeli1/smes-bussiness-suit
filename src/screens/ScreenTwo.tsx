import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type ScreenTwoProps = {
    route: RouteProp<MainStackParamList, "ScreenTwo">,
    navigation: FrameNavigationProp<MainStackParamList, "ScreenTwo">,
};

export function ScreenTwo({ navigation, route }: ScreenTwoProps) {
    return (
        <flexboxLayout className="screen-two-container">
            <label className="screen-two-text">
                You're viewing screen two!
            </label>
            <label className="screen-two-text">
                Message: {route.params?.message ?? 'No message provided'}
            </label>
            <button
                className="screen-two-button"
                onTap={() => navigation.goBack()}
            >
                Go back
            </button>
        </flexboxLayout>
    );
}
