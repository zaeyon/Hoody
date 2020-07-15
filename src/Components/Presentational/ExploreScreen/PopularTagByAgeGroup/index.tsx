import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
 padding-top: 20px
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 8px;
 background-color: #ffffff;
`;

const AgeGroupText = Styled.Text`
 font-weight: 600;
 font-size: 18px;
 color: #333333;
`;

const PopularTagListContainer = Styled.View`
padding-top: 2px;
padding-bottom: 8px;
`;

const UnselectPopularTagItemBackground = Styled.View`
 margin-left: 6px;
 height: ${wp('8%')};
 justify-content: center;
 align-items: center;
 padding-left: 14px;
 padding-right: 14px;
 border-width: 1px;
 border-color: #ECECEE;
 border-radius: 7px;
 background-color: #F5F5F7;
`;

const UnselectPopularTagNameText = Styled.Text`
 font-weight: 600;
 font-size: 14px;
 color: #8E9199;
`;

const SelectPopularTagItemBackground = Styled.View`
 height: ${wp('8%')};
 justify-content: center;
 align-items: center;
 padding-left: 14px;
 padding-right: 14px;
 border-width: 1px;
 border-color: #267DFF;
 border-radius: 7px;
 background-color: #267DFF;
`;

const TEST_POPULARY_TAG = [
    {
        name: "Tag",
        selected: false,
    },
    {
        name: "Tag",
        selected: false,
    },
    {
        name: "을지로",
        selected: false,
    },
    {
        name: "피자나라치킨공주",
        selected: false,
    },
    {
        name: "재난지원금",
        selected: false,
    }
]

const PopularTagByAgeGroup = () => {
    const [popularTagListData, setPopularTagListData] = useState<Array<object>>();
    const [changeSelectedTag, setChangeSelectedTag] = useState<boolean>(false);

    useEffect(() => {
        setPopularTagListData(TEST_POPULARY_TAG);
    }, [])

    const selectPopularTag = (item: object, index: number) => {
        var tmpPopularTagList = popularTagListData.map(function(tag, index2) {
            if(index != index2) {
                tag.selected = false
                return tag
            } else if(index === index2) {
                tag.selected = true
                return tag
            }
        })

        //tmpPopularTagList[index].selected = !popularTagListData[index].selected;
        setPopularTagListData(tmpPopularTagList);
        setChangeSelectedTag(!changeSelectedTag);
        console.log("select tag index", index)
    }

    const renderPopularTagItem = ({item, index}: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => selectPopularTag(item, index)}>
            <UnselectPopularTagItemBackground style={[index === 0 &&  styles.firstTagItem || index === TEST_POPULARY_TAG.length-1 && styles.lastTagItem, item.selected && styles.selectTagBackground]}>
                <UnselectPopularTagNameText style={item.selected && styles.selectTagText}>{"#" + item.name}</UnselectPopularTagNameText>
            </UnselectPopularTagItemBackground>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <Container>
            <HeaderContainer>
                <AgeGroupText>20대 인기 태그</AgeGroupText>
            </HeaderContainer>
            <PopularTagListContainer>
            <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={popularTagListData}
            renderItem={renderPopularTagItem}/>
            </PopularTagListContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
    firstTagItem : {
        marginLeft: 16
    },
    lastTagItem : {
        marginRight: 16,
    },
    selectTagBackground : {
        backgroundColor: '#267DFF',
        borderWidth: 1,
        borderColor: '#267DFF',
        borderRadius: 7,
    },
    selectTagText: {
        color: '#FFFFFF'
    }
})

export default PopularTagByAgeGroup;