import CustomNav from "./CustomNav";

const Base = ({title="Welcome to out website", children}) => {
    return (
        // If we don,t want padding and margin then we use p-0 m-0
        <div className="">
            <CustomNav/>
            <div className="container-fluid">
                {children}
            </div>
        </div>
    );
};

export default Base;