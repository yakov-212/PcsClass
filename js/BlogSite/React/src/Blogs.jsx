import { NavLink } from 'react-router';
import FetchList from './FetchList';

export default function Blogs() {

  return (
    <FetchList Component={Component} url="https://jsonplaceholder.typicode.com/users" />
  );
}

const Component =({data})=> {
  return(
    <ul style={{textAlign: 'start'}}>
      {data.map((user) => (
        <> 
          <NavLink to={`/blogs/${user.id}/${user.name}`} key={user.id} style={{ color:'black' }}>
              <li key={user.id} >
                  <b>name: </b> {user.name}{/* 
                  */} <b>website: </b> {user.website}{/*
                  */} <b>company: </b> {user.company.name}, {user.company.bs}
              </li>
          </NavLink>
          <br></br>
        </>
      ))}
    </ul>
  )
}