import React, { Component } from "react";
import { Text, View, Button, TextInput } from "react-native";
import HOCMagico from "../../HOCs/Magico"
import styles from "../../style/styles";
import WhiteBtn from "../../components/WhiteBtn/WhiteBtn";

class Issues extends Component {
    constructor(props) { super(props); }

    async get_issues() {
        try {
            let res = await this.props.actions.get_issues()

        } catch(e) {
            Alert.alert(e.message);

        }
    }

    render() {
        return (
            <View style={ styles.innerContainer }>
                <WhiteBtn onPress={ () => { this.get_issues() } } text="Get Horas"/>
            </View>
        )
    }
}

export default HOCMagico(Issues);