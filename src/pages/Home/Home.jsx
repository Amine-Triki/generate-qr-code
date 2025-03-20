import "./Home.css";

import AmineTrikiImg from "../../assets/amine triki.webp"

import { RiGithubFill } from "react-icons/ri";
import { RiLinkedinFill } from "react-icons/ri";
import { RiFacebookCircleFill } from "react-icons/ri";
import { RiYoutubeFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";


const home = () => {
  return (
    <main className=" items-center">
      <section className="landing">
        <div className="container flex justify-center items-center flex-wrap content-between">
          <div>
            <h2 className="pt-3">Hello, I am Amine Triki</h2>
            <h3 className="mt-3">I am a Junior Front-End Developer</h3>
            <h3 className="mt-3">
              Based in Tunisia; I create elegant and responsive sites, easy to use and built with best practices.
            </h3>
            <h3 className="my-3">
              I use HTML, CSS, SASS, Tailwind CSS, Bootstrap, JavaScript & React.js;
              I am a WordPress designer.
            </h3>
            <a
              className="p-2 rounded-2xl bg-pink-200"
              href="https://mega.nz/file/XUt13JrK#htwbQSx2cPZoiB3NImWTzMJ-2N-Rg4gtcCOy9wFherE"
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
            <div className="mt-4 flex">
              <a href="https://github.com/Amine-Triki" target="_blank" rel="noreferrer">
                <RiGithubFill className="text-6xl text-gray-700" />
              </a>
              <a href="https://tn.linkedin.com/in/amine-triki-06b95220b/" target="_blank" rel="noreferrer">
                <RiLinkedinFill className="text-6xl text-blue-600" />
              </a>
              <a href="https://www.facebook.com/amine.triki.1998" target="_blank" rel="noreferrer">
                <RiFacebookCircleFill className="text-6xl text-blue-800" />
              </a>
              <a href="https://www.youtube.com/@aminetrikitv" target="_blank" rel="noreferrer">
                <RiYoutubeFill className="text-6xl text-red-700" />
              </a>
              <a href="https://www.instagram.com/mr_amine_triki/" target="_blank" rel="noreferrer">
                <RiInstagramFill className="text-6xl text-purple-600" />
              </a>
            </div>
          </div>
          <img className="image mt-5 mb-5" src={AmineTrikiImg} alt="Amine Triki" title="Amine Triki" />
        </div>
      </section>
    </main>
  );
};

export default home;
