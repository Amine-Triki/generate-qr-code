import "./Footer.css";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer py-3 bg-fuchsia-300">
      <p id="Rights" className="container text-center mx-auto mb-0">
        2025 -- {`${year} © Amine Triki || All Rights Reserved`}
      </p>
    </footer>
  );
};

export default Footer;