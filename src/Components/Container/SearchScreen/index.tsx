import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, SectionList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';

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
 background-color:#ffffff;
 padding-bottom: 7px;
`;

const HeaderLeftContainer = Styled.View`
 padding-top: 12px;
 padding-left: 16px;
 padding-bottom: 16px;
`;

const HeaderBackIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderRightContainer = Styled.View`
padding-left: 10px;
padding-right: 16px;
justify-content: center;
`;

const HeaderSearchText = Styled.Text`
 color: #267DFF;
 font-weight: 500;
 font-size: 17px;
`;

const HeaderSearchContainer = Styled.View`
`;

const SearchInputContainer = Styled.View`
justify-content: center;
align-items: center;
width: ${wp('73%')};
height: 36px;
border-radius: 40px;
background-color: #F3F3F3;
flex-direction: row;
`;

const SearchInput = Styled.TextInput`
 width: ${wp('79%')};
 height: 36px;
 padding-left: ${wp('8%')};
 font-size: 16px;
`;


const SearchIcon = Styled.Image`
position: absolute;
left: 13px;
 width: ${wp('4%')};
 height: ${wp('4%')};
 tint-color: #C6C7CC
`;

const SearchResultContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

const SearchResultItemContainer = Styled.View`
 width: ${wp('100%')};
 height: ${wp('17%')};
 background-color: #ffffff;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 padding-top: 10px;
 padding-bottom: 10px;
 padding-left: 16px;
`;

const SearchResultItemLeftContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ProfileSearchItemImage = Styled.Image`
width: ${wp('11.0%')};
height: ${wp('11.0%')};
border-radius: 100px;
`;

const SearchItemText = Styled.Text`
margin-left: 10px;
font-size: 16px;
font-weight: 600;
color: #1D1E1F;
`;

const RecentlySearchItemRemoveContainer = Styled.View`
padding-top: 20px;
padding-bottom: 20px;
padding-left: 16px;
padding-right: 16px;
`;

const RecentlySearchListContainer = Styled.View`
 flex: 1;
`;

const NoSearchInputContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

const RecentlySearchHeader = Styled.View`
 padding-top: 10px;
 padding-bottom: 10px;
 padding-left: 16px;
 padding-right: 16px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;

const RecentlySearchText = Styled.Text`
 font-weight: 600;
 font-size: 17px;
 color: #1D1E1F;
`;

const RecentlySearchRemoveText = Styled.Text`
 font-size: 15px;
 color: #C6C7CC;
`;

const SearchResultItemIconContainer = Styled.View`
border-radius: 100px;
border-width: 0.5px
border-color: #f4f4f7;
width: ${wp('11.7%')};
height: ${wp('11.7%')};
border-radius: 100px;
justify-content: center;
align-items: center;
`;

const TagSearchItemIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const LocationSearchItemIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const RecentlySearchItemRemoveIcon = Styled.Image`
width: ${wp('4.26%')};
height: ${wp('4.26%')};
`;

const SearchResultSectionTitleContainer = Styled.View`
padding-top: 10px;
padding-bottom: 10px;
padding-left: 16px;
padding-right: 16px;
flex-direction: row;
align-items: center;
`;

const SearchResultSectionTitleText = Styled.Text`
font-weight: 600;
font-size: 17px;
color: #1D1E1F;
`;


const TEST_RECENTLY_DATA = [
        {
            type: "tag",
            name: "태그"
        },
        {
            type: "user",
            name: "사용자"
        },
        {
            type: "place",
            name: "장소"
        }
]

const TEST_SEARCH_RESULT_DATA = {
    "tags": [
        {
            "id": 1,
            "name": "태그1"
        },
        {
            "id": 2,
            "name": "태그2"
        }
    ],
    "users": [
        {
            "id":1,
            "nickname":"사용자1",
            "profileImg":"http://gangnamstar.co.kr/files/attach/images/119/904/027/99b6e593de5df80fd08141a0db2c2166.jpg"
        },
        {
            "id":2,
            "nickname":"사용자2",
            "profileImg":"https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg"
        },
    ],
    "addresses": [
      {
        "id": 2,
        "address": "서울특별시 중구 을지로3가",
        "reviewNum": 5,
        "region": "서울특별시 중구"
      },
      {
        "id": 1,
        "address": "서울시 성북구 성북동 116-1",
        "reviewNum": 1,
        "region": "서울특별시 성북구"
      },
      {
        "id": 3,
        "address": "서울특별시 중구 을지로3가 홍원빌",
        "reviewNum": 1,
        "region": "서울특별시 중구"
      }
    ]
  }

interface Props {
    navigation: any,
}

