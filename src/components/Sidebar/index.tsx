import { Link } from "react-router-dom";
import { MainstackLogo } from "../../assets/icons";
import sidebarData from "./sidebarData";
import ProfilePicture from "../../assets/images/profile-picture.png";

export default function Sidebar() {
  const activeLink = window.location.pathname;

  return (
    <nav className="min-w-[304px] pb-[60px] flex flex-col max-w-[304px] h-screen overflow-y-auto border border-gray-0 pt-[22px]">
      {/* Logo */}
      <div className="w-[100px]">
        <img
          src={MainstackLogo}
          alt="mainstack-logo"
          className="pl-[55px] w-full min-h-full"
        />
      </div>
      {/* All Links */}
      <div className="w-full mt-12 flex flex-col gap-6">
        {/* main links */}
        {sidebarData.data.main.map((link, index: number) => (
          <Link
            className={`pl-[60px] h-7 flex items-center gap-4 ${
              activeLink === link.href
                ? "text-orange-2 border-l-2 border-orange-2 font-SohneNormal orange-filter"
                : "text-gray-1 font-SohneSemibold"
            }`}
            key={index}
            to={link.href}
          >
            <img src={link.icon} alt="link-icon" className="w-4 h-4 " />
            <span className="text-base font-[inherit]">{link.label}</span>
          </Link>
        ))}

        <h6 className="font-SohneLight text-xs pl-[60px] mt-3">OTHERS 1</h6>

        {/* Others 1 */}
        {sidebarData.data.others1.map((link, index: number) => (
          <Link
            className={`pl-[60px] h-7 flex items-center gap-4 ${
              activeLink === link.href
                ? "text-orange-2 border-l-2 border-orange-2 font-SohneNormal orange-filter"
                : "text-gray-1 font-SohneSemibold"
            }`}
            key={index}
            to={link.href}
          >
            <img src={link.icon} alt="link-icon" className="w-4 h-4" />
            <span className="text-gray-1 text-base font-[inherit]">
              {link.label}
            </span>
          </Link>
        ))}

        <h6 className="font-SohneLight text-xs pl-[60px] mt-3">OTHERS 2</h6>

        {/* Others 2 */}
        {sidebarData.data.others2.map((link, index: number) => (
          <Link
            className={`pl-[60px] h-7 flex items-center gap-4 ${
              activeLink === link.href
                ? "text-orange-2 border-l-2 border-orange-2 font-SohneNormal orange-filter"
                : "text-gray-1 font-SohneSemibold"
            }`}
            key={index}
            to={link.href}
          >
            <img src={link.icon} alt="link-icon" className="w-4 h-4" />
            <span className="text-gray-1 text-base font-[inherit]">
              {link.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Profile Picture */}
      <div className="flex items-center gap-3 ml-[60px] mt-auto w-max">
        <img
          className="w-8 h-8 rounded-full"
          src={ProfilePicture}
          alt="profile-picture"
        />
        <span className="font-SohneNormal text-sm">Blessing Daniels</span>
      </div>
    </nav>
  );
}
