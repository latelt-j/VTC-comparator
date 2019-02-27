import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { withAppContext } from 'store';

import TextInputForm from 'components/TextInputForm';
import ButtonForm from 'components/ButtonForm';

import COLORS from 'styles/colors';

class RegisterScreen extends React.Component {
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
              <Text style={{ fontSize: 40, marginRight: 5, marginBottom: 5, color: COLORS.isabeline }}>Rejoins</Text>
              <Text style={{ fontSize: 30, color: COLORS.isabeline }}>la communauté 🤠</Text>
            </View>
            <Text style={{ fontSize: 25, color: COLORS.platinum }}>Et fais des économies maintenant,</Text>
          </View>
          <TextInputForm
            placeholder="Nom"
            value={text}
            onChangeText={e => this.setState({ text: e })}
          />
          <TextInputForm
            placeholder="Adresse email"
            value={text}
            onChangeText={e => this.setState({ text: e })}
          />
          <TextInputForm
            placeholder="Mot de passe"
            value={text}
            onChangeText={e => this.setState({ text: e })}
          />
          <ButtonForm
            onPress={() => navigation.navigate('Home')}
            type="outlined"
            text="S'enregistrer"
            style={{ marginTop: 50 }}
          />
          <ButtonForm
            onPress={() => navigation.navigate('Login')}
            type="text"
            text="Déjà un compte?"
          />
        </ScrollView>
      </LinearGradient>
    );
  }
}

export default withAppContext(RegisterScreen);

RegisterScreen.propTypes = {
  data: PropTypes.object,
  navigation: PropTypes.object,
};
