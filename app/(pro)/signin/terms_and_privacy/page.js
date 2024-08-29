import React from 'react';

const TermsAndPrivacy = () => {
    return (
        <div style={styles.container}>
            <h1 id="terms" style={styles.heading}>Terms of Service</h1>
            <section style={styles.section}>
                <h2 style={styles.subheading}>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using the Learn With Rustam (LWR) services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the services.
                </p>

                <h2 style={styles.subheading}>2. Use of Services</h2>
                <ul>
                    <li>You must be at least 13 years old to use the services.</li>
                    <li>You agree not to use the services for any unlawful or prohibited activities.</li>
                    <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                </ul>

                <h2 style={styles.subheading}>3. User Content</h2>
                <p>
                    You retain ownership of any content you submit, post, or display on or through the services. You grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display your content.
                </p>

                <h2 style={styles.subheading}>4. Termination</h2>
                <p>
                    We reserve the right to suspend or terminate your access to the services at any time, without notice, for conduct that we believe violates these terms or is harmful to other users.
                </p>

                <h2 style={styles.subheading}>5. Limitation of Liability</h2>
                <p>
                    We are not liable for any indirect, incidental, or consequential damages arising from the use of the services.
                </p>
            </section>

            <h1 id="privacy" style={styles.heading}>Privacy Policy</h1>
            <section style={styles.section}>
                <h2 style={styles.subheading}>1. Information We Collect</h2>
                <ul>
                    <li>We collect information you provide directly to us, such as when you create an account, update your profile, or contact us.</li>
                    <li>We may also collect information automatically through cookies and similar technologies.</li>
                </ul>

                <h2 style={styles.subheading}>2. How We Use Information</h2>
                <ul>
                    <li>We use the information to operate, maintain, and improve the services.</li>
                    <li>We may also use the information to communicate with you, such as sending service-related announcements.</li>
                </ul>

                <h2 style={styles.subheading}>3. Sharing of Information</h2>
                <p>
                    We do not share your personal information with third parties except as necessary to provide the services or as required by law. We may share aggregated, non-personally identifiable information with the partners.
                </p>

                <h2 style={styles.subheading}>4. Data Security</h2>
                <p>
                    We implement reasonable security measures to protect your information from unauthorized access, alteration, or destruction.
                </p>

                <h2 style={styles.subheading}>5. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on the website.
                </p>
            </section>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '32px',
        marginBottom: '20px',
    },
    section: {
        marginBottom: '40px',
    },
    subheading: {
        fontSize: '24px',
        marginBottom: '10px',
    },
};

export default TermsAndPrivacy;
