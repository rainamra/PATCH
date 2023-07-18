import services from "../utils/mockAdapter";

import userList from "./payload/user_list.json";
import petList from "./payload/pet_list.json";

services.onGet("/api/user").reply(200, { users: userList.output_schema.data });
services.onGet("/api/user/pet").reply(200, { pets: petList.output_schema.data });
services.onGet("/api/user/:id").reply((config) => {
  try {
    let users = userList.output_schema.data;

    const { id } = config.params;

    // Find the user with the given ID
    const user = users.find((user) => user.id === id);

    console.log("user: ", user);
    if (user) {
      // Return the user if found
      return [200, user];
    }
  } catch (err) {
    return [500, { message: "Internal server error" }];
  }
});

services.onGet("/api/user/pet/:id").reply((config) => {
  try {
    let pets = petList.output_schema.data;

    const { id } = config.params;

    // Find the user with the given ID
    const pet = pets.find((pet) => pet.id === id);

    console.log("pet: ", pet);
    if (pet) {
      // Return the user if found
      return [200, pet];
    }
  } catch (err) {
    return [500, { message: "Internal server error" }];
  }
});

services.onGet("/api/user/:id/pet").reply((config) => {
  try {
    let users = userList.output_schema.data;
    let pets = petList.output_schema.data;

    const { id } = config.params;

    // Find the user with the given ID
    const user = users.find((user) => user.id === id);

    // Find the pets with the given ID
    userPets = pets.filter((pet) => pet.uid === id);

    console.log("user: ", user);
    console.log("pets: ", userPets);

    const result = {
      ...user,
      pets: userPets,
    };

    console.log("result: ", result);

    // Return the user if found
    return [200, result];
  } catch (err) {
    return [500, { message: "Internal server error" }];
  }
});
