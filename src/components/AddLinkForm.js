import React from "react";

class AddLinkForm extends React.Component {
  nameRef = React.createRef();

  createLink = event => {
    event.preventDefault();
    const enteredValue = this.nameRef.current.value;
    const newLink = enteredValue;
    this.props.addLink(newLink);
    event.currentTarget.reset();
  };

  render() {
    return (
      <form onSubmit={this.createLink}>
        <input name="name" required ref={this.nameRef} type="text" autoComplete="off" placeholder="YouTube/SoundCloud/MixCloud link" />
        <button id="addButton" className="button" type="submit">+ Add Links</button>
      </form>
    );
  }
}

export default AddLinkForm;