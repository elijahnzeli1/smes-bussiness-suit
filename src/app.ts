import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';

// Import all styles
import "./styles/screen-two.css";
import "./styles/analytics.css";
import "./styles/dashboard.css";
import "./styles/sales.css";
import "./styles/employees.css";
import "./styles/screen-one.css";

// Controls react-nativescript log verbosity
Object.defineProperty(global, '__DEV__', { value: false });

try {
    ReactNativeScript.start(React.createElement(MainStack, {}, null));
} catch (error) {
    console.error('Failed to start application:', error);
}

// Do not place any code after the application has been started as it will not
// be executed on iOS.
