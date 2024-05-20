import "bootstrap/dist/css/bootstrap.css";

export default function LoginButton() {
  return (
    <div class="dropddown-menu">
      <div class="col-sm-12">
        <div class="col-sm-12">Login</div>
        <div class="col-sm-12">
          <input
            type="text"
            placeholder="Uname or Email"
            onclick="return false;"
            class="form-control input-sm"
            id="inputError"
          />
        </div>
        <br />
        <div class="col-sm-12">
          <input
            type="password"
            placeholder="Password"
            class="form-control input-sm"
            name="password"
            id="Password1"
          />
        </div>
        <div class="col-sm-12">
          <button type="submit" class="btn btn-success btn-sm">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
