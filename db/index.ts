import "server-only";

import neo4j from "neo4j-driver";

export const driver = neo4j.driver(
  process.env.NEO4J_URI as string,
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME as string,
    process.env.NEO4J_PASSWORD as string
  )
);

// create {u: User {email, first_name}, create u-[:likes]->b} where u-[:likes]->User
// 1. creating connections when User likes someone
// 2. creating connections when User dislikes someone
// 3. if both A and B like each other, it's a match!
