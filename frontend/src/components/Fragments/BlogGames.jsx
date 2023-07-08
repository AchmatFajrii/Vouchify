import CardBlogs from "../Elements/CardBlogs"

const BlogGames = () => {
    return(
        <section className="blog mt-10 md:mt-14 lg:mt-24">
            <div className="container mx-auto px-5 md:px-0 lg:px-32">
              <div className="title flex items-center">
                <p className="p-2 w-[25rem] text-lg text-white font-bold border-2 border-white shadow-xl shadow-secondary md:w-[40rem] md:text-3xl lg:w-[42rem] lg:text-3xl">
                  BLOG VOUCHIFY
                </p>
                <div className="line h-[1px] w-full border-[1px] border-white"></div>
              </div>
            <CardBlogs />
              <div className="btn-blog flex justify-center mt-10">
                <button className="py-2 px-5 text-xs text-white border-2 border-white transition-all ease-linear hover:bg-fourth hover:text-primary">
                  Muat lebih banyak
                </button>
              </div>
            </div>
          </section>
    )
}

export default BlogGames