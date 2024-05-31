import { useState } from "react";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleState = () => {
    setIsLogin(x => !x);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <button onClick={handleState} className="btn btn-primary">
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
};

export default App;
