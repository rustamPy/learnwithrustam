import Navbar from '@/components/light/Navbar'
import Footer from '@/components/light/Footer'
import '@/assets/styles/lightglobals.css'
const Hello = ({ children }) => {
    return (
        <html>
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    )
}

export default Hello;