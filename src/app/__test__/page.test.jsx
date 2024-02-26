import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { App } from '../dashboard/page'
describe('Page', () => {
    it('renders a heading', () => {
        render(<App />)

        const heading = screen.getByRole('heading', { level: 1 })

        expect(heading).toBeInTheDocument()
    })
})