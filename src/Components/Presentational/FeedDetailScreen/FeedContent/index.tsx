import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {FlatList, Text} from 'react-native';

import ProductItem from '~/Components/Presentational/FeedDetailScreen/ProductItem';

const Container = Styled.View`
 background-color: #ffffff;
 flex: 1;
 width: ${wp('100%')};
`;

const DescriptionContainer = Styled.View`
width: ${wp('100%')};
padding-top: 16px;
padding-left: 18px;
padding-right: 18px;
padding-bottom: 15px;
justify-content: center;
`;

const ReviewDescription = Styled.Text`
 font-size: 14px;
 color: #4B4B4B;
`;

const ImageContainer = Styled.View`
 justify-content: center;
 align-items: center;
`;

const ReviewImage = Styled.Image`
 width: ${wp('92%%')};
 height: ${wp('92%')};
 border-radius: 15px;
`;

const ProductContainer = Styled.View`
width: ${wp('100%')};
background-color: #FFFFFF;
padding-top: 16px;
padding-bottom: 16px;
justify-content: center;
align-items: center;
`;

interface Props {
    paragraphData: Array<Object>
}


const FeedContent = ({paragraphData}: Props) => {
    const [paragraph, setParagraph] = useState();

    useEffect(() => {
        console.log("paragraph", paragraphData);
    }, [paragraphData])
    

const renderItem = ({item, index}: any) => {
    if(item.type === "description") {
        return (
            <DescriptionContainer>
                <ReviewDescription>{item.description}</ReviewDescription>
            </DescriptionContainer>
        )
    } else if(item.type === "image") {
        console.log("피드 상세페이지 image.url", item.url);
        return (
            <ImageContainer>
                <ReviewImage
                source={{uri: item.url}}/>
            </ImageContainer>
        )
    } else if(item.type === "product") {
        return (
            <ProductContainer>
                <ProductItem
                productImage={item.image}
                productName={item.title}
                productDescription={item.description}
                shopIcon={item.favicon}
                shopName={item.site}/>
            </ProductContainer>
        )
    }
}
    return (
        <Container>
            <FlatList
            showsVerticalScrollIndicator={false}
            style={{backgroundColor:"c3c3c3"}}
            data={paragraphData}
            renderItem={renderItem}/>
        </Container>
    )
}

export default FeedContent;