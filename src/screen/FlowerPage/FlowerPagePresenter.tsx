import React from "react";
import { View, StyleSheet, StatusBar, ScrollView } from "react-native";
import {
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationScreenProp } from "react-navigation";
import Modal from "react-native-modal";
import CommentForm from "../../component/CommentForm/CommetForm";
import FlowerBottomBar from "../../component/FlowerBottomBar/FlowerBottomBar";
import FlowerContent from "../../component/FlowerContent/FlowerContent";
import { ifIphoneX } from "react-native-iphone-x-helper";
import {
  GetFlowerResponse,
  GetComResponse,
  GetLibraryResponse,
  GetLikeResponse
} from "src/types/types";
import LibraryModal from "../../component/LibraryModal/LibraryModal";
import LinkModal from "../../component/LinkModal/LinkModal";

interface Props {
  data: GetFlowerResponse;
  navigation: NavigationScreenProp<any, any>;
  mutationLike: any;
  comment: GetComResponse;
  librarys: GetLibraryResponse[];
  CreateSaveFlower: any;
  DeleteSave: any;
  likes: GetLikeResponse;
}

interface State {
  like: boolean;
  commentModal: boolean;
  libraryModal: boolean;
  linkModal: boolean;
  hits: number;
}

class FlowerPagePresenter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      like: false,
      commentModal: false,
      libraryModal: false,
      linkModal: false,
      hits: 0
    };
  }

  componentWillMount = () => {
    const hits = this.props.data.GetFlower.flower.hits;

    this.setState({
      like: this.props.likes.result,
      hits: hits
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        like: this.props.likes.result
      });
    }
  }

  _visibleModal = (type, boolean) => {
    if (type === "comment") {
      this.setState({ commentModal: boolean });
    }
    if (type === "library") {
      this.setState({ libraryModal: boolean });
    }
    if (type === "link") {
      this.setState({ linkModal: boolean });
    }
  };

  render() {
    const {
      mutationLike,
      data: {
        GetFlower: {
          flower: { id, name, hits, type, content, image, images }
        }
      },
      navigation
    } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={{ position: "absolute", left: 30, top: 30, zIndex: 3 }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name={"times-circle"} size={24} color={"black"} />
          </TouchableOpacity>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <FlowerContent
              image={image}
              type={type}
              content={content}
              hits={hits}
              name={name}
              navigation={this.props.navigation}
              images={images}
              likes={this.props.likes}
            />
          </ScrollView>
        </View>
        <View style={styles.navigator}>
          <FlowerBottomBar
            mutationLike={mutationLike}
            id={id}
            navigation={navigation}
            likes={this.props.likes}
            _visibleModal={this._visibleModal}
          />
        </View>
        <Modal
          isVisible={this.state.commentModal}
          onBackdropPress={() => this.setState({ commentModal: false })}
          style={styles.bottomModal}
        >
          <CommentForm
            data={this.props.comment}
            mutationLike={mutationLike}
            flowerid={id}
            navigation={navigation}
            commentModal={this._visibleModal}
          />
        </Modal>
        <Modal
          isVisible={this.state.libraryModal}
          onBackdropPress={() => this.setState({ libraryModal: false })}
          style={styles.bottomModal}
        >
          <LibraryModal
            librarys={this.props.librarys}
            flowerid={id}
            CreateSaveFlower={this.props.CreateSaveFlower}
            DeleteSave={this.props.DeleteSave}
            modal={this._visibleModal}
          />
        </Modal>
        <Modal
          isVisible={this.state.linkModal}
          onBackdropPress={() => this.setState({ linkModal: false })}
          style={styles.bottomModal}
        >
          <LinkModal
            flower={this.props.data.GetFlower.flower}
            modal={this._visibleModal}
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
    borderColor: "#d8d8d8",
    ...ifIphoneX(
      {
        marginBottom: 35
      },
      {
        marginBottom: 0
      }
    )
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
