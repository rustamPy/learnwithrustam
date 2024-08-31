const Footer = () => {
    return (
        <footer className="bg-gray-200 p-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} LWR; All rights reserved.</p>
                <p className="mt-2">
                    <a href="/signin/terms_and_privacy#terms">Terms of Service</a> |
                    <a href="/signin/terms_and_privacy#privacy" className=" ml-2">Privacy Policy</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;