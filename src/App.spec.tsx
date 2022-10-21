import { screen, render } from '@testing-library/react'
import App from './App'

describe("dsecribe", () => {
  it("test case", () => {
    const {debug} = render(<App/>)
    debug()
    const foo = screen.getByText(/helou/i)
    expect(foo).toBeInTheDocument()
    expect(foo).toHaveClass('App')    
  });
});
