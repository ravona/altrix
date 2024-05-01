import { render } from '@testing-library/react';

import ReedPlayer from './ReedPlayer';

describe('reedPlayer', () => {
    it('should render successfully', () => {
        const playerProps = {
            id: '1',
            name: 'Test reedPlayer',
            source: 'test-source',
            content: 'test-content',
        };

        const { baseElement } = render(<ReedPlayer {...playerProps} />);
        expect(baseElement).toBeTruthy();
    });
});
