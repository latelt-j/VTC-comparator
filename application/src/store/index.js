import React from 'react';

const { Provider, Consumer } = React.createContext();

class AppProvider extends React.Component {
  state = {
    isLogged: false
  }

  render() {
    const { children } = this.props;
    return (
      <Provider value={this.state}>
        {children}
      </Provider>
    );
  }
}

export const withAppContext = (Component) => {
  const ComponentWithContext = () => (
    <Consumer>
      {value => <Component {...this.props} data={value} />}
    </Consumer>
  );
  return ComponentWithContext;
};

export default withAppContext;
export { AppProvider, Consumer };
