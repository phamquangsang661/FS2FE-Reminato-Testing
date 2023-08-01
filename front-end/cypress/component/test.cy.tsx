import { routerConfig } from "@router/index";
import { Provider } from "@src/provider"
import { createMemoryRouter } from "react-router-dom";

const router = createMemoryRouter(routerConfig, {
  initialEntries: ["/"]
});
describe('test.cy.tsx', () => {
  it('playground', () => {
    cy.viewport("macbook-11")
    cy.mount(
      <Provider router={router} />
    )
  })
})