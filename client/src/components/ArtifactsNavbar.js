import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ArtifactsLogo from "../assets/images/ArtifactsLogo.png";
import colors from "./colors";

export function ArtifactsNavbar() {
  return (
    <nav class="navbar bg-body-tertiary">
      <div
        class="container-fluid justify-content-space-between"
        style={{
          backgroundColor: colors.darkBlue,
        }}
      >
        <Link to="/">
          <img
            src={ArtifactsLogo}
            alt="Logo"
            height="50"
            class="d-inline-block align-text-middle"
          />
        </Link>
        ARTiFacts
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            class="btn btn-outline-success"
            type="submit"
            style={{ color: colors.white }}
          >
            Search
          </button>
        </form>
        <button class="btn btn-primary" type="submit">
          Entrar
        </button>
      </div>
    </nav>
  );
}
