const TroliLoginMobile = () => {
  return (
    <div
      className="group-troli-login mt-5 w-full bg-primary rounded-lg border-2 border-white hidden"
      id="navbar-default"
    >
      <a
        href="login.html"
        className="troli flex items-center border-b-2 border-white hover:bg-secondary hover:rounded-t-lg"
      >
        <lord-icon
          class="w-11 h-11"
          src="https://cdn.lordicon.com/lpddubrl.json"
          trigger="hover"
          colors="primary:#ffffff,secondary:#ffffff"
          stroke="70"
        ></lord-icon>
        <span className="text-white font-semibold lg:hidden">Keranjang</span>
      </a>
      <a
        href="login.html"
        className="login flex items-center hover:bg-secondary hover:rounded-b-lg"
      >
        <lord-icon
          class="w-11 h-11"
          src="https://cdn.lordicon.com/ljvjsnvh.json"
          trigger="hover"
          colors="primary:#ffffff,secondary:#ffffff"
          stroke="70"
        ></lord-icon>
        <span className="text-white font-semibold">Masuk</span>
      </a>
    </div>
  );
};

export default TroliLoginMobile;
