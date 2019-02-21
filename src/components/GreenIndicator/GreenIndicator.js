import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import styles from "../../style/styles"
import Colors from "../../style/colors"

export default class GreenIndicator extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ActivityIndicator 
                style={ styles.loading }
                animating={ this.props.animating }
                color={ Colors.green }
                hidesWhenStopped={true}
                size="large" />
        )
    }
}