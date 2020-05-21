import React, {useState, useLayoutEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
 align-items: center;
`;

const NextText = Styled.Text`
 font-size: 17px;
 color: #000000;
 margin-right: 13px;
`;

const TextInputLabelText = Styled.Text`
position: absolute;
font-size:14px;
color: #707070;
align-self: flex-start;
`;

const InputContainer = Styled.View`
 width: ${wp('80%')};
 height: ${hp('70%')};
 align-items: center;
`;

const LabelInputContainer = Styled.View`
 width: ${wp('80%')};
 margin-bottom: 20px;
`;

const Input = Styled.TextInput`
position: relative;
top: 5px;
width: ${wp('80%')};
height: 50px;
`;

const InputBottomLine = Styled.View`
position: absolute;
bottom: 6px;
width: ${wp('80%')};
height: 0.5px;
background-color: #c3c3c3;
`;

const Header = Styled.View`
position: absolute;
top: 0px;
width: ${wp('100%')};
height: ${hp('7.5%')};
elevation: 1;
border-color: #707070;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-right: 10px;
padding-left: 10px;
`;

const HeaderTitle = Styled.Text`
font-size: 17px;
`;

const BasicInput = ({navigation}) => {
  const [email2, setEmail2] = useState('');
  const [password2, setPassword2] = useState('');
  const [inputedEmail, setInputedEmail] = useState('');

  const moveToProfileInput = () => {
    console.log('inputedEmail', inputedEmail);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback onPress={() => moveToProfileInput()}>
          <NextText>다음</NextText>
        </TouchableWithoutFeedback>
      ),
    });
  }, [navigation]);

  return (
    <Container>
      <InputContainer style={{marginTop: 0}}>
        <LabelInputContainer>
          <TextInputLabelText>이메일</TextInputLabelText>
          <Input
            placeholder="ex) hooging@gmail.com"
            onChangeText={(text: string) => setInputedEmail(text)}
            onSubmitEditing={() => moveToProfileInput()}
          />
          <InputBottomLine />
        </LabelInputContainer>

        <LabelInputContainer>
          <TextInputLabelText>비밀번호</TextInputLabelText>
          <Input
            placeholder="최소 8자리 (영문 + 숫자)"
            onChangeText={(text: string) => setPassword2(text)}
            value={password2}
          />
          <InputBottomLine />
        </LabelInputContainer>
        <LabelInputContainer>
          <TextInputLabelText>비밀번호 확인</TextInputLabelText>
          <Input placeholder="최소 8자리 (영문 + 숫자)" />
          <InputBottomLine />
        </LabelInputContainer>
      </InputContainer>
    </Container>
  );
};

export default BasicInput;
