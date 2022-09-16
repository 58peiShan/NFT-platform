const id = JSON.parse(localStorage.getItem("purchase"));
const a = [];
const fetchList = () => {
  if (id) {
    for (let i = 0; i < id.length; i++) {
      fetch(`http://localhost:5000/product/id/${id[i]}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          a.push(...data);
          // console.log(state);
        });
    }
  }
};

const cartlistReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      fetchList();
      return a;

    default:
      return state;
  }
};

export default cartlistReducer;
