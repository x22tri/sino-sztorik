import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Router, { MemoryRouter } from 'react-router-dom'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { createTheme } from '@mui/material'
import React from 'react'
import Learn from './Learn'

// The mock data we'll use to test the character navigation functionality inside a lesson.
const mockLessonData = {
  tier: 1,
  lessonNumber: '100',
  name: 'Test Lesson',
  characters: [
    {
      orderId: 1,
      character: {
        charChinese: 'A',
        story: 'Char A',
      },
    },
    {
      orderId: 2,
      character: {
        charChinese: 'B',
        story: 'Char B',
      },
    },
    {
      orderId: 3,
      character: {
        charChinese: 'C',
        story: 'Char C',
      },
    },
  ],
}

// Mocking React-Router.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}))

// Mocking fetch.
const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve(mockLessonData),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

// Mocking MUI's theme.
const MockThemeProvider = ({ children }) => (
  <ThemeProvider theme={createTheme({})}>{children}</ThemeProvider>
)

// The beginning of the test suite.
it('loads the LessonStartPage after a successful fetch call', async () => {
  jest
    .spyOn(Router, 'useParams')
    .mockReturnValue({ lessonNumberToReview: mockLessonData.lessonNumber })

  render(
    <MockThemeProvider>
      <MemoryRouter>
        <Learn themeToggle={f => f()} />
      </MemoryRouter>
    </MockThemeProvider>
  )
  expect(await screen.findByText(/100\. LECKE/i)).toBeInTheDocument()
})
