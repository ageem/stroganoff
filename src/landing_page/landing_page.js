import './landing_page.css';
import StroganuffCow from './Stroganuff_cow1.png';

function LandingPage() {
    return (
        <div className="landing_page">
            <h1>Stroganoff!</h1>
            <img src={StroganuffCow} alt="Stroganuff Cow" />
        </div>
    );
}

export default LandingPage;
