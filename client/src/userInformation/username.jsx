import { useSelector } from 'react-redux';

const userdata = useSelector((state) => state.user);

export default async function Getuserdata() {
    const id = userdata.id;
      try {
          const res = await fetch("http://localhost:5000/api/user", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({id: id}),
          });
          const user = await res.json();
          console.log(user);
          console.log("hereeeee");
          console.log(user.username);
      } catch (error) {
          console.log(error);
      }
}