import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Button } from 'react-native';

export default function App() {
  const moonAnimation = useRef(new Animated.Value(0)).current;
  const colorEfecto = useRef(new Animated.Value(0)).current;
  let animationInstance = null;

  const animacion = () => {

    animationInstance = Animated.sequence([
      Animated.timing(moonAnimation, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: false,
      }),
      Animated.timing(moonAnimation, {
        toValue: 0,
        duration: 10000,
        useNativeDriver: false,
      }),
    ]);

    animationInstance.start();
  };

  useEffect(() => {
    moonAnimation.addListener(({ value }) => {
      colorEfecto.setValue(value);
    });

    return () => {
      moonAnimation.removeAllListeners();
    };
  }, []);

  const moonLeft = moonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-38%', '45%'],
  });

  const colorInter = colorEfecto.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(198, 245, 249, 1)', 'rgba(64, 64, 64, 1)'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: colorInter }]}>
      <View style={styles.titleContainer}>
        <View style={styles.titleBackground}>
          <Text style={styles.title}>Eclipse Solar 2024 🌒</Text>
        </View>
      </View>
      <View style={styles.sun} />
      <Animated.View style={[styles.moon, { left: moonLeft }]} />
      <View style={styles.buttonContainer}>
        <Button title="INICIAR ANIMACIÓN" onPress={animacion} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    paddingTop: 100,
  },
  titleBackground: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  sun: {
    height: 300,
    width: 300,
    borderRadius: 150,
    backgroundColor: '#FFEB10',
    position: 'absolute',
    top: '47%',
    left: '50%',
    marginLeft: -150,
    marginTop: -150,
  },
  moon: {
    height: 270,
    width: 270,
    borderRadius: 150,
    backgroundColor: '#404040',
    position: 'absolute',
    top: '52%',
    marginLeft: -150,
    marginTop: -150,
    overflow: 'hidden',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 150,
  },
});
