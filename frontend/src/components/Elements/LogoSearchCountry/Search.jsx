const Search = () => {
  return (
    <div className="search ml-10 hidden md:block">
      <form action="">
        <div className="search-input flex items-center border-2 border-white">
          <input
            className="w-[25rem] p-1 bg-primary"
            type="text"
            placeholder="Cari voucher ..."
          />
          <button className="bg-white" type="submit">
            <lord-icon
              class="w-7 h-7"
              src="https://cdn.lordicon.com/zniqnylq.json"
              trigger="hover"
              colors="primary:black,secondary:black"
              stroke="70"
            ></lord-icon>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
