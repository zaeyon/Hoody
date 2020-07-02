import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { unstable_enableLogBox } from 'react-native';

const Container = Styled.View`
width: ${wp('84%')};
height: ${wp('38%')};
background-color: #ffffff;
flex-direction: row;
border-width: 1px;
border-color: #EFEFEF;
border-radius: 15px;
`;

const ProductImageContainer = Styled.View`
`;

const ProductContentContainer = Styled.View`
justify-content: space-between;
padding-left: 15px;
padding-top: 15px;
padding-right: 13px;
padding-bottom: 15px;
background-color: #fafafa;
border-top-right-radius: 15px;
border-bottom-right-radius: 15px;
flex-shrink: 1;
`;


const ProductImage = Styled.Image`
 width: ${wp('40%')};
 height: ${wp('37%')};
 background-color: #c3c3c3;
 border-radius: 15px;
`;

const Divider = Styled.View`
 width: 1px;
 height: ${wp('37%')};
 background-color: #EFEFEF;
`;

const ProductName = Styled.Text`
 font-size: 18px;
`;

const ProductDescription = Styled.Text`
 margin-top: 4px;
 font-size: 15px;
 color: #4b4b4b;
`;

const ShopContainer = Styled.View`
 margin-top: 6px;
 flex-direction: row;
 align-items: center;
`;

const ShopIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const ShopName = Styled.Text`
margin-left: 5px;
font-size:14px;
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
    const [productTitle, setProductTitle] = useState<string>();


    useEffect(() => {
        getDesLength(productDescription);
        getTitleLength(productName);
        console.log("productUrl", productImage);
        console.log("shopIcon", shopIcon);
    })

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

        /*
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
        }*/
       setProductTitle(str)   
    }


    return (
        <Container>
            <ProductImageContainer>
                <ProductImage
                source={{uri:productImage}}
                />
            </ProductImageContainer>
            <Divider/>
            <ProductContentContainer>
    <ProductName>{productTitle}</ProductName>
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