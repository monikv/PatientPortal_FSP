import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./Header";


const Home = () => {
  const navigate = useNavigate();
  let location=useLocation();
   

  // Simulated data array
  const cardData = [
    {
      id: 1,
      title: "List All Appointments",
      description: "Access patient records",
      detail: "Quickly view all patient patient appointments.",
      route: "/listappointments",
    },
    {
      id: 2,
      title: "Make an Appoitment",
      description: "book a date",
      detail: " To make an appointment with information",
      route: "/makeappointments",
    },
    // Add more objects for more cards...
  ];
  const handleCardClick = (path: string) => {
    if (path === "/makeappointments") navigate("/makeappointments"); // Navigate to the path provided

    if (path === "/listappointments") navigate("/listappointments");
  };
  return (
    <>
    <div className="homepage-container">

    <Header/>

    <Sidebar />
   
    
    {  location.pathname==='/home'  ? <Grid
      container
      spacing={2}
      justifyContent="center"
      style={{ marginTop: "150px" }}
    >
      {cardData.map((data) => (
        <Grid item key={data.id} xs={12} sm={6} md={4}>
          <Card
            sx={{ minWidth: 275 }}
            onClick={() => handleCardClick(data.route)}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {data.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {data.description}
              </Typography>
              <Typography variant="body2">{data.detail}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>:  <Outlet/> }
  
</div>
</>
  );
};

export default Home;
