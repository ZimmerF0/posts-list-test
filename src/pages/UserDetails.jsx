import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Home from "./Home";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-title">Подробности о пользователе</h2>
      <div className="user">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>
          Адрес: {user.address.street}, {user.address.city},{" "}
          {user.address.zipcode}
        </p>
      </div>

      <h3>Список постов пользователя:</h3>
      {posts.map(post => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
      <a className="btn" href="/" alt="button">
        Назад
      </a>
    </div>
  );
};

export default UserDetails;
