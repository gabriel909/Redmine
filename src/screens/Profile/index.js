import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import WhiteBtn from "../../components/WhiteBtn/WhiteBtn"
import HOCMagico from "../../HOCs/Magico"
import styles from "../../style/styles";

class Profile extends Component {
    dataSource = [];

    constructor(props) { 
        super(props);
    }

    logout() {
        this.props.actions.logout()
        this.props.navigation.navigate("Login") 
    }

    async componentDidMount() {
        try {
            this.dataSource = await this.props.actions.get_time_entries();
            console.log(this.dataSource)

        } catch(e) {
            alert(e.message);

        }
    }

    render() {
        return (
            <View style={ styles.innerContainer }>
                <FlatList
                    data={ this.dataSource }
                    renderItem={ ({ item }) => 
                        <Text>{ item.subject } pp</Text>
                    } />

                <WhiteBtn onPress={ () => this.logout() } text="Sair"/>
            </View>
        );
    }
}

export default HOCMagico(Profile);