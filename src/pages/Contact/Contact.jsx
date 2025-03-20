import './Contact.css';
import { FaUserLarge } from "react-icons/fa6";
import { RiMailLine, RiMapPinLine } from "react-icons/ri";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <section className="text-center py-5" id="Contact">
        <div className="container">
          <div className="font-bold my-5 relative">
            <h2 className='text-4xl my-3'>Contact Me</h2>
            <p>Get in touch</p>
          </div>
          <div id="flex" className="flex justify-center">
            <div id="touch">
              <div className="text-start mt-4">
                <h3 className='text-3xl'>Get in touch</h3>
                <p className="mt-4 text-2xl">
                  If you have any questions or proposals, you can simply write to us.<br />
                  We will answer you as soon as possible.
                </p>
              </div>
              <div className="text-start flex justify-start items-center mt-4">
                <FaUserLarge />
                <div className="text-2xl ms-1">
                  <span><b>Name :</b></span>
                  <span> Amine Triki</span>
                </div>
              </div>
              <div className="text-start flex justify-start items-center mt-4">
                <RiMapPinLine />
                <div className="text-2xl ms-1">
                  <span><b>Address :</b></span>
                  <span> Sakiet Ezzit, Sfax, Tunisia</span>
                </div>
              </div>
              <div className="text-start flex justify-start items-center mt-4">
                <RiMailLine />
                <div className="text-2xl ms-1">
                  <span><b>Email :</b></span>
                  <span> Contact@aminetriki.com.tn</span>
                </div>
              </div>
            </div>

            <form className="container mb-5 text-start mt-4" onSubmit={handleSubmit}>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                    Subject  
                  </label>
                  <div className="mt-2">
                    <input
                      id="street-address"
                      name="street-address"
                      type="text"
                      autoComplete="street-address"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="bg-amber-950 my-4 text-white p-3 rounded-3xl">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;