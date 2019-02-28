import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import { Platform, View, TouchableOpacity, Text, ScrollView, Dimensions, TextInput } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import Modal from 'react-native-modal';

import { withAppContext } from 'store';

import COLORS from 'styles/colors';
import styles from './styles';

const { height } = Dimensions.get('window');

const MyCustomMarkerView = () => (
  <View style={{ height: 50 }}>
    <View
      style={[styles.shadow, { zIndex: 20, elevation: 20, backgroundColor: '#FFFFFF', height: 40, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
    >
      <View style={{ backgroundColor: COLORS.sunsetOrange, width: 30, height: '100%', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>1</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 10 }}>min</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
        <Text>Pickup Location</Text>
        <Text style={{ fontSize: 10, color: COLORS.silverCalice }}>Tap to confirm pickup</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: 20 }}>
        <FontAwesome name="chevron-right" size={16} color={COLORS.sunsetOrange} />
      </View>
      <View style={styles.triangle} />
    </View>
  </View>
);

class HomeScreen extends React.Component {
  state = {
    onFocusStart: false,
    onFocusEnd: false,
    visibleModal: null,
    minZoomLevel: null,
    visible: false,
    location: null,
    address: null,
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  handleScrollTo = (p) => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  handleOnScroll = (event) => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  openModal = () => {
    this.setState({ visible: true });
  }

  render() {
    const { location, address, visible, minZoomLevel, onFocusStart, onFocusEnd } = this.state;
    return (
      location
      && (
        <View style={{ flex: 1, zIndex: -1 }}>
          <MapView
            style={{ zIndex: -1, flex: 1, alignItems: 'center' }}
            onRegionChange={(e) => {
              this.setState({ location: { coords: e } });
            }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsCompass={false}
            showsMyLocationButton={false}
            provider={MapView.PROVIDER_GOOGLE}
            onMarkerPress={() => this.openModal()}
            showsUserLocation
            userLocationAnnotationTitle=""
            rotateEnabled={false}
            tracksViewChange={false}
          >
            <MapView.Marker stopPropagation coordinate={location.coords}>
              <TouchableOpacity onPress={() => this.openModal()}>
                <MyCustomMarkerView coordinate={location.coords} />
              </TouchableOpacity>
            </MapView.Marker>
          </MapView>
          <View style={{ position: 'absolute', top: 80, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.openModal()} style={[styles.shadow, { width: '90%', height: 50, borderRadius: 5, backgroundColor: '#FFFFFF', flexDirection: 'row' }]}>
              <View style={{ width: 50, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.sunsetOrange }} />
              </View>
              <View style={{ justifyContent: 'center', height: '100%' }}>
                <Text style={{ fontSize: 13, color: COLORS.silverCalice }}>ON VOUS RECUPÈRE ICI</Text>
                <Text style={{ fontSize: 16, color: 'black' }}>190 Rue Paul Bert, Lyon</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={visible}
            onSwipeComplete={() => this.setState({ visible: false })}
            swipeDirection="down"
            scrollTo={this.handleScrollTo}
            scrollOffset={this.state.scrollOffset}
            scrollOffsetMax={400 - 300} // content height - ScrollView height
            onBackdropPress={() => this.setState({ visible: false })}
            style={styles.bottomModal}
          >
            <View style={styles.scrollableModal}>
              <ScrollView
                ref={ref => (this.scrollViewRef = ref)}
                onScroll={this.handleOnScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.scrollableModalContent}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginVertical: 10 }}>
                    <Text style={{ fontSize: 18 }}>DESTINATION</Text>
                    <Feather style={{ position: 'absolute', left: 10, top: -2 }} name="arrow-left" size={22} color="#000000" />
                  </View>
                  <View style={[styles.shadow, { backgroundColor: '#FFFFFF', height: 120, marginHorizontal: 20, marginTop: 20, justifyContent: 'center' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                      <View style={{ height: '100%', width: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[{ width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.platinum, alignItems: 'center', justifyContent: 'center' }, onFocusStart && { backgroundColor: COLORS.lightOrange }]}>
                          <FontAwesome name="map-marker" size={10} color={onFocusStart ? COLORS.orange : COLORS.silverCalice} />
                        </View>
                      </View>
                      <View>
                        <Text style={[{ fontSize: 12, color: COLORS.davysgrey, marginVertical: 2 }, onFocusStart && { color: COLORS.orange }]}>LIEU DE RAMASSAGE</Text>
                        <TextInput onFocus={() => this.setState({ onFocusStart: true, onFocusEnd: false })} style={{ marginVertical: 2 }} placeholder="Votre adresse actuelle" placeholderTextColor={COLORS.silverCalice} value={this.state.text} />
                      </View>
                    </View>
                    <View style={{ width: 150, height: 1, backgroundColor: COLORS.platinum, marginVertical: 5 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                      <View style={{ height: '100%', width: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[{ width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.platinum, alignItems: 'center', justifyContent: 'center' }, onFocusEnd && { backgroundColor: COLORS.lightGreen }]}>
                          <FontAwesome name="map-marker" size={10} color={onFocusEnd ? COLORS.green : COLORS.silverCalice} />
                        </View>
                      </View>
                      <View>
                        <Text style={[{ fontSize: 12, color: COLORS.davysgrey, marginVertical: 2 }, onFocusEnd && { color: COLORS.green }]}>DESTINATION</Text>
                        <TextInput onFocus={() => this.setState({ onFocusStart: false, onFocusEnd: true })} style={{ marginVertical: 2 }} placeholder="L'adresse de destination" placeholderTextColor={COLORS.silverCalice} value={this.state.text} />
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
      )
    );
  }
}

export default withAppContext(HomeScreen);

HomeScreen.propTypes = {
  data: PropTypes.object,
  draggableRange: PropTypes.object,
};


HomeScreen.defaultProps = {
  draggableRange: {
    top: height,
    bottom: 120,
  },
};
