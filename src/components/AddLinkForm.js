import React from "react";
import StyledButton from './StyledButton';

class AddLinkForm extends React.Component {
  addRef = React.createRef();

  createLink = event => {
    event.preventDefault();
    const enteredValue = this.addRef.current.value;
    this.props.addLink(enteredValue);
    event.currentTarget.reset();
  };

  render() {
    return (
      <form onSubmit={this.createLink}>
        <input name="name" required ref={this.addRef} type="text" autoComplete="off" placeholder="YouTube/SoundCloud/MixCloud link" />
        <StyledButton id="addButton" className="button" type="submit">+ Add Link</StyledButton>
      </form>
    );
  }
}

export default AddLinkForm;