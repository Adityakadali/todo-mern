import hero from "../assets/hero.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
function Home() {
  const [author, setAuthor] = useState("Zeno");
  const [body, setBody] = useState(
    "We have two ears and one mouth, therefore we should listen twice as much as we speak."
  );
  const url = "https://stoicquotesapi.com/v1/api/quotes/random";
  const fetchQuote = async () => {
    const { data } = await axios.get(url);
    setAuthor(data.author);
    setBody(data.body);
  };

  useEffect(() => {
    fetchQuote();
    // eslint-disable-next-line
  }, []);
  return (
    <main>
      <section>
        <div className="container mx-auto max-w-5xl mt-4">
          <div>
            <img
              className="rounded-md mx-auto"
              src={hero}
              alt="a book with stiky todo"
            />
          </div>
          <div className="mt-4 max-w-lg mx-auto">
            <p className="text-lg text-neutral-content">{body}</p>
            <small className="float-right text-md before:content-['-'] before:mr-2 text-neutral-content">
              {author}
            </small>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
