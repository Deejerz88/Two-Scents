const users = [
  {
    username: "user1",
    email: "user1@email.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "user2",
    email: "user2@email.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "user3",
    email: "user3@email.com",
    thoughts: [],
    friends: [],
  },
];

const thoughts = [
  {
    thoughtText: "This is a thought",
    createdAt: new Date().toISOString(),
    username: "user1",
    reactions: [],
  },
  {
    thoughtText: "This is another thought",
    createdAt: new Date().toISOString(),
    username: "user2",
    reactions: [],
  },
  {
    thoughtText: "This is yet another thought",
    createdAt: new Date().toISOString(),
    username: "user3",
    reactions: [],
  },
];

export { users, thoughts };