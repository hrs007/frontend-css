import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <div className="min-h-screen min-w-full">
        <div className="grid grid-cols-10 min-h-screen">
          <div className="col-span-2">
            <NavBar></NavBar>
          </div>
          <div className="col-span-8 bg-black">ho</div>
        </div>
      </div>
    </>
  );
}

export default App;
