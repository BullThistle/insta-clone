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
        'https://lh3.googleusercontent.com/GgaEVR8vburoVB-Ap7NQAyPP59ind_RFW4fxjbhQXzvQNbMDwCr6Ml8Ci9Po-PgQj8HdFfAS0rAsNeyJaF83NPU9mnnBbVNEX9I_ZeAkOHKd5I992jESh-F5Ll7QxFkLQIb38lqPa1s_5uUymJe5eCEuZVt5UGRZibFNOQdng8JcvxjG4h6GOpiBQa_F6dxx2dnDTMxeDJLM0iJ1oUaAzhAen9aaDLjgOo6GtjgtJk2AzTs-VVqbIMDn-Aisp5eyCupcVq9wLfJ-0WhnAyZ4fttKrzeWpIdYuBoN2jsiV4KdiEGl06lH4uPbDGRT2HiiPIFDylT8IRsONZ8KDvP-7_n6EQ_J8LFa6itGwWnK5Y2cqNGyyadoTLXbeUS3x4MTzL95EEHvgGa1isvygKVyp_ltKk-N9vHmT6wMcRTz2ECFYG1N9nO3UkXdCRJezL95HpLo6tc5yXC3E3tyCA0RYBpZZqrN8QqFfr6cCl7i1DhuaX16uTKTVxzp8909wVh2N8ZbJUgYjmfX_axoxViy-XRs9MvaLm5Z-DeSAl5f0N5_nlPDHGxjVZaJMweEc66cywpMbqJ2mlf0TmBCM1KL8CitlPSzVSFF1AjCQB8=w1280-h843-no'
    },
    b: {
      id: 'b',
      user: userslist['a'],
      caption: 'Look at dis here bird ^______^',
      image:
        'https://lh3.googleusercontent.com/DYJYmXG0K0wwG-BeVciwHa0zvBo6Oq62vvuP_OABtUKi6WrrDjXPnEPboYboHrMgX_7NnOLScGPaOnUKSp8ax8SZUGFa27prMu-fMfUlT6j00gDakMTKBWD1TG-eBOx5_U8o_rXOunqNDcDDWRie9jri-fYVziUxYvvOkrqBySWpKVjROIhQKCegHez20GSEcgJUbZyJEI91KwI_THvFdPHJarOMJ8QVTeq6V0GtY9-2JR9UMXF-moLnrxar7Znz1QC7QU4LtqsazxqdJ2K_hNcvAG7FNl_k0ijb5i13xhD3bWsKUOOoUn1ZKgNSR5FnE6mTV_bF4r4sMXbgA-UdBgi7XJZ8lWJTTJAJvupBVLGlgRijZKigCDBX2fG6ePhu9NxbeXs8HDik8wK3hV23h8bvjXqd0-XxFU3fh1MuWDbqonJSj7cmMSxMxXSk95Vsf_d8tzNjZvo6Mrn2uN8BT3IhH4YAn6y5UsYuWqTNnFMIYo8ybDgW5HhgbrbK1EBV2sM6dje79IjFmg-kOssxV8SbikcAzy8WQ1-iLT97fuySJBpbnspqhq8ryt3nWaNN7B0V2h3TMoTUq0TAzl9qlDDgHT5Yutsw5ZRyoKw=w1280-h959-no'
    },
    c: {
      id: 'c',
      user: userslist['a'],
      caption: 'Neat huh',
      image:
        'https://lh3.googleusercontent.com/GIJRgAONBLpj6K3QKkyQZbazYc9IDp53EpUewV_MwnVv_LjC3kA0hVDKvkgIigw9rktrBMHs-tc4-6LRaB3BAQ10epUHdemQsRmn51AT8TZlGbZ9MyDizitlNEBd6m1tbexZ8-ozyHNsBDGC2-I2ZMXSwBj2oe-PaRBw4DfLsbT0g4d3a2xg9EYx1wmGFN1W2FLq2TFpzkhrn89gWtmsocxb8qdG8GnC5ldbSH8IAw2QMzdFR5GGY9_OiMv125SM0tW8QqL59IEtmMBguh34cE0y_sotYV_I4gxl9HjbD-ydrv2cSeV7Uj94NEFbSiS0ORYK2L4Q1dNb2FT6G3mXueX8Mm1Yn6dfDDFGNeMtKCPPcEYnEalaZwD22DPdCoZeIDrRRse6Tr5-pefzhjJDlJ-54vStWJ29PZd--b6Z-lCCrVZ9cjHgwEQ2CQ4886AiYQjSaZXe1GdTHtVmHpuYM023XuPHnKVSKx22qL1B58qMGuLoTw5XELfkCE3KGZa0ylCyUJu9RtsLeKX2JyBgFx9Yp8Ezy4FLP2iwG6qInQA9gamA6ZksycgmVsjkEk1f500SwNNl6ZsS71W5p8fAkg8GjGI2s7h0GFNYgvA=w1280-h853-no'
    },
    d: {
      id: 'd',
      user: userslist['a'],
      caption: 'Rore!',
      image:
        'https://lh3.googleusercontent.com/4Z1yv2GN9lVnwbeymeYmmubefrf4bsWZHexXT1KctPoz3r2FmmPMzAjMEwf8k0qMUyNWNHPrhBQloHN4TWLQ7qozlgrLR-DWizCesLjJWo_LFkOHe0bI1SRsRfAQKa9waEheUrmkyVzzAIb6O8vx4DInkW6v-ebQp43UzTQx3h1kAsSH36x9FhHt3_KNLwyt4Yy2VdhX81VGaHL2N8vZoBVwH0Nx_lM4WyFGvJ8NVrNQ8ctegZcoTCVbL5N1yY96aMCkc4_yfq5-TPNev3VOkVuiiX9LJF89DTW7RXuWhY3ol0XbVAnfqSgo8y5FcXnXza56Kzmx8pueUf6F2nnEFBOHDg0bLeevnfj2UCN8QIRVlCdxBRNij8sGv8EcGul6XBE-qTmmwDdpTVDeRWmjuA6OZc0G4lBeFni3a8brPe38syWvbexdg7dSoLICZ5A_g85o08ttw1GTrpR7HYbKee_HjtepFlOj5qmqcrbIRwWx20bYikTRhUsihd-RsfgTqK8pqbXnqaf54M1DpjlskJOCu8gIkTEL546nAfJbcYa1GZtLlEF3qFlmRz9BWAyMTgnNbprwODDT3xsDhc8SK4hCYImIrqnRu42KYeI=w1280-h964-no'
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
