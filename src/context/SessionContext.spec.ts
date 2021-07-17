import {
  renderHook,
  act,
  RenderHookResult,
} from '@testing-library/react-hooks';
import { useStateContainer } from 'context/SessionContext';
import * as _sessionService from '../services/sessionService';

jest.mock('../services/sessionService');

const sessionService = _sessionService as jest.Mocked<typeof _sessionService>;

describe('Session Context text', () => {
  let hookWrapper: RenderHookResult<
    unknown,
    ReturnType<typeof useStateContainer>
  >;
  beforeEach(() => {
    hookWrapper = renderHook(() => useStateContainer());
  });

  it('should create session', () => {
    const sessionId = '123';
    const userName = 'food';
    sessionService.createSession.mockReturnValue(sessionId);

    act(() => {
      hookWrapper.result.current.mutations.setUsername(userName);
    });

    expect(hookWrapper.result.current.data.sessionId).toBe(sessionId);
    expect(sessionService.createSession).toHaveBeenCalledWith(userName);
  });
});
