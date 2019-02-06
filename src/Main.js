/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, createContext } from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from "react-navigation"
import LoginScreen from "./screens/Login"
import HomeScreen from "./screens/Home"
import IssuesScreen from "./screens/Issues"
import ProfileScreen from "./screens/Profile"
import { Post } from "./services"
import { AsyncStorage, Alert, Button } from "react-native"

export const { Provider, Consumer } = createContext({ });

const stack = createStackNavigator({ 
    Login: {
        screen: LoginScreen
    }
});

const stackLogged = createBottomTabNavigator({
    Issues: {
        screen: IssuesScreen
    },

    Home: {
        screen: HomeScreen
    },
    
    Profile: {
        screen: ProfileScreen
    },
    
})

const switchStack = createSwitchNavigator({
    stack,
    stackLogged
})

const AppContainer = createAppContainer(switchStack);
const url = "redmine.radixeng.com.br"

const urls = {
    issue: (issue_id) => {
        var urlIssue = "http://" + url + "/issues"

        if(issue_id !== undefined) {
            urlIssue += "/" + issue_id + ".json";

            return urlIssue;
        }

        return urlIssue + ".json";
    },
    login: (usr, psw) => { return "http://" + usr + ":" + psw + "@" + url + "/users/current.json"; },
    time_entries: "http://" + url + "/time_entries.json"
}

function handleError(error) { throw new Error(error) }

export default class extends Component {
    state = {
        store: {
            APIKey: "",
            name: ""
        },

        actions: { 
            login: async (usr, psw) => {
                try {
                    let result = await fetch(urls.login(usr, psw));
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
                    handleError(e.message)

                }
            },

            get_issue: async (issue_id) => {
                try {
                    let headers = { "X-Redmine-API-Key": this.state.store.APIKey };
                    let result = await fetch(urls.issue(issue_id), headers);
        
                    return result;
            
                } catch(e) {
                    handleError(e.message)
            
                }
            },

            time_entry: async (issue_id, hours, date) => {
                try {
                    let arrayDate = date.split("/")
                    let formatedData = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0]
                    let time_entry = {
                        key: this.state.store.APIKey,
                        issue_id: issue_id,
                        hours: hours
                    }

                    if(date !== "") { time_entry.spent_on = formatedData }

                    let res = await Post(urls.time_entries, { time_entry: time_entry });

                    if(res.errors !== undefined) { handleError(res.errors[0]) }

                } catch(e) {
                    handleError(e.message)

                }
            },

            get_issues: async () => {
                try {
                    let headers = { "X-Redmine-API-Key": this.state.store.APIKey };
                    let result = await fetch(urls.issue(), headers)

                    return result
                } catch(e) {
                    handleError(e.message)

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