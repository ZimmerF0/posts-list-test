import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import "../components/Pagination.css";

import avatar from "../assets/images/avatar.jpg";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 5; // Количество постов на одной странице
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0); // Общее количество постов
  const pageCount = Math.ceil(totalPosts / postsPerPage); // Вычисление общего количества страниц

  useEffect(() => {
    // Загрузка постов с API при изменении текущей страницы
    const fetchPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${
          currentPage + 1
        }&_limit=${postsPerPage}`
      );
      setPosts(response.data);
      setLoading(false);
    };

    fetchPosts();
  }, [currentPage]);

  useEffect(() => {
    const fetchTotalPosts = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setTotalPosts(response.data.length);
    };

    fetchTotalPosts();
  }, []);

  useEffect(() => {
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filteredPosts);
  }, [posts, searchTerm]);

  const handleAvatarClick = postId => {
    console.log("Clicked on avatar for post with ID:", postId);
  };

  const toggleComments = async postId => {
    if (comments[postId]) {
      setComments(prevComments => ({
        ...prevComments,
        [postId]: null,
      }));
    } else {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      setComments(prevComments => ({
        ...prevComments,
        [postId]: response.data,
      }));
    }
  };

  const handleSearch = e => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="text-title">Список постов</h1>

        <div>
          <input
            className="search"
            type="text"
            placeholder="Поиск по заголовку"
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button onClick={clearSearch}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <div className="post">
          <div>
            {loading ? (
              <p>Загрузка...</p>
            ) : (
              filteredPosts.map(post => (
                <div className="post" key={post.id}>
                  <div className="title">{post.title}</div>
                  <div className="text">{post.body}</div>

                  <div className="author">
                    <Link to={`/users/${post.id}`}>
                      <img
                        className="avatar"
                        src={avatar}
                        alt="avatar"
                        onClick={() => handleAvatarClick(post.id)}
                      />
                    </Link>
                  </div>

                  <div >
                    <button className="comments" onClick={() => toggleComments(post.id)}>
                      {comments[post.id] ? "Скрыть комментарии" : "Комментарии"}
                    </button>
                    {comments[post.id] && (
                      <ul>
                        {comments[post.id].map(comment => (
                          <li key={comment.id}>
                            <strong>{comment.email}</strong>: {comment.body}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div>
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5} // Количество видимых страниц внутри навигационных кнопок
            pageCount={pageCount} // Используем переменную pageCount для общего количества страниц
            renderOnZeroPageCount={null}
            containerClassName="pagination" // Класс контейнера
            activeClassName="active" // Класс активной страницы
            pageClassName="page-item" // Класс страницы
            pageLinkClassName="page-link" // Класс ссылки страницы
            previousClassName="page-item" // Класс кнопки "Предыдущая"
            nextClassName="page-item" // Класс кнопки "Следующая"
            previousLinkClassName="page-link" // Класс ссылки кнопки "Предыдущая"
            nextLinkClassName="page-link" // Класс ссылки кнопки "Следующая"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
