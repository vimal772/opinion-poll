import { useActionState, use } from "react";

import { OpinionsContext } from '../store/opinions-context';
import Submit from './Submit'

export function NewOpinion() {

  const { addOpinion } = use(OpinionsContext)

  async function newOpinionAction(prevValue, formData) {
    const name = formData.get('userName')
    const title = formData.get('title')
    const body = formData.get('body')

    const errors = []

    if (!name) errors.push('Please enter a valid Name')
    if (!title) errors.push('Please eneter a valida title')
    if (!body) errors.push('Please eneter a valid opinion')

    if (errors.length) return {
      errors, eneterValues: {
        name,
        title,
        body
      }
    }
    await addOpinion({
      userName: name,
      title,
      body
    })
    return {
      errors: null
    }
  }
  const [formData, formAction] = useActionState(newOpinionAction, {
    errors: null
  })

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              required
              defaultValue={formData.eneterValues?.name || ''} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={formData.eneterValues?.title || ''} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            required
            defaultValue={formData.eneterValues?.body || ''}></textarea>
        </p>

        {formData.errors && (
          <ul className="errors">
            {
              formData.errors.map((item, index) => {
                return <li key={index}>{item}</li>
              })
            }
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
