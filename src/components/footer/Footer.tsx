import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemTextProps,
  Paper,
  styled,
} from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
interface props {}

const Footer: React.FC<props> = () => {
  const ListItemTitleText = styled(ListItemText)<ListItemTextProps>(
    ({ theme }) => ({
      "& span": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.primary.dark
            : theme.palette.primary.light,
        fontWeight: "800",
      },
    })
  );
  const ListItemSubtitleText = styled(ListItemText)<ListItemTextProps>(
    ({ theme }) => ({
      "& span": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.secondary.dark
            : theme.palette.secondary.light,
      },
    })
  );
  return (
    <Paper>
      <Container maxWidth="xl" sx={{ paddingY: 5 }}>
        <Grid container>
          <Grid item sm={3} xs={6}>
            <List>
              <ListItem>
                <ListItemTitleText primary="با یونی بوک" />
              </ListItem>
              <ListItem>
                <ListItemSubtitleText primary="اتاق خبر یونی بوک" />
              </ListItem>
              <ListItem>
                <ListItemSubtitleText primary="فروش در یونی بوک" />
              </ListItem>
              <ListItem>
                <ListItemSubtitleText primary="فرصت های شغلی" />
              </ListItem>
              <ListItem>
                <ListItemSubtitleText primary="گزارش تخلف در یونی بوک" />
              </ListItem>
              <ListItem>
                <ListItemSubtitleText primary="درباره یونی بوک" />
              </ListItem>
            </List>
          </Grid>
          <Grid item sm={3} xs={6}>
            <List>
              <ListItem>
                <ListItemTitleText primary="خدمات مشتریان" />
              </ListItem>
              <ListItem>
                <ListItemSubtitleText primary="پاسخ به پرسش های متداول" />
              </ListItem>
              <ListItem>
                <ListItemSubtitleText primary="شرایط استفاده" />
              </ListItem>
              <ListItem>
                <ListItemSubtitleText primary="حریم خصوصی" />
              </ListItem>
            </List>
          </Grid>
          <Grid item sm={3} xs={6}>
            <List>
              <ListItem>
                <ListItemTitleText primary="ما را در فضای مجازی دنبال کنید" />
              </ListItem>
              <ListItem>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <InstagramIcon />
                  <TwitterIcon />
                  <YouTubeIcon />
                  <FacebookIcon />
                </Box>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Footer;
