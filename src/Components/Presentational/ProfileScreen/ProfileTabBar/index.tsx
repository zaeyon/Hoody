import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ViewPropTypes,
  TouchableWithoutFeedback,
} from 'react-native'
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const Button = require('./Button');

const ProfileTabBarContainer = Styled.View`
 width: ${wp('100%')};
 background-color:#ffffff;
 border-bottom-width: 1px;
 border-color: #F4F4F4;
`;

const TabIconContainer = Styled.View`
 flex-direction: row;
 position: absolute;
 padding-top: 15px;
 top:0;
 right: 8;
`;

const TypeIconContainer = Styled.View`
 padding-bottom: 8px;
 padding-left: 1px;
 padding-right: 1px;
`;

const ListTypeIcon = Styled.Image`
width: ${wp('7%')};
height: ${wp('7%')};
`;

const TileTypeIcon = Styled.Image`
width: ${(wp('7%'))};
height: ${wp('7%')};
`;

const AddCollectionIcon = Styled.Image`
width: ${wp('5.8%')};
height: ${wp('5.8%')};
`;

const AddCollectionContainer = Styled.View`
 padding-bottom: 5px;
 padding-top: 5px;
 padding-left: 5px;
 padding-right: 8px;
`;



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
    changeInFeedSortType: PropTypes.func,
    selectedFeedSortType: PropTypes.string,
    addNewCollection: PropTypes.func,
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

    const changeInFeedSortType = (sortType: string) => {
      this.props.changeInFeedSortType(sortType);
      this.props.goToPage(0);
    }

    const clickToAddCollection = () => {
      this.props.addNewCollection()
    }

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
      {this.props.activeTab === 0 && (
        <TabIconContainer>
          <TouchableWithoutFeedback onPress={() => changeInFeedSortType("list")}>
          <TypeIconContainer>
            <ListTypeIcon
            style={this.props.selectedFeedSortType !== "list" && styles.transparentIcon}
            source={require('~/Assets/Images/ic_listType.png')}/>
          </TypeIconContainer>
          </TouchableWithoutFeedback>
            {this.props.selectedFeedSortType === "tile" && (
            <TypeIconContainer>
            <TileTypeIcon
            source={require('~/Assets/Images/ic_tileType.png')}/>
            </TypeIconContainer>
            )}
            {this.props.selectedFeedSortType !== "tile" && (
              <TouchableWithoutFeedback onPress={() => changeInFeedSortType("tile")}>
              <TypeIconContainer>
              <TileTypeIcon
              style={styles.transparentIcon}
              source={require('~/Assets/Images/ic_tileType.png')}/>
              </TypeIconContainer>
              </TouchableWithoutFeedback>
            )}
        </TabIconContainer>
      )}
      {this.props.activeTab === 1 && (
        <TabIconContainer>
          <TouchableWithoutFeedback onPress={() => clickToAddCollection()}>
            <AddCollectionContainer>
              <AddCollectionIcon
              source={require('~/Assets/Images/ic_addCollection.png')}/>
            </AddCollectionContainer>
          </TouchableWithoutFeedback>
        </TabIconContainer>

      )}
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
    height: wp('12%'),
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
  transparentIcon : {
    opacity: 0.25
  }
});

export default ProfileTabBar;