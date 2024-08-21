import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { useTabContext } from "../context/TabContext";

const drawerWidth = 180;

const PageLayout = ({ children }: PropsWithChildren) => {
  const { currentTab, changeTab } = useTabContext();

  const drawer = (
    <div>
      <List>
        {["Data Table", "Pivote Table"].map((tab) => (
          <ListItem
            key={tab}
            disablePadding
            onClick={() => {
              changeTab(tab.replaceAll(" ", "-").toLowerCase());
            }}
          >
            <ListItemButton
              selected={currentTab === tab.replaceAll(" ", "-").toLowerCase()}
            >
              <ListItemText primary={tab} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="table navigations"
      >
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;
