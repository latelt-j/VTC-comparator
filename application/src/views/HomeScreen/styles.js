import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  triangle: {
    position: 'absolute',
    top: 40,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    transform: [
      { rotate: '180deg' },
    ],
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 800,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#F7F7F7',
    paddingTop: 15,
  },
  scrollableModalContent: {
    height: 800,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
