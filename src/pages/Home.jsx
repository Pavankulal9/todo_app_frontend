import { useEffect, useState } from "react";
import AddTodos from "../components/AddTodos";
import TodosList from "../components/TodosList";
import Loading from "../components/Loading";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Home = () => {
  const [todos, setTodos] = useState(0);
  const [sortType, setSortType] = useState("Date");
  const [loading, setLoading] = useState(true);
  const axiosPrivateInterceptor = useAxiosPrivate();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axiosPrivateInterceptor.get(
          "/api/v1/todo/getTodos"
        );
        const todos = await response.data;
        setLoading(false);
        setTodos(todos.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTodos();
  }, [axiosPrivateInterceptor]);

  return (
    <div className="home">
      {todos && !loading ? (
        <>
          <AddTodos
            setTodos={setTodos}
            setSortType={setSortType}
            sortType={sortType}
          />
          <TodosList todos={todos} setTodos={setTodos} sortType={sortType} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
