import {
  Alarm,
  Camera,
  DashboardIcon,
  EmptyHourGlass,
  FileIcon,
  Pencil,
  TrashCan,
  UsersIcon,
  VideoPlayIcon,
} from "../../assets/icons";
import routes from "./routes.const";

export default {
  data: {
    main: [
      {
        icon: DashboardIcon,
        label: "Dashboard",
        href: routes.dashboard,
      },
      {
        icon: Pencil,
        label: "Item 1",
        href: routes.item1,
      },
      {
        icon: UsersIcon,
        label: "Item 2",
        href: routes.item2,
      },
      {
        icon: EmptyHourGlass,
        label: "Item 3",
        href: routes.item3,
      },
    ],

    others1: [
      {
        icon: Camera,
        label: "Item 4",
        href: routes.item4,
      },
      {
        icon: TrashCan,
        label: "Item 5",
        href: routes.item5,
      },
    ],

    others2: [
      {
        icon: VideoPlayIcon,
        label: "Item 6",
        href: routes.item6,
      },
      {
        icon: FileIcon,
        label: "Item 7",
        href: routes.item7,
      },
      {
        icon: Alarm,
        label: "Item 8",
        href: routes.item8,
      },
    ],
  },
};
