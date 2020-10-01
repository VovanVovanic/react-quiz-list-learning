import React, { Component } from "react";
import Button from "../../ui/buttons";
import Input from "../../ui/input";
import Select from "../../ui/select";
import ErrorMessage from '../../components/error-message'
import {
  onCreateControls,
  onInputValid,
  validForm,
} from "../../components/form/form-handlers";
import axios from 'axios'
import classes from "./quiz-creator.module.css";


class QuizCreator extends Component {
  createControl = (num) => {
    return onCreateControls(
      {
        label: `Add answer option № ${num}`,
        errorMsg: "Answer option must be here",
        id: num
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
    quiz: [],
    error: "",
    rightAnswerId: 1,
    isFormValid: false,
    formControls: this.createFormControls(),
  };
  onAddQuestion = (e) => {
    e.preventDefault();
    const quiz = this.state.quiz.concat();
    const i = quiz.length + 1;
    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;
    const questionItem = {
      question: question.value,
      id: i,
      rightAnswerId: +this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };
    quiz.push(questionItem);
    this.setState({
      quiz,
      rightAnswerId: 1,
      isFormValid: false,
      formControls: this.createFormControls(),
    });
  };
  onCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://react-quiz-df3e9.firebaseio.com/quzes.json",
        this.state.quiz
      );
      this.setState({
        quiz: [],
        error: "",
        rightAnswerId: 1,
        isFormValid: false,
        formControls: this.createFormControls(),
      });
    } catch (e) {
      this.setState({
        error: `${e.response.status}  ${e.response.statusText}`,
      });
    }
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
          {this.state.error ? (
            <ErrorMessage message={this.state.error} />
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
                disabled={!this.state.quiz.length || this.state.isFormValid}
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

export default QuizCreator;
