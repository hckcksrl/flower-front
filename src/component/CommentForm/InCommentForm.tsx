import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions
} from "react-native";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Width } from "../../helper/Dimension";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { Query } from "react-apollo";
import { GetInComment } from "./queries";
import { NavigationScreenProp } from "react-navigation";
import { Alerts } from "../../helper/Alert";
import { isSignedIn } from "../../helper/Auth";

interface Props {
  mutationLike: any;
  deleteModal: () => void;
  commentid: number;
  navigation: NavigationScreenProp<any, any>;
  commentModal: (type: any, boolean: any) => void;
}

interface State {
  show: boolean;
  token: any;
}

class InCommentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      token: null
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ token: res }))
      .catch(err => alert("An error occurred"));
  }

  _commentInputShow = boolean => {
    const { navigation, commentModal, deleteModal } = this.props;
    const { token } = this.state;
    if (token) {
      this.setState({
        show: boolean
      });
    } else {
      Alerts(navigation, commentModal, deleteModal);
    }
  };

  render() {
    const { mutationLike } = this.props;
    return (
      <View style={styles.scrollableModal}>
        <View style={styles.commentHeader}>
          <View
            style={{ paddingLeft: Width * 0.04, paddingRight: Width * 0.0266 }}
          >
            <Text style={styles.headerText}>답글</Text>
          </View>
          <View style={{ marginLeft: 292 }}>
            <TouchableOpacity onPress={() => this.props.deleteModal()}>
              <MaterIcon name="close" color={"#3b74ff"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <Query query={GetInComment} variables={{ id: this.props.commentid }}>
          {({ data, loading }) => {
            if (loading) return null;
            const comment = data.GetInComment.comment;
            return (
              <>
                <Comment
                  commentid={comment.id}
                  press={false}
                  mutationLike={mutationLike}
                  navigation={this.props.navigation}
                  commentModal={this.props.commentModal}
                  deleteModal={this.props.deleteModal}
                />
                <TouchableOpacity
                  onPress={() => {
                    this._commentInputShow(true);
                  }}
                >
                  <View style={styles.commentInput}>
                    <View style={{ marginLeft: 25 }}>
                      <Text style={styles.commentInputText}>답글 입력하기</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <ScrollView scrollEventThrottle={16}>
                  {comment.incomment !== null
                    ? comment.incomment.map((comment, key) => {
                        return (
                          <Comment
                            commentid={comment.id}
                            press={false}
                            incomment={true}
                            mutationLike={mutationLike}
                            navigation={this.props.navigation}
                            commentModal={this.props.commentModal}
                            key={key}
                            deleteModal={this.props.deleteModal}
                          />
                        );
                      })
                    : null}
                </ScrollView>
                <CommentInput
                  show={this.state.show}
                  commentInputShow={this._commentInputShow}
                  commentid={comment.id}
                />
              </>
            );
          }}
        </Query>
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
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  commentInput: {
    height: 40,
    width: Width,
    justifyContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d8d8d8"
  },
  commentInputText: {
    fontFamily: "NanumSquareB",
    fontSize: 12,
    letterSpacing: 0.2,
    color: "#259eff"
  }
});

export default InCommentForm;
