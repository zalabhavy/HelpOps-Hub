"use client";
import React, { useContext, useEffect, useState } from "react";
import ProfilepageDetails from "@components/profile/ProfilepageDetails";
import SettingsTab from "@components/profile/SettingsTab";
import ResourcesTab from "@components/profile/ResourcesTab";
import { Context } from "@context/store";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faChartBar,
  faBell,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBlog,
  faChevronRight,
  faCog,
  faHouseUser,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const Settings = () => (
  <div className="min-h-screen mt-10 rounded-xl">
    <SettingsTab />
  </div>
);
const Resources = () => (
  <div className="min-h-screen mt-10 rounded-xl">
    <ResourcesTab />
  </div>
);
const Notifications = () => <div>Notifications Component</div>;
const Followers = () => <div>Grow Your Reach</div>;
const PostDetails = () => <div>Post Details</div>;
const DevopsInsights = () => <div>DevOps Insights: Ask & Answer</div>;
const Profile = ({ id }) => (
  <div className="bg-gray-100 mt-10 rounded-xl">
    <ProfilepageDetails isViewProfile={id.length > 0} id={id} />
  </div>
);

const MenuItem = ({
  title,
  icon,
  children,
  isCollapsible,
  onClick,
  isActive,
  theme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => {
          if (isCollapsible) setIsOpen(!isOpen);
          onClick();
        }}
        className={`py-2 px-4 hover:bg-gray-300 rounded flex items-center cursor-pointer justify-between ${
          isActive
            ? theme
              ? "bg-[#6089a4] hover:!bg-[#6089a4] text-white"
              : "bg-[#6f6f6f] hover:!bg-[#262626] text-white"
            : theme
            ? "bg-gray-100 hover:bg-gray-200"
            : "hover:!bg-[#262626]"
        }`}
      >
        <div className="flex items-center">
          <FontAwesomeIcon icon={icon} className="mr-2" />
          {title}
        </div>
        {isCollapsible && (
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`transition-transform duration-200 mr-5 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
      </div>
      {isCollapsible && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pl-6"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const profile = () => {
  let { theme, setIsPopup, setMsg, setColor, isLogin, finalUser } =
    useContext(Context);
  const [activeComponent, setActiveComponent] = useState(<Profile id="" />);
  const [activeMenuItem, setActiveMenuItem] = useState("Profile");
  const pathname = usePathname(); // Get current path
  const [id, setId] = useState("");
  const isViewProfile = id.length > 0;
  const router = useRouter();

  useEffect(() => {
    // Function to get query parameters from URL
    const getUrlParameter = (name) => {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    };

    // Get the 'id' query parameter from the URL
    const idFromQuery = getUrlParameter("id");

    if (idFromQuery) {
      const storedUser = localStorage.getItem("finalUser");
      const parsedUser = storedUser ? JSON.parse(storedUser) : isViewProfile;
    
      if (parsedUser._id !== idFromQuery) {
        setId(idFromQuery);
      }
    }
    setActiveComponent(<Profile id={id} />);
    setActiveMenuItem("Profile");
  }, [id]);

  const handleMenuClick = (component, title) => {
    setActiveComponent(component);
    setActiveMenuItem(title);
  };

  const handleHomeButton = () => {
    router.push("/");
  };

  return (
    <div
      className={`bg-gray-100 overflow-hidden mt-24 flex min-h-screen w-full ${
        theme ? "" : "bg-[#1c1a1a] "
      } `}
    >
      {!isViewProfile ? (
        <div
          className={`${
            theme ? "" : "bg-[#1c1a1a]"
          } w-[20%] border-t-4 border-gray-200 px-5 py-10 text-lg`}
        >
          <div
            className={`${
              theme ? "text-gray-600" : "text-white"
            } flex-1 overflow-y-auto space-y-4`}
          >
            <MenuItem
              title="Home"
              icon={faHouseUser}
              isCollapsible={false}
              onClick={handleHomeButton}
              isActive={activeMenuItem === "Home"}
              theme={theme}
            />
            <MenuItem
              title="Profile"
              icon={faAddressCard}
              isCollapsible={true}
              onClick={() => handleMenuClick(<Profile id={id} />, "Profile")}
              isActive={activeMenuItem === "Profile"}
              theme={theme}
            >
              <ul className="space-y-2 mt-2 cursor-pointer">
                <li
                  className="py-2 px-4 hover:bg-gray-300 rounded"
                  onClick={() =>
                    handleMenuClick(<PostDetails />, "PostDetails")
                  }
                >
                  Post Details
                </li>
              </ul>
            </MenuItem>
            <MenuItem
              title="Grow Your Reach"
              icon={faUserFriends}
              isCollapsible={false}
              onClick={() => handleMenuClick(<Followers />, "Followers")}
              isActive={activeMenuItem === "Followers"}
              theme={theme}
            />
            <MenuItem
              title="DevOps Insights"
              icon={faComment}
              isCollapsible={false}
              onClick={() =>
                handleMenuClick(<DevopsInsights />, "DevopsInsights")
              }
              isActive={activeMenuItem === "DevopsInsights"}
              theme={theme}
            />
            <MenuItem
              title="Blogs Page"
              icon={faBlog}
              isCollapsible={false}
              onClick={() =>
                router.push("/blogs")
              }
              theme={theme}
            />
            <MenuItem
              title="Resources"
              icon={faChartBar}
              isCollapsible={false}
              onClick={() => handleMenuClick(<Resources />, "Resources")}
              isActive={activeMenuItem === "Resources"}
              theme={theme}
            />
            <MenuItem
              title="Notifications"
              icon={faBell}
              isCollapsible={false}
              onClick={() =>
                handleMenuClick(<Notifications />, "Notifications")
              }
              isActive={activeMenuItem === "Notifications"}
              theme={theme}
            />
            <MenuItem
              title="Settings"
              icon={faCog}
              isCollapsible={false}
              onClick={() => handleMenuClick(<Settings />, "Settings")}
              isActive={activeMenuItem === "Settings"}
              theme={theme}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-[80%] m-auto">
        <div
          className={`w-full px-10 bg-gray-200 ${
            theme
              ? "shadow-[5px_5px_15px_rgba(0,0,0,0.195)]"
              : "shadow-md shadow-white"
          } ${theme ? "bg-[#fffaf4] border-2" : "bg-[#1e1d1d] border-2"}`}
        >
          {activeComponent}
        </div>
      </div>
    </div>
  );
};

export default profile;
