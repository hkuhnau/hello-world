//import react is no longer needed in nextjs
//rafce returns a react arrow function
import Feed from'@components/Feed';


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">

        <h1 className="head_text text-center">
          Discover & Share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center"> Workout Ideas</span>
        </h1>

        <p className="desc text-center">
          Workout World is a place to find, create, and share workout ideas.
          Use a hashtag to narrow down the style of workout.
        </p>
        <Feed/>
    </section>
  )
}

export default Home
