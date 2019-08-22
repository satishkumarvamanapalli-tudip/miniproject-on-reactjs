import React, { Component } from "react";
import { Modal } from "react-bootstrap";

var text = /^[a-zA-Z]/;
var num = /^[0-9]{1,10}$/;

// accept array / multiple
function validateInput() {
  let errors = {};
  for (var i = 0; i < arguments.length; i += 1) {
    let input = arguments[i];
    let validationType = input.getAttribute("data-validation-type");
    if (validationType === null) validationType = input.type;

    let errorName = input.name + "Error";
    errors[errorName] = "";

    if (input.value === "" || input.value.length === 0) {
      errors[errorName] = "please fill this in";
    } else if (validationType === "id") {
      if (input.value.match(num) === null) {
        errors[errorName] = "id must be number";
      }
    } else if (validationType === "original_title") {
      if (input.value.match(text) === null) {
        errors[errorName] = "original_title must be in characters";
      } else {
        if (input.value.length <= 3) {
          errors[errorName] = "original_title must be at least 3 characters";
        }
      }
    } else if (validationType === "vote_average") {
      if (input.value.match(num) === null) {
        errors[errorName] = "field must be number";
      }
    } else if (validationType === "vote_count") {
      if (input.value.match(num) === null) {
        errors[errorName] = "voter count field contains number";
      }
    } else if (validationType === "popularity") {
      if (input.value.match(num) === null) {
        errors[errorName] = "popularity field must conatin numbers";
      }
    } else if (validationType === "original_language") {
      if (input.value.match(text) === null || input.value.length < 3) {
        errors[errorName] = "original_language must be in characters";
      }
    }
  }

  return errors;
}

class ModalView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id || "",
      original_title: props.original_title || "",
      release_date: props.release_date || "",
      vote_average: props.vote_average || "",
      vote_count: props.vote_count || "",
      popularity: props.popularity || "",
      original_language: props.original_language || "",
      idError: "",
      original_titleError: "",
      vote_averageError: "",
      vote_countError: "",
      popularityError: "",
      original_languageError: ""
    };
  }

  onChange = e => {
    let input = e.target;
    // this.setState({ ...this.state, [input.name]: input.value });
    let errors = validateInput(input);
    this.setState({ ...this.state, [input.name]: input.value, ...errors });
  };

  /* onBlur = e => {
        let input = e.target;
        this.setState({ ...this.state, [input.name]: input.value });

        setTimeout(() => { // setTimeout for blur
            if (!input.contains(document.activeElement)) {
                let errors = validateInput(input); // run validation against this input, and return error object
                this.setState({ ...this.state, ...errors }); // update state with returned errors
                // console.log("errors", errors);
            }
        }, 0);
       };
    */
  onSubmit = (e, edit) => {
    const { closeFormAfterAdding, createNewMovie, editMovie } = this.props;
    e.preventDefault();
    console.log(e.target.name.value);
    let errors = validateInput(
      e.target.id,
      e.target.original_title,
      e.target.vote_average,
      e.target.popularity,
      e.target.vote_count,
      e.target.original_language
    );
    console.log("errors", errors);
    this.setState({ ...this.state, ...errors });

    let idError = this.state.idError;
    let original_titleError = this.state.original_titleError;
    let vote_averageError = this.state.vote_averageError;
    let vote_countError = this.state.vote_countError;
    let popularityError = this.state.popularityError;
    let original_languageError = this.state.original_languageError;

    // TODO check if errors exist and fields are filled..
    if (
      idError === "" &&
      original_titleError === "" &&
      vote_averageError === "" &&
      vote_countError === "" &&
      popularityError === "" &&
      original_languageError === ""
    ) {
      if (edit) {
        console.log("updated");
        console.log("............state", this.state);
        editMovie(this.state);
        closeFormAfterAdding(e);
      } else {
        console.log("submitted");
        createNewMovie(this.state);
        closeFormAfterAdding(e);
      }
    }
     else {
      
        alert("Please fill all the fields properly");
      
    }
  };
  render() {
    const { edit, id, modalIsOpen, closeModal } = this.props;
    const {
      original_title,
      release_date,
      vote_average,
      vote_count,
      popularity,
      original_language,
      idError,
      original_titleError,
      vote_averageError,
      vote_countError,
      popularityError,
      original_languageError,

    } = this.state;

    return (
      <Modal
        show={modalIsOpen}
        onHide={closeModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Movie Data Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mmodal">
          <div className="main-w3layouts wrapper">
            <div className="main-agileinfo">
              <div className="agileits-top">
                <form onSubmit={e => this.onSubmit(e, edit)}>
                  <p className="m-0">{idError}</p>
                  <input
                    className="text"
                    type="text"
                    name="id"
                    placeholder="id"
                    onBlur={this.onBlur}
                    data-validation-type="id"
                    value={id}
                    onChange={e => this.onChange(e)}
                    required
                  />
                  <p className="m-0">{original_titleError}</p>
                  <input
                    className="text"
                    type="text"
                    name="original_title"
                    placeholder="original_title"
                    data-validation-type="original_title"
                    value={original_title}
                    onBlur={this.onBlur}
                    onChange={e => this.onChange(e)}
                    required
                  />
                  <p className="m-0">{original_languageError}</p>
                  <input
                    className="text"
                    type="text"
                    name="original_language"
                    placeholder="original_language"
                    data-validation-type="original_language"
                    value={original_language}
                    onBlur={this.onBlur}
                    onChange={e => this.onChange(e)}
                    required
                  />
                  <p className="m-0">{popularityError}</p>
                  <input
                    className="text"
                    type="text"
                    name="popularity"
                    placeholder="popularity"
                    data-validation-type="popularity"
                    value={popularity}
                    onBlur={this.onBlur}
                    onChange={e => this.onChange(e)}
                    required
                  />
                  <p className="m-0">{vote_countError}</p>
                  <input
                    className="text"
                    type="text"
                    name="vote_count"
                    placeholder="vote_count"
                    data-validation-type="vote_count"
                    value={vote_count}
                    onBlur={this.onBlur}
                    onChange={e => this.onChange(e)}
                    required
                  />
                  <p className="m-0">{vote_averageError}</p>
                  <input
                    className="text"
                    type="text"
                    name="vote_average"
                    placeholder="vote_average"
                    data-validation-type="vote_average"
                    value={vote_average}
                    onBlur={this.onBlur}
                    onChange={e => this.onChange(e)}
                    required
                  />
                 
                  <input
                    className="text"
                    type="date"
                    name="release_date"
                    placeholder="release_date"
                    value={release_date}
                    onChange={e => this.onChange(e)}
                    required
                  />
                  <br />
                  <button type="submit" className="button btn btn-info">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/*<Modal.Footer>
        <Button onClick={onClose}>Close</Button>
     </Modal.Footer>*/}
      </Modal>
    );
  }
}
export default ModalView;
