import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native';

import ProfileScrapItem from '~/Components/Presentational/ProfileScreen/ProfileScrapItem';

const Container = Styled.View`
 flex: 1;
 background-color :#ffffff;
`;

const ScrapContainer = Styled.View`
 background-color: #ffffff;
 align-items: center;
 justify-content: center;
 flex: 1;
`;

const AllScrapContainer = Styled.View`
 background-color: #EFEFEF;
 width: ${wp('43.7%')};
 height: ${wp('43.7%')};
 border-radius: 10px;
 `;

 const ScrapNameText = Styled.Text`
  font-size: ${wp('4%')};
  color: #333333;
  font-weight: 600;
 `;

 interface Props {
     scrapListData: Array<object>;
 }



 const ProfileScrapList = ({scrapListData}: Props) => {

    const renderProfileScrapItem = ({item, index}) => {
        return (
            <ProfileScrapItem
            coverImage={item.coverImage}
            name={item.name}
            />
        )
    }

     return (
         <Container>
             <FlatList
columnWrapperStyle={{justifyContent:'space-between', paddingLeft:15, paddingRight:15, paddingTop:17, paddingBottom:0}}
             numColumns={2}
             data={scrapListData}
             renderItem={renderProfileScrapItem}/>
         </Container>
     )
 }

 export default ProfileScrapList;