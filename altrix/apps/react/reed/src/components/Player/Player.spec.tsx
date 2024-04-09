import { render } from '@testing-library/react';

import Player from './Player';

describe('Player', () => {
  it('should render successfully', () => {
    const playerProps = {
      id: '1',
      name: 'Test Player',
      source: 'test-source',
      content: 'test-content',
    };

    const { baseElement } = render(<Player {...playerProps} />);
    expect(baseElement).toBeTruthy();
  });
});
