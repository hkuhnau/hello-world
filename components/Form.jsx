import React from 'react'
import Link from 'next/link'

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className='w-full m-w-full flext-start flex-col'>
        <h1 className='head_text text_left'>
            <span className='blue_gradient'>{type} Post</span>
        </h1>
        <p className='desc text-left max-w-md'>
          {type} and share workout ideas with others!
        </p>

        <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        >
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Your Workout
            </span>

            <textarea
              value={post.prompt}
              onChange={(e) => setPost({
                ...post,
                prompt: e.target.value
              })}
              placeholder='Write your prompt here...'
              required
              className='form_textarea'
            >
            </textarea>
          </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag {` `}
            <span className='font-normal'>#crossfit, #bodybuilding, #gymnastics</span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({
              ...post,
              tag: e.target.value
            })}
            placeholder='#tag'
            required
            className='form_input'
          >
          </input>
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link
          href="/"
          className = 'text-gray-500 text-sm'
          >
            Cancel
          </Link>

          <button
          type='submit'
          disabled={submitting}
          className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>

        </form>
    </section>
  )
}

export default Form
