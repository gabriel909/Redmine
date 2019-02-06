import React from "react";
import { StyleSheet } from "react-native";

purple = "#30154A"

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },

    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: purple
    },

    title: {
        color: "#FFFFFF",
        fontSize: 30,
        justifyContent: "flex-start",
        marginBottom: 40
    },

    blackTitle: {
        color: "#C2CE3E",
        fontWeight: "bold"
    },

    textInput: {
        height: 25,
        width: 200,
        margin: 5,
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        paddingLeft: 10
    },

    purpleBtn: {
        width: 150,
        height: 30,
        color: purple,
        fontSize: 20,
        textAlign: "center",
        paddingTop: 2
    },

    opacity: {
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        marginTop: 20,
    }
});