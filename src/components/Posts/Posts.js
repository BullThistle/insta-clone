import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Post from '../Post/Post';
const Posts = () => {
  return (
    <Query
      query={gql`
        {
          posts(user_id: "a") {
            id
            user {
              nickname
            }
            image
            caption
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading Posts...</p>;
        if (error) return <p>Error Fetching Posts...</p>;
        let posts = data.posts;

        return (
          <div className="Posts">
            {posts.map(post => (
              <Post
                nickname={post.user.nickname}
                image={post.image}
                caption={post.caption}
                key={post.id}
              />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default Posts;
