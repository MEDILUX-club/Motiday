import { useState } from 'react';
import type { Challenge } from '../../types/api';

export type ChallengePayload = {
  title: string;
  description?: string;
};

export type MutationStatus = 'idle' | 'loading' | 'success' | 'error';

type MutationResult = {
  mutate: (payload: ChallengePayload) => Promise<Challenge>;
  status: MutationStatus;
};

const useChallengeMutation = (): MutationResult => {
  const [status, setStatus] = useState<MutationStatus>('idle');

  const mutate = async (payload: ChallengePayload): Promise<Challenge> => {
    setStatus('loading');

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 150));
      const challenge: Challenge = {
        id: challenge-,
        title: payload.title,
        description: payload.description,
        progress: 0,
      };
      setStatus('success');
      return challenge;
    } catch (err) {
      setStatus('error');
      throw err;
    }
  };

  return { mutate, status };
};

export default useChallengeMutation;
