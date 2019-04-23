import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Width } from "../../helper/Dimension";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  data: {
    GetComment: {
      result: boolean;
      error: string;
      comment: {
        id: number;
        comment: string;
        users: {
          id: number;
        };
        incomment: {
          id: number;
          comment: string;
          users: {
            id: number;
          };
        }[];
      }[];
    };
  };
  refetch: any;
}

interface State {
  show: boolean;
  height: number;
  text: string;
}

class CommentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      height: 0,
      text: ""
    };
  }

  render() {
    const {
      data: {
        GetComment: { comment }
      },
      refetch
    } = this.props;
    return (
      <View style={styles.scrollableModal}>
        <View style={styles.commentHeader}>
          <View
            style={{ paddingLeft: Width * 0.04, paddingRight: Width * 0.0266 }}
          >
            <Text style={styles.headerText}>댓글</Text>
          </View>
          <View style={{ width: Width * 0.746 }}>
            <Text style={styles.commentCount}>{comment.length}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.setState({ show: true })}>
              <MaterIcon name="pencil" color={"#3b74ff"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView scrollEventThrottle={16}>
          {comment.map((comment, key) => {
            return (
              <View key={key}>
                <Text>{comment.comment}</Text>
                <Text>
                  {comment.incomment !== null ? comment.incomment.length : null}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.avoidingView}
          keyboardVerticalOffset={Dimensions.get("window").height * 0.3}
        >
          {this.state.show ? (
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
                  onBlur={() => this.setState({ show: false })}
                  keyboardAppearance={"dark"}
                  onChangeText={text => {
                    this.setState({ text });
                  }}
                  onContentSizeChange={event => {
                    this.setState({
                      height: event.nativeEvent.contentSize.height
                    });
                  }}
                />
              </View>
              <View style={styles.enterIcon}>
                <TouchableOpacity>
                  <MaterIcon name={"send"} size={25} color="blue" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View />
          )}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollableModal: {
    height: Dimensions.get("window").height * 0.697,
    backgroundColor: "white"
  },
  commentHeader: {
    display: "flex",
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.06,
    alignItems: "center"
  },
  headerText: {
    fontFamily: "NanumSquareB",
    fontSize: Width * 0.04
  },
  commentCount: {
    fontFamily: "NanumSquareB",
    color: "#616161",
    fontSize: Width * 0.04,
    letterSpacing: 0.2
  },
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

export default CommentForm;
