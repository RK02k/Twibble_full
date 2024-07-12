import "./SideOption.css";

const SideOption = ({ active, Icon, text }) => {
    return (
        <div className={`sideOption ${active && 'sideOption--active'}`}>
            <Icon  />
            <h2 >{text}</h2>
        </div>
    );
};

export default SideOption;


