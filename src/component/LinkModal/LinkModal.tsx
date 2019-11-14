import React from "react";
import { View, Text, Button } from "react-native";
import { Width } from "../../helper/Dimension";
import RNKakaoLink from "react-native-kakao-links";
import { FlowerResponse } from "src/types/types";

interface Props {
  flower: FlowerResponse;
  modal: (type: string, boolean: boolean) => void;
}

interface State {
  title: string;
  imageURL: string;
  link: {
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
        }, //required,
        buttons: [{ title: "앱으로 보기", link }]
      };
      const response = await RNKakaoLink.link(options);
      console.log(response);
    } catch (e) {
      console.warn(e);
    }
  };

  _link = async () => {
    const { modal } = this.props;
    modal("link", false);
    await this.linkFeed();
  };

  componentWillMount() {
    this.setState({
      title: this.props.flower.name,
      imageURL: this.props.flower.image,
      link: {
        iosExecutionParams: `id=${this.props.flower.id}`
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
          <Button onPress={this._link} title="카카오톡으로 공유하기" />
        </View>
      </View>
    );
  }
}

export default LinkModal;
