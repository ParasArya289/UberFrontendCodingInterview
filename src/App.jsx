import Shape from "./Shape.jsx";
import "./App.css";
const data = [
  [1, 1, 1, 1,1],
  [1, 1, 1, 0,0],
  [1, 1, 1, 1,1],
];
export default function App() {
  return (
    <main>
      <Shape data={data} />
    </main>
  );
}
