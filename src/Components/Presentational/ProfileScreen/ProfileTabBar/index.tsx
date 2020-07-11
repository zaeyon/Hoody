const React = require('react');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ViewPropTypes
} from 'react-native'
import Styled from 'styled-components/native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const ProfileTabBarContainer = Styled.View`
 width: ${wp('100%')};
 background-color:#ffffff;
`;

const Button = require('./Button');
const ProfileTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: '#707070',
      inactiveTextColor: '#cccccc',
      backgroundColor: null,
    };
  },

  renderTabOption(name, page) {
  },

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? '#000000' : '#cccccc';
    const fontWeight = 'bold';

    return <Button
      style={{ flex: 1, backgroundColor:'#ffffff'}}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle,]}>
        <Text style={[{ color: textColor, fontWeight, fontSize: 18  }, textStyle,]}>
          {name}
        </Text>
      </View>
    </Button>;
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: wp('10.7%'),
      height: 2,
      backgroundColor: 'black',
      bottom: 0,
      flex: 1,
      flexDirection:'row',
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, wp('20%')],
    });
    return (
        <ProfileTabBarContainer>
      <View pointerEvents='box-none' style={[styles.tabs, { backgroundColor: this.props.backgroundColor, }, this.props.style,]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [
                { translateX },
              ]
            }
          ]}
        />
      </View>
      </ProfileTabBarContainer>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 0,
    paddingTop: 13,
    paddingLeft:15,
    width: wp('35%'),
  },
  tabs: {
    height: wp('12%'),
    width: wp('32%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});

module.exports = ProfileTabBar;
