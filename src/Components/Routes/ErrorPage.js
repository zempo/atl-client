import React, { Component } from "react";

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    this.setState({ error, info });
  }

  render() {
    if (this.state.info) {
      return (
        <div className="error-bounds">
          <h1>Oh no!</h1>
        </div>
      );
    }
    return this.props.children;
  }
}
