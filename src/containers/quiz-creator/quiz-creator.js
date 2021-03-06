import React, { Component } from "react";
import Button from "../../ui/buttons";
import Input from "../../ui/input";
import Select from "../../ui/select";
import ErrorMessage from "../../components/error-message";
import {
  onCreateControls,
  onInputValid,
  validForm,
} from "../../components/form/form-handlers";
import { connect } from "react-redux";
import { addQuizItem, createQuiz } from "../../store/actions/create ";
import classes from "./quiz-creator.module.css";

class QuizCreator extends Component {
  createControl = (num) => {
    return onCreateControls(
      {
        label: `Add answer option № ${num}`,
        errorMsg: "Answer option must be here",
        id: num,
      },
      { required: true }
    );
  };
  createFormControls = () => {
    return {
      question: onCreateControls(
        {
          label: "Please type your question here",
          errorMsg: "This field mustn't be empty",
        },
        { required: true }
      ),
      option1: this.createControl(1),
      option2: this.createControl(2),
      option3: this.createControl(3),
      option4: this.createControl(4),
    };
  };
  state = {
    rightAnswerId: 1,
    isFormValid: false,
    formControls: this.createFormControls(),
  };
  onAddQuestion = (e) => {
    e.preventDefault();
    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;
    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: +this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };
    this.props.addQuizItem(questionItem);
    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: this.createFormControls(),
    });
  };
  onCreateQuiz = (e) => {
    e.preventDefault();
    this.props.createQuiz();
    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: this.createFormControls(),
    });
  };
  onInputChange = (e, control) => {
    const formControls = { ...this.state.formControls };
    const currentControl = { ...formControls[control] };
    currentControl.value = e.target.value;
    currentControl.touched = true;
    currentControl.valid = onInputValid(
      e.target.value,
      currentControl.validation
    );
    formControls[control] = currentControl;
    this.setState({
      formControls,
      isFormValid: validForm(formControls),
    });
  };
  onCreateInputs = () => {
    return Object.keys(this.state.formControls).map((control, i) => {
      const currentControl = this.state.formControls[control];
      const {
        value,
        valid,
        validation,
        touched,
        errorMsg,
        label,
        id,
      } = currentControl;
      return (
        <>
          <Input
            label={label}
            value={value}
            valid={valid}
            shouldValidate={!!validation}
            touched={touched}
            errorMsg={errorMsg}
            id={id}
            onChange={(e) => this.onInputChange(e, control)}
          />
          {i === 0 ? <hr /> : null}
        </>
      );
    });
  };
  onSelectChange = (e) => {
    this.setState({
      rightAnswerId: +e.target.value,
    });
  };
  render() {
    const select = (
      <Select
        label="Choose correct answer number"
        value={this.state.rightAnswerId}
        onChange={this.onSelectChange}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h2>Create Quiz</h2>
          {this.props.error ? (
            <ErrorMessage message={this.props.error} />
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              {this.onCreateInputs()}
              {select}
              <Button
                disabled={!this.state.isFormValid}
                type="success"
                onClick={this.onAddQuestion}
              >
                Add Question
              </Button>
              <Button
                disabled={!this.props.quiz.length || this.state.isFormValid}
                type="error"
                onClick={this.onCreateQuiz}
              >
                Create New Quiz
              </Button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
    error: state.create.error,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addQuizItem: (item) => dispatch(addQuizItem(item)),
    createQuiz: () => dispatch(createQuiz()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
