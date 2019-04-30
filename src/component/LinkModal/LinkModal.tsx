import React from "react";
import { View, Text, Button } from "react-native";
import { Width } from "../../helper/Dimension";
import RNKakaoLink from "react-native-kakao-links";
import { FlowerResponse } from "src/types/types";

interface Props {
  flower: FlowerResponse;
}

interface State {
  title: string;
  imageURL: string;
  link: {
    webURL: string | undefined;
    mobileWebURL: string | undefined;
    androidExecutionParams: string | undefined;
    iosExecutionParams: string | undefined;
  };
  desc: string;
}

class LinkModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      link: {
        webURL: "",
        mobileWebURL: "",
        androidExecutionParams: "",
        iosExecutionParams: ""
      },
      imageURL: "",
      desc: ""
    };
  }
  linkFeed = async () => {
    const { title, link, imageURL, desc } = this.state;
    try {
      const options = {
        objectType: "feed", //required
        content: {
          title,
          link,
          imageURL,
          desc,
          imageWidth: 240,
          imageHeight: 240
        } //required
      };
      const response = await RNKakaoLink.link(options);
      console.log(response);
    } catch (e) {
      console.warn(e);
    }
  };

  componentWillMount() {
    this.setState({
      title: this.props.flower.name,
      imageURL: this.props.flower.image,
      link: {
        webURL: "",
        mobileWebURL: "",
        androidExecutionParams: "",
        iosExecutionParams: ""
      },
      desc: this.props.flower.type.name
    });
  }

  render() {
    return (
      <View style={{ width: Width, height: 130 }}>
        <View>
          <Text>공유</Text>
        </View>
        <View>
          <Button onPress={this.linkFeed} title="카카오톡으로 공유하기" />
        </View>
      </View>
    );
  }
}

export default LinkModal;
// const linkObject = {
//   webURL: "https://developers.kakao.com/docs/android/kakaotalk-link", //optional
//   mobileWebURL: "https://developers.kakao.com/docs/android/kakaotalk-link", //optional
//   androidExecutionParams: "shopId=1&itemId=24", //optional For Linking URL
//   iosExecutionParams: "shopId=1&itemId=24" //optional For Linking URL
// };

// const contentObject = {
//   title: "제목",
//   link: linkObject,
//   imageURL:
//     "http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",

//   desc: "설명", //optional
//   imageWidth: 240, //optional
//   imageHeight: 240 //optional
// };
