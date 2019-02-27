import React from 'react';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';

import step1 from 'assets/intro/step1.png';
import step2 from 'assets/intro/step2.png';
import step3 from 'assets/intro/step3.png';

const slides = [
  {
    key: 'somethun',
    title: 'Nous recherchons',
    text: 'Toutes les courses disponibles sur les VTC pour vous en quelques secondes',
    textStyle: { fontSize: 18 },
    image: step1,
    imageStyle: { width: 200, height: 200 },
    backgroundColor: '#FF5D5B',
  },
  {
    key: 'somethun-dos',
    title: 'Le meilleur',
    text: 'Et nous vous proposons le meilleur pour vous, le plus rapide ou le moins cher !',
    textStyle: { fontSize: 18 },
    image: step2,
    imageStyle: { width: 160, height: 160 },
    backgroundColor: '#FF6B69',
  },
  {
    key: 'somethun1',
    title: 'Des écononomies',
    text: "Avec XXX nous vous proposons toujours les courses au meilleur prix, en profitant d'un large choix de courses !",
    textStyle: { fontSize: 18 },
    image: step3,
    imageStyle: { width: 230, height: 230 },
    backgroundColor: '#FF7A78',
  },
];


export default class IntroScreen extends React.Component {
  onDone = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  render() {
    return <AppIntroSlider slides={slides} onDone={this.onDone} />;
  }
}

IntroScreen.propTypes = {
  navigation: PropTypes.object,
};
