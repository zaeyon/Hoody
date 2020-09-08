import React from 'react';
import Styled from 'styled-components/native';
import { WebView } from 'react-native-webview';
import { BaseRouter } from '@react-navigation/native';

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
`;

interface Props {
    navigation: any,
    route: any,
    htmlCode: string
}

const KakaoLoginScreen = ({navigation, route, htmlCode}: Props) => {
    console.log("KakaoLoginScreen htmlCode", route.params?.htmlCode);

   const INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';
  const _handleMessage = async (event:any) => {
    console.log(JSON.parse(event.nativeEvent.data));
    let result = JSON.parse(event.nativeEvent.data);
    if (result) {
        console.log("event.nativeEvent.data", event.nativeEvent.data)

      try {

      } catch (e) {
        console.log(e);
      }
    }
  };
    return (
        <Container>
            <WebView
            source={{uri: "http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com/auth/kakao"}}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            onMessage={_handleMessage}/>
        </Container>
    )
}

export default KakaoLoginScreen