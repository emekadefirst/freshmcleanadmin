import { GoHome } from "react-icons/go";
import { MdAttachMoney, MdSchedule, MdSettings } from "react-icons/md";
import { FaBroom, FaFileAlt } from 'react-icons/fa';
import { FaClock, FaBriefcase } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
// import { BiSupport } from 'react-icons/bi';
// import { GiGears } from 'react-icons/gi';
import { RiUserAddLine } from 'react-icons/ri';

export const navigationItems = [
  {
    to: "/dashboard",
    icon: GoHome,
    label: "Home",
    translationKey: "dashboard"
  },
  {
    to: "/cleaning-requests",
    icon: FaBroom,
    label: "Cleaning Requests",
    translationKey: "cleaningRequests"
  },
  {
    to: "/user-management",
    icon: RiUserAddLine,
    label: "User Management",
    translationKey: "userManagement"
  },
  {
    to: "/cleaning-frequency",
    icon: FaClock,
    label: "Cleaning Frequency",
    translationKey: "cleaningFrequencyTitle"
  },
  {
    to: "/additional-roles",
    icon: FaBriefcase,
    label: "Additional Roles",
    translationKey: "additionalRolesTitle"
  },
  // {
  //   to: "/content-management",
  //   icon: FaFileAlt,
  //   label: "Content Management",
  //   translationKey: "contentManagementTitle"
  // },
  {
    to: "/transactions",
    icon: BsCashCoin,
    label: "Transactions",
    translationKey: "Transactions"
  },
  // {
  //   to: "/services",
  //   icon: GiGears,
  //   label: "Services",
  //   translationKey: "services"
  // },
  // {
  //   to: "/service-category",
  //   icon: FaTags,
  //   label: "Service Category",
  //   translationKey: "serviceCategory"
  // },
  {
    to: "/scheduling",
    icon: MdSchedule,
    label: "Scheduling",
    translationKey: "schedule"
  },
  // {
  //   to: "/financial-management",
  //   icon: MdAttachMoney,
  //   label: "Financial Management",
  //   translationKey: "financialManagement"
  // },
  // {
  //   to: "/customer-support",
  //   icon: BiSupport,
  //   label: "Customer Support"
  // },
  {
    to: "/cleaner-application",
    icon: FaFileAlt,
    label: "Cleaner Application",
    translationKey: "cleanerApplication"
  },
  {
    to: "/account-management",
    icon: MdSettings,
    label: "Account Management",
    translationKey: "accountManagement"
  }
];