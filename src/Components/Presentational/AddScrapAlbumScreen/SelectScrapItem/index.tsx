import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native'

const SelectScrapItemContainer = Styled.View`
 width: ${wp('47.8%')};
 height: ${wp('51.1%')};
`;

const NoFeedImage = Styled.View`
width: ${wp('44.2%')};
height: ${wp('35.1%')};
border-radius: 10px;
background-color: #ECECEE;
`;

const TileFeedImage = Styled.Image`
 width: ${wp('44.2%')};
 height: ${wp('35.1%')};
 border-radius: 10px;
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

const SelectCircle = Styled.Image`
width: ${wp('5.8%')};
height: ${wp('5.8%')};
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
    onSelectCircle: (index:number) => void,
    mainImage: object,
    mainTag: string,
    rating: number,
    expense: number,
    address: string,
    product: any,
}


const SelectFeedItem = ({selected, index, onSelectCircle, mainImage, mainTag, rating, expense, address, product}: Props) => {

    return (
     <TouchableWithoutFeedback onPress={() => onSelectCircle(index)}>
        <SelectFeedContainer>
        <SelectScrapItemContainer>
            {mainImage && (
            <TileFeedImage
            source={{uri:mainImage.url}}/>
            )}
            {!mainImage && product[0] && (
            <TileFeedImage
            source={{uri:product[0].image}}/>
            )}
            {!mainImage && !product[0] && (
            <NoFeedImage/>
            )}
            <TagListContainer>
                <TagText>{"#" + mainTag}</TagText>
            </TagListContainer>
            <RatingExpenseContainer>
                <RatingImage
                source={require('~/Assets/Images/ic_newStar.png')}/>
                <RatingText>{rating}</RatingText>
                <ExpenseText>{expense ? " · " + expense +"원" : null}</ExpenseText>
            </RatingExpenseContainer>
            <LocationContainer>
                <LocationText>{address}</LocationText>
            </LocationContainer>
        </SelectScrapItemContainer>
        <SelectCircleContainer>
            {!selected && (
                <TouchableWithoutFeedback onPress={() => onSelectCircle(index)}>
                <UnselectCircle></UnselectCircle>
                </TouchableWithoutFeedback>
            )}
            {selected && (
                <TouchableWithoutFeedback onPress={() => onSelectCircle(index)}>
                <SelectCircle
                source={require('~/Assets/Images/ic_checked.png')}/>
                </TouchableWithoutFeedback>
            )}
        </SelectCircleContainer>
        </SelectFeedContainer>
        </TouchableWithoutFeedback>
    )
}

SelectFeedItem.defaultProps = {
    selected: false,
}

export default SelectFeedItem;