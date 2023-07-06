import React,{useState, useEffect} from "react";

// export default class ErrorBoundary extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { hasError: false };
//     }
  
//     static getDerivedStateFromError(error) {
//       return { hasError: true };
//     }
  
//     componentDidCatch(error, errorInfo) {
//       console.warn(error, errorInfo);
//     }
  
//     render() {
//       if (this.state.hasError) {
//         return <h1>Something went wrong.</h1>;
//       }
  
//       return this.props.children;
//     }
// }

export default  function ErrorBoundary(error, errorInfo,children) {
  const [hasError, setHasError] = useState(false)
useEffect(()=>{
   if(error,errorInfo){
    setHasError(true)
    console.warn(error, errorInfo)
  }
},[])
  return (
    hasError?<>
    somthing went wrong!</>:children
  )
  
}
