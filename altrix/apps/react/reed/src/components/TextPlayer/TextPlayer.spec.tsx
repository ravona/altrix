import { render } from '@testing-library/react';

import TextPlayer from './TextPlayer';

describe('TextPlayer', () => {
    it('should render successfully', () => {
        const playerProps = {
            id: '1',
            name: 'Test TextPlayer',
            source: 'test-source',
            content: 'test-content',
        };

        const { baseElement } = render(<TextPlayer {...playerProps} />);
        expect(baseElement).toBeTruthy();
    });
});
