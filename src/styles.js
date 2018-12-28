import React from "react";
import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },

    innerContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },

    title: {
        fontSize: 30,
        justifyContent: "flex-start",
        margin: 40
    },

    textInput: {
        height: 25,
        width: 200,
        margin: 15,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10
    }
});