import React from 'react';
import { Menu, Image } from 'semantic-ui-react';

const Header = () => {
  return (
    <Menu fixed="top">
      <Menu.Item as="a" header>
        <Image
          src={require('./insta.png')}
          style={{ marginRight: '1.5em', marginLeft: '15em', width: '20px' }}
        />
        Insta Clone
      </Menu.Item>
    </Menu>
  );
};

export default Header;
