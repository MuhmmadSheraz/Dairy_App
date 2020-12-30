import { Server, Model, Factory, belongsTo, hasMany, Response } from "miragejs";

import user from "./routes/user";
import * as diary from "./routes/dairy";
import * as entry from "./routes/entry";
export const handleError = (error: any, message = "An error ocurred") => {
  return new Response(400, undefined, {
    data: {
      message,
      isError: true,
    },
  });
};

export const setupServer = (env?: string): Server => {
  return new Server({
    environment: env ?? "development",

    models: {
      entry: Model.extend({
        diary: belongsTo(),
      }),
      diary: Model.extend({
        entry: hasMany(),
        user: belongsTo(),
      }),
      user: Model.extend({
        diary: hasMany(),
      }),
    },

    factories: {
      user: Factory.extend({
        username: "test",
        password: "password",
        email: "test@email.com",
      }),
    },

    seeds: (server): any => {
      server.create("user");
    },

    routes(): void {
      this.urlPrefix = "https://diaries.app";
      //Diaries
      this.get("/diaries/:id", diary.getDiaries);
      this.post("/diaries/", diary.create);
      // Authentication
      this.post("/auth/login", user.login);
      this.post("/auth/signup", user.signup);
      //Entries
      this.post("/diaries/entry/:id", entry.addEntry);
      this.get("/diaries/entry/:id", entry.getEntries);

      this.put("/diaries/:id", diary.updateDiary);
      this.put("/diaries/entry/:id", entry.updateEntry);
    },
  });
};
