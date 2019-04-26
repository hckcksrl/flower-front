import { TouchableOpacity, Text } from "react-native";

interface Props {
  submit: () => void;
  createCheck: Array<number>;
  deleteCheck: Array<number>;
}

const LibrarySubmit = (props: Props) => {
  return (
    <TouchableOpacity>
      <Text>저장</Text>
    </TouchableOpacity>
  );
};

export default LibrarySubmit;
