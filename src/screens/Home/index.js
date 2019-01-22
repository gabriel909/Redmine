import React, { Component } from "react";
import { Text, View, Button, TextInput, Alert } from "react-native";
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

    async time_entry() {
        try {
            await this.props.actions.time_entry(this.state.issue_id, this.state.hours);
            Alert.alert("Horas lançadas com sucesso!");

        } catch(e) {
            Alert.alert(e.message);

        }
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
                    onPress={ () => this.time_entry() }
                    title="Lançar" />

                <Button 
                    onPress={ () => this.props.navigation.navigate("Issues") }
                    title="Pesquisar Tarefas" />

                <Button
                    onPress={ () => this.logout() } 
                    title="Logout" />
            </View>
        );
    }
}

export default HOCMagico(Home);
