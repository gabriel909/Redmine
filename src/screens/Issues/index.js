import React, { Component } from "react";
import { Text, View, Button, TextInput } from "react-native";
import HOCMagico from "../../HOCs/Magico"
import styles from "../../styles";

class Issues extends Component {
    constructor(props) { super(props); }

    async get_issues() {
        try {
            await this.props.actions.get_issues()

        } catch(e) {
            Alert.alert(e.message);

        }
    }

    render() {
        return (
            <View style={ styles.innerContainer }>
                <Button 
                    onPress={ () => { this.get_issues() } } 
                    title="Get Horas"/>
                
            </View>
        )
    }
}

export default HOCMagico(Issues);