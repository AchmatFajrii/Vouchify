const Troli = () => {
  return (
    <a href="keranjang.html" className="troli flex items-center mt-1">
      <lord-icon
        class="w-11 h-11"
        src="https://cdn.lordicon.com/lpddubrl.json"
        trigger="hover"
        colors="primary:#ffffff,secondary:#ffffff"
        stroke="70"
      ></lord-icon>
      <span className="text-white font-semibold lg:hidden">Keranjang</span>
    </a>
  );
};

export default Troli;