const SearchScreen = ({navigation}: Props) => {
    const [inputingSearchText, setInputingSearchText] = useState<string>("");
    const [searchResultListData, setSearchResultListData] = useState<any>([]);
    const [recentlySearchListData, setRecentlySearchListData] = useState<any>([]);
    const [noInputSearch, setNoInputSearch] = useState<boolean>(true);

    useEffect(() => {
       setRecentlySearchListData(TEST_RECENTLY_DATA);

       var tmpSearchResultListData = new Array();
       for(const[key, value] of Object.entries(TEST_SEARCH_RESULT_DATA)) {
           tmpSearchResultListData.push({
               title: key==="tags" ? "태그" : (key==="users" ? "계정" : (key==="addresses" ? "장소" : null)),
               data: value,
           })
       }

       setTimeout(() => {
       setSearchResultListData(tmpSearchResultListData);
       console.log("searchResultListData", searchResultListData);
       })

    }, [])

    const onChangeSearchInput = (text: string) => {
        setInputingSearchText(text);

        if(text === "") {
            setNoInputSearch(true);
        } else {
            setNoInputSearch(false);
        }
    }

    const renderSearchResultItem = ({item, index, section}: any) => {
        console.log("renderSearchResultItem", item)
        console.log("section.title", section.title);
        if(section.title == "태그") {
        return (
            <SearchResultItemContainer>
                <SearchResultItemLeftContainer>
                    <SearchResultItemIconContainer>
                    <TagSearchItemIcon
                    source={require('~/Assets/Images/SearchResult/ic_hashTag.png')}/>
                    </SearchResultItemIconContainer>
                    <SearchItemText>{"#" + item.name}</SearchItemText>
                </SearchResultItemLeftContainer>
            </SearchResultItemContainer>
        )} else if(section.title == "계정") {
        return (
            <SearchResultItemContainer>
                <SearchResultItemLeftContainer>
                    <SearchResultItemIconContainer>
                    <ProfileSearchItemImage
                    source={{uri:item.profileImg}}/>
                    </SearchResultItemIconContainer>
                    <SearchItemText>{item.nickname}</SearchItemText>
                </SearchResultItemLeftContainer>
            </SearchResultItemContainer>
        )} else if(section.title == "장소") {
            return (
            <SearchResultItemContainer>
            <SearchResultItemLeftContainer>
                <SearchResultItemIconContainer>
                <TagSearchItemIcon
                source={require('~/Assets/Images/SearchResult/ic_locationMarker.png')}/>
                </SearchResultItemIconContainer>
                <SearchItemText>{item.address}</SearchItemText>
            </SearchResultItemLeftContainer>
            </SearchResultItemContainer>
     )}
    }

    const renderRecentlyResultItem = ({item, index}: any) => {
        if(item.type === "tag") {
        return (
            <SearchResultItemContainer>
                <SearchResultItemLeftContainer>
                    <SearchResultItemIconContainer>
                    <TagSearchItemIcon
                    source={require('~/Assets/Images/SearchResult/ic_hashTag.png')}/>
                    </SearchResultItemIconContainer>
                    <SearchItemText>{"#" + item.name}</SearchItemText>
                </SearchResultItemLeftContainer>
                <RecentlySearchItemRemoveContainer>
                    <RecentlySearchItemRemoveIcon
                    source={require('~/Assets/Images/SearchResult/ic_removeRecentlySearch.png')}
                    />
                </RecentlySearchItemRemoveContainer>
            </SearchResultItemContainer>
        )
        } else if(item.type === "user") {
            return (
            <SearchResultItemContainer>
                <SearchResultItemLeftContainer>
                    <SearchResultItemIconContainer>
                        <ProfileSearchItemImage/>
                    </SearchResultItemIconContainer>
                    <SearchItemText>{item.name}</SearchItemText>
                </SearchResultItemLeftContainer>
                <RecentlySearchItemRemoveContainer>
                    <RecentlySearchItemRemoveIcon
                    source={require('~/Assets/Images/SearchResult/ic_removeRecentlySearch.png')}
                    />
                </RecentlySearchItemRemoveContainer>
            </SearchResultItemContainer>
            )
        } else if(item.type === "place") {
            return (
            <SearchResultItemContainer>
                <SearchResultItemLeftContainer>
                    <SearchResultItemIconContainer>
                        <LocationSearchItemIcon
                        source={require('~/Assets/Images/SearchResult/ic_locationMarker.png')}/>
                    </SearchResultItemIconContainer>
                    <SearchItemText>{item.name}</SearchItemText>
                </SearchResultItemLeftContainer>
                <RecentlySearchItemRemoveContainer>
                    <RecentlySearchItemRemoveIcon
                    source={require('~/Assets/Images/SearchResult/ic_removeRecentlySearch.png')}
                    />
                </RecentlySearchItemRemoveContainer>
            </SearchResultItemContainer>
            )
        }
    }

    return (
        <Container>
            <HeaderBar>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <HeaderLeftContainer>
                <HeaderBackIcon
                source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
            </HeaderLeftContainer>
            </TouchableWithoutFeedback>
            <HeaderSearchContainer>
                <SearchInputContainer>
                    <SearchInput
                    placeholder={"검색"}
                    placeholderTextColor={"C6C7CC"}
                    autoFocus={true}
                    value={inputingSearchText}
                    autoCapitalize={"none"}
                    onChangeText={(text: string) => onChangeSearchInput(text)}
                    />
                </SearchInputContainer>
            </HeaderSearchContainer>
            <HeaderRightContainer>
                <HeaderSearchText>검색</HeaderSearchText>
            </HeaderRightContainer>
            </HeaderBar>
            {!noInputSearch && (
            <SearchResultContainer>
            <SectionList
            sections={searchResultListData}
            keyExtractor={(item, index) => item + index}
            renderItem={renderSearchResultItem}
            renderSectionHeader={({ section:{title}}) => (
                <SearchResultSectionTitleContainer>
                    <SearchResultSectionTitleText>{title}</SearchResultSectionTitleText>
                </SearchResultSectionTitleContainer>
            )}
            />
        </SearchResultContainer>
            )}
            {noInputSearch && (
                <NoSearchInputContainer>
                    <RecentlySearchHeader>
                        <RecentlySearchText>최근 검색</RecentlySearchText>
                        <RecentlySearchRemoveText>전체삭제</RecentlySearchRemoveText>
                    </RecentlySearchHeader>
                    <RecentlySearchListContainer>
                        <FlatList
                        data={recentlySearchListData}
                        keyExtractor={(item:any,index:number) => index.toString()}
                        renderItem={renderRecentlyResultItem}/>
                    </RecentlySearchListContainer>

                </NoSearchInputContainer>
            )}
        </Container>

    )
}

export default SearchScreen;