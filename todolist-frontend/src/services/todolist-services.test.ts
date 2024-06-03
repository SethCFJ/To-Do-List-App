// import React from "react";

// import { http, HttpResponse } from "msw";
// import { setupServer } from "msw/node";

// import { render, fireEvent, screen } from "@testing-library/react";

// import "@testing-library/jest-dom";

// import Fetch from "../containers/ToDoListContainer";

// const server = setupServer(
//   http.get("/greeting", (req, res, ctx) => {
//     return HttpResponse.json({ greeting: "hello there" });
//   })
// );

// beforeAll(() => server.listen());

// afterEach(() => server.resetHandlers());

// afterAll(() => server.close());

// test("handles server error", async () => {
//   server.use(
//     http.get("/greeting", (req, res, ctx) => {
//       return new HttpResponse(null, { status: 500 });
//     })
//   );
// });
