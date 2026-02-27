import { useHistory } from "react-router-dom";

function AdminNavigation({ currentPage }) {
  const history = useHistory();

  // Define navigation buttons based on current page
  const getNavigationButtons = () => {
    switch (currentPage) {
      case "settings":
        return [
          { label: "Player Progress", path: "/playerprogress" },
          { label: "Completed Missions", path: "/completedmissions" },
        ];
      case "playerprogress":
        return [
          { label: "Completed Missions", path: "/completedmissions" },
          { label: "Admin Settings", path: "/settings" },
        ];
      case "completedmissions":
        return [
          { label: "Player Progress", path: "/playerprogress" },
          { label: "Admin Settings", path: "/settings" },
        ];
      default:
        return [];
    }
  };

  const buttons = getNavigationButtons();

  if (buttons.length === 0) return null;

  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    window.location.reload();
  };

  return (
    <>
      <br />
      <br />
      <div
        style={{
          width: "80vw",
          height: "2px",
          backgroundColor: "#ff3700",
          marginLeft: "calc(-40vw + 50%)",
          marginRight: "calc(-40vw + 50%)",
        }}
      />
      <br />
      <br />
      {buttons.map((button, index) => (
        <button
          key={button.path}
          className="settingsPageButton"
          onClick={() => history.push(button.path)}
          style={index < buttons.length - 1 ? { marginRight: "2vw" } : {}}
        >
          {button.label}
        </button>
      ))}
      <br />
      <br />
      <button
        className="settingsPageButton"
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </>
  );
}

export default AdminNavigation;

