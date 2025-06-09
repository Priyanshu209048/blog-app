import userContext from "../context/userContext";
import Base from "../components/Base";

const Services = () => {
    return(
        <userContext.Consumer>
            {(user) => (
                <Base>
                    <div>
                        <h1>This is Services page</h1>
                        <p>Welcome to services page: {user.user.login && user.user.data.user.name}</p>
                    </div>
                </Base>
            )}
        </userContext.Consumer>
    )
}

export default Services;