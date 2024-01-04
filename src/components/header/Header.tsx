import BoyIcon from "@mui/icons-material/Boy";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ManIcon from "@mui/icons-material/Man";
import SearchIcon from "@mui/icons-material/Search";
import WomanIcon from "@mui/icons-material/Woman";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Collapse,
  Drawer,
  InputBase,
  ListItem,
  Paper,
  styled,
  useTheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "utilities";
import logo from "assets/book_generated.jpg";

interface IProps {
  navHeight: string;
  setSearchText: any;
}
const genders = {
  men: { name: "مردانه", icon: <ManIcon /> },
  women: { name: "زنانه", icon: <WomanIcon /> },
  kid: { name: "بچگانه", icon: <BoyIcon /> },
};
const categories = {
  sport: "ورزشی",
  sneaker: "کتانی",
  oxford: "رسمی",
};

const NavbarMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useTheme();
  const navigate = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const getList = () => (
    <Box
      sx={{
        backgroundColor: (theme) => "white",
        direction: "rtl",
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "3px",
          display: "flex",
          alignItems: "center",
          width: "80%",
          marginRight: 2,
          backgroundColor:
            theme.palette.mode === "light" ? "#f0f0f1" : "#2b2b2b",
          backgroundImage: "none",
          marginBottom: 2,
        }}
      >
        <IconButton
          type="button"
          onClick={() => {
            navigate.push(`/products/all/all?q=${searchInput}`);
            setSearchInput("");
          }}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            "&& .MuiInputBase-input": {
              backgroundColor:
                theme.palette.mode === "light" ? "#f0f0f1" : "#2b2b2b",
            },
          }}
          placeholder="جستجوی آگهی"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Paper>
      {Object.entries(genders).map((gender, index) => (
        <ListItem key={index} sx={{ paddingRight: 0 }}>
          <Accordion
            elevation={0}
            sx={{
              backgroundColor: (theme) => "white",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{gender[1].name}</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
              }}
            >
              {Object.entries(categories).map((category, index) => (
                <Button
                  onClick={() => {
                    navigate.push(`/products/${gender[0]}/${category[0]}`);
                    setOpen(false);
                  }}
                >
                  {category[1]}
                </Button>
              ))}
            </AccordionDetails>
          </Accordion>
        </ListItem>
      ))}
    </Box>
  );
  return (
    <Drawer
      transitionDuration={0}
      open={open}
      anchor={"right"}
      onClose={() => setOpen(false)}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        paddingTop="5px"
        alignItems={"center"}
        width="100%"
        marginBottom={2}
        sx={{
          backgroundColor: (theme) => "white",
        }}
      >
        <IconButton
          size="large"
          onClick={() => setOpen(false)}
          color="inherit"
          sx={{
            height: "10px",
            color: "primary.main",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        height={"100%"}
        sx={{
          backgroundColor: (theme) => "white",
        }}
      >
        {getList()}
      </Box>
    </Drawer>
  );
};

const Header: React.FC<IProps> = ({ navHeight, setSearchText }) => {
  const theme = useTheme();
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("men");
  const [cartItemCounts, setCartItemCounts] = useState(0);
  const [openSearch, setOpenSearch] = useState(false);
  const [anchorElGroups, setAnchorElGroups] =
    React.useState<null | HTMLElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (checkAuth()) {
      setIsAuthenticated(true);
    }
  }, []);
  const openGroups = Boolean(anchorElGroups);
  const handleClickGroups = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElGroups(event.currentTarget);
  };
  const handleCloseGroups = () => {
    setAnchorElGroups(null);
  };
  const dispatch = useDispatch();
  const navigate = useRouter();

  useEffect(() => {}, [theme.palette.mode]);
  const LoginManagementButton = styled(Button)<{
    small?: boolean;
  }>(({ theme, small }) => ({
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.info.main,
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
    },
    padding: small ? "0 5px " : "0 30px",
    width: small ? "50px" : "35%",
    minHeight: small ? "30px" : "35px",
    fontSize: small ? "10px" : "",
  }));
  const BrandTypographyStyle = styled(Typography)<{}>(({ theme }) => ({
    fontWeight: 700,
    textDecoration: "none",
    color: "black",
    "&:hover": {
      cursor: "pointer",
    },
    fontSize: "26px",
    [theme.breakpoints.down(1024)]: {
      fontSize: "16px",
    },
  }));
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: (theme) => "white",
          paddingTop: `calc(${navHeight} / 8)`,
        }}
      >
        <Container maxWidth={theme.breakpoints.down("md") ? false : "xl"}>
          <Toolbar
            disableGutters
            sx={{
              minHeight: `calc(7*${navHeight} /8) !important`,
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100% !important",
                textAlign: "right",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "calc(100%/3)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 7,
                  }}
                >
                  <IconButton
                    type="button"
                    onClick={() => {
                      openSearch
                        ? setSearchText(searchInput)
                        : setOpenSearch(true);
                    }}
                  >
                    <SearchIcon />
                  </IconButton>

                  <Collapse in={openSearch} orientation={"horizontal"}>
                    <Paper
                      component="form"
                      sx={{
                        p: "3px",
                        display: "flex",
                        alignItems: "center",
                        width: 200,
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? "#f0f0f1"
                            : "#2b2b2b",
                        backgroundImage: "none",
                      }}
                    >
                      <InputBase
                        sx={{
                          ml: 1,
                          flex: 1,
                          "&& .MuiInputBase-input": {
                            backgroundColor:
                              theme.palette.mode === "light"
                                ? "#f0f0f1"
                                : "#2b2b2b",
                          },
                        }}
                        placeholder="جستجوی آگهی"
                        value={searchInput}
                        onKeyUp={(e: any) => {
                          e.preventDefault();
                          console.log(e);
                        }}
                        onChange={(e: any) => {
                          e.preventDefault();
                          e.keycode == 13
                            ? setSearchText(searchInput)
                            : setSearchInput(e.target.value);
                        }}
                      />
                      <IconButton
                        type="button"
                        onClick={() => {
                          setOpenSearch(false);
                          setSearchInput("");
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Paper>
                  </Collapse>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": { cursor: "pointer" },
                }}
                onClick={() => navigate.push("/")}
              >
                <BrandTypographyStyle variant="h5" noWrap>
                  یونی بوک
                </BrandTypographyStyle>
              </Box>
              <Box
                sx={{
                  width: "calc(100%/3)",
                  justifyContent: "flex-end",
                  display: "flex",
                }}
              >
                <ButtonGroup
                  variant="contained"
                  sx={{ flexDirection: "row-reverse", width: "70%" }}
                  disableElevation
                >
                  {isAuthenticated && (
                    <LoginManagementButton
                      onClick={() => navigate.push("/dashboard")}
                    >
                      پروفایل
                    </LoginManagementButton>
                  )}
                  {!isAuthenticated && (
                    <LoginManagementButton
                      onClick={() => navigate.push("/login")}
                    >
                      ورود
                    </LoginManagementButton>
                  )}
                </ButtonGroup>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                right: 0,
              }}
            >
              <Typography
                variant="h6"
                onClick={() => navigate.push("/")}
                sx={{
                  fontWeight: 700,
                  textDecoration: "none",
                  color: "black",
                }}
              >
                یونی بوک
              </Typography>
              <ButtonGroup
                variant="contained"
                sx={{ flexDirection: "row-reverse", width: "30%" }}
                disableElevation
              >
                <Box>
                  {isAuthenticated && (
                    <LoginManagementButton
                      onClick={() => navigate.push("/dashboard")}
                    >
                      پروفایل
                    </LoginManagementButton>
                  )}
                  {!isAuthenticated && (
                    <LoginManagementButton
                      onClick={() => navigate.push("/login")}
                    >
                      ورود
                    </LoginManagementButton>
                  )}
                </Box>
              </ButtonGroup>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <NavbarMenu {...{ open, setOpen }} />
    </>
  );
};
export default Header;
