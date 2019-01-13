import * as React from 'react';

export interface CreateUserFormProps {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default class CreateUserForm extends React.PureComponent<CreateUserForm> {

  constructor(props: CreateUserForm) {
    super(props);
  }

  public render() {
    return (
      <div>
        userForm he,,,,,lllllllllllllllll
      </div>
    );
  }
}