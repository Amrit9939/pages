import React, {useEffect,useState} from "react";
import axios from "axios";

function TODOTABLE(){

const [data,setdata] = useState([]);

const [count,setcount] = useState(0);


useEffect(
  async function getData(){
    let res = await axios.get("http://localhost:5000", { params: { count: count } });
    console.warn(count);
    let arr = res.data.data;
    console.warn(arr);
    setdata(arr);
},[count]);

function next() {
   console.warn("next");
   if(count>=0 && count<190){
     setcount(count+10);
   }else {
     alert("no record")
   }
  }

function prev(){
  console.warn("prev");
  if(count>=10){
    setcount(count-10);
  }else {
    alert("no record")
  }
}


function handleClick(){
  alert("hii");
  console.warn("up");
  if(0 <= count+10 && count+10 <190){
    count=count+10;
  }
}
function down(){
  if(10<=count+10 &&  count+10 <190){
    count=count-10;
  }
}

  return(
    <div>
    <div className="heading">
    <h1>Dummy Data</h1>
    </div>
    <table>
  <tr>
    <th>userId</th>
    <th>id</th>
    <th>title</th>
    <th>completed</th>
  </tr>
  {data.map((item,i)=>(
    <tr>

      <td>{item.userId}</td>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{item.completed.toString()}</td>
    </tr>

  ))}
</table>
 <div className="butt">
 <button onClick={prev}>
      prev
    </button>
 <button onClick={next}>
      next
    </button>
</div>
    </div>
  )
}

export default TODOTABLE;
