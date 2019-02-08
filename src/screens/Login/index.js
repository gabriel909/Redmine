/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View, TextInput, AsyncStorage, Alert } from "react-native";
import styles from "../../style/styles"
import HOCMagico from "../../HOCs/Magico"
import WhiteBtn from "../../components/WhiteBtn/WhiteBtn";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    async componentDidMount() {
        try {
            let key = await AsyncStorage.getItem("user");
            key = JSON.parse(key);

            if(key !== null) {
                this.props.actions.updateKey(key);
                this.props.navigation.navigate("Home");
            }
        } catch(e) {
            console.log(e);

        }
    }

    async login() {
        try {
            await this.props.actions.login(this.state.username, this.state.password);
            this.props.navigation.navigate("Home");

        } catch(e) {
            Alert.alert("Erro", e.message);

        }
    }

    render() {
        return (
            <View style={styles.innerContainer}>
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

                <WhiteBtn onPress={ () => this.login() } text="Login"/>
            </View>
        );
    }
}

export default HOCMagico(App);