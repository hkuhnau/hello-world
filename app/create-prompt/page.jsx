'use client'; // when we import a hook, we use 'use client'

import {useState} from 'react'
import {useSession} from 'next-auth/react' //this allows us to know which user is logged in
import { Router, useRouter } from 'next/router';
import Form from '@components/Form';

const CreatePrompt = () => {
  //2:12:47
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try{
      const response = await fetch('/api/prompt/new',
        {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt, 
          userId: session?.user.id,
          tag: post.tag
        })
      })

      if(response.ok) {
        Router.push('/');
      }

    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt 