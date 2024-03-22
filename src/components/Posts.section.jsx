import React, { useState, useEffect, useRef } from "react";
import "./Posts.section.css";
import PostCard from "./Post/PostCard";
import Chart from "./Chart";

const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
const getCurrentTimeWithTimezone = () => {
  const now = new Date();
  const tzOffset = -now.getTimezoneOffset();
  const offsetSign = tzOffset >= 0 ? "+" : "-";
  const offsetHours = Math.abs(Math.floor(tzOffset / 60))
    .toString()
    .padStart(2, "0");
  const offsetMinutes = Math.abs(tzOffset % 60)
    .toString()
    .padStart(2, "0");
  const timezoneFormatted = `${offsetSign}${offsetHours}:${offsetMinutes}`;

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneFormatted}`;
}

const fetchPaginatedRecords = async (startDateString, endDateString) => {
  const startDate = new Date(startDateString + 'T00:00:00');
  const endDate = new Date(endDateString + 'T23:59:59');
  const postPromises = [];
  let currentStartDate = new Date(startDate);
  while (currentStartDate <= new Date(endDate)) {
    let nextEndDate = new Date(currentStartDate.getTime() + 2 * MILLISECONDS_IN_A_DAY);
    if (nextEndDate.toISOString() > endDate.toISOString()) {
      nextEndDate = endDate;
    }
    
    const formattedStartDateParameter = currentStartDate.toISOString().split("T")[0];
    const formattedEndDateParameter = nextEndDate.toISOString().split("T")[0];

    const postPromise = fetch(`https://apps.und.edu/demo/public/index.php/post?from=${formattedStartDateParameter}&to=${formattedEndDateParameter}`).then((response) => response.json());
    postPromises.push(postPromise);

    currentStartDate = new Date(nextEndDate.getTime() + MILLISECONDS_IN_A_DAY);
  }

  const allPosts = (await Promise.all(postPromises)).flat();
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  const filteredPosts = allPosts.filter(post => {
    const postDateUTC = new Date(post.date).getTime();
    const postDateLocal = new Date(postDateUTC - timezoneOffset);
    
    return postDateLocal >= startDate && postDateLocal <= endDate;
  });

  return filteredPosts;
};


function Posts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const MAX_DATE = getCurrentTimeWithTimezone(new Date().toISOString()).split("T")[0];

  const nineDaysAgo = new Date(Date.now() - 9 * MILLISECONDS_IN_A_DAY).toISOString().split("T")[0];


  const [dateRange, setDateRange] = useState({
    from: nineDaysAgo,
    to: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const defaultDate = new Date().toISOString().split("T")[0];
    fetchPaginatedRecords(defaultDate, defaultDate)
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (dateRange.from && dateRange.to && dateRange.from <= dateRange.to) {
      fetchPaginatedRecords(dateRange.from, dateRange.to)
        .then((data) => setPosts(data))
        .catch((error) => console.error(error));
    }
  }, [dateRange]);

  const handleStartDateChange = (event) => {
    setDateRange((prev) => ({ ...prev, from: event.target.value }));
    setTimeout(() => {
      endDateInputRef.current.showPicker();
    }, 100);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    event.stopPropagation();
    event.preventDefault();
  };

  let filteredPosts = posts.filter((post) => {
    if (searchTerm.startsWith("#")) {
      const searchTermEscaped = searchTerm.slice(1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\B#${searchTermEscaped}(?=\\s|$)`, "i");
      return regex.test(post.message);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      return post.message.toLowerCase().includes(searchTermLower) || post.author.toLowerCase().includes(searchTermLower);
    }
  });

  filteredPosts.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
});

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginateForward = () => {
    setCurrentPage((prevCurrentPage) => Math.min(prevCurrentPage + 1, totalPages));
  };

  const paginateBackward = () => {
    setCurrentPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, 1));
  };
  const pageNumbers = [];

  const MAX_PAGES_DISPLAYED = 4;
  const PAGINATION_EDGES = 2;

  let startPage = Math.max(1, currentPage - MAX_PAGES_DISPLAYED);
  let endPage = Math.min(totalPages, currentPage + MAX_PAGES_DISPLAYED);

  const includeFirstPage = startPage > 1;
  const includeLastPage = endPage < totalPages;

  if (endPage - startPage > MAX_PAGES_DISPLAYED) {
    endPage = startPage + MAX_PAGES_DISPLAYED;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handleCardHashTagClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSearchTerm(event.target.innerHTML);
    setCurrentPage(1);
  };

  const handleTagCloudHashTagClick = (hashtag) => {
    setSearchTerm(hashtag);
    setCurrentPage(1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className='posts-section'>
      <div className='post-filter-inputs'>
        <div className='search-input-container'>
          <label id='search-input' className='search-input'>
            Search:
            <input type='text' placeholder='Search posts' value={searchTerm} onChange={handleSearch} className='search-input' />
          </label>
          {searchTerm && (
            <span className='search-clear' onClick={() => setSearchTerm("")}>
              clear
            </span>
          )}
        </div>
        <div className='date-input-container'>
          <label id='date-input' className='date-input'>
            From:
            <input type='date' ref={startDateInputRef} value={dateRange.from} max={MAX_DATE} onChange={handleStartDateChange} />
          </label>
          <label id='date-input' className='date-input'>
            To:
            <input type='date' ref={endDateInputRef} value={dateRange.to} min={dateRange.from} max={MAX_DATE} onChange={(event) => setDateRange((prev) => ({ ...prev, to: event.target.value }))} />
          </label>
        </div>
      </div>
      <Chart posts={posts} onHashtagSelect={handleTagCloudHashTagClick} />
            <div className='pagination'>
        <button onClick={paginateBackward} disabled={currentPage === 1} className='page-button'>
          Prev
        </button>
        {includeFirstPage && (
          <>
            <button onClick={() => paginate(1)}>1</button>
            {startPage > PAGINATION_EDGES && <span>...</span>}
          </>
        )}

        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)} className={currentPage === number ? "current-page" : ""}>
            {number}
          </button>
        ))}

        {includeLastPage && (
          <>
            {endPage < totalPages - PAGINATION_EDGES && <span>...</span>}
            <button onClick={() => paginate(totalPages)}>{totalPages}</button>
          </>
        )}
        <button onClick={paginateForward} disabled={currentPage === totalPages} className='page-button'>
          Next
        </button>
      </div>
      <div className='posts-container'>
        {currentPosts.map((post, index) => (
          <PostCard key={index} post={post} handleHashTagClick={handleCardHashTagClick} />
        ))}
      </div>
    </section>
  );
}

export default Posts;
