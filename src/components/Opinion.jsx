import { use, useActionState, useOptimistic } from 'react'

import { OpinionsContext } from '../store/opinions-context';

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);
  const [ optimisticValues, setOptimisticValues ] = useOptimistic(votes, (prevValue, mode) => {
    return mode == 'up' ? prevValue + 1 : prevValue - 1
  })

  async function upVote() {
    setOptimisticValues('up')
    await upvoteOpinion(id)
  }

  async function downVote() {
    setOptimisticValues('down')
    await downvoteOpinion(id)
  }

  const [ upVoteingData, upVoteAction, upPending ] = useActionState(upVote);
  const [ downVoteingData, downVoteAction, downPending ] = useActionState(downVote);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={upVoteAction} disabled={upPending || downPending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticValues}</span>

        <button formAction={downVoteAction} disabled={upPending || downPending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
