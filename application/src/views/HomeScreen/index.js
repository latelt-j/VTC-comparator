import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
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
    const { location, address, visible, minZoomLevel } = this.state;
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
                  <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 22 }}>Destination</Text>
                    <Ionicons style={{ position: 'absolute', left: 10 }} name="md-arrow-round-back" size={28} color="#000000" />
                  </View>
                  <View style={{ borderColor: COLORS.sunsetOrange, borderWidth: 1, marginHorizontal: 20, marginTop: 20 }}>

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
