import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import HOCMagico from "../../HOCs/Magico"
import styles from "../../styles";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            issue_id: "",
            hours: ""
        };
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text>Olá, { this.props.store.name }</Text>

                <Button 
                    onPress={ () => this.props.actions.time_entry() }
                    title="Lançar" />
            </View>
        );
    }
}

export default HOCMagico(Home);
