import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import App from './App'
import userEvent from '@testing-library/user-event'

it('renders MainPage route when unauthenticated', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  const heroText = screen.getByText(/Tanulj/i)
  expect(heroText).toBeInTheDocument()
})

it('shows AuthPage when Login button is clicked', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  userEvent.click(screen.getByText(/Már van fiókom/i))
  const enterDataText = await screen.findByText(/Add meg adataidat/i)
  expect(enterDataText).toBeInTheDocument()
})
