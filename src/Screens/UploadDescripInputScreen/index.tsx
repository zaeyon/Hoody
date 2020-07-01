import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const DescripInputContainer = Styled.View`
 padding: 20px 15px 20px 15px;
`;

const DescripInput = Styled.TextInput`
 font-size: 17px;
 color: #4b4b4b;
`;

interface Props {
    navigation: any,
    route: any,
}

const UploadDescripInputScreen = ({navigation, route}: Props) => {
    return (
        <Container>
            <DescripInputContainer>
                <DescripInput
                multiline={true}
                autoFocus={true}
                />
            </DescripInputContainer>
        </Container>
    )
}

export default UploadDescripInputScreen;
