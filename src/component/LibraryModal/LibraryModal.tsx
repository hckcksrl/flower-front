import React from "react";
import { View, Text, Dimensions, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Width } from "../../helper/Dimension";
import LibraryList from "./LibraryList";
import Modal from "react-native-modal";
import { ifIphoneX } from "react-native-iphone-x-helper";

interface Props {
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
  flowerid: number;
  CreateSaveFlower: any;
  DeleteSave: any;
  CreateLibrary: any;
  modal: (type: string, boolean: boolean) => void;
}

interface State {
  check: Array<number>;
  alreadyCheck: Array<number>;
  deleteCheck: Array<number>;
  createCheck: Array<number>;
  createModal: boolean;
  text: string;
}
class LibraryModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      check: [],
      alreadyCheck: [],
      deleteCheck: [],
      createCheck: [],
      createModal: false,
      text: ""
    };
  }

  _onStateCheck = library => {
    const check = this.state.check;
    const result = check.indexOf(library.id);
    if (result === -1) {
      this.setState({
        check: check.concat(library.id).sort((a, b) => {
          return a - b;
        })
      });
    } else {
      check.splice(result, 1);
      this.setState({
        check: check.sort((a, b) => {
          return a - b;
        })
      });
    }
  };

  _submit = async () => {
    const { check, alreadyCheck, deleteCheck, createCheck } = this.state;
    const { getLibraryRefetch, modal } = this.props;
    let deleteChecked = [...this.state.deleteCheck];
    let createChecked = [...this.state.createCheck];
    await alreadyCheck.map(id => {
      const found = check.find(checkid => {
        return checkid === id;
      });
      if (!found) {
        deleteChecked = [...deleteChecked, id];
      }
    });
    await check.map(id => {
      const found = alreadyCheck.find(checkid => {
        return checkid === id;
      });
      if (!found) {
        createChecked = [...createChecked, id];
      }
    });
    this.setState({
      deleteCheck: [...deleteChecked],
      createCheck: [...createChecked]
    });
    this._mutation().then(() => modal("library", false));
  };

  _mutation = async () => {
    const { deleteCheck, createCheck } = this.state;
    const {
      CreateSaveFlower,
      DeleteSave,
      flowerid,
      getLibraryRefetch
    } = this.props;
    await deleteCheck.map(id => {
      DeleteSave({ variables: { flowerid: flowerid, libraryid: id } }).then(
        () => getLibraryRefetch()
      );
    });
    await createCheck.map(id => {
      CreateSaveFlower({
        variables: { flowerid: flowerid, libraryid: id }
      }).then(() => getLibraryRefetch());
    });
  };

  componentWillMount() {
    const { librarys, flowerid } = this.props;
    let checked = [...this.state.check];
    librarys.forEach(library => {
      const found = library.saveFlower.find(save => {
        return save.flowers.id === flowerid;
      });
      if (found) {
        checked = [...checked, library.id];
      }
    });
    this.setState({
      check: [...checked],
      alreadyCheck: [...checked]
    });
  }

  _createLibrary = () => {
    const { CreateLibrary, getLibraryRefetch } = this.props;
    const { text } = this.state;
    CreateLibrary({ variables: { name: text } })
      .then(() => getLibraryRefetch())
      .then(() => this.setState({ createModal: false }));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerLeftFont}>저장</Text>
          </View>
          <View style={styles.headerRightView}>
            <TouchableOpacity
              onPress={() => this.setState({ createModal: true })}
            >
              <Text style={styles.headerRightFont}>+ 새 저장목록</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {this.props.librarys.map(library => {
            return (
              <LibraryList
                library={library}
                key={library.id}
                check={this.state.check}
                stateCheck={this._onStateCheck}
                flowerid={this.props.flowerid}
              />
            );
          })}
          <TouchableOpacity onPress={this._submit}>
            <View style={{ height: 40, justifyContent: "center" }}>
              <Text style={styles.font}>완료</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={this.state.createModal}
          onBackdropPress={() => this.setState({ createModal: false })}
          style={styles.createModal}
        >
          <View style={styles.createView}>
            <View style={{ paddingVertical: 20 }}>
              <Text style={{ fontFamily: "NanumSquareB", fontSize: 20 }}>
                새 저장목록
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <TextInput
                placeholder="저장목록 이름"
                style={styles.createTextInput}
                onChangeText={text => {
                  this.setState({ text });
                }}
              />
            </View>
            <View style={styles.createBottomView}>
              <View style={{ marginRight: 40 }}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ createModal: false, text: "" })
                  }
                >
                  <Text style={styles.font}>취소</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={this._createLibrary}>
                  <Text style={styles.headerRightFont}>생성</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 300,
    backgroundColor: "white",
    paddingHorizontal: 15,
    ...ifIphoneX(
      {
        paddingBottom: 35
      },
      {
        paddingBottom: 0
      }
    )
  },
  headerView: {
    display: "flex",
    flexDirection: "row",
    height: 40,
    width: Dimensions.get("window").width,
    marginBottom: 10
  },
  headerLeft: {
    width: Dimensions.get("window").width / 2 - 15,
    justifyContent: "center"
  },
  headerLeftFont: { fontSize: 15, fontFamily: "NanumSquareB" },
  headerRightView: {
    width: Dimensions.get("window").width / 2 - 15,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  headerRightFont: {
    color: "#3b74ff",
    fontSize: 15,
    fontFamily: "NanumSquareR"
  },
  createModal: {
    justifyContent: "center",
    margin: 0,
    width: Width,
    alignItems: "center"
  },
  createView: {
    width: 300,
    height: 170,
    backgroundColor: "white",
    paddingHorizontal: 15
  },
  createTextInput: {
    fontFamily: "NanumSquareB",
    borderBottomWidth: 1,
    borderColor: "#747474",
    fontSize: 15,
    paddingVertical: 4.5
  },
  createBottomView: {
    height: 70,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    bottom: 0
  },
  font: { fontSize: 15, fontFamily: "NanumSquareR" }
});

export default LibraryModal;
