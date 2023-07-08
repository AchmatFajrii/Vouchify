const TaglineHero = () => {
    return(
        <div className="tagline text-center text-white md:w-[60%] md:text-left">
            <span className="text-sm relative z-20 md:text-lg lg:text-xl">
              Halo gamers,
            </span>
            <div className="wrapper">
              <div className="mt-2 text-xl font-bold md:text-2xl lg:text-3xl">
                Topup & Get a New
                <ul className="leading-90 mt-[-62px] h-[90px] overflow-hidden lg:mt-0">
                  <li className="text-change relative">
                    <span className="relative bg-white">
                      Experience in Gaming
                    </span>
                  </li>
                  <li className="text-change relative">
                    <span className="relative bg-white">
                      Levels of Gaming Fun
                    </span>
                  </li>
                  <li className="text-change relative">
                    <span className="relative bg-white">
                      Dimensions of Gaming
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-[-20px] text-sm relative z-20 md:pr-14 lg:pr-20 md:text-lg lg:text-xl lg:mt-0">
              Dapatkan pengalaman bermain game dan jadilah seorang pemenang
              sejati
            </p>
          </div>
    )
}

export default TaglineHero;