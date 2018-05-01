let express = require('express');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');
let cors = require('cors');

let schema = buildSchema(`
      type User {
        id : String!
        nickname : String!
      }
      type Post {
          id: String!
          user: User!
          caption : String!
          image : String!
      }
      type Query{
        user(id: String) : User!
        post(user_id: String, post_id: String) : Post!
        posts(user_id: String) : [Post]
      }
    `);

let userslist = {
  a: {
    id: 'a',
    nickname: 'Rafa'
  },
  b: {
    id: 'b',
    nickname: 'John'
  },
  c: {
    id: 'c',
    nickname: 'Mr.'
  },
  d: {
    id: 'd',
    nickname: 'Michael'
  }
};
let postslist = {
  a: {
    a: {
      id: 'a',
      user: userslist['a'],
      caption: 'Oh its a flower in da snow!',
      image:
        'https://cdn.pixabay.com/photo/2018/02/05/12/28/spring-awakening-3132112_1280.jpg'
    },
    b: {
      id: 'b',
      user: userslist['a'],
      caption: 'Look at dis here bird ^______^',
      image:
        'https://cdn.pixabay.com/photo/2016/12/12/01/33/seagull-1900657_1280.jpg'
    },
    c: {
      id: 'c',
      user: userslist['a'],
      caption: 'Neat huh',
      image:
        'https://cdn.pixabay.com/photo/2018/03/20/16/11/nature-3243716_1280.jpg'
    },
    d: {
      id: 'd',
      user: userslist['a'],
      caption: 'Rore!',
      image:
        'https://cdn.pixabay.com/photo/2018/04/13/21/24/lion-3317670_1280.jpg'
    }
  }
};

let root = {
  user: function({ id }) {
    return userslist[id];
  },
  post: function({ user_id, post_id }) {
    return postslist[user_id][post_id];
  },
  posts: function({ user_id }) {
    return Object.values(postslist[user_id]);
  }
};

let app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(5000);
