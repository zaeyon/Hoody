import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList,SectionList, View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import GETTopTagDetailList from '~/Route/Arrangement/GETTopTagDetailList';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FAFAFA;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('29.6%')};
 background-color: #FAFAFA;

 border-bottom-width: 0.5px;
 border-color: #F1F1F1;
`;

const HeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
`;

const BackButtonContainer = Styled.View`
 padding: 12.5px 15px 13px 16px;
 align-items: center;
 justify-content: center;
`;

const BackButton = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderViewMoreIcon = Styled.Image`
 width: ${wp('7.5%')};
 height: ${wp('7.5%')};
`;

const TagEvaluateContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: center;
 flex: 1;
`;

const TagEvaluateItemContainer = Styled.View`
padding-top: 16px;
padding-bottom: 16px;
align-items: center;
`;

const TagEvaluateItemLabelText = Styled.Text`
font-size: 14px;
color: #8E8E8E;
`;

const TagEvaluateItemValueText = Styled.Text`
font-weight: 600;
font-size: 16px;
color: #333333;
`;

const TagValueContainer = Styled.View`
margin-top: 2px;
align-items: center;
flex-direction: row;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const RatingStarIcon = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;
const DetailItemTagText = Styled.Text`
font-weight: 500;
font-size: 16px;
color: #333333;
`

const DetailItemRatingStarIcon = Styled.Image`
marginTop: 3;
width: 13;
height: 13;
`

const DetailItemRatingText = Styled.Text`
font-weight: 500;
font-size: 15px;
color: #56575c;
`
const DetailItemLocationText = Styled.Text`
font-weight: 500;
font-size: 15px;
color: #8E9199;
`
interface Props {
    navigation: any,
    route: any,
}

