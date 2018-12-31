/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, createContext} from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation"
import LoginScreen from "./screens/Login"
import HomeScreen from "./screens/Home"
import { Post } from "./services"
import { AsyncStorage } from "react-native"

export const { Provider, Consumer } = createContext({ });

const stack = createStackNavigator({ 
    Login: {
        screen: LoginScreen
    }
});

const stackLogged = createStackNavigator({
    Home: {
        screen : HomeScreen
    }
})

const switchStack = createSwitchNavigator({
    stack,
    stackLogged
})

const AppContainer = createAppContainer(switchStack);

export default class extends Component {
    state = {
        store: {
            APIKey: "",
            name: ""
        },

        actions: { 
            login: async (usr, psw) => {
                try {
                    let result = await fetch("http://" + usr + ":" + psw + 
                    "@redmine.radixeng.com.br/users/current.json");

                    let json = await result.json();

                    this.setState({ 
                        store: { 
                            APIKey: json.user.api_key,
                            name: json.user.firstname
                        } 
                    });

                    await AsyncStorage.setItem("user", JSON.stringify({
                        api_key: json.user.api_key, 
                        name: json.user.firstname
                    }));

                } catch(e) {
                    throw new Error(e.message);

                }
            },

            time_entry: async (issue_id, hours) => {
                try {
                    let result = await Post("http://redmine.radixeng.com.br/time_entries.json", {
                        time_entry: {
                            key: this.state.store.APIKey,
                            issue_id: issue_id,
                            hours: hours
                        }
                    });

                    console.log(result);

                } catch(e) {
                    console.log(e);

                }
            },

            updateKey: key => {
                this.setState({ store: { APIKey: key.api_key, name: key.name } })
            },

            logout: async () => {
                this.setState({ store: { APIKey: "", name: "" } });
                await AsyncStorage.setItem("user", "");
            }
        }
    }

    render() {
        return (
            <Provider value={ this.state }>
                <AppContainer/>
            </Provider>
        );
    }
}