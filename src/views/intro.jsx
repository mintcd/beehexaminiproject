import scrum from '../public/scrum.png';

const Intro = () => {
    return (
        <div className="container intro-container">
            <h1 className="intro-title"> Scrum Values </h1>
            <p className="intro-paragraph"> Scrum is a <b>fragile</b> development framework based on empiricism that helps modern companies develop medium-to-small sized softwares more efficiently. Fragile, in general, treats development progress iteratively. Specifically, Scrum has three pillars: transparency, inspection and adaptation. </p>
            <p className="intro-paragraph"> Scrum has 5 values: Commitment, Courage, Focus,  Respect, and Openness in which Commitment seems to lead the other four to maintain develope'
                progress smoothly, as it builds <b>Trust</b> among Scrum members.</p>
            <p className="intro-paragraph"> If you are new to Scrum, this test is for you to adjust your co-work ability. Read more about scrum at <a href="https://www.scrum.org/">https://www.scrum.org/</a>.</p>
            <img src={scrum} alt="" />

        </div>
    )
}
export default Intro;