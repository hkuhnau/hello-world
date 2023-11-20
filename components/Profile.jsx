import React from 'react'
import PromptCard from './PromptCard';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Profile = ({name, description, data, handleEdit, handleDelete}) => {
  //session user
  const { data: session } = useSession();
  //router
  const router = useRouter();

  const handleSave = async (post) => {
    console.log('Save me');
    console.log(post);
    console.log(session?.user.id);
    try {
      const response = await fetch('/api/prompt/new',
        {
          method: 'POST',
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag + ' #' + post.creator.username
          })
        })

      if (response.ok) {
        router.push(`/profile/${session?.user.id}?name=${session?.user.name}`);
      }

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span></h1>
        <p className='desc tect-left'> {description}</p>
        <div className='mt-10 prompt_layout'>
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete &&
              handleDelete(post)}
              handleSave={handleSave}
            />
          ))}
        </div>
    </section>
  )
}

export default Profile
