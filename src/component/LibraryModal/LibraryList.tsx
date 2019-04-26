import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Width } from "../../helper/Dimension";
import { useQuery } from "react-apollo-hooks";
import { saveFlower } from "./queries";

interface Props {
  library: {
    id: number;
    name: string;
  };
  check: Array<number>;
  stateCheck: (library: any) => void;
  flowerid: number;
}

const LibraryList = (props: Props) => {
  const { library, check, stateCheck, flowerid } = props;
  const { data, loading } = useQuery(saveFlower, {
    variables: { libraryid: library.id }
  });

  if (loading) return <View />;

  const found = data.GetSaveFlower.saveFlower.find(save => {
    return save.flowers.id === flowerid;
  });

  const checked = check.indexOf(library.id);
  return (
    <TouchableOpacity onPress={() => stateCheck(library)} key={library.id}>
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 7,
          display: "flex",
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "#d8d8d8"
        }}
      >
        <View style={{ width: Width * 0.86 }}>
          <Text style={{ fontSize: 15, fontFamily: "NanumSquareR" }}>
            {library.name}
          </Text>
        </View>
        <View style={{ right: 0 }}>
          {checked !== -1 ? (
            <MaterIcon name={"checkbox-blank"} color={"blue"} size={21} />
          ) : (
            <MaterIcon
              name={"checkbox-blank-outline"}
              color={"black"}
              size={21}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LibraryList;
