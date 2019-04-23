import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationScreenProp } from "react-navigation";
import Modal from "react-native-modal";
import CommentForm from "../../component/CommentForm/CommetForm";
import FlowerBottomBar from "../../component/FlowerBottomBar/FlowerBottomBar";
import FlowerContent from "../../component/FlowerContent/FlowerContent";

interface Props {
  data: {
    GetFlower: {
      result: boolean;
      error?: string;
      flower: {
        id: number;
        name: string;
        hits: number;
        image: string;
        content: string;
        type: {
          id: number;
          name: string;
        };
        images: {
          image: string;
          content: string;
        }[];
      };
      like: boolean;
      like_count: number;
    };
  };
  navigation: NavigationScreenProp<any, any>;
  like: any;
  refetch: any;
  complete: (like: any, refetch: any, id: number) => void;
  comment: {
    GetComment: {
      result: boolean;
      error: string;
      comment: Array<{
        id: number;
        comment: string;
        users: {
          id: number;
        };
        incomment: Array<{
          id: number;
          comment: string;
          users: {
            id: number;
          };
        }>;
      }>;
    };
  };
  commentRefetch: any;
}

interface State {
  like: boolean;
  visibleModal: any;
  hits: number;
}

class FlowerPagePresenter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      like: false,
      visibleModal: false,
      hits: 0
    };
  }

  componentWillMount() {
    const hits = this.props.data.GetFlower.flower.hits;

    this.setState({
      like: this.props.data.GetFlower.like,
      hits: this.props.data.GetFlower.flower.hits
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        like: this.props.data.GetFlower.like
      });
    }
  }

  _visibleModal = boolean => {
    this.setState({ visibleModal: boolean });
  };

  render() {
    const {
      like,
      refetch,
      data: {
        GetFlower: {
          flower: { id, name, hits, type, content, image, images },
          like_count
        }
      },
      navigation
    } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={{ position: "absolute", left: 30, top: 30, zIndex: 2 }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon
              name={
                // "arrow-left"
                "times-circle"
              }
              size={24}
              color={"black"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <FlowerContent
              image={image}
              type={type}
              content={content}
              hits={hits}
              like_count={like_count}
              name={name}
              navigation={this.props.navigation}
              images={images}
            />
          </ScrollView>
        </View>
        <View style={styles.navigator}>
          <FlowerBottomBar
            mutationLike={like}
            complete={this.props.complete}
            id={id}
            refetch={refetch}
            navigation={navigation}
            like={this.props.data.GetFlower.like}
            _visibleModal={this._visibleModal}
          />
        </View>
        <Modal
          isVisible={this.state.visibleModal}
          onBackdropPress={() => this.setState({ visibleModal: false })}
          style={styles.bottomModal}
        >
          <CommentForm
            data={this.props.comment}
            refetch={this.props.commentRefetch}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1
  },
  scrollContainer: {
    flex: 0.94,
    zIndex: 1
  },
  navigator: {
    flex: 0.06,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#d8d8d8"
  },
  tabNavi: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  }
});

export default FlowerPagePresenter;
