import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import HOCMagico from "../../HOCs/Magico"
import styles from "../../styles";

class Profile extends Component {
    constructor(props) { 
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Profile</Text>
            </View>
        );
    }
}

export default HOCMagico(Profile);