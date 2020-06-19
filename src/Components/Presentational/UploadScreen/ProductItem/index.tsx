import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { unstable_enableLogBox } from 'react-native';

const Container = Styled.View`
width: ${wp('68%')};
background-color: #ffffff;
flex-direction: row;
border-color: #c3c3c3;
padding-right: 10px;
padding-top: 5px;
padding-bottom: 5px;
padding-left: 7px;
`;

const ProductImageContainer = Styled.View`
align-items: center;
justify-content: center;
`;

const ProductContentContainer = Styled.View`
justify-content: center;
padding-left: 10px;
`;


const ProductImage = Styled.Image`
 width: ${wp('22%')};
 height: ${hp('12%')};
`;

const ProductName = Styled.Text`
 font-size: 15px;
`;

const ProductDescription = Styled.Text`
 margin-top: 4px;
 font-size: 12px;
`;

const ShopContainer = Styled.View`
 margin-top: 6px;
 flex-direction: row;
 align-items: center;
`;

const ShopIcon = Styled.Image`
 width: ${wp('4.3%')};
 height: ${wp('4.3%')};
`;

const ShopName = Styled.Text`
margin-left: 5px;
font-size:11px;
`;

interface Props {
    productImage: string,
    productName: string,
    productDescription: string,
    shopIcon: string,
    shopName: string,
}

const ProductItem = ({productImage, productName, productDescription, shopIcon, shopName}: Props) => {
    const [subDescription, setSubDescription] = useState<string>();
    const [subTitle, setSubTitle] = useState<string>();

    const getDesLength = (str) => {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            if(escape(str.charAt(i)).length == 6) {
                len++;
            }
            len++;
        }
        if(len > 130) {
            setSubDescription(productDescription.substr(0, 30) + "...")
        } else {
            setSubDescription(productDescription)
        }     
    }

    const getTitleLength = (str) => {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            if(escape(str.charAt(i)).length == 6) {
                len++;
            }
            len++;
        }
        if(len > 12) {
            setSubTitle(productName.substr(0, 12) + "...")
        } else {
            setSubTitle(productName)
        }     
    }

    useEffect(() => {
        getDesLength(productDescription);
        getTitleLength(productName);
        console.log("productUrl", productImage);
        console.log("shopIcon", shopIcon);
    })


    return (
        <Container>
            <ProductImageContainer>
                <ProductImage
                source={{uri:productImage}}
                />
            </ProductImageContainer>
            <ProductContentContainer>
    <ProductName>{subTitle}</ProductName>
    <ProductDescription>{subDescription}</ProductDescription>
    <ShopContainer>
        <ShopIcon
        source={{uri: shopIcon}}
        />
    <ShopName>{shopName}</ShopName>
    </ShopContainer>
            </ProductContentContainer>
        </Container>
    )
}

export default ProductItem;