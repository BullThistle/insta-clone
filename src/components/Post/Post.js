import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const nickname = this.props.nickname;
    const image = this.props.image;
    const caption = this.props.caption;
    return (
      <Card centered style={{ marginTop: '80px', width: '60%' }}>
        <Card.Content>
          <Card.Header>
            <Icon name="users" />
            {nickname}
          </Card.Header>
        </Card.Content>
        <Image src={image} />
        <Card.Description>
          <b>{nickname}</b> - "{caption}"
        </Card.Description>
      </Card>
    );
  }
}

export default Post;
