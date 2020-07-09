import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList} from 'react-native'

import SelectScrapItem from '~/Components/Presentational/AddScrapAlbumScreen/SelectScrapItem';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.5%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;

const HeaderCancelContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const HeaderCancelText = Styled.Text`
 font-weight: 500;
 font-size: 17px;
 color: #979797;
`;

const HeaderTitleText = Styled.Text`
font-weight: 500;
font-size: 17px;
color: #333333;
`;

const HeaderFinishContainer = Styled.View`
padding: 10px 15px 10px 15px;
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
 color: #3384FF;
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
 font-weight: 600;
 color: #333333;
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

    useEffect(() => {
        var tmpSelectableScrapList = allScrapData.map(function(obj) {
            obj.selected = false;
            return obj;
        })
        setAllScrapData(tmpSelectableScrapList);
    }, [])

    const onSelectCircle = (index:number) => {
        var tmpAllScrapData = allScrapData;
        if(tmpAllScrapData[index].selected === false) {
            
        }

    }

    const renderSelectAlbumItem = ({item, index}) => {
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
                <HeaderTitleText>새 스크랩 앨범</HeaderTitleText>
                <HeaderFinishContainer>
                        <DisabledHeaderFinishText>완료</DisabledHeaderFinishText>
                </HeaderFinishContainer>
            </HeaderBar>
            <BodyContainer>
            <AlbumNameInputContainer>
                <AlbumNameText>이름</AlbumNameText>
                <AlbumNameInput
                placeholder={"앨범의 이름을 적어주세요."}
                placeholderTextColor="#979797"
                clearButtonMode={"while-editing"}
                />
            </AlbumNameInputContainer>
            <SelectAllScrapContainer>
            <AllScrapText>모든 스크랩</AllScrapText>
            <FlatList
            numColumns={2}
            data={allScrapData}
            renderItem={renderSelectAlbumItem}/>
            </SelectAllScrapContainer>
            </BodyContainer>
        </Container>
    )
}

export default AddScrapAlbumScreen;