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
import HomeScreen from "./screens/Home"
import { Post } from "./services"

export const { Provider, Consumer } = createContext({ });

const stack = createStackNavigator({ 
    Login: {
        screen: LoginScreen
    },

    Home: {
        screen : HomeScreen
    }
});

const AppContainer = createAppContainer(stack);

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

                    console.log(json.user.firstname);

                    this.setState({ 
                        store: { 
                            APIKey: json.user.api_key,
                            name: json.user.firstname
                        } 
                    });

                } catch(e) {
                    console.log(e);

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