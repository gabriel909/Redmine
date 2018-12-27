/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { Consumer } from "../../Main";

const HOCMagico = Component => props => (
    <Consumer>{
      ({ store, actions }) => (
        <Component {...props} store={store} actions={actions} />
      )}
    </Consumer>
);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={username => this.setState({ username: username })} />

                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={password => this.setState({ password: password })} />

                <Button onPress={ () => this.props.actions.login(this.state.username, this.state.password) } title="Login" />
            </View>
        );
    }
}

export default HOCMagico(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },

    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },

    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    },

    textInput: {
        height: 20,
        width: 200,
        marginBottom: 15,
        borderColor: "black",
        borderWidth: 1
    }
});
