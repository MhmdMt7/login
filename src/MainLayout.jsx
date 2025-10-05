import { useEffect } from "react";
import SideMenu from "./components/SideMenu";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { userInfo } from "./store";


export default function MainLayout() {
  //Scope MainLayout
  const { setUserInfo } = userInfo();

  const navigate = useNavigate();
  useEffect(() => {
    let jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
      navigate("/login");
    } else {
      // Confirm jwt (from backend)
      let domain = "http://82.112.241.233:1993";
      let endPoint = "/api/users/me";
      let url = domain + endPoint;

      axios
        .get(url, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          setUserInfo(res.data);
          console.log(res);
        })
        .catch((err) => {
          sessionStorage.clear();
          navigate("/login");
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="w-full h-full flex">
      <SideMenu />
      <div className="bg-blue-400 grow h-full">
        <Outlet />
      </div>
    </div>
  );
}
