import * as React from 'react';
import "reflect-metadata";
// import connection from '../data-access';
// import { createConnection } from 'typeorm/browser';
// import { User } from '../data-access/entity/User';

export default class Home extends React.Component {

  // public componentDidMount(){
  //   createConnection().then(async connection => {
  //
  //     console.log('Inserting a new user into the database...');
  //     const user = new User();
  //     user.firstName = 'Timber';
  //     user.lastName = 'Saw';
  //     user.age = 25;
  //     await connection.manager.save(user);
  //     console.log('Saved a new user with id: ' + user.id);
  //
  //     console.log('Loading users from the database...');
  //     const users = await connection.manager.find(User);
  //     console.log('Loaded users: ', users);
  //
  //     console.log('Here you can setup and run express/koa/any other framework.');
  //
  //   }).catch(error => console.log(error));
  // }
  public render() {
    return (
      <div>
        Homepg
      </div>
    );
  }
}