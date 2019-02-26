import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo';
import { withAppContext } from 'store';

import COLORS from 'styles/colors';

class LoginScreen extends React.Component {
  state = {
    text: null,
  }

  render() {
    const { text } = this.state;
    const { navigation } = this.props;
    return (
      <LinearGradient
        colors={[COLORS.gradient.end, COLORS.gradient.start]}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        start={[0.3, 0.1]}
      >
        <ScrollView
          style={{ marginBottom: 70 }}
          scrollEnabled={false}
          contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={{ marginBottom: 40 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={{ fontSize: 40, marginRight: 5, marginBottom: 5, color: COLORS.isabeline }}>Hello !</Text>
              <Text style={{ fontSize: 30, color: COLORS.isabeline }}>Enfin de retour 🤩</Text>
            </View>
            <Text style={{ fontSize: 25, color: COLORS.platinum }}>Connecte-toi pour continuer,</Text>
          </View>
          <TextInput
            style={{ width: 300, backgroundColor: 'transparent', color: COLORS.isabeline }}
            placeholderColor={COLORS.isabeline}
            selectionColor={COLORS.isabeline}
            underlineColor={COLORS.isabeline}
            label="Adresse email"
            value={text}
            onChangeText={e => this.setState({ text: e })}
          />
          <TextInput
            style={{ width: 300, backgroundColor: 'transparent', color: COLORS.white }}
            placeholderColor={COLORS.isabeline}
            selectionColor={COLORS.isabeline}
            underlineColor={COLORS.isabeline}
            label="Mot de passe"
            value={text}
            onChangeText={e => this.setState({ text: e })}
          />
          <Button
            mode="outlined"
            color={COLORS.platinum}
            style={{ borderRadius: 15, borderWidth: 2, borderColor: COLORS.isabeline, marginTop: 55, width: 200, height: 50, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => console.log('Pressed')}
          >
            Connexion
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Register')}
          >
            Pas encore de compte?
          </Button>
        </ScrollView>
      </LinearGradient>
    );
  }
}

export default withAppContext(LoginScreen);

LoginScreen.propTypes = {
  data: PropTypes.object,
  navigation: PropTypes.object,
};
