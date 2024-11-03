import {Link} from "react-router-dom";
import {Space} from "./Portfolio";

export const AboutMe = () => {
    //const text = "<space intentionally left blank for minimalistic purposes>"
    return <div style={{overflow: "hidden"}}>
        <Space amount="8vh"/>
        <h1 className="title" style={{textAlign: "center"}}>LET'S CONNECT!</h1>
        <Space amount="8vh"/>
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            verticalAlign: "middle",
            justifyContent: "center",
            flexFlow: "column"
        }}>
            <About/>
            <Space amount="4vh"/>
            <Specialization/>
            <Space amount="4vh"/>
            <DailyRoutine/>
            <Space amount="8vh"/>
            <ContactMe/>
            <div style={{margin:"auto", top:0, width:"fit-content", position:"relative"}}>
                <img style={{
                    borderRadius: "50%",
                    width: "14rem",
                    display: "block",
                    margin: "auto",
                    boxShadow: "0px 4px 4px"
                }} alt="Giorgio" src="/imgs/propic.jpg"/>
                <div style={{
                    display: "flex",
                    fontSize: 64,
                    width: "14rem",
                    margin: "auto",
                    color: "#424242",
                    justifyContent: "space-evenly"
                }}>
                    <a className="social-link" href="https://github.com/JustZambetti"><i
                        className="bi bi-github"></i></a>
                    <a className="social-link" href="https://www.linkedin.com/in/giorgio-zambetti"><i
                        className="bi bi-linkedin"></i></a>
                </div>
            </div>


        </div>
        <NavBar/>
    </div>
}

const About = () => {
    return (
        <div style={{maxWidth: 540, margin: "auto"}}>
            <div className="big-list-item" style={{width: "fit-content"}}> ABOUT ME</div>
            <p className="text">
                I’m Giorgio Zambetti, a 20 years old Software Engineer.<br/>
                Here I share my projects and some interactive explanations of the algorithms I learn about. I hope you
                will like them!
            </p>
        </div>
    );
}

const Specialization = () => {
    return (
        <div style={{width: 540, margin: "auto"}}>
            <div className="big-list-item" style={{width: "fit-content"}}>SPECIALIZATION</div>
            <p className="text">
                My fields of specialization are:<br/>
                <ul>
                    <li className="text-dark">Software Engineering (full-stack, mobile & web)</li>
                    <li className="text-dark">Search & Optimization</li>
                </ul>
            </p>
        </div>
    );
}

const ContactMe = () => {
    return (
        <div style={{width: 540, margin: "auto"}}>
            <div className="big-list-item" style={{width: "fit-content"}}>CONTACT ME</div>
            <p className="text">
                Fell free to contact me by sending me a mail at: <span className="text-dark">work@zambettigiorgio.com</span><br/>
                Here a list of what I would be happy to receive:<br/>
                <ul>
                    <li className="text-dark">Job offers</li>
                    <li className="text-dark">Collaboration project ideas</li>
                    <li className="text-dark">Invitations to events</li>
                    <li className="text-dark">Any sort of question</li>
                </ul>
                Answer guaranteed!
            </p>
        </div>
    );
}

const DailyRoutine = () => {
    return (
        <div style={{width: 540, margin: "auto"}}>
            <div className="big-list-item" style={{width: "fit-content"}}>DAILY ROUTINE</div>
            <p className="text">
                I believe that a person’s routine offers a glimpse into who they are and what they value.
                I hope to give you a better understanding of how I stay focused, energized, and inspired each day!
            </p>
            <RoutineSection time = "7:00  -  8:00" emoji="‍🏃" paragraph="Start the day with a run or a workout"/>
            <RoutineSection time = "8:00  -  9:00" emoji="🧘‍♂️" paragraph="Healthy breakfast and mindfulness meditation"/>
            <RoutineSection time = "9:00  - 12:00" emoji="⏳️" paragraph="Deep Work, using the Pomodoro technique for focus"/>
            <RoutineSection time = "12:00 - 12:30" emoji="️🌳" paragraph="Stretching routine and a short walk in nature"/>
            <RoutineSection time = "12:30 - 13:00" emoji="️🥗" paragraph="Healthy lunch, mostly prepared ahead with prepped ingredients"/>
            <RoutineSection time = "13:00 - 16:00" emoji="️⏳" paragraph="Another session of Deep Work"/>
            <RoutineSection time = "16:00 - 19:00" emoji="️🎨 " paragraph="Hobby break to recharge: singing, drawing, reading, hanging out with friends, or doing housework"/>
            <RoutineSection time = "19:00 - 20:00" emoji="🍽️️" paragraph="Dinner"/>
            <RoutineSection time = "20:00 - 21:30" emoji="️⏱️" paragraph="A short session of Deep Work"/>
            <RoutineSection time = "21:30 - 22:00" emoji="📒️" paragraph="Plan for the next day and journal"/>
            <RoutineSection time = "22:00 - 22:30" emoji="️💤" paragraph="Prepare for 8:30 hours of sound sleep"/>
        </div>
    );
}

const RoutineSection = ({time, emoji, paragraph}) => {
    return <div style={{display: "flex", width:640}}>
        <span className="text" style={{flexShrink: 0, textAlign:"right", paddingRight:10, minWidth: 140}}>{time}</span>
        <span className="text">️{emoji}</span>
        <span className="text-dark"> {paragraph}</span>
    </div>
}


const NavBar = () => {
    return (
        <div style={{position: "fixed", right: "5%", top: "10%", mixBlendMode: "difference"}}>
            <div className="navbar-line"></div>
            <div style={{marginRight: "10px"}}>
                <p className="navbar-text-selected"> contacts</p>
                <Link to="/" className="navbar-text-unselected"> portfolio</Link><br/>
                <Link to="/Articles" className="navbar-text-unselected"> articles</Link>
            </div>
        </div>
    );
}