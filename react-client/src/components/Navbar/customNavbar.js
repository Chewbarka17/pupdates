import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class CustomTabBar extends React.Component {
  icons = [];

  constructor(props) {
    super(props);
    this.icons = [];
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
  }

  setAnimationValue({ value, }) {
    this.icons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  iconColor(progress) {
    const red = 244 + (204 - 244) * progress;
    const green = 78 + (204 - 78) * progress;
    const blue = 100 + (204 - 100) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  handlePress(i) {
    this.props.hack('flag' + i)
    this.props.goToPage(i);
  }

  render() {
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.handlePress(i)} style={styles.tab}>
          <Icon
            name={tab}
            size={30}
            color={this.props.activeTab === i ? 'rgb(244, 78, 100)' : 'rgb(204,204,204)'}
            ref={(icon) => { this.icons[i] = icon; }}
          />
        </TouchableOpacity>;
      })}
    </View>;
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    backgroundColor: 'white'
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'white',
    backgroundColor: 'white',
  },
});

export default CustomTabBar;