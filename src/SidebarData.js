import React from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PersonIcon from "@material-ui/icons/Person";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";

export const SidebarData = [
  {
    title: "Users",
    path: "/userManagement",
    icon: <PersonIcon />,
    iconClosed: <ArrowDropDownIcon />,
    iconUp: <ArrowDropUpIcon />,
    subNav: [
      {
        title: "User Management",
        path: "/userManagement",
      },
    ],
  },
  {
    title: "Directory",
    path: "/groups",
    icon: <PermContactCalendarIcon />,
    iconClosed: <ArrowDropDownIcon />,
    iconUp: <ArrowDropUpIcon />,
    subNav: [
      {
        title: "Groups",
        path: "/groups",
      },
      {
        title: "Group Templates",
        path: "/userManagement",
      },
      {
        title: "Organizational Units",
        path: "/userManagement",
      },
      {
        title: "Shared Contacts",
        path: "/userManagement",
      },
      {
        title: "Contact Sync",
        path: "/contact",
      },
    ],
  },
];
