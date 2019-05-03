import React from "react";
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  StyleSheet,
  Keyboard
} from "react-native";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EditComment, GetInComment } from "./queries";
import { Mutation } from "react-apollo";

interface Props {
  show: boolean;
  commentid: number;
  text: string;
  editCommentInputShow: (boolean: boolean) => void;
}
interface State {
  height: number;
  text: string;
  show: boolean;
}

class EditCommentInput extends React.Component<Props, State> {
  public keyboardWillShowListener;
  constructor(props: Props) {
    super(props);
    this.state = {
      height: 0,
      text: "",
      show: false
    };
  }

  componentWillMount() {
    this.setState({
      text: this.props.text,
      show: this.props.show
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text) {
      this.setState({
        text: nextProps.text
      });
    }
  }

  _Edit = EditComment => {
    const { commentid, editCommentInputShow } = this.props;
    const { text } = this.state;
    EditComment({
      variables: { id: commentid, comment: text },
      refetchQueries: [
        { query: GetInComment, variables: { id: this.props.commentid } }
      ]
    }).then(() => {
      editCommentInputShow(false);
      this.setState({ show: false, text: "" });
    });
  };

  render() {
    const { show, editCommentInputShow } = this.props;
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
                  editCommentInputShow(false);
                  this.setState({ text: "", height: 0 });
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
                <Mutation mutation={EditComment}>
                  {EditComment => {
                    return (
                      <TouchableOpacity onPress={() => this._Edit(EditComment)}>
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

export default EditCommentInput;
