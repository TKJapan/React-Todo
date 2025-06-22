import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');

  let initialTodos = [
  ];

  const [todos, setTodos] = useState(
    initialTodos
  );

    useEffect(() => {
      const saved = localStorage.getItem("todos");
      if (saved) setTodos(JSON.parse(saved));
    }, []);

    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

  let nextId = useRef(2);

  const isComposing = useRef(false);

  const handleAdd = () => {
    if (!name.trim()) return;
    setTodos([...todos, { id: nextId.current++, name }]);
    setName('');
  };

  return (
    <div className="App">
      <h1>Todoリスト:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        onCompositionStart={() => isComposing.current = true}
        onCompositionEnd={() => isComposing.current = false}
        onKeyDown={e => {
          if (e.key === 'Enter' && !isComposing.current) {
            handleAdd();
          }
        }}
      />
      <button onClick={() => {
        setTodos([
          ...todos,
          { id: nextId.current, name: name }
        ]);
        nextId.current += 1;
        setName('');
      }}>追加</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.name}
            <button onClick={() => {
              setTodos(
                todos.filter(a =>
                  a.id !== todo.id
                )
              );
            }}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
