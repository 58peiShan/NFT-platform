const id = JSON.parse(localStorage.getItem("purchase"));

const cartlistReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      const list = [];
      if (id) {
        for (let i = 0; i < id.length; i++) {
          fetch(`http://localhost:5000/product/id/${id[i]}`)
            .then((res) => res.json())
            .then((data) => {
              list.push(...data);
            });
        }
      }
      return (state = list);

    default:
      return state;
  }
};

export default cartlistReducer;
