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
import GreenIndicator from "../../components/GreenIndicator/GreenIndicator";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            animating: false,
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
            this.setState({ animating: true })
            await this.props.actions.login(this.state.username, this.state.password);
            this.props.navigation.navigate("Home");

        } catch(e) {
            this.setState({ animating: false })
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
                    placeholder="Usuário"
                    onChangeText={username => this.setState({ username: username })} />

                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Senha"
                    onChangeText={password => this.setState({ password: password })} />

                <WhiteBtn onPress={ () => this.login() } text="Login"/>

                {this.state.animating &&
                    <GreenIndicator animating={ this.state.animating } />
                }
            </View>
        );
    }
}

export default HOCMagico(App);