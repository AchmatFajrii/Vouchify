import VouchifyLogo from "../../../assets/img/vouchify-logo.svg"





import FB from "../../../assets/img/fb.svg";
import IG from "../../../assets/img/ig.svg";
import TW from "../../../assets/img/tw.svg";
import TT from "../../../assets/img/tt.svg";
import GoogleStore from "../../../assets/img/googlestore.svg";
import AppStore from "../../../assets/img/appstore.svg";

const Footer = () => {
    return(
        <footer className="py-20 text-xs text-white bg-footer md:text-sm lg:text-base">
          <div className="container mx-auto px-5 md:px-0 lg:px-32">
            <div className="footer flex flex-wrap pb-10 border-b-2 border-white">
              <div className="about w-full md:w-[50%]">
                <img src={VouchifyLogo} alt="" />
                <p className="mt-4 pr-12">
                  Vouchify adalah sebuah platform e-commerce yang mengkhususkan
                  diri dalam penjualan voucher game digital untuk permainan PC,
                  konsol, dan permainan mobile.
                </p>
              </div>
              <div className="menu-perusahaan w-[50%] mt-5 md:mt-0 md:w-[25%] lg:w-[17%]">
                <ul>
                  <li className="font-bold">MENU CEPAT</li>
                  <li className="mt-2">
                    <a href="">Beranda</a>
                  </li>
                  <li className="mt-2">
                    <a href="">Semua Game</a>
                  </li>
                  <li className="mt-2">
                    <a href="">Hubungi Kami</a>
                  </li>
                  <li className="mt-2 font-bold">PERUSAHAAN</li>
                  <li className="mt-2">
                    <a href="">Syarat & Ketentuan</a>
                  </li>
                  <li className="mt-2">
                    <a href="">Kebijakan Privasi</a>
                  </li>
                  <li className="mt-2">
                    <a href="">Tentang Kami</a>
                  </li>
                </ul>
              </div>
              <div className="akun-hubungi w-[50%] mt-5 md:mt-0 md:w-[25%] lg:w-[17%]">
                <ul>
                  <li className="font-bold">HALAMAN AKUN</li>
                  <li className="mt-2">
                    <a href="">Masuk Akun</a>
                  </li>
                  <li className="mt-2">
                    <a href="">Daftar Akun</a>
                  </li>
                  <li className="mt-2">
                    <a href="">Lupa Password</a>
                  </li>
                  <li className="mt-2 font-bold">HUBUNGI KAMI</li>
                  <li className="mt-2">
                    <a href="">Masalah Transaksi</a>
                  </li>
                  <li className="mt-2">
                    <a href="">Buat Bisnis Topup</a>
                  </li>
                  <li className="mt-2">
                    <a href="">Gabung Reseller</a>
                  </li>
                </ul>
              </div>
              <div className="social-media w-full mt-5 md:mt-10 lg:w-[16%] lg:mt-0">
                <ul>
                  <li className="font-bold">IKUTI KAMI</li>
                  <li className="flex mt-2">
                    <a href="">
                      <img className="w-8 mx-3" src={FB} alt="" />
                    </a>
                    <a href="">
                      <img className="w-8 mx-3" src={IG} alt="" />
                    </a>
                    <a href="">
                      <img className="w-8 mx-3" src={TW} alt="" />
                    </a>
                    <a href="">
                      <img className="w-8 mx-3" src={TT} alt="" />
                    </a>
                  </li>
                  <li className="mt-4 font-bold">UNDUH APLIKASI KAMI</li>
                  <li>
                    <a href="">
                      <img src={GoogleStore} alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img className="mt-2" src={AppStore} alt="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <p className="copyright mt-5 text-center">
              &copy; 2023 Vouchify. All rights reserved.
            </p>
          </div>
        </footer>
    )
}

export default Footer;