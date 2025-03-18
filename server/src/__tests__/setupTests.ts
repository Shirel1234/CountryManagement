import generateMockToken from "./mocks/jwtMock";

let token: string;

beforeAll(async () => {
  token = generateMockToken({
    username: "admin",
    accessLevel: 5,
  });
});

export { token };
