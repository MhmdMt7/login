import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    let jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
      navigate("/login");
    } else {
      let domain = "http://82.112.241.233.1993";
      let endPoint = "/api/users/me";
      let url = domain + endPoint;
    }
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
        console.log(res);
      })
      .catch((err) => {
        sessionStorage.clear(err);
        navigate("/login");
      });
  }, []);

  return <div>Welcome {userInfo.username} to Home Page</div>;
}
