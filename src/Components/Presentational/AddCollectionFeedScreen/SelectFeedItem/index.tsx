import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, ActivityIndicator} from 'react-native'

const ProfileTileFeedItemContainer = Styled.View`
 width: ${wp('47.8%')};
 height: ${wp('51.1%')};
`;

const TileFeedImage = Styled.Image`
 width: ${wp('44.2%')};
 height: ${wp('35.1%')};
 border-radius: 10px;
`;


const NoFeedImage = Styled.View`
width: ${wp('44.2%')};
height: ${wp('35.1%')};
border-radius: 10px;
background-color: #eeeeee;
`;

const TagListContainer = Styled.View`
 margin-top: 6px;
 flex-direction: row;
`;

const TagText = Styled.Text`
 font-weight: 600;
 font-size: 15px;
 color: #333333;
`;

const RatingExpenseContainer = Styled.View`
 margin-top: 1px;
 flex-direction: row;
 align-items: center;
`;

const RatingImage = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

const RatingText = Styled.Text`
 margin-left: 2px;
 font-weight: 500;
 font-size: 13px;
 color: #50555C;
`;

const ExpenseText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #50555C;
`;

const LocationContainer = Styled.View`
margin-top: 1px;
 
`;

const LocationText = Styled.Text`
font-size: 13px;
color: #898A8D;
`;


const SelectCircleContainer = Styled.View`
 position: absolute;
 top: 8px;
 right: ${wp('3.6%')+8}
`;

const UnselectCircle = Styled.View`
 width: ${wp('5.8%')};
 height: ${wp('5.8%')};
 border-radius: 100px;
 background-color: #ffffff60;
 border-width: 1.5px;
 border-color: #ffffff90;
`;

const SelectCircle = Styled.View`
width: ${wp('5.8%')};
height: ${wp('5.8%')};
border-radius: 100px;
background-color: #3384FF;
border-width: 1.5px;
border-color: #ffffff
justify-content: center;
align-items: center;
`;

const SelectFeedContainer = Styled.View`
`;

const SelectOrderCount = Styled.Text`
 font-weight: 600;
 font-size: 16px;
 color: #ffffff;
`;


interface Props {
    index: number,
    selected: boolean,
    selectOrder: number,
    onSelectCircle: (index:number) => void,
    mainImage: string,
    mainTag: string,
    rating: number,
    expense: string,
    location: string,
}


const SelectFeedItem = ({selected, index, onSelectCircle, selectOrder, mainImage, mainTag, rating, expense, location}: Props) => {

    return (
        <SelectFeedContainer>
        <ProfileTileFeedItemContainer>
            {!mainImage && (
                <NoFeedImage>
                </NoFeedImage>
            )}
            {mainImage && (
            <TileFeedImage
            source={{uri:mainImage.url}}/>
            )}
            <TagListContainer>
                <TagText>{"#" + mainTag}</TagText>
            </TagListContainer>
            <RatingExpenseContainer>
                <RatingImage
                source={require('~/Assets/Images/ic_newStar.png')}/>
                <RatingText>{rating}</RatingText>
                <ExpenseText>{expense ? " · " + expense+"원" : null}</ExpenseText>
            </RatingExpenseContainer>
            <LocationContainer>
                <LocationText>{location}</LocationText>
            </LocationContainer>
        </ProfileTileFeedItemContainer>
        <SelectCircleContainer>
            {!selected && (
                <TouchableWithoutFeedback onPress={() => onSelectCircle(index)}>
                <UnselectCircle></UnselectCircle>
                </TouchableWithoutFeedback>
            )}
            {selected && (
                <TouchableWithoutFeedback onPress={() => onSelectCircle(index)}>
                <SelectCircle>
                    <SelectOrderCount>{selectOrder}</SelectOrderCount>
                </SelectCircle>
                </TouchableWithoutFeedback>
            )}
        </SelectCircleContainer>
        </SelectFeedContainer>
    )
}

SelectFeedItem.defaultProps = {
    selected: false,
}

export default SelectFeedItem;