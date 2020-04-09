import React from 'react';
import Styled from 'styled-components/native';
import {FlatList, Text} from 'react-native';

interface Props {
  tags: Array<string>;
}

const Container = Styled.View`
 margin: 10px 0px 3px 12px;
`;

const Tag = Styled.Text`
 font-size: 15px;
 margin-right: 4px;
 font-family: 'Arita4.0_M';
`;

const TagList = ({tags}: Props) => {
  return (
    <Container>
      <FlatList
        data={tags}
        horizontal={true}
        renderItem={({item}) => <Tag>{item.tag}</Tag>}
      />
    </Container>
  );
};

export default TagList;
