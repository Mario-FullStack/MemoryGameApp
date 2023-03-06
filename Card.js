import * as React from "react";
import { Pressable, Text, StyleSheet } from "react-native";


export default function Card({ onPress, isTurnedOver, children }) {
    return (
        <Pressable 
        onPress={onPress} style={isTurnedOver ? styles.cardUp : styles.cardDown}>
            {isTurnedOver ? (
                <Text style={styles.text}>{children}</Text>
                ) : (
                <Text style={styles.text}>?</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardUp: {
        width: 100,
        height: 100,
        margin: 10,
        borderWidth: 10,        
        borderColor: "#577db5",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1b3d75",
        borderRadius: 25,         
    },
    cardDown: {
        width: 100,
        height: 100,
        margin: 10,
        borderWidth: 10,
        borderColor: "#566882",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1f314f",
        borderRadius: 25,         
    },
    text: {
        fontSize: 46,
        color: "#566882",
    }
});