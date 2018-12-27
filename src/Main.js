/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, createContext} from 'react';
import { createAppContainer, createStackNavigator } from "react-navigation"
import LoginScreen from "./screens/Login"

export const { Provider, Consumer } = createContext({ });

const stack = createStackNavigator({ 
    Login: {
        screen: LoginScreen
    }
});

const AppContainer = createAppContainer(stack);

export default class extends Component {
    state = {
        store: {
            APIKey: ""
        },

        actions: { }
    }

    render() {
        return (
            <Provider value={ this.state }>
                <AppContainer/>
            </Provider>
        );
    }
}