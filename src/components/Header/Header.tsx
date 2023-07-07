import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Backdrop } from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.init";
import { useSignOut } from "react-firebase-hooks/auth";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(8)} + 1px)`,
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - 3.5rem)`,
    height: "3.5rem",
    backgroundColor: "rgb(2 6 23)",
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function Header() {
    const [signOut] = useSignOut(auth);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [user, setUser] = React.useState([]);
    const navigate = useNavigate();
    const SearchTime_Ref: React.MutableRefObject<NodeJS.Timeout | undefined> =
        React.useRef();

    React.useEffect(() => {
        if (search) {
            if (SearchTime_Ref.current) {
                clearTimeout(SearchTime_Ref.current);
                SearchTime_Ref.current = undefined;
            }
            if (!SearchTime_Ref.current) {
                SearchTime_Ref.current = setTimeout(() => {
                    // write user search functionality here

                    SearchTime_Ref.current = undefined;
                }, 2000);
            }
        }
    }, [search]);

    
    // logout function
    const handleLogOut = async()=> {
        await signOut();
        navigate('/');
    }

    return (
        <div className="">
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer - 1,
                }}
                open={open}
                onClick={() => setOpen(false)}
            />
            <AppBar position="fixed" open={open}>
                <div className="flex items-center h-full px-5">
                    <Typography
                        onClick={() => navigate("/")}
                        variant="h6"
                        noWrap
                        component="div"
                        className="uppercase cursor-pointer"
                    >
                        Ting Tong Chat
                    </Typography>
                </div>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <div className="bg-slate-950 h-full text-white flex flex-col">
                    <DrawerHeader>
                        <div
                            className="w-full flex justify-end items-center"
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <h3
                                className={`${
                                    open || "hidden"
                                } transition-opacity duration-1000 font-bold grow text-center text-xl text-rose-500 tracking-widest uppercase`}
                            >
                                Chats
                            </h3>
                            <img
                                className="h-10 cursor-pointer"
                                src="/icon.png"
                                alt=""
                            />
                        </div>
                    </DrawerHeader>
                    <Divider />
                    <label className="flex flex-col items-center px-1 relative">
                        <input
                            onBlur={() => {
                                setSearch("");
                                setUser([]);
                            }}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            className={`min-w-0 w-full p-1 font-bold text-slate-600 rounded focus:outline-rose-500 focus:outline-2 ${
                                !open && "invisible"
                            }`}
                            placeholder="Search People..."
                            value={search}
                        />
                        <div
                            className={`max-h-[15rem] w-full p-1.5 bg-slate-800 z-10 absolute top-9 overflow-y-auto whitespace-pre-wrap ${
                                (!open || !search || !user.length) && "hidden"
                            }`}
                        >
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Lorem, ipsum dolor sit amet consectetur
                            adipisicing elit. Repellat, quos?
                        </div>
                    </label>
                    <Divider />
                    <List className="grow overflow-y-auto overflow-x-hidden">
                        {[
                            "Inbox",
                            "Starred",
                            "Send email",
                            "Drafts",
                            "Inbox",
                            "Starred",
                            "Send email",
                            "Drafts",
                            "Inbox",
                            "Starred",
                            "Send email",
                            "Drafts",
                        ].map((text, index) => (
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{ display: "block" }}
                            >
                                <ListItemButton
                                    onClick={() => navigate(`inbox/${123}`)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <MailIcon color="info" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <div className="bg-slate-900 py-4">
                        <ListItem disablePadding sx={{ display: "block" }}>
                            <ListItemButton
                                onClick={handleLogOut}
                                title="Logout"
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Logout color="info" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={"Log out"}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />
                            </ListItemButton>

                            <ListItemButton
                                onClick={() => navigate(`account/${123}`)}
                                title="My Profile"
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    <AccountCircle color="info" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={"My Profile"}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