const TopInterestTagDetailScreen = ({navigation, route}: Props) => {

    const getCurrentYear = (date: Date) => {
        return date.getFullYear();
      }
    
      const getCurrentMonth = (date: Date) => {
        return date.getMonth() + 1;
      }

    const {tagName} = route.params;
    const {tagRank} = route.params;
    const {postCount} = route.params;
    const {totalExpense} = route.params;
    const {avgRating} = route.params;
    const [selectedYear, setSelectedYear] = useState<number>(getCurrentYear(new Date()));
    const [selectedMonth, setSelectedMonth] = useState<number>(getCurrentMonth(new Date()));
    const [topTagDetailListData, setTopTagDetailListData] = useState<Array<any>>([]);

    const DATA = [
        {
          title: "7월28일",
          data: [{tag: "#Tag",rating: 3.5, cost:420000,like:21,comment:0, location:'위치'}]
        },
        {
          title: "12일",
          data: [{tag: "#Tag",rating: 3.5, cost:420000,like:21,comment:0, location:'위치'},
          {tag: "#Tag",rating: 3.5, cost:420000,like:21,comment:0, location:'위치'}]
        },
        {
          title: "3일",
          data: [{tag: "#Tag",rating: 3.5, cost:420000,like:21,comment:0, location:'위치'}]
        },
      ];

    const Item = ({ item }) => (
        <BodyContainer style={{marginBottom: 2, paddingLeft:15, paddingRight:15}}>
            <View style={{flex: 1, height: 150, flexDirection: 'row'}}>
                <View style={{flex: 2, flexDirection: 'column', justifyContent: 'center'}}>
                    <DetailItemTagText>#{item.mainTags.name}</DetailItemTagText>
                    <View style={{marginTop:10, marginBottom: 10, flexDirection: 'row'}}>
                        <DetailItemRatingStarIcon 
                        source={require('~/Assets/Images/ic_newStar.png')}/>
                        <DetailItemRatingText>{item.starRate} . {item.expense}원</DetailItemRatingText>
                    </View>
                    <DetailItemLocationText>{item.address==null?"":item.address.address}</DetailItemLocationText>
                    <View style={{marginTop: 20, flexDirection: 'row'}}>
                        <DetailItemRatingStarIcon
                        source={require('~/Assets/Images/ic_heart_outline.png')}/>
                        <DetailItemLocationText>{item.likes}  </DetailItemLocationText>
                        <DetailItemRatingStarIcon
                        source={require('~/Assets/Images/ic_comment_outline.png')}/>
                        <DetailItemLocationText>{item.commentsCount}</DetailItemLocationText>
                    </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                <Image style={{height: 110, width: 110,borderRadius:10}}
                source={{uri:item.mediaFiles[0]==undefined?"":item.mediaFiles[0].thumbnailImg}}>
                </Image>
                </View>
            </View>
            
            
        </BodyContainer>
    );
    const ItemHeader = ({ title }) => (
        <BodyContainer style={{paddingLeft:15, paddingRight:15}}>
            <View style={{height: 50, justifyContent: 'center'}}>
                <TagEvaluateItemValueText>{title}</TagEvaluateItemValueText>
            </View>
        </BodyContainer>
    )
    
    useEffect(() => {
        getTopTagDetailList();
    }, [])

    const getTopTagDetailList = () => {
        GETTopTagDetailList(tagName, selectedYear + "-" + selectedMonth)
      .then(function(response) {
        console.log("GETTopTagDetailList response", response);
        const DATA = renderTopTagDetailList(response);
        setTimeout(() => {
            console.log("DATA" ,DATA);
            setTopTagDetailListData(DATA);    
        }, 100);
        
        console.log("setting top tag detail list data")
      })
      .catch(function(error) {
        console.log("GETTopTagDetailList error", error);
      })
    }

    const renderTopTagDetailList = (data) => {
        let DATA = [];
        console.log("render" + data[0])
        
        Object.keys(data.ByDate).forEach(key => {
            console.log("data.ByDate[key]", data.ByDate[key]);
            let childData = new Object();
            childData.title = key;
            childData.data = data.ByDate[key];
            DATA.push(childData);
        });
        return DATA;
    }

    return (
        <Container>
          <HeaderBar>
              <HeaderContainer>
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <HeaderLeftContainer>
                  <BackButtonContainer>
                      <BackButton
                      source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                  </BackButtonContainer>
              </HeaderLeftContainer>
              </TouchableWithoutFeedback>
              <HeaderTitleText>#{tagName}</HeaderTitleText>
              <HeaderRightContainer>
                  <HeaderViewMoreIcon
                  source={require('~/Assets/Images/HeaderBar/ic_more.png')}/>
              </HeaderRightContainer>
              </HeaderContainer>
              <TagEvaluateContainer>
                  <TagEvaluateItemContainer style={{flex:2}}>
                      <TagEvaluateItemLabelText>평균 별점</TagEvaluateItemLabelText>
                      <TagValueContainer>
                      <RatingStarIcon
                      source={require('~/Assets/Images/ic_newStar.png')}/>
                      <TagEvaluateItemValueText style={{marginLeft:2}}>{avgRating}</TagEvaluateItemValueText>
                      </TagValueContainer>
                  </TagEvaluateItemContainer>
                  <TagEvaluateItemContainer style={{flex:1}}>
                      <TagEvaluateItemLabelText>평균 가격</TagEvaluateItemLabelText>
                      <TagValueContainer>
                      <TagEvaluateItemValueText>{totalExpense.toLocaleString()}원</TagEvaluateItemValueText>
                      </TagValueContainer>
                  </TagEvaluateItemContainer>
                  <TagEvaluateItemContainer style={{flex:2}}>
                      <TagEvaluateItemLabelText>게시글</TagEvaluateItemLabelText>
                      <TagValueContainer>
                      <TagEvaluateItemValueText>{postCount}</TagEvaluateItemValueText>
                      </TagValueContainer>
                  </TagEvaluateItemContainer>
              </TagEvaluateContainer>
          </HeaderBar>
          <Container>
            
                <View style={{height:40, paddingLeft: 15, paddingRight: 15, marginBottom: 1, 
                    backgroundColor: "#ffffff", justifyContent: 'center'}}>
                    <TagEvaluateItemLabelText>7월 2일-7월 28일</TagEvaluateItemLabelText>
                </View>
            
            
                <View>
                    <SectionList
                        sections={topTagDetailListData}
                        keyExtractor={(item, index) => item.tag + index}
                        renderItem={({item})=><Item item={item}/>}
                        renderSectionHeader={({section: {title}})=>(
                        <ItemHeader title={title}/>
                        )}
                    />
                </View>
              
            
            </Container>
        </Container>
    )
}

export default TopInterestTagDetailScreen;