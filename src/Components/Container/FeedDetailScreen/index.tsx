import React, {useState, useEffect, useLayoutEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, Text} from 'react-native';

import GetFeedDetail from '~/Route/Post/GetFeedDetail';
import FeedContent from '~/Components/Presentational/FeedDetailScreen/FeedContent';

const Container = Styled.SafeAreaView`
width: ${wp('100%')};
height:${hp('100%')};
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 padding: 0px 0px 0px 0px;
`;


const LeftContainer = Styled.View`
background-color: #ffffff;
height: ${hp('6%')};
flex: 1;
justify-content: center;
align-items: center;
`;

const CenterContainer = Styled.View`
justify-content: center;
align-items: center;
background-color: #ffffff;
height: ${hp('6%')};
flex: 7;
`;

const RightContainer = Styled.View`
justify-content: center;
background-color: #ffffff;
height: ${hp('6%')};
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


const HeaderBorder = Styled.View`
 width: ${wp('100%')};
 height: 0.3px;
 background-color: #c3c3c3;
`;

const FeedContentContainer = Styled.View`
height: ${hp('100%')};
background-color: #000000;
`;

const BottomBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6%')};
 position: absolute;
 bottom: 0;
 align-items: center;
 justify-content: space-around;
 background-color: #ffffff;
 border-top-width: 0.3px;
 border-color: #c3c3c3;
 flex-direction: row;
`;

const LikeContainer = Styled.View`
 flex: 1;
 justify-content: center;
 align-items: center;
 height: ${hp('6%')};
`;

const CommentContainer = Styled.View`
 flex:1;
 justify-content: center;
 align-items: center;
 height: ${hp('6%')};
`;

const ScrapContainer = Styled.View`
 flex:1;
 justify-content: center;
 align-items: center;
 height: ${hp('6%')};
`;



interface Props {
    navigation: any,
    route: any,
}

var PARAGRAPH_DATA: Array<Object>;

const FeedDetailScreen = ({navigation, route}: Props) => {
    const [mainTag, setMainTag] = useState("메인태그");
    const [paragraphData, setParagraphData] = useState();
    const [commentArray, setCommentArray] = useState();
    const [postId, setPostId] = useState();

    useEffect(() => {
        if(route.params?.feedId) {
       GetFeedDetail(route.params.feedId).then(function(response) {
           console.log("GetFeedDetail Success:", response.data.postBody)
           console.log("response.data.post!!!", response.data.post.comments);
           setCommentArray(response.data.post.comments);
           setParagraphData(response.data.postBody);
           setPostId(route.params.feedId);
       })
       .catch(function(error) {
           console.log("error", error);
       })
    }
    }, [route.params.feedId])

    const moveCommentList = () => {
        console.log("commentArray", commentArray);
        console.log("postId", postId);

        navigation.navigate("CommentListScreen", {
            postId: postId,
            comments: commentArray,
        })
    }


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
          <FeedContent
          paragraphData={paragraphData}
          ></FeedContent>
      <BottomBar>
          <LikeContainer>
          <Text>좋아요</Text>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("LikeListScreen")}>
          <Text style={{marginTop:5}}>목록</Text>
          </TouchableWithoutFeedback>
          </LikeContainer>
          <TouchableWithoutFeedback onPress={() => moveCommentList()}>
          <CommentContainer>
          <Text>댓글</Text>
          </CommentContainer>
          </TouchableWithoutFeedback>
          <ScrapContainer>
          <Text>스크랩</Text>
          </ScrapContainer>
      </BottomBar>

       </Container>
   )
}

export default FeedDetailScreen;