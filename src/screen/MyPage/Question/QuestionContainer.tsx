import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import QuestionPresenter from "./QuestionPresenter";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

class QuestionContainer extends React.Component<Props> {
  render() {
    return (
      <Mutation mutation={CreateQuestions}>
        {CreateQuestions => {
          return (
            <QuestionPresenter
              navigation={this.props.navigation}
              CreateQuestions={CreateQuestions}
            />
          );
        }}
      </Mutation>
    );
  }
}

const CreateQuestions = gql`
  mutation CreateQuestions($question: String!) {
    CreateQuestions(question: $question) {
      result
      error
    }
  }
`;

export default QuestionContainer;
