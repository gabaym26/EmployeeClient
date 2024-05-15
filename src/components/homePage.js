import background from '../pictures/highSchool.jpg';

const HomePage = () => {
    return (
        <div id="picture" style={{
            backgroundImage: `url(${background})`,
        }}>Welcome!!!</div>
    )
}
export default HomePage;