import React, { Component } from "react";
import { Text, View, Button, TextInput } from "react-native";
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
            <View style={ styles.innerContainer }>
                <Text style={ styles.title }>Olá, { this.props.store.name }</Text>

                <TextInput 
                    style={ styles.textInput }
                    autoCorrect={false}
                    onChangeText={ issue => { this.setState({ issue_id: issue }) } }
                    placeholder="ID da Tarefa" />

                <TextInput 
                    style={ styles.textInput }
                    autoCorrect={false}
                    onChangeText={ hours => { this.setState({ hours: hours }) } } 
                    placeholder="Horas" />
                
                <Button 
                    onPress={ () => this.props.actions.time_entry(this.state.issue_id, this.state.hours) }
                    title="Lançar" />
            </View>
        );
    }
}

export default HOCMagico(Home);
