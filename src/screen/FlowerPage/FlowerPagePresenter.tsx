import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationScreenProp } from "react-navigation";
import Modal from "react-native-modal";
import CommentForm from "../../component/CommentForm/CommetForm";
import FlowerBottomBar from "../../component/FlowerBottomBar/FlowerBottomBar";
import FlowerContent from "../../component/FlowerContent/FlowerContent";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { GetCommentResponse, GetFlowerResponse } from "src/types/types";
import LibraryModal from "../../component/LibraryModal/LibraryModal";

interface Props {
  data: GetFlowerResponse;
  navigation: NavigationScreenProp<any, any>;
  mutationLike: any;
  refetch: any;
  isLike: (like: any, refetch: any, id: number, argsType: string) => void;
  comment: GetCommentResponse;
  commentRefetch: any;
  getLibraryRefetch: any;
  librarys: {
    id: number;
    name: string;
    saveFlower: {
      id: number;
      flowers: {
        id: number;
      };
    }[];
  }[];
  CreateSaveFlower: any;
  DeleteSave: any;
  CreateLibrary: any;
}

interface State {
  like: boolean;
  commentModal: boolean;
  libraryModal: boolean;
  hits: number;
}

class FlowerPagePresenter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      like: false,
      commentModal: false,
      libraryModal: false,
      hits: 0
    };
  }

  componentWillMount() {
    const hits = this.props.data.GetFlower.flower.hits;

    this.setState({
      like: this.props.data.GetFlower.like,
      hits: hits
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        like: this.props.data.GetFlower.like
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
  };

  render() {
    const {
      mutationLike,
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
              like={this.props.data.GetFlower.like}
            />
          </ScrollView>
        </View>
        <View style={styles.navigator}>
          <FlowerBottomBar
            mutationLike={mutationLike}
            isLike={this.props.isLike}
            id={id}
            refetch={refetch}
            navigation={navigation}
            like={this.props.data.GetFlower.like}
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
            refetch={this.props.commentRefetch}
            mutationLike={mutationLike}
            isLike={this.props.isLike}
            flowerid={id}
          />
        </Modal>
        {/* <Modal
          isVisible={this.state.libraryModal}
          onBackdropPress={() => this.setState({ libraryModal: false })}
          style={styles.bottomModal}
        >
          <LibraryModal
            getLibraryRefetch={this.props.getLibraryRefetch}
            librarys={this.props.librarys}
            flowerid={id}
            CreateSaveFlower={this.props.CreateSaveFlower}
            DeleteSave={this.props.DeleteSave}
            CreateLibrary={this.props.CreateLibrary}
            modal={this._visibleModal}
          />
        </Modal> */}
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
