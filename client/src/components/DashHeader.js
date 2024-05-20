import { Link } from "react-router-dom";

const DashHeader = () => {
  const content = (
      <div>
        <Link to="/dash">
          <h1 className="dash-header__title">ARTiFacts</h1>
        </Link>
        <nav class="navbar navbar-light" >{/* add nav buttons later */}</nav>
      </div>
  );

  return content;
};
export default DashHeader;
