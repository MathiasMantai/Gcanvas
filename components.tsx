const testcomponent = (prop) => {
    return (
        <div>
            {prop.isLoading ? <span>Loading...</span> : <span>Finished Loading</span>}
        </div>
    );
};

const SeverityMessage = () => {
    const severity = "warning";
    return (
        <div className={severity == "warning" ? "warning" : "error"}>
            Error Message is here
        </div>
    );
}