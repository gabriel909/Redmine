import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import WhiteBtn from "../../components/WhiteBtn/WhiteBtn"
import HOCMagico from "../../HOCs/Magico"
import styles from "../../style/styles";

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
                <WhiteBtn onPress={ () => this.logout() } text="Sair"/>
            </View>
        );
    }
}

export default HOCMagico(Profile);