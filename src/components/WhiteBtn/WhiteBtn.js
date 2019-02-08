import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../../style/styles"

export default class WhiteBtn extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity onPress={ () => this.props.onPress() } style={ styles.opacity }>
                <Text style={ styles.whiteBtn }>{ this.props.text }</Text>
            </TouchableOpacity>
        )
    }
}