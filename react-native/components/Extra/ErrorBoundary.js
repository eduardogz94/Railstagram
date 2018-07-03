import React from 'react'
import { Text, View } from 'react-native'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <View><Text>Something went wrong.</Text></View>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;