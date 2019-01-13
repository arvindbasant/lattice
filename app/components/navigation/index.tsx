import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './navigation.scss';
import { Icon, Tooltip } from 'antd';

const NavDock = () => {
  return (
    <div className={styles.navdock}>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName={'active'}>
            <Tooltip placement="right" title={'dashboard'}>
              <Icon type="dashboard"/>
            </Tooltip>
          </NavLink>
        </li>
        <li>
          <NavLink to="/analysis" activeClassName={'active'}>
            <Tooltip placement="right" title={'analysis'}>
              <Icon type="pie-chart"/>
            </Tooltip>
          </NavLink>
        </li>
        <li>
          <NavLink to="/share" activeClassName={'active'}>
            <Tooltip placement="right" title={'share'}>
              <Icon type="share-alt"/>
            </Tooltip>
          </NavLink>
        </li>
        <li>
          <NavLink to="/datasource" activeClassName={'active'}>
            <Tooltip placement="right" title={'data source'}>
              <Icon type="database"/>
            </Tooltip>
          </NavLink>
        </li>
        <li>
          <NavLink to="/manage" activeClassName={'active'}>
            <Tooltip placement="right" title={'user management'}>
              <Icon type="user"/>
            </Tooltip>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName={'active'}>
            <Tooltip placement="right" title={'settings'}>
              <Icon type="setting"/>
            </Tooltip>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export { NavDock };
