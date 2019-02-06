import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import HOCMagico from "../../HOCs/Magico"
import styles from "../../styles";

class Profile extends Component {
    constructor(props) { 
        super(props);
    }

    logout() {
        this.props.actions.logout()
        this.props.navigation.navigate("Login") 
    }

    render() {
        return (
            <View style={ styles.innerContainer }>
                <TouchableOpacity onPress={ () => this.logout() } style={ styles.opacity }>
                    <Text style={ styles.purpleBtn }>Sair</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default HOCMagico(Profile);