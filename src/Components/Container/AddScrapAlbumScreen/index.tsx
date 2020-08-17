import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList} from 'react-native'
import {useSelector} from 'react-redux';

// Local Component
import SelectScrapItem from '~/Components/Presentational/AddScrapAlbumScreen/SelectScrapItem';

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
 background-color:#ffffff;
`;

const HeaderCancelContainer = Styled.View`
padding: 12px 16px 15px 16px;
 align-items: center;
 justify-content: center;
`;

const HeaderCancelText = Styled.Text`
 font-size: 17px;
 color: #C6C7CC;
 `;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const HeaderFinishContainer = Styled.View`
padding: 12px 16px 15px 16px;
 align-items: center;
 justify-content: center;
`;

const DisabledHeaderFinishText = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #cccccc;
`;

const AbledHeaderFinishText = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #267DFF;
 `;

const AlbumNameInputContainer = Styled.View`
 width: ${wp('100%')};
 padding-top: 16px;
 padding-left: 16px;
 padding-bottom: 20px;
 padding-right: 16px;
 flex-direction: column;
 background-color: #ffffff;
`;

const AlbumNameText = Styled.Text`
font-weight: 600;
font-size: 17px;
color: #333333;
`;

const AlbumNameInput = Styled.TextInput`
 margin-top: 10px;
 font-size: 17px;
 color: #979797;
 `;

const BodyContainer = Styled.View`
 flex:1;
 background-color:#f3f3f3;
`;

const SelectAllScrapContainer = Styled.View`
 margin-top: 12px;
 padding: 16px;
 flex:1;
 background-color: #ffffff;
`;

const AllScrapText = Styled.Text`
 font-weight: 600;
 font-size: 17px;
 color: #333333;
`;


interface Props {
    navigation: any,
    route: any,
}

const AddScrapAlbumScreen = ({navigation, route}: Props) => {
    const [allScrapData, setAllScrapData] = useState<Array<object>>([
        {
            index: '0'
        },
        {
            index: '1'
        },
        {
            index: '2',
        }
    ]);
    const [selectingScrapList, setSelectingScrapList] = useState<Array<object>>([]);
    const [changeSelectScrapData, setChangeSelectScrapData] = useState<boolean>(false);
    const [scrapAlbumName, setScrapAlbumName] = useState<string>("");
    const currentUser = useSelector((state: any) => state.currentUser);

    useEffect(() => {
        console.log("route.params.defaultFolderId", route.params.defaultFolderId);
        //console.log("모든 스크랩 목록", currentUser.scrapFeeds);
        if(route.params?.defaultFolderId) {
            GETScrapFolder(route.params.defaultFolderId)
            .then(function(response) {
                console.log("모든 스크랩", response)
            })
            .catch(function(error) {
                console.log("모든 스크랩 불러오기 실퍄", error)
            })
        }
        
        var tmpSelectableScrapList = allScrapData.map(function(obj) {
            obj.selected = false;
            return obj;
        })
        setAllScrapData(tmpSelectableScrapList);
    }, [route.params?.defaultFolderId])

    const onSelectCircle = (index:number) => {
        var tmpAllScrapData = allScrapData;
        if(tmpAllScrapData[index].selected === false) {
            var tmpSelectingScrapList = selectingScrapList;
            tmpSelectingScrapList.push(tmpAllScrapData[index]);
            tmpAllScrapData[index].selected = !tmpAllScrapData[index].selected;

            console.log("selectingScrapList", selectingScrapList);
            setSelectingScrapList(tmpSelectingScrapList);
            setAllScrapData(tmpAllScrapData);
            setChangeSelectScrapData(!changeSelectScrapData);
        } else {
            var tmpSelectingScrapList = selectingScrapList;
            var selectingIndex = tmpSelectingScrapList.indexOf(tmpAllScrapData[index]);
            tmpAllScrapData[index].selected  = !tmpAllScrapData[index].selected;
            tmpSelectingScrapList.splice(selectingIndex, 1);

            console.log("selectingScrapList", selectingScrapList);

            setSelectingScrapList(tmpSelectingScrapList);
            setAllScrapData(tmpAllScrapData);
            setChangeSelectScrapData(!changeSelectScrapData);
        }
    }

    const onChangeScrapAlbumName = (text: string) => {
        setScrapAlbumName(text);
    }

    const renderSelectAlbumItem = ({item, index}: any) => {
        return (
            <SelectScrapItem
            index={index}
            selected={item.selected}
            onSelectCircle={onSelectCircle}
            />
        )
    }

    
    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderCancelContainer>
                    <HeaderCancelText>취소</HeaderCancelText>
                </HeaderCancelContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>새 앨범</HeaderTitleText>
                    {scrapAlbumName !== "" && selectingScrapList.length > 0 && (
                        <TouchableWithoutFeedback onPress={() => navigation.navigate("ProfileScreen")}>
                        <HeaderFinishContainer>
                        <AbledHeaderFinishText>완료</AbledHeaderFinishText>
                        </HeaderFinishContainer>
                        </TouchableWithoutFeedback>
                    )}
                    {(scrapAlbumName === "" || selectingScrapList.length === 0) && (
                        <HeaderFinishContainer>
                        <DisabledHeaderFinishText>완료</DisabledHeaderFinishText>
                        </HeaderFinishContainer>
                    )}
            </HeaderBar>
            <BodyContainer>
            <AlbumNameInputContainer>
                <AlbumNameText>이름</AlbumNameText>
                <AlbumNameInput
                placeholder={"앨범의 이름을 적어주세요."}
                placeholderTextColor="#979797"
                clearButtonMode={"while-editing"}
                value={scrapAlbumName}
                onChangeText={(text:string) => onChangeScrapAlbumName(text)}
                />
            </AlbumNameInputContainer>
            <SelectAllScrapContainer>
            <AllScrapText>모든 스크랩</AllScrapText>
            <FlatList
            style={{marginTop:12}}
            numColumns={2}
            data={allScrapData}
            renderItem={renderSelectAlbumItem}/>
            </SelectAllScrapContainer>
            </BodyContainer>
        </Container>
    )
}

export default AddScrapAlbumScreen;