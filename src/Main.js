/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, createContext } from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation"
import LoginScreen from "./screens/Login"
import HomeScreen from "./screens/Home"
import IssuesScreen from "./screens/Issues"
import { Post } from "./services"
import { AsyncStorage, Alert } from "react-native"

export const { Provider, Consumer } = createContext({ });

const stack = createStackNavigator({ 
    Login: {
        screen: LoginScreen
    }
});

const stackLogged = createStackNavigator({
    Home: {
        screen : HomeScreen
    },

    Issues: {
        screen : IssuesScreen
    }
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

        if(issue_id !== null) {
            urlIssue += "/" + issue_id + ".json";

            return urlIssue;
        }

        return urlIssue + ".json";
    },
    login: (usr, psw) => { return "http://" + usr + ":" + psw + "@" + url + "/users/current.json"; },
    time_entries: "http://" + url + "/time_entries.json"
}

export default class extends Component {
    async get_issue(issue_id) {
        try {
            let headers = { "X-Redmine-API-Key": this.state.store.APIKey };
            let result = await fetch(urls.issue(issue_id), headers);

            return result;
    
        } catch(e) {
            throw new Error(e.message);
    
        }
    }

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
                    throw new Error(e.message);

                }
            },

            time_entry: async (issue_id, hours) => {
                try {
                    let issue = await this.get_issue(issue_id);
                    let json = issue.json();
                    let message = "Deseja lançar " + hours + " horas na tarefa:\n" + 
                    json.project.name + "\n" + json.subject + "?"

                    Alert.alert("Atenção", message, [
                        {
                            text: "Cancelar",
                            onPress: () => { }
                        },
                        {
                            text: "Lançar",
                            onPress: async () => {
                                await Post(urls.time_entries, {
                                    time_entry: {
                                        key: this.state.store.APIKey,
                                        issue_id: issue_id,
                                        hours: hours
                                    }
                                });
                            }
                        }
                    ]);

                } catch(e) {    
                    throw new Error(e.message);

                }
            },

            get_issues: async () => {
                try {
                    let headers = { "X-Redmine-API-Key": this.state.store.APIKey };
                    let result = await fetch(urls.issue(), headers)

                } catch(e) {
                    throw new Error(e.message);

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