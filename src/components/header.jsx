

function Header() {
  return (
    <header className="flex items-center justify-between gap-4">
      <a href={"/"}>
        <h1 className="font-medium">
          Free<span className="text-blue-400">Scribe</span>
        </h1>
      </a>
      <button className="
       flex items-center 
       text-blue-400 hover:text-blue-800 gap-2
       madehomebtn px-4 py-1 rounded-lg
       "
       >
        <p className="bold">New</p>
        <i className="fa-solid fa-plus"></i>
      </button>
    </header>
  );
}

export default Header