import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList, TouchableWithoutFeedback} from 'react-native';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
 align-items: center;
 flex-direction: column;
 padding: 13.5px 0px 50px 0px;
`;

const HoogingLogo = Styled.Image`
margin-left: 10px;
`;

const InputBoxContainer = Styled.View`
 justify-content: center;
 transform:
   {translateY: this.state.position.y}
`;

const InputBox = Styled.TextInput`
 width: ${wp('85%')};
 height: 40px;
 border-radius: 25px;
 background-color: #FFFFFF;
 justify-content: center;
 text-align: center;
 font-family: 'Arita4.0_B.otf';
 border-width: 1.5px;
 border-color: #23E5D2;
`;

const SearchIcon = Styled.Image`
 position: absolute;
 width: ${wp('4.5%')};
 height: ${wp('4.5%')};
 margin-left: 10px;
`;

const TagInputContainer = Styled.View`
 position: absolute;
 height: ${wp('10%')};
 border-radius: 5px;
 flex-direction: row;
 left: ${wp('4.3%')};
 align-items: center;
 justify-content: flex-start;
 `;

const TagTextInput = Styled.TextInput`
 margin-left: 8px;
 font-family: 'Arita4.0_L';
 font-size: 13px;
 color: #999999;
 width: ${wp('30%')};
 height: ${wp('10%')};
`;

const TagText = Styled.Text`
 color: #707070;
 font-size: 13px;
 font-family: 'Arita4.0_L';
`;

const HashText = Styled.Text`
 position: absolute;
 left: 0px;
 font-family: 'Arita4.0_L';
 font-size: 15px;
 color: #999999;
`;

const InputedTagContainer = Styled.View`
 height: ${wp('7%')};
 border-radius: 10px;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 margin-right: 5px;
 padding-left: 8px;
 padding-right: 8px;
 background-color: #ECE9EC;
`;

const SearchTextContainer = Styled.View`
 width: ${wp('13%')};
 height: 40px;
 position: absolute;
 right: 5px;
 align-items: center;
 justify-content: center;
`;

const SearchText = Styled.Text`
 font-family: 'Arita4.0_M';
 font-size: 13px;
 color: #000000;
`;

const InsertTagContainer = Styled.View`
 margin-left: 5px;
 flex-direction: row;
 align-items:center;
 justify-content: center;
`;

const TagDeleteButton = Styled.Image`
 width :${wp('2.5%')};
 height:${wp('2.5%')};
 opacity: 1;
 tint-color: #999999;
`;

const TagDeleteContainer = Styled.View`
 justify-content: center;
 align-items: flex-end;
 margin-left: 0px;
 width: ${wp('5%')};
 height: ${wp('4%')};
`;

const SearchResult = ({navigation}) => {
  const [inputedTag_arr, setInputedTag_arr] = useState<Array<string>>([]);
  const [inputingTag, setInputingTag] = useState<string>();

  const deleteTag = (index) => {
    let deletedTag_arr = inputedTag_arr;
    deletedTag_arr.splice(index, 1);
    setInputedTag_arr(deletedTag_arr);
  };

  const submitTag = (text) => {
    const newTag = text.nativeEvent.text;
    console.log('newTag: ', newTag);
    let newTag_arr = inputedTag_arr;
    newTag_arr.push(newTag);
    setInputedTag_arr(newTag_arr);
    setInputingTag('');
  };

  return (
    <Container>
      <InputBoxContainer>
        <InputBox editable={false} />
        <TagInputContainer>
          <FlatList
            data={inputedTag_arr}
            horizontal={true}
            renderItem={({item, index}) => (
              <InputedTagContainer>
                <TagText>#{item}</TagText>
                <TouchableWithoutFeedback onPress={() => deleteTag(index)}>
                  <TagDeleteContainer>
                    <TagDeleteButton
                      source={require('~/Assets/Images/delete_empty.png')}
                    />
                  </TagDeleteContainer>
                </TouchableWithoutFeedback>
              </InputedTagContainer>
            )}
          />
          <InsertTagContainer>
            <HashText>#</HashText>
            <TagTextInput
              placeholder="태그 입력"
              value={inputingTag}
              onChangeText={(text: string) => setInputingTag(text)}
              autoFocus={true}
              onSubmitEditing={(text: string) => submitTag(text)}
            />
          </InsertTagContainer>
        </TagInputContainer>
        <SearchTextContainer>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('SearchResult')}>
            <SearchText>검색</SearchText>
          </TouchableWithoutFeedback>
        </SearchTextContainer>
      </InputBoxContainer>
    </Container>
  );
};

export default SearchResult;
