"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, handleSave }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleSave={handleSave}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  //session user
  const { data: session } = useSession();
  //router
  const router = useRouter();
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    console.log(data);
    console.log(JSON.parse(JSON.stringify(data)));
    setAllPosts(data);
    router.reload();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

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
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          handleSave={handleSave}
        />
      ) : (
          <PromptCardList data={allPosts} handleTagClick={handleTagClick} handleSave={handleSave} />
      )}
    </section>
  );
};

export default Feed;