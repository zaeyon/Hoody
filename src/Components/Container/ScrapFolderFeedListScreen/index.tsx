import React, {useEffect, useState}from 'react';
import {TouchableWithoutFeedback, FlatList} from 'react-native'
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Component
import ScrapFeedItem from '~/Components/Presentational/ScrapFolderFeedListScreen/ScrapFeedItem';

// Route
import GETScrapFolder from '~/Route/Scrap/GETScrapFolder';


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
 background-color: #ffffff;
`;

const HeaderBackContainer = Styled.View`
 padding-top: 7px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 13px;
`;

const HeaderBackIcon = Styled.Image`
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

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
 width: ${wp('100%')};
 flex: 1;
 background-color: #ffffff;
`;

interface Props {
    navigation: any,
    route: any,
}

const ScrapFolderFeedListScreen = ({navigation, route}: any) => {
    const [feedListData, setFeedListData] = useState<Array<object>>([]);
    const [changeFeedListData, setChangeFeedListData] = useState<boolean>(false);

    useEffect(() => {
        
      GETScrapFolder(route.params?.folderId)
      .then(function(response) {
          console.log("스크랩 폴더", response)
          setFeedListData(response.Posts);
          setChangeFeedListData(!changeFeedListData);
      })
      .catch(function(error) {
          console.log("error", error)
      })

    }, [])

    const renderScrapFeedItem = ({item, index}: any) => {
        return (
            <ScrapFeedItem
            navigation={navigation}
            feedId={item.id}
            mainImage={item.mediaFiles[0] ? item.mediaFiles[0].url : null}
            mainTag={item.mainTags.name}
            rating={item.starRate}
            expense={item.expense ? item.expense + "원" : null}
            location={item.address ? item.address.address : null}/>
        )
    }

    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderBackContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderBackContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>{route.params?.folderName}</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer/>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                {feedListData[0] && (
                <FlatList
                columnWrapperStyle={{justifyContent:'space-between',paddingTop: 14, paddingLeft: 14, paddingRight: 14, marginVertical:6}}
                numColumns={2}
                data={feedListData}
                renderItem={renderScrapFeedItem}/>
                )}
            </BodyContainer>
        </Container>
    )
}

export default ScrapFolderFeedListScreen;





