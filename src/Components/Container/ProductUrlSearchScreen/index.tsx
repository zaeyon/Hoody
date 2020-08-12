import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProductItem from '~/Components/Presentational/UploadScreen/ProductItem';
import POSTProductUrl from '~/Route/Post/POSTProductUrl';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const CancelText = Styled.Text`
 font-size: 17px;
 color: #cccccc;
`;

const HeaderRightContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const TempoSaveText = Styled.Text`
 font-size: 17px;
 color: #cccccc;
`;

const FinishContainer = Styled.View`
padding: 20px 20px 15px 20px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const AbledFinishText = Styled.Text`
 font-size: 17px
 font-weight: 600;
 color: #3384FF;
`;

const DisabledFinishText = Styled.Text`
 font-size: 17px;
 font-weight: 600;
 color: #cccccc;
`;

const HeaderTitle = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #333333;
`;


const SearchResultContainer = Styled.View`
  flex-direction: column;
  width: ${wp('100%')};
  border-color: #c3c3c3;
  justify-content: center;
  align-items: center;
`;


const SearchInputContainer = Styled.View`
justify-content: center;
align-items: center;
width: ${wp('91%')};
height: 36px;
border-radius: 40px;
background-color: #F3F3F3;
`;

const SearchInput = Styled.TextInput`
 width: ${wp('89%')};
 height: 36px;
 padding-left: ${wp('9%')};
 font-size: 18px;
`;

const SearchContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
 padding-top: 5px;
 padding-bottom: 5px;
`;


const SearchButton = Styled.TouchableOpacity`
 position: absolute;
 justify-content: center;
 left: 10px;
`;


const SearchIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const ProductResultContainer = Styled.View`
 background-color: #ffffff;
 padding-top: 20px;
 padding-bottom: 20px;
 justify-content: center;
 align-items: center;
`;

const NoProductResultContainer = Styled.View`
 width: ${wp('100%')};
 align-items: center;
 justify-content: center;
 padding-top: 50px;
 padding-bottom: 50px;
`;

const NoProductResultText = Styled.Text`
 font-size: 15px;
 color: #979797;
`;

const NoInputedUrlContainer = Styled.View`
 flex: 1;
 align-items: center;
 justify-content: center;
`;

interface Props {
    navigation: any,
    route: any,
}

const PRODUCT_TEST_DATA = {
    productImage: 'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/product/image/vendoritem/2019/04/29/3040649897/c4c8de8b-f17e-420b-909a-3f7caeaca29e.jpg',
    productName: '록키스 플래티늄 약산성 샴푸',
    productDescription: '제조일부터 2년. 공급사 사정에 따라 제조일자가 다른 상품이 입고되어 정확한 제조년월일 및 사용기한 확인이 어렵습니다. 제조년월일 확인이 어려운 상품은 유통기한을 기준으로 배송되므로 구매 시 유통기한을 참고 부탁드립니다.',
    shopIcon: 'https://image10.coupangcdn.com/image/mobile/v3/img_fb_like.png',
    shopName: '쿠팡',
}


const ProductUrlSearchScreen = ({navigation, route}: Props) => {
    const [searchedProductExis, setSearchedProductExis] = useState<boolean>(false);
    const [searchedProduct, setSearchedProduct] = useState<object>({});
    const [inputedUrlExis, setInputedUrlExis] = useState<boolean>(false);

    const onChangeUrlInput = (text: string) => {
        var spaceRemovedText = text.replace(/ /g,"");
        if(spaceRemovedText !== "") {
           searchProductUrl(text);
           setInputedUrlExis(true);
        } else {
            setSearchedProduct(null)
            setInputedUrlExis(false);
        }
    }
    
    const searchProductUrl = (url: string) => {
        POSTProductUrl(url).then(function(response) {
            console.log("검색된 상품 정보", response)
            const product = {
              productImage: response.image,
              productName: response.title,
              productDescription: response.description,
              shopIcon: response.favicon,
              shopName: response.site,
              url: response.url
            }
          setSearchedProduct(response);
          setSearchedProductExis(true);
          }).catch(function(error) {
            console.log("상품 검색 실패", error);
            setSearchedProductExis(false)
          }) 
    }

    const registerProduct = () => {
      if(route.params?.requestType === "upload") {
      navigation.navigate("UploadScreen", {
        product: searchedProduct,
      })
      } else if(route.params?.requestType === "edit") {
        navigation.navigate("FeedEditScreen", {
          product: searchedProduct,
        })
      }
    }
    
    return (
        <Container>
       <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                    <CancelText>취소</CancelText>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitle>URL 첨부</HeaderTitle>
                {!searchedProductExis && (
                <HeaderRightContainer>
                <DisabledFinishText>등록</DisabledFinishText>
                </HeaderRightContainer>
                )}
                {searchedProductExis && (
                <TouchableWithoutFeedback onPress={() => registerProduct()}>
                <HeaderRightContainer>
                <AbledFinishText>등록</AbledFinishText>
                </HeaderRightContainer>  
                </TouchableWithoutFeedback>  
                )}
        </HeaderBar>
        <SearchContainer>
              <SearchInputContainer>
              <SearchInput
                placeholder="URL을 입력하세요"
                onChangeText={(text: string) => 0}
                placeholderTextColor="#979797"
                clearButtonMode={'while-editing'}
                autoCapitalize={false}
                onChangeText={(text:string) => onChangeUrlInput(text)}
              />
              <SearchButton onPress={() => 0}>
                <SearchIcon
                  source={require('~/Assets/Images/ic_search.png')}
                />
                </SearchButton>
                </SearchInputContainer>
            </SearchContainer>
            {!inputedUrlExis && (
              <NoInputedUrlContainer>
              </NoInputedUrlContainer>
            )}
            {!searchedProductExis && inputedUrlExis && (
            <NoProductResultContainer>
                <NoProductResultText>해당 링크의 정보를 불러올 수 없습니다.</NoProductResultText>
                <NoProductResultText>링크를 다시 확인해주세요.</NoProductResultText>
            </NoProductResultContainer>
            )}
            {searchedProductExis && inputedUrlExis && (
            <TouchableWithoutFeedback onPress={() => registerProduct()}>
            <ProductResultContainer>
            <ProductItem
            productImage={searchedProduct.image}
            productName={searchedProduct.title}
            productDescription={searchedProduct.description}
            shopIcon={searchedProduct.favicon}
            shopName={searchedProduct.site}/>
        </ProductResultContainer>
        </TouchableWithoutFeedback>
            )}

        </Container>
    )
}

export default ProductUrlSearchScreen;