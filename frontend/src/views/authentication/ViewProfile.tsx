import {
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
  Box,
  Divider,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import NoUserNavBar from "../../components/NavBar/NoUserNavBar";
import { Email } from "@mui/icons-material";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useLocation, useNavigate } from "react-router";
import * as LINKS from "../../routes/links";
import { useStores } from "../../stores";
import { useEffect, useState } from "react";
import { Auth } from "../../components/Auth";

export const ViewProfile = () => {
  const AppStore = useStores();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(AppStore.getEmail());
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleClick = (email: string) => {
    setIsLoading(true);
    console.log(email);
    AppStore.resetPasswordController(email).then((res) => {
      setIsLoading(false);
      AppStore.logout();
      navigate(LINKS.CHANGE_PASSWORD);
    });
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    AppStore.getAllLogsController()
      .then((res) => {
        console.log(res);
        const data = res.data;
        const userData = data
          .filter((log: any) => {
            const message = log.message;
            return message.includes(AppStore.getUserId());
          })
          .map((log: any) => log.message);

        setLogs(userData);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
      });
  }, []);

  useEffect(() => {
    console.log(logs);
  }, [logs]);

  return (
    <>
      <Auth />
      <Container maxWidth="xl" sx={{ marginTop: "4%" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              sx={{
                borderRadius: "5%",
                padding: 3,
                width: "50%",
              }}
            >
              <CardContent>
                <Grid item>
                  <Typography
                    textAlign={"center"}
                    variant="h2"
                    sx={{ marginBottom: "24px", fontWeight: "500" }}
                  >
                    View Profile
                  </Typography>
                </Grid>

                <Typography component="div" sx={{ fontSize: "20px" }}>
                  <Box sx={{ fontWeight: 700 }}>User ID:</Box>
                  {AppStore.getUserId()}
                </Typography>
                <Divider />
                <Typography component="div" sx={{ mt: 3, fontSize: "20px" }}>
                  <Box sx={{ fontWeight: 700 }}>Email:</Box>
                  {AppStore.getEmail()}
                </Typography>
                <Divider />
                <Typography component="div" sx={{ mt: 3, fontSize: "20px" }}>
                  <Box sx={{ fontWeight: 700 }}>Password:</Box>
                  <PrimaryButton
                    style={{ marginLeft: 0 }}
                    buttonText="Change Password"
                    onClick={() => handleClick(email)}
                    isLoading={isLoading}
                  />
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* table */}
          <Grid
            item
            xs={12}
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paper sx={{ width: "70%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        key={"Message"}
                        align={"center"}
                        style={{
                          width: "100%",
                          backgroundColor: "rgb(5, 75, 227)",
                          color: "white",
                          fontSize: "20px",
                        }}
                      >
                        Logs Message
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logs
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((message, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell key={index} align={"left"}>
                              {message}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[15, 25, 100]}
                component="div"
                count={logs.length}
                rowsPerPage={10}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ViewProfile;
