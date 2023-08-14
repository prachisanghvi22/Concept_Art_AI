import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";

function IndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  const handleSearch = async () => {
    setPosts([]);
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_KEY,
    );
    setLoading(true);

    const { data, error } = await supabase
      .from("midjourney")
      .select("*")
      .ilike("prompt", `%${searchQuery}%`)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching data from Supabase:", error);
    } else {
      setPosts(data);
      setCurrentPage(1);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  console.log(posts);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMorePosts();
        }
      },
      { rootMargin: "50px" },
    );

    const sentinel = document.getElementById("sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      observer.disconnect();
    };
  }, [currentPage]);

  const fetchMorePosts = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_KEY,
    );

    const startRange = currentPage * 10;
    const endRange = (currentPage + 1) * 10;
    const { data, error } = await supabase
      .from("midjourney")
      .select("*")
      .ilike("prompt", `%${searchQuery}%`)
      .limit(10)
      .order("created_at", { ascending: false })
      .range(startRange, endRange);

    if (error) {
      console.error("Error fetching data from Supabase:", error);
    } else {
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Layout>
      <div className="sticky top-0 z-10 p-4 backdrop-blur-md backdrop-filter">
        <form onSubmit={handleSubmit}>
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full md:mx-4 md:w-[600px]">
              <input
                type="text"
                placeholder="Search..."
                className="input w-full rounded-l-md px-4 py-2 focus:border-none focus:outline-none"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <button
                type="submit" // Use type="submit" to trigger the form submission
                disabled={!searchQuery.length}
                className="btn-primary btn rounded-r-md px-4 py-2 text-white focus:border-none focus:outline-none"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center">
        {loading ? (
          <span className="loading loading-bars loading-lg"></span>
        ) : null}
        {posts.map((post, indx) => (
          <div key={indx} className="mb-4 max-w-lg rounded-md bg-black p-3">
            <div>
              <Image
                src={post.image_url}
                alt="image"
                className="rounded-md"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
              <div className="mt-2 flex items-center">
                <button className="btn btn-md rounded-md text-start text-lg focus:outline-none">
                  <HeartIcon className="h-6 w-6 text-red-600" /> favorite
                </button>
              </div>

              <p className="mt-2 text-sm">{post.prompt}</p>
              <p className="text-md mt-2 w-fit rounded-md bg-white px-1 text-black">
                {post.server}
              </p>
              <p className="mt-2 text-sm opacity-50">
                Generated {timeAgo(post.created_at)}
              </p>
            </div>
          </div>
        ))}
        <div id="sentinel" style={{ height: "1px" }}></div>
      </div>
    </Layout>
  );
}

function timeAgo(date: string): string {
  const now = new Date();
  const timeDifference = now.getTime() - new Date(date).getTime();
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const seconds = Math.round(timeDifference / 1000);
  const minutes = Math.round(timeDifference / (1000 * 60));
  const hours = Math.round(timeDifference / (1000 * 60 * 60));
  const days = Math.round(timeDifference / (1000 * 60 * 60 * 24));
  const weeks = Math.round(timeDifference / (1000 * 60 * 60 * 24 * 7));
  const months = Math.round(timeDifference / (1000 * 60 * 60 * 24 * 30));
  const years = Math.round(timeDifference / (1000 * 60 * 60 * 24 * 365));

  if (seconds < 60) {
    return rtf.format(-seconds, "second");
  } else if (minutes < 60) {
    return rtf.format(-minutes, "minute");
  } else if (hours < 24) {
    return rtf.format(-hours, "hour");
  } else if (days < 7) {
    return rtf.format(-days, "day");
  } else if (weeks < 4) {
    return rtf.format(-weeks, "week");
  } else if (months < 12) {
    return rtf.format(-months, "month");
  } else {
    return rtf.format(-years, "year");
  }
}

export default IndexPage;
