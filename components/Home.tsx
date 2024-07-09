"use client";

import { Neo4JUser } from "@/types";
import * as React from "react";
import TinderCard from "react-tinder-card";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { neo4jSwipe } from "@/app/neo4j.action";

interface HomePageClientProps {
  currentUser: Neo4JUser;
  users: Neo4JUser[];
}

const HomePageClientComponent: React.FC<HomePageClientProps> = ({
  currentUser,
  users,
}) => {
  const handleSwipe = async (direction: string, userId: string) => {
    const isMatch = await neo4jSwipe(
      currentUser.applicationId,
      direction,
      userId
    );
    if (isMatch) alert("Congrats you have a match");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div>
        <h1 className="text-4xl">
          Hello {currentUser.firstname} {currentUser.lastname}
        </h1>
      </div>
      <div className="mt-4 relative">
        {users.map((user) => (
          <TinderCard
            onSwipe={(direction) => handleSwipe(direction, user.applicationId)}
            className="absolute"
            key={user.applicationId}
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  {user.firstname} {user.lastname}
                </CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
            </Card>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default HomePageClientComponent;
