import * as React from 'react';
import { render } from 'react-dom';
// import { hot } from 'react-hot-loader/root';
import './app.global.scss';
import { configureStore, history, sagaMiddleware } from './store';
import Root from './components/Root';
import rootSaga from './store/root-saga';
import { AppContainer } from 'react-hot-loader';

const store = configureStore();
sagaMiddleware.run(rootSaga);

// const root = render(<Root store={store} history={history}/>, document.getElementById('root'));
// export default hot(root);
render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}