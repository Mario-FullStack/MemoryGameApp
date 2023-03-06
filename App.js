import * as React from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import * as Haptics from 'expo-haptics';

const cards = [
  "🐷",
  "🌎",
  "⚛️",
  "🔑",
  "🥕",
  "🥑",
];

export default function App() {
  const [board, setBoard] = React.useState(() => shuffle([...cards, ...cards]));
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [matchCards, setMatchCards] = React.useState([]);
  const [score, setScore] = React.useState(0);  

  React.useEffect(() => {
    if (selectedCards.length < 2) return;
    
    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchCards([...matchCards, ...selectedCards]);
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
      setScore(score + 2);
      setSelectedCards([]);
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 500);
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Warning
      );
      setScore(score - 1);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
  };

  const didPlayerWin = () => matchCards.length === board.length;

  const resetGame = () => {
    setMatchCards([]);
    setScore([0]);
    setBoard(shuffle([...cards, ...cards]));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
      {didPlayerWin() ? "Felicidades!" : "Memory"}
      </Text>
      <Text style={styles.title}>Puntos: {score}</Text>
      <View style={styles.board}>
        {board.map((card, index) => {
           const isTurnedOver =
           selectedCards.includes(index) || matchCards.includes(index);
          return <Card
          key={index}
          isTurnedOver={isTurnedOver}
          onPress={() => handleTapCard(index)}
          >{card}</Card>;
        })}
      </View>
      {didPlayerWin() && <Button onPress={resetGame} title="reset" />}
      <Text style={styles.title2}>(2 puntos por cartas iguales, -1 punto si no aciertas)</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010b24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "900",
  },
  title2: {
    fontSize: 14,
    color: "white",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

/*Random Index*/
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap los elementos
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}