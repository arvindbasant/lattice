import * as React from 'react';
import { NavDock } from './navigation';

export default class App extends React.Component {
  public render() {
    return (
      <div>
        <NavDock />
        {this.props.children}
      </div>
    );
  }
}
