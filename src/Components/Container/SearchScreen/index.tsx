import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, SectionList, FlatList, Alert, StyleSheet} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';

// Route
import GETSearchAutoComplete from '~/Route/Search/GETSearchAutoComplete';

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

const DisabledHeaderSearchText = Styled.Text`
color: #267DFF;
font-weight: 500;
font-size: 17px;
opacity: 0.5;
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
 justify-content: space-between;
 padding-left: 16px;
`;

const SearchResultItemLeftContainer = Styled.View`
padding-top: 10px;
padding-bottom: 10px;
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
align-items: center;
justify-content: center;
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
background-color: #ffffff;
`;

const SearchResultSectionTitleText = Styled.Text`
font-weight: 600;
font-size: 17px;
color: #1D1E1F;
`;

const SearchResultItemSelectContainer = Styled.View`
padding-top: 20px;
padding-bottom: 24px;
padding-left: 16px;
padding-right: 16px;
align-items: center;
justify-content: center;
`;

const SearchResultItemSelectText = Styled.Text`
font-size: 15px;
color: #C6C7CC;
`;

const CheckedIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;


const SelectedSearchItemListContainer = Styled.View`
`;

const DisabledSearchResultItemContainer = Styled.View`
background-color: #F7F7F7;
opacity: 0.7;
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
    const [selectedSearchItemList, setSelectedSearchItemList] = useState<Array<object>>([]);
    const [changeSelectedSearchItem, setChangeSelectedSearchItem] = useState<boolean>(false);
    const [noInputSearch, setNoInputSearch] = useState<boolean>(true);

    const currentUser = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("currentUser.userRecentSearch", currentUser.userRecentSearch)
        dispatch(allActions.userActions.setInputedKeywordList([]))
       setRecentlySearchListData(currentUser.userRecentSearch);
    }, [])

    const onChangeSearchInput = (text: string) => {
        setInputingSearchText(text);

        if(text === "") {
            setNoInputSearch(true);

        } else {
            setNoInputSearch(false);
            GETSearchAutoComplete(text)
            .then(function(response) {
                var tmpKeywordList = currentUser.inputedKeywordList;
                var tmpAutoCompleteListData = new Array();
                console.log("response", response);

                for(const[key, value] of Object.entries(response)) {
                    console.log("response value", value);
                    value.map((obj: any) => {
                        for(var i = 0; i <tmpKeywordList.length; i++) {
                            console.log("value obj", obj);
                            console.log("tmpKeywordList[i]", tmpKeywordList[i].item);
                            if(key === "tags") {
                                if(obj.name === tmpKeywordList[i].item.name) {
                                    console.log("이미 선택한 단어");
                                    return obj.selected = true;
                                }  
                            } else if(key === "users") {
                                if(obj.nickname === tmpKeywordList[i].item.nickname) {
                                    return obj.selected = true;
                                }
                            } else if(key === "addresses") {
                                if(obj.address === tmpKeywordList[i].item.address) {
                                    return obj.selected = true;
                                }
                            }
                        }
                        return obj;
                    })

                    tmpAutoCompleteListData.push({
                        title: key==="tags" ? "태그" : (key==="users" ? "계정" : (key==="addresses" ? "장소" : null)),
                        data: value,
                    })
                }

                setTimeout(() => {
                    setSearchResultListData(tmpAutoCompleteListData);
                })
            })
            .catch(function(error) {
                console.log("error", error);
            })
        }
    }

    const selectSearchItem = (item: object, type: string, index: number) => {
        if(selectedSearchItemList.length === 3) {
            Alert.alert('검색어는 최대 3개까지 입력 가능합니다.', ' ', [
                {
                  text: '확인',
                  onPress: () => 0,
                },
              ]);
        } else {
            if(!item.selected) {
            console.log("SearchResultListData", searchResultListData);
            var tmpSearchResultListData = searchResultListData;
       if(type === "태그") {
           tmpSearchResultListData[0].data[index].selected = true;
           setSearchResultListData(tmpSearchResultListData);
       } else if(type === "계정") {
           tmpSearchResultListData[1].data[index].selected = true;
           setSearchResultListData(tmpSearchResultListData);
       } else if(type === "장소") {
           tmpSearchResultListData[2].data[index].selected = true;
           setSearchResultListData(tmpSearchResultListData);
       }
       var tmpSelectedSearchItemList = currentUser.inputedKeywordList;
       tmpSelectedSearchItemList.push({
           item: item,
           type: type
       });
       setTimeout(() => {
        dispatch(allActions.userActions.setInputedKeywordList(tmpSelectedSearchItemList))
        setInputingSearchText("")
        console.log("currentUser.inputedKeywordList", currentUser.inputedKeywordList);
       }, 10)
    } else {
            return 0;
        }
      }
    }

    const removeSelectedSearchItem = (requestedItem: object, index: number) => {
        console.log("removeSelectedSearchItem requestedItem", requestedItem);
        var removedSelectedItem = currentUser.inputedKeywordList;
        removedSelectedItem.splice(index, 1);
        dispatch(allActions.userActions.setInputedKeywordList(removedSelectedItem))
        //setChangeSelectedSearchItem(!changeSelectedSearchItem);

        var tmpSearchResultListData = searchResultListData;

        if(requestedItem.type === "태그") {
            console.log("tmpSearchResultListData[0].data", tmpSearchResultListData[0].data);
            var index2 = tmpSearchResultListData[0].data.indexOf(requestedItem.item);
            if(index2 !== -1) {
                tmpSearchResultListData[0].data[index2].selected = false;
                setSearchResultListData(tmpSearchResultListData);
            }
        } else if(requestedItem.type === "계정") {
            var index2 = tmpSearchResultListData[1].data.indexOf(requestedItem.item);
            if(index2 !== -1) {
                tmpSearchResultListData[1].data[index2].selected = false;
                setSearchResultListData(tmpSearchResultListData);
            }
        } else if(requestedItem.type === "장소") {
            var index2 = tmpSearchResultListData[2].data.indexOf(requestedItem.item);
            if(index2 !== -1) {
                tmpSearchResultListData[2].data[index2].selected = false;
                setSearchResultListData(tmpSearchResultListData);
            }
        }

        if(inputingSearchText === "") {
            setNoInputSearch(true);
        } 
    }

    const searchToInputedKeywordList = () => {
        if(inputingSearchText !== "") {
            var tmpKeywordList = currentUser.inputedKeywordList;
            tmpKeywordList.push(
                {
                    item: {
                        name: inputingSearchText 
                    },
                    type: "태그"
                }
            )

            setTimeout(() => {
                dispatch(allActions.userActions.setInputedKeywordList(tmpKeywordList));
                setInputingSearchText("");
            })
        }


        if(currentUser.inputedKeywordList.length === 1 && currentUser.inputedKeywordList[0].type === "계정") {
        navigation.navigate("AnotherUserProfileStack", {
            screen: 'AnotherUserProfileScreen',
            params: {requestedUserNickname: currentUser.inputedKeywordList[0].item.nickname}
        })    
        } else {
        navigation.navigate("SearchResultScreen");
        }
    }

    const renderSelectedItem = ({item,index}: any) => {
        console.log("renderSelectedItem item", item);
        if(item.type === "태그") {
            return (
            <SearchResultItemContainer>
            <SearchResultItemLeftContainer>
                <SearchResultItemIconContainer>
                <TagSearchItemIcon
                source={require('~/Assets/Images/SearchResult/ic_hashTag.png')}/>
                </SearchResultItemIconContainer>
                <SearchItemText>{"#" + item.item.name}</SearchItemText>
            </SearchResultItemLeftContainer>
            <TouchableWithoutFeedback onPress={() => removeSelectedSearchItem(item, index)}>
            <SearchResultItemSelectContainer>
                <CheckedIcon
                source={require('~/Assets/Images/SearchResult/ic_checked.png')}/>
            </SearchResultItemSelectContainer>
            </TouchableWithoutFeedback>
        </SearchResultItemContainer>
        )} else if(item.type == "계정") {
            return (
                <SearchResultItemContainer>
                    <SearchResultItemLeftContainer>
                        <SearchResultItemIconContainer>
                        <ProfileSearchItemImage
                        source={{uri:item.item.profileImg}}/>
                        </SearchResultItemIconContainer>
                        <SearchItemText>{item.item.nickname}</SearchItemText>
                    </SearchResultItemLeftContainer>
            <TouchableWithoutFeedback onPress={() => removeSelectedSearchItem(item, index)}>
            <SearchResultItemSelectContainer>
                <CheckedIcon
                source={require('~/Assets/Images/SearchResult/ic_checked.png')}/>
            </SearchResultItemSelectContainer>
            </TouchableWithoutFeedback>
                </SearchResultItemContainer>
            )} else if(item.type == "장소") {
                return (
                <SearchResultItemContainer>
                <SearchResultItemLeftContainer>
                    <SearchResultItemIconContainer>
                    <TagSearchItemIcon
                    source={require('~/Assets/Images/SearchResult/ic_locationMarker.png')}/>
                    </SearchResultItemIconContainer>
                    <SearchItemText>{item.item.address}</SearchItemText>
                </SearchResultItemLeftContainer>
            <TouchableWithoutFeedback onPress={() => removeSelectedSearchItem(item,index)}>
            <SearchResultItemSelectContainer>
                <CheckedIcon
                source={require('~/Assets/Images/SearchResult/ic_checked.png')}/>
            </SearchResultItemSelectContainer>
            </TouchableWithoutFeedback>
                </SearchResultItemContainer>
         )}
        
    }

    const renderSearchResultItem = ({item, index, section}: any) => {
        console.log("renderSearchResultItem", item)
        console.log("section.title", section.title);

        if(section.title == "태그") {
        return (
            <SearchResultItemContainer style={item.selected && styles.disalbedSearhResultItem}>
                <SearchResultItemLeftContainer>
                    <SearchResultItemIconContainer>
                    <TagSearchItemIcon
                    source={require('~/Assets/Images/SearchResult/ic_hashTag.png')}/>
                    </SearchResultItemIconContainer>
                    <SearchItemText>{"#" + item.name}</SearchItemText>
                </SearchResultItemLeftContainer>
                <TouchableWithoutFeedback onPress={() => selectSearchItem(item, section.title, index)}>
                <SearchResultItemSelectContainer>
                    <SearchResultItemSelectText>선택</SearchResultItemSelectText>
                </SearchResultItemSelectContainer>
                </TouchableWithoutFeedback>
            </SearchResultItemContainer>
        )} else if(section.title == "계정") {
        return (
            <SearchResultItemContainer style={item.selected && styles.disalbedSearhResultItem}>
                <SearchResultItemLeftContainer>
                    <SearchResultItemIconContainer>
                    <ProfileSearchItemImage
                    source={{uri:item.profileImg}}/>
                    </SearchResultItemIconContainer>
                    <SearchItemText>{item.nickname}</SearchItemText>
                </SearchResultItemLeftContainer>
                <TouchableWithoutFeedback onPress={() => selectSearchItem(item, section.title, index)}>
                <SearchResultItemSelectContainer>
                    <SearchResultItemSelectText>선택</SearchResultItemSelectText>
                </SearchResultItemSelectContainer>
                </TouchableWithoutFeedback>
            </SearchResultItemContainer>
        )} else if(section.title == "장소") {
            return (
            <SearchResultItemContainer style={item.selected && styles.disalbedSearhResultItem}>
            <SearchResultItemLeftContainer>
                <SearchResultItemIconContainer>
                <TagSearchItemIcon
                source={require('~/Assets/Images/SearchResult/ic_locationMarker.png')}/>
                </SearchResultItemIconContainer>
                <SearchItemText>{item.address}</SearchItemText>
            </SearchResultItemLeftContainer>
            <TouchableWithoutFeedback onPress={() => selectSearchItem(item, section.title, index)}>
            <SearchResultItemSelectContainer>
                    <SearchResultItemSelectText>선택</SearchResultItemSelectText>
                </SearchResultItemSelectContainer>
                </TouchableWithoutFeedback>
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
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}
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
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}
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
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}
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
                    editable={currentUser.inputedKeywordList ? (currentUser.inputedKeywordList.length === 3 ? false : true) : true}
                    placeholder={currentUser.inputedKeywordList ? (currentUser.inputedKeywordList.length === 3 ? "키워드는 3개까지 입력 할 수 있습니다." : "검색") : null}
                    placeholderTextColor={"C6C7CC"}
                    autoFocus={true}
                    value={inputingSearchText}
                    autoCapitalize={"none"}
                    onChangeText={(text: string) => onChangeSearchInput(text)}
                    />
                </SearchInputContainer>
            </HeaderSearchContainer>
            {noInputSearch && !currentUser.inputedKeywordList[0] && (
                <HeaderRightContainer>
                <DisabledHeaderSearchText>검색</DisabledHeaderSearchText>
            </HeaderRightContainer>
            )}
            {(currentUser.inputedKeywordList[0] || !noInputSearch) && (
            <TouchableWithoutFeedback onPress={() => searchToInputedKeywordList()}>
            <HeaderRightContainer>
                <HeaderSearchText>검색</HeaderSearchText>
            </HeaderRightContainer>
            </TouchableWithoutFeedback>
            )}
            </HeaderBar>
            <SelectedSearchItemListContainer>
                <FlatList
                keyboardShouldPersistTaps={"handled"}
                data={currentUser?.inputedKeywordList}
                renderItem={renderSelectedItem}
                />
            </SelectedSearchItemListContainer>
            {(inputingSearchText !== "")&& (
            <SearchResultContainer>
            <SectionList
            keyboardShouldPersistTaps={"handled"}
            sections={searchResultListData}
            keyExtractor={(item, index) => item + index}
            renderItem={renderSearchResultItem}
            renderSectionHeader={({section}) => {
                if(section.data[0]) {
                    return (
                <SearchResultSectionTitleContainer>
                <SearchResultSectionTitleText>{section.title}</SearchResultSectionTitleText>
                </SearchResultSectionTitleContainer>
             )}
            }}
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

const styles = StyleSheet.create({
    disalbedSearhResultItem : {
        backgroundColor: "#F7F7F7",
        opacity: 0.5
    }
})

export default SearchScreen;