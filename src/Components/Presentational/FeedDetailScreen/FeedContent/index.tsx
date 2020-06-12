import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native';

const Container = Styled.View`
 background-color: #ffffff
`;

const DescriptionContainer = Styled.View`
width: ${wp('100%')};
padding: 20px;
align-items: center;
justify-content: center;
`;

const ReviewDescription = Styled.Text`
 font-size: 12px;
`;

const ImageContainer = Styled.View`
`;

const ReviewImage = Styled.Image`
 width: ${wp('100%')};
 height: ${wp('100%')};
`;

interface Props {
    paragraphData: Array<Object>
}


const FeedContent = ({paragraphData}: Props) => {

    console.log("paragraphData", paragraphData);


const renderItem = ({item, index}) => {
    if(item.type === "description") {
        return (
            <DescriptionContainer>
                <ReviewDescription>{item.description}</ReviewDescription>
            </DescriptionContainer>
        )
    } else if(item.type === "image") {
        return (
            <ImageContainer>
                <ReviewImage
                source={{uri: item.url}}/>
            </ImageContainer>
        )
    }
}
    return (
        <Container>
            <FlatList
            data={paragraphData}
            renderItem={renderItem}/>
        </Container>
    )
}

export default FeedContent;