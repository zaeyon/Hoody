import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('68%')};
height: ${hp('10%')};
background-color: #f2f2f2;
flex-direction: row;
`;

const ProductImageContainer = Styled.View`
`;

const ProductContentContainer = Styled.View`
justify-content: center;
padding-left: 10px;
`;


const ProductImage = Styled.Image`
 width: ${wp('26%')};
 height: ${wp('26%')};
`;

const ProductName = Styled.Text`
 font-size: 15px;
`;

const ProductDescription = Styled.Text`
 font-size: 12px;
`;

const ShopContainer = Styled.View`
 flex-direction: row;
`;

const ShopIcon = Styled.Image`
 width: ${wp('4.3%')};
 height: ${wp('4.3%')};
`;

const ShopName = Styled.Text`
margin-left: 5px;
font-size: 9px;
`;

interface Props {
    productImage: string,
    productName: string,
    productDescription: string,
    shopIcon: string,
    shopName: string,
}

const ProductItem = ({productImage, productName, productDescription, shopIcon, shopName}: Props) => {
    return (
        <Container>
            <ProductImageContainer>
                <ProductImage
                source={{uri:productImage}}
                />
            </ProductImageContainer>
            <ProductContentContainer>
    <ProductName>{productName}</ProductName>
    <ProductDescription>{productDescription}</ProductDescription>
    <ShopContainer>
        <ShopIcon
        source={require('~/Assets/Images/SocialLogin/ic_googleLogin.png')}
        />
    <ShopName>{shopName}</ShopName>
    </ShopContainer>
            </ProductContentContainer>
        </Container>
    )
}

export default ProductItem;