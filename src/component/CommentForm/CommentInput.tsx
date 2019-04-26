import React from "react";
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  StyleSheet,
  Alert
} from "react-native";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { CreateComment } from "./queries";
import { Mutation } from "react-apollo";

interface Props {
  commentInputShow: (boolean: boolean) => void;
  show: boolean;
  flowerid?: number;
  commentid?: number;
  refetch: any;
  commentRefetch?: any;
}
interface State {
  height: number;
  text: string;
}

class CommentInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      height: 0,
      text: ""
    };
  }

  _CreateComment = CreateComment => {
    const { refetch, commentInputShow, flowerid, commentid } = this.props;
    if (this.state.text === "") {
      if (commentid) {
        CreateComment({
          variables: { comment: this.state.text, commentid: commentid }
        })
          .then(() => refetch())
          .then(() => {
            commentInputShow(false);
            this.setState({ text: "", height: 0 });
          });
        return true;
      }
      CreateComment({
        variables: { comment: this.state.text, flowerid: flowerid }
      })
        .then(() => refetch())
        .then(() => {
          commentInputShow(false);
          this.setState({ text: "" });
        });
      return true;
    } else {
      return false;
    }
  };

  _onBlur = () => {
    const { commentInputShow } = this.props;
    commentInputShow(false);
    this.setState({ height: 0 });
    if (this.state.text !== "") {
      Alert.alert("댓글을 삭제하시겠습니까?", "", [
        {
          text: "계속 작성",
          onPress: () => {
            commentInputShow(true);
          }
        },
        {
          text: "삭제",
          onPress: () => {
            commentInputShow(false);
            this.setState({ text: "", height: 0 });
          }
        }
      ]);
    }
  };

  componentWillReceiveProps(nextProps) {}

  render() {
    const { show } = this.props;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.avoidingView}
        keyboardVerticalOffset={Dimensions.get("window").height * 0.3}
      >
        {show ? (
          <View style={styles.inputTextView}>
            <View style={styles.proImage}>
              <MaterIcon name={"face"} size={25} />
            </View>
            <View style={styles.textView}>
              <TextInput
                style={[styles.textInput, { height: this.state.height }]}
                placeholder="Add a comment..."
                autoCorrect={false}
                autoFocus
                multiline
                onBlur={() => {
                  this._onBlur();
                }}
                keyboardAppearance={"dark"}
                onChangeText={text => {
                  this.setState({ text });
                }}
                onContentSizeChange={event => {
                  this.setState({
                    height: event.nativeEvent.contentSize.height
                  });
                }}
                value={this.state.text}
              />
            </View>
            <View style={styles.enterIcon}>
              {this.state.text ? (
                <Mutation mutation={CreateComment}>
                  {CreateComment => {
                    return (
                      <TouchableOpacity
                        onPress={() => this._CreateComment(CreateComment)}
                      >
                        <MaterIcon name={"send"} size={25} color="blue" />
                      </TouchableOpacity>
                    );
                  }}
                </Mutation>
              ) : (
                <View />
              )}
            </View>
          </View>
        ) : (
          <View />
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  avoidingView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  inputTextView: {
    display: "flex",
    flexDirection: "row",
    shadowColor: "#8e8e8e",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: -2 },
    backgroundColor: "white"
  },
  proImage: {
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10
  },
  textView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    justifyContent: "center",
    fontSize: 15,
    marginVertical: 15,
    maxHeight: 80,
    width: 285,
    paddingTop: 0
  },
  enterIcon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginVertical: 10,
    marginHorizontal: 10
  }
});

export default CommentInput;