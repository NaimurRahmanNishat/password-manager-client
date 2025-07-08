import TypingSpeedTable from "@/components/TypingSpeedTable";

const Home = () => {
  return (
    <div className="pt-16 flex flex-col gap-4">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl pt-5 md:pt-10 text-center md:text-4xl font-semibold text-[#cf6fcfcc]">Welcome to Password Manager Sheet</h1>
      </div>
      <div className="">
        <TypingSpeedTable/>
      </div>
    </div>
  )
}

export default Home;