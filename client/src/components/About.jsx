import bookApple from "../assets/bookapple.avif";

function HomePage() {
  return (
    <header className="flex py-10 px-16">
      <div>
        <h1 className="text-center font-bold text-3xl mb-6">
          Welcome to Book a Book
        </h1>
        <h2 className="flex justify-center text-xl">
          Your book store to endless stories and knowledge! 📖✨
        </h2>
        <div className="flex justify-center my-8 ">
          <p className="w-1/3 px-4">
            Dive into a world of books at your fingertips. From gripping fiction
            and timeless classics to inspiring non-fiction and self-help, we’ve
            got every genre covered. Rent your next read instantly and enjoy the
            convenience of carrying your entire library wherever you go.
          </p>
          <img className="w-1/3 px-4 block" src={bookApple} alt="apple on a book" />
          <p className="w-1/3 px-4">
            Looking for recommendations? Our tailored suggestions will guide you
            to your next favorite book.
          </p>
        </div>

        <></>
      </div>
    </header>
  );
}

export default HomePage;
