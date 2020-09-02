import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {FlatList, Text, TouchableWithoutFeedback} from 'react-native';
import { WebView } from 'react-native-webview';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";

import ProductItem from '~/Components/Presentational/FeedDetailScreen/ProductItem';
const Container = Styled.View`
 padding-top: 10px;
 background-color: #ffffff;
 flex: 1;
 width: ${wp('100%')};
 padding-bottom: 50px;
`;

const DescriptionContainer = Styled.View`
width: ${wp('100%')};
padding-top: 10px;
padding-left: 18px;
padding-right: 18px;
padding-bottom: 10px;
justify-content: center;
`;

const ReviewDescription = Styled.Text`
 font-size: 14px;
 color: #4B4B4B;
`;

const ImageContainer = Styled.View`
 margin-top: 10px;
 margin-bottom: 10px;
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
padding-top: 10px;
padding-bottom: 10px;
justify-content: center;
align-items: center;
`;

interface Props {
    paragraphData: Array<Object>,
    navigation: any,
    moveToImageFull: () => void,
    loadingFeedInfo: boolean,
}


const FeedContent = ({paragraphData, navigation, moveToImageFull, loadingFeedInfo}: Props) => {
    const [paragraph, setParagraph] = useState();

    useEffect(() => {
        console.log("paragraph", paragraphData);
    }, [paragraphData])

    const moveToProductUri = (url: string) => {
        console.log("moveToProductUri uri", url);
        navigation.navigate("ProductWebView", {
            uri: url
        })
    }


const renderItem = ({item, index}: any) => {
    if(item.type === "description") {
        return (
            <DescriptionContainer>
                <ReviewDescription>{item.description}</ReviewDescription>
            </DescriptionContainer>
        )
    } else if(item.type === "image") {
        console.log("피드 상세페이지 image.url", item);
        return (
            <TouchableWithoutFeedback onPress={() => moveToImageFull(item.url)}>
            <ImageContainer>
                <ReviewImage
                source={{uri: item.url}}/>
            </ImageContainer>
            </TouchableWithoutFeedback>
        )
    } else if(item.type === "product") {
        console.log("product item", item);
        return (
            <TouchableWithoutFeedback onPress={() => moveToProductUri(item.url)}>
            <ProductContainer>
                <ProductItem
                productImage={item.image}
                productName={item.title}
                productDescription={item.description}
                shopIcon={item.favicon}
                shopName={item.site}/>
            </ProductContainer>
            </TouchableWithoutFeedback>
        )
    }
}
    return (
        <Container>
            {loadingFeedInfo && (
            <Placeholder
            Animation={Fade}>
                <PlaceholderLine
                style={{marginTop: 10, marginLeft: 15, width: wp('92%')}}
                height={12}/>
                <PlaceholderLine
                style={{marginTop: 5, marginLeft: 15, width: wp('92%')}}
                height={12}/>
                <PlaceholderLine
                style={{marginTop: 5, marginLeft: 15, width: wp('92%')}}
                height={12}/>
            </Placeholder>
            )}
            {!loadingFeedInfo && (
            <FlatList
            showsVerticalScrollIndicator={false}
            style={{backgroundColor:"c3c3c3"}}
            data={paragraphData}
            renderItem={renderItem}/>
            )}
        </Container>
    )
}

export default FeedContent;