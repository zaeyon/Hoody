import React from 'react';
import Styled from 'styled-components/native';
import {FlatList} from 'react-native';

const Container = Styled.View`
  margin: 7px 0px
  flex-direction: row;
`;

const SubImage = Styled.Image`
  border-radius: 5px;
  margin-right: 8px;
`;

interface Props {
  images?: Array<string>;
}

const SubImageList = ({images}: Props) => {
  return (
    <Container>
      <FlatList
        data={[
          {
            url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQoqkLcko1G-SqG2FtL1FvkAlyJdWIZY4hq_oL2uESEsu5tYJI1&usqp=CAU',
          },
          {
            url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM1lM7TPjOr0E-Ln5sfisd7ndJShxjXLy-7BrthrlU85xPIL7B&usqp=CAU',
          },
          {
            url:
              'https://img.appstory.co.kr/@files/monthly.appstory.co.kr/thum/Bdatafile/Board/dir_125/12529.jpg',
          },
        ]}
        horizontal={true}
        renderItem={({item}) => (
          <SubImage style={{width: 65, height: 65}} source={{uri: item.url}} />
        )}
      />
    </Container>
  );
};

export default SubImageList;
