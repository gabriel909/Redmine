import { StyleSheet } from "react-native";
import Colors from "./colors"

export default styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.purple
    },

    title: {
        color: Colors.white,
        fontSize: 30,
        justifyContent: "flex-start",
        marginBottom: 40
    },

    greenTitle: {
        color: Colors.green,
        fontWeight: "bold"
    },

    textInput: {
        height: 40,
        width: 250,
        margin: 5,
        backgroundColor: Colors.white,
        borderRadius: 5,
        paddingLeft: 10
    },

    whiteBtn: {
        width: 185,
        height: 30,
        color: Colors.purple,
        fontSize: 20,
        textAlign: "center",
        paddingTop: 2
    },

    opacity: {
        backgroundColor: Colors.white,
        borderRadius: 50,
        marginTop: 20,
    },

    plusBtn: {
        borderRadius: 100, 
        // backgroundColor: Colors.white, 
        height: 85
    },

    loading: {
        position: 'absolute',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightGray,
        opacity: 0.95,
        height: 80,
        width: 80,
    },
});