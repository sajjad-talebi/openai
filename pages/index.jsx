import Head from "next/head";
import Image from "next/image";
import logo from "../assets/images/logo.png";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handlerForm = async (e) => {
    e.preventDefault();
    if(content.length === 0) {
      setError("Please enter your content");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setContent(content + data.result);

      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <section>
      <Head>
        <title>Home </title>
      </Head>
      <header className="flex items-center justify-between py-2 px-4 border-b border-gray-200">
        {/* Logo   */}
        <a>
          <Image src={logo} width={40} height={40} alt="logo" />
        </a>
        <p className="font-bold" ></p>
      </header>
      <main>
        <div className="grid  gap-8 p-4">
          <form onSubmit={handlerForm} className="flex flex-col  w-full ">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              name="content"
              id="content"
              className="w-full h-96 p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              placeholder="Your content here..."
            ></textarea>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <div className="flex justify-end ">
              <button
                disabled={loading}
                className="py-2 px-6 mt-4 bg-blue-500 text-white rounded-lg disabled:cursor-wait disabled:opacity-50 "
              >
                Submit
              </button>
            </div>
            <div></div>
          </form>

        </div>
      </main>
    </section>
  );
}
