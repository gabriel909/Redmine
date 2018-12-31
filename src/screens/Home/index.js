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

    static navigationOptions = {
        headetTitle: "Redmine",
        headerRight: (
            <Button
                onPress={ () => console.log("Ola") }
                title="Logout" />
        )
    };

    async logout() {
        await this.props.actions.logout();
        this.props.navigation.navigate("Login");
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

                <Button
                    onPress={ () => this.logout() } 
                    title="Logout" />
            </View>
        );
    }
}

export default HOCMagico(Home);
