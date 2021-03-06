import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import HOCMagico from "../../HOCs/Magico"
import styles from "../../style/styles";
import WhiteBtn from "../../components/WhiteBtn/WhiteBtn";
import GreenIndicator from "../../components/GreenIndicator/GreenIndicator";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            issue_id: "",
            hours: "",
            date: "",
            animating: false,
        };
    }

    clear_all() {
        this.id_input.clear();
        this.hour_input.clear();
        this.date_input.clear();
    }

    async time_entry(again) {
        try {
            this.setState({ animating: true })
            let issue = await this.props.actions.get_issue(this.state.issue_id);
            let json = await issue.json();

            let message = "Deseja lançar " + this.state.hours + " horas na tarefa:\n" + 
            json.issue.project.name + "\n" + json.issue.subject + "?"

            Alert.alert("Atenção", message, [
                {
                    text: "Cancelar",
                    onPress: () => { this.setState({ animating: false }) }
                },
                {
                    text: "Lançar",
                    onPress: async () => { 
                        try {
                            await this.props.actions.time_entry(
                                this.state.issue_id, 
                                this.state.hours, 
                                this.state.date
                            );

                            Alert.alert("Horas lançadas com sucesso!");
                            this.setState({ animating: false })
                            if(!again) { this.clear_all(); }

                        } catch(e) {
                            Alert.alert(e.message)
                            this.setState({ animating: false })

                        }
                    }
                }
            ]);

        } catch(e) {
            Alert.alert(e.message);
            this.setState({ animating: false })

        }
    }

    render() {
        return (
            <View style={ styles.innerContainer }>
                <Text style={ styles.title }>Olá, 
                    <Text style={ styles.greenTitle }> { this.props.store.name }.</Text>
                </Text>

                <TextInput 
                    ref={ input => { this.id_input = input } }
                    style={ styles.textInput }
                    autoCorrect={false}
                    onChangeText={ issue => { this.setState({ issue_id: issue }) } }
                    placeholder="ID da Tarefa" />

                <TextInput 
                    ref={ input => { this.hour_input = input } }
                    style={ styles.textInput }
                    autoCorrect={false}
                    onChangeText={ hours => { this.setState({ hours: hours }) } } 
                    placeholder="Horas" />

                <TextInput 
                    ref={ input => { this.date_input = input } }
                    style={ styles.textInput }
                    autoCorrect={false}
                    onChangeText={ date => { this.setState({ date: date }) } } 
                    placeholder="Data (Opcional)" />
                
                <WhiteBtn onPress={ () => this.time_entry(false) } text="Lançar"/>

                <WhiteBtn onPress={ () => this.time_entry(true) } text="Lançar e Continuar"/>

                {this.state.animating &&
                    <GreenIndicator animating={ this.state.animating } />
                }
            </View>
        );
    }
}

export default HOCMagico(Home);
