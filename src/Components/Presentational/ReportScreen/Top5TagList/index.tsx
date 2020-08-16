import React from 'react';
import Styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Component;
import PopularTop5TagItem from './PopularTop5TagItem';

const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
 padding-left: 16px;
 padding-right: 16px;
`;

const TitleContainer = Styled.View`
 padding-top: 20px;
 padding-bottom: 12px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const TitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const SortTypeContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ActiveSortTypeText = Styled.Text`
font-weight: 500;
font-size: 14px;
color: #1D1E1F;
`;

const InactiveSortTypeText = Styled.Text`
color: #C6C7CC;
font-weight: 500;
font-size: 14px;
`;

const Top5TagListContainer = Styled.View`
`;

const Top5TagList = ({}) => {

    const renderPopularTop5TagItem = ({item, index}: any) => {
        return (
            <PopularTop5TagItem/>
        )
    }

    
    return (
        <Container>
            <TitleContainer>
                <TitleText>TOP 5 태그</TitleText>
                <SortTypeContainer>
                    <SortTypeContainer>
                        <ActiveSortTypeText>인기순</ActiveSortTypeText>
                        <InactiveSortTypeText
                        style={{marginLeft:8}}>흥미순</InactiveSortTypeText>
                    </SortTypeContainer>
                </SortTypeContainer>
            </TitleContainer>
            <Top5TagListContainer>
                <FlatList
                data={[1,2,3,4,5]}
                renderItem={renderPopularTop5TagItem}/>
            </Top5TagListContainer>
        </Container>
    )
}

export default Top5TagList;

