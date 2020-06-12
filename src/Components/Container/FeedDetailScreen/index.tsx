import React, {useState, useEffect, useLayoutEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native';

import FeedContent from '~/Components/Presentational/FeedDetailScreen/FeedContent';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('7%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 background-color: #c3c3c3;
 padding: 0px 0px 0px 0px;
`;


const LeftContainer = Styled.View`
background-color: #ffffff;
height: ${hp('7%')};
flex: 1;
justify-content: center;
align-items: center;
`;

const CenterContainer = Styled.View`
justify-content: center;
align-items: center;
background-color: #ffffff;
height: ${hp('7%')};
flex: 7;
`;

const RightContainer = Styled.View`
justify-content: center;
background-color: #ffffff;
height: ${hp('7%')};
flex: 1;
`;

const HeaderTitleText = Styled.Text`
 font-size: 20px;
 margin-left: 6px;
`;

const BackButton = Styled.Image`
width: 11px;
height: 19px;
`;

const ButtonText = Styled.Text`
 font-size: 20px;
 color: #338EFC;
`;

const FeedContentContainer = Styled.View`
background-color: #c3c3c3;
flex: 1;
`;

const HeaderBorder = Styled.View`
 width: ${wp('100%')};
 height: 0.3px;
 background-color: #c3c3c3;
`;

interface Props {
    navigation: any,
    route: any
}

var PARAGRAPH_DATA: Array<Object>;

const FeedDetailScreen = ({navigation, route}: Props) => {
    const [mainTag, setMainTag] = useState("메인태그");
    const [paragraphData, setParagraphData] = useState<Array<Object>>();

    useEffect(() => {
        PARAGRAPH_DATA = [
            {
                "id": 7,
                "description": "test1",
                "index": 1,
                "type": "description"
            },
            {
                "id": 3,
                "filename": "original/159184478970219159759.jpeg",
                "size": 24711,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://hoogingpostmedia.s3.ap-northeast-2.amazonaws.com/original/159184478970219159759.jpeg",
                "type": "image"
            },
            {
                "id": 8,
                "description": "test2",
                "index": 3,
                "type" : "description"
            },
            {
                "id": 9,
                "description": "test3",
                "index": 4,
                "type": "description"
            },
            {
                "id": 4,
                "filename": "original/1591844789702IMG_1014.jpg",
                "size": 1183759,
                "mimetype": "image/jpeg",
                "index": 5,
                "url": "https://hoogingpostmedia.s3.ap-northeast-2.amazonaws.com/original/1591844789702IMG_1014.jpg",
                "type": "image"
            }
        ]
        setParagraphData(PARAGRAPH_DATA);
    }, [])

   return (
       <Container>
        <HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/ic_back2.png')} />
          </TouchableWithoutFeedback>
        </LeftContainer>
        <TouchableWithoutFeedback onPress={() => 0}>
          <CenterContainer>
          <HeaderTitleText>#{mainTag}</HeaderTitleText>
        </CenterContainer>
        </TouchableWithoutFeedback>
        <RightContainer>
              <TouchableWithoutFeedback onPress = {() => 0}>
              <ButtonText></ButtonText>
              </TouchableWithoutFeedback>
        </RightContainer>
      </HeaderContainer>
      <HeaderBorder/>
      <FeedContentContainer>
          <FeedContent
          paragraphData={paragraphData}
          ></FeedContent>
      </FeedContentContainer>


       </Container>
   )
}

export default FeedDetailScreen;