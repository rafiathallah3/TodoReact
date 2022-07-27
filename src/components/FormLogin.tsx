export default function FormLogin() {
    return (
        <form method="POST" action="https://belajar.e-smanpul.com/auth/proc/c2lzd2E=">
            <input type="hidden" name="_token" value="gJzyI69n5wodOq8F8AOuVLMEtIClPWfoYIaDubRH" />
            <div className="form-group position-relative has-icon-left">
                <label>Username</label>
                <div className="position-relative">
                    <input type="text" className="form-control" name="username" placeholder="Username" required />
                </div>
            </div>
            <div className="form-group position-relative has-icon-left">
                <div className="clearfix">
                    <label>Password</label>

                </div>
                <div className="position-relative">
                    <input type="password" className="form-control" name="password" placeholder="Password" required />
                </div>
            </div>
            <br />
            <div className="clearfix">
                <button className="btn btn-primary float-right btn-block"><b> Login </b></button>
            </div>
        </form>
    )
}