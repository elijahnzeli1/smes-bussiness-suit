import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type ScreenOneProps = {
    route: RouteProp<MainStackParamList, "ScreenOne">,
    navigation: FrameNavigationProp<MainStackParamList, "ScreenOne">,
};

export function ScreenOne({ navigation }: ScreenOneProps) {
    return (
        <flexboxLayout className="screen-one-container">
            <label className="text-2xl mb-4 font-bold text-center">
                Hello World!
            </label>
            <button
                className="screen-one-button"
                onTap={() => Dialogs.alert("Tapped!")}
            >
                Tap me for an alert
            </button>
            <button
                className="screen-one-button"
                onTap={() => navigation.navigate("ScreenTwo", { message: "Hello, world!" })}
            >
                Go to next screen
            </button>
        </flexboxLayout>
    );
}
